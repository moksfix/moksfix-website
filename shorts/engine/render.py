"""Render a MoksFix product short (1080x1920, 30 fps, H.264 + AAC voiceover).

Usage:
  "<claude-seo venv>/bin/python" shorts/engine/render.py shorts/products/tea-stall.json [--voice Tara] [--preview]

Each product JSON lists scenes. Every scene's `vo` line is spoken with macOS `say`; the scene
lasts as long as its voice line plus a beat, so picture and voice stay in step. Frames are drawn
by template.html (a pure function of time) in headless Chromium, then encoded with ffmpeg.
"""
import argparse, json, shutil, subprocess, sys, wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]          # MoksGoldMerron/
ENGINE = Path(__file__).resolve().parent
FONT = ROOT / 'node_modules/@fontsource-variable/josefin-sans/files/josefin-sans-latin-wght-normal.woff2'
LOGO = ROOT / 'public/logo.png'
FPS = 30
RATE = 48000


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def wav_seconds(p: Path) -> float:
    with wave.open(str(p)) as w:
        return w.getnframes() / w.getframerate()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('config')
    ap.add_argument('--voice', default=None)
    ap.add_argument('--rate', type=int, default=None, help='words per minute for say')
    ap.add_argument('--preview', action='store_true', help='render a few stills only')
    a = ap.parse_args()

    cfg_path = Path(a.config).resolve()
    cfg = json.loads(cfg_path.read_text())
    slug = cfg_path.stem
    voice = a.voice or cfg.get('voice', 'Tara')
    wpm = a.rate or cfg.get('wpm', 172)
    build = ROOT / 'shorts/.build' / slug
    if build.exists():
        shutil.rmtree(build)
    (build / 'frames').mkdir(parents=True)
    out_dir = ROOT / 'shorts/out'
    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. voice lines -> wav; scene length = voice + beat (min length per scene)
    parts = []
    for i, s in enumerate(cfg['scenes']):
        vo = s.get('vo', '').strip()
        if vo:
            aiff = build / f'vo{i}.aiff'
            wav = build / f'vo{i}.wav'
            subprocess.run(['say', '-v', voice, '-r', str(wpm), '-o', str(aiff), s.get('say', vo)], check=True)
            run(['ffmpeg', '-y', '-i', str(aiff), '-ar', str(RATE), '-ac', '1', str(wav)])
            s['voDur'] = round(wav_seconds(wav), 3)
        else:
            s['voDur'] = 0
        lead = s.get('lead', 0.25)                       # silence before the line
        s['dur'] = round(max(s.get('min', 2.6), lead + s['voDur'] + s.get('tail', 0.55)), 3)
        s['lead'] = lead
        parts.append(s)

    # 2. one continuous voice track, each line placed at its scene start + lead
    t = 0.0
    inputs, filters = [], []
    for i, s in enumerate(parts):
        if s['voDur']:
            inputs += ['-i', str(build / f'vo{i}.wav')]
            k = len(inputs) // 2 - 1
            ms = int((t + s['lead']) * 1000)
            filters.append(f'[{k}:a]adelay={ms}|{ms},volume=1.6[a{k}]')
        t += s['dur']
    total = t
    n = len(filters)
    mix = ''.join(f'[a{k}]' for k in range(n))
    fc = ';'.join(filters) + f';{mix}amix=inputs={n}:normalize=0,apad,atrim=0:{total:.3f},' \
         'highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=5:release=120,loudnorm=I=-14:TP=-1.5:LRA=7[out]'
    voice_wav = build / 'voice.wav'
    run(['ffmpeg', '-y', *inputs, '-filter_complex', fc, '-map', '[out]', '-ar', str(RATE), str(voice_wav)])

    # 3. page
    html = (ENGINE / 'template.html').read_text()
    for s in parts:
        s['img'] = Path(s['img']).resolve().as_uri() if s.get('img') else None
    page_cfg = {'tag': cfg.get('tag', ''), 'scenes': parts}
    html = html.replace('__FONT__', FONT.as_uri()).replace('__LOGO__', LOGO.as_uri()).replace('__CFG__', json.dumps(page_cfg))
    page = build / 'page.html'
    page.write_text(html)

    # 4. frames
    from playwright.sync_api import sync_playwright
    frames = int(round(total * FPS))
    with sync_playwright() as p:
        b = p.chromium.launch(args=['--allow-file-access-from-files'])
        pg = b.new_page(viewport={'width': 1080, 'height': 1920}, device_scale_factor=1)
        pg.goto(page.as_uri())
        pg.evaluate('window.READY')
        if a.preview:
            shots = [s['start'] + s['dur'] * 0.85 for s in pg.evaluate('CFG.scenes')]
            for k, ts in enumerate(shots):
                pg.evaluate(f'render({ts})')
                pg.screenshot(path=str(out_dir / f'{slug}-preview-{k}.jpg'), type='jpeg', quality=85)
            b.close()
            print(f'previews: {len(shots)} stills, total {total:.1f}s')
            return
        for f in range(frames):
            pg.evaluate(f'render({f / FPS})')
            pg.screenshot(path=str(build / 'frames' / f'{f:05d}.jpg'), type='jpeg', quality=92)
        b.close()

    # 5. encode
    mp4 = out_dir / f'moksfix-{slug}.mp4'
    run(['ffmpeg', '-y', '-framerate', str(FPS), '-i', str(build / 'frames/%05d.jpg'), '-i', str(voice_wav),
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
         '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', str(mp4)])
    shutil.copy(build / 'frames' / f'{int(frames * 0.02):05d}.jpg', out_dir / f'moksfix-{slug}-cover.jpg')
    print(f'{mp4}  {total:.1f}s  {frames} frames')


if __name__ == '__main__':
    try:
        main()
    except subprocess.CalledProcessError as e:
        sys.stderr.write((e.stderr or b'').decode()[-2000:])
        raise
