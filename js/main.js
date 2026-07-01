/* =========================================================
   MoksFix — interactions
   Performance-first: IntersectionObserver, rAF-throttled
   pointer effects, full reduced-motion + touch fallbacks.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Hero background video ---------- */
  var heroVideo = document.querySelector(".hero__video");
  if (heroVideo) {
    if (reduceMotion) {
      // Respect reduced-motion: don't autoplay or download the clip.
      heroVideo.pause();
      heroVideo.removeAttribute("autoplay");
      heroVideo.preload = "none";
      heroVideo.innerHTML = "";
      heroVideo.load();
    } else {
      // Some browsers defer autoplay until interaction — nudge it on load.
      var tryPlay = function () {
        var p = heroVideo.play();
        if (p && p.catch) p.catch(function () {});
      };
      tryPlay();
      window.addEventListener("load", tryPlay);
      // Pause when the tab is hidden to save battery/CPU.
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) heroVideo.pause();
        else tryPlay();
      });
    }
  }

  /* ---------- Nav: stuck state ---------- */
  var nav = document.getElementById("nav");
  var onScrollNav = function () {
    if (window.scrollY > 24) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- Scroll progress bar ---------- */
  var bar = document.getElementById("scrollBar");
  var rafProg = false;
  var updateProgress = function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop || window.scrollY) / max * 100 : 0;
    if (bar) bar.style.width = pct + "%";
    rafProg = false;
  };
  window.addEventListener("scroll", function () {
    if (!rafProg) { rafProg = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  var toggleMenu = function (open) {
    var isOpen = open !== undefined ? open : !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  if (burger) burger.addEventListener("click", function () { toggleMenu(); });
  menu && menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { toggleMenu(false); });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  revealEls.forEach(function (el) {
    var d = el.getAttribute("data-delay");
    if (d) el.style.setProperty("--d", d + "ms");
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
    document.querySelectorAll(".hero__title .line").forEach(function (l) { l.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    // Hero headline lines animate immediately on load
    window.addEventListener("load", function () {
      document.querySelectorAll(".hero__title .line").forEach(function (line, i) {
        var d = line.getAttribute("data-delay") || (i * 80);
        line.style.setProperty("--d", d + "ms");
        setTimeout(function () { line.classList.add("is-in"); }, 80);
      });
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1600, start = null, done = false;
    var finish = function () { if (!done) { done = true; el.textContent = target + suffix; } };
    // Guarantee the final value even if rAF is throttled/paused (e.g. backgrounded tab)
    var guard = setTimeout(finish, dur + 400);
    var step = function (ts) {
      if (done) return;
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else { clearTimeout(guard); finish(); }
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Active nav link via section observer ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a[href^='#']"));
  var linkMap = {};
  navLinks.forEach(function (a) { linkMap[a.getAttribute("href").slice(1)] = a; });
  var sections = Object.keys(linkMap).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var active = linkMap[e.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { sio.observe(s); });
  }

  /* ---------- Pointer-driven effects (desktop only) ---------- */
  if (!isTouch && !reduceMotion) {
    /* Custom cursor */
    var dot = document.getElementById("cursorDot");
    var ring = document.getElementById("cursorRing");
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
    });
    var ringLoop = function () {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }
      requestAnimationFrame(ringLoop);
    };
    requestAnimationFrame(ringLoop);
    document.querySelectorAll("a, button, [data-tilt], .work-card, input, textarea, select").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring && ring.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { ring && ring.classList.remove("is-hover"); });
    });

    /* Magnetic buttons */
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.3;
        var y = (e.clientY - r.top - r.height / 2) * 0.4;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });

    /* 3D tilt on cards */
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      var raf = null;
      el.addEventListener("mousemove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = "perspective(900px) rotateX(" + (-py * 6) + "deg) rotateY(" + (px * 8) + "deg) translateY(-6px)";
          raf = null;
        });
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });

    /* Hero parallax — symbol & float cards follow pointer subtly */
    var heroVisual = document.querySelector(".hero__visual");
    if (heroVisual) {
      var symbol = document.getElementById("heroSymbol");
      var floats = heroVisual.querySelectorAll("[data-float]");
      var hraf = false;
      heroVisual.addEventListener("mousemove", function (e) {
        if (hraf) return;
        hraf = true;
        requestAnimationFrame(function () {
          var r = heroVisual.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          if (symbol) symbol.style.transform = "translate(" + px * 22 + "px," + (py * 22 - 6) + "px)";
          floats.forEach(function (f, i) {
            var depth = (i + 1) * 10;
            f.style.transform = "translate(" + px * depth + "px," + py * depth + "px)";
          });
          hraf = false;
        });
      });
      heroVisual.addEventListener("mouseleave", function () {
        if (symbol) symbol.style.transform = "";
        floats.forEach(function (f) { f.style.transform = ""; });
      });
    }
  }

  /* ---------- Contact form (demo handler) ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || !form.message.value.trim() || !form.budget.value) {
        if (note) { note.style.color = "#ff7a7a"; note.textContent = "Please fill in every field with a valid email."; }
        return;
      }
      if (note) { note.style.color = "#2ee87f"; note.textContent = "Thanks, " + name.split(" ")[0] + "! We'll reply within one business day."; }
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          form_name: "contact",
          budget: form.budget.value,
          page_location: location.href
        });
      }
      form.reset();
      var btnSpan = form.querySelector(".btn span");
      if (btnSpan) { var t = btnSpan.textContent; btnSpan.textContent = "Sent ✓"; setTimeout(function () { btnSpan.textContent = t; }, 2600); }
    });
  }

  /* =========================================================
     Project preview modal — loads a live-feeling mock of each
     project's website or app inside a device frame, with an
     auto-scrolling page tour, keyboard nav and focus trap.
     ========================================================= */
  var PROJECTS = [
    {
      id: "ncube", type: "web", accent: "#ec8a52",
      tag: "Website · Technology",
      name: "Ncube Beacons",
      client: "Ncube Beacons · Technology Services",
      desc: "A corporate website for a multi-disciplinary technology firm delivering AI, cybersecurity, cloud, IoT, data analytics and web development.",
      metrics: [
        { v: "6", l: "Service verticals" },
        { v: "100%", l: "Mobile-ready" },
        { v: "<1s", l: "Load time" }
      ],
      challenge: "Ncube Beacons spans six distinct technology practices — AI, cybersecurity, cloud, IoT, data analytics and web — and needed one site that made that breadth instantly clear without overwhelming the enterprise buyers it courts.",
      solution: "A clean, modern corporate site that organises every capability into a clear, scannable journey — bold service tiles, sharp typography and fast, fully responsive layouts built to convert enquiries.",
      stack: ["HTML5", "CSS3", "JavaScript", "Responsive", "SEO"],
      domain: "ncubebeacons.com",
      live: "https://ncubebeacons.com/",
      heroTitle: "AI, cloud & <em>cybersecurity.</em>",
      bandText: "AI · Cloud · IoT · Security"
    },
    {
      id: "laundrospin", type: "web", accent: "#2e8bf2",
      tag: "Website · Laundry & Dry Cleaning",
      name: "LaundroSpin",
      client: "LaundroSpin · Premium Laundry & Dry Cleaning",
      desc: "A premium laundry & dry-cleaning brand with doorstep pickup & delivery, a B2B commercial arm and a franchise programme — all on one conversion-focused site.",
      metrics: [
        { v: "7", l: "Premium services" },
        { v: "20%", l: "1st-order offer" },
        { v: "3", l: "Quality certifications" }
      ],
      challenge: "LaundroSpin runs three businesses under one roof — doorstep consumer laundry, B2B commercial linen for hotels and hospitals, and a franchise programme — and needed one site that sells all three without diluting its premium positioning.",
      solution: "A bold, conversion-first website with instant WhatsApp ordering and free-pickup scheduling, clear service and pricing tiers, dedicated commercial and franchise journeys, and trust signals — Hohenstein, Woolmark and German eco certifications — woven throughout.",
      stack: ["HTML5", "CSS3", "JavaScript", "WhatsApp API", "Responsive", "SEO"],
      domain: "laundrospin.com",
      live: "https://laundrospin.com/",
      heroTitle: "Premium laundry, <em>delivered.</em>",
      bandText: "Pickup · Wash · Fold · Deliver"
    },
    {
      id: "ackcorp", type: "web", accent: "#f2b134",
      tag: "Website · Architecture & Construction",
      name: "ACK Corp",
      client: "ACK Corp · Bengaluru, Karnataka",
      desc: "An immersive corporate site for a premium Bengaluru architecture & construction developer — signature project showcases, interactive floor plans and one-tap site-visit booking.",
      metrics: [
        { v: "3D", l: "Interactive floor plans" },
        { v: "100%", l: "Mobile-ready" },
        { v: "<1s", l: "Load time" }
      ],
      challenge: "ACK Corp is a high-end Bengaluru developer with a deep catalogue — signature projects, floor plans, amenity galleries and careers — that needed a site as considered and premium as the buildings it creates.",
      solution: "An immersive React build: cinematic project showcases like Casa Verde, expandable interactive floor plans, amenity and gallery walkthroughs, a careers hub and one-tap ‘Book a Site Visit’ — fast, fully responsive and unmistakably premium.",
      stack: ["React", "Vite", "React Router", "JavaScript", "Responsive", "SEO"],
      domain: "ackcorp.ncubebeacons.com",
      live: "https://ackcorp.ncubebeacons.com/",
      heroTitle: "Building Bengaluru’s <em>future.</em>",
      bandText: "Design · Build · Deliver"
    },
    {
      id: "witzone", type: "web", accent: "#7c6cff",
      tag: "Web App · HRMS",
      name: "WitZone Workspace",
      client: "WitZone · Workforce & HR Platform",
      desc: "A full HRMS workspace — live attendance with idle-detection, multi-step leave approvals, the complete employee lifecycle and exportable workforce analytics, all in one secure dashboard.",
      metrics: [
        { v: "Live", l: "Attendance tracking" },
        { v: "1-tap", l: "Leave approvals" },
        { v: "100%", l: "Cloud-based" }
      ],
      challenge: "Growing teams were tracking attendance, leave and the whole employee lifecycle across spreadsheets and email threads — slow to approve, impossible to audit and easy to game.",
      solution: "WitZone replaces all of it with one secure workspace: a heartbeat agent that measures real attendance and idle time, multi-step leave approvals routed to HR, full employee onboarding-to-exit, departments, announcements and exportable workforce analytics.",
      stack: ["React", "Vite", "Tailwind CSS", "REST API", "JWT Auth", "Charts"],
      domain: "witzone.moksfix.com",
      live: "https://witzone.moksfix.com/login",
      heroTitle: "Your whole team, <em>one workspace.</em>",
      bandText: "Attendance · Leave · Analytics"
    }
  ];

  var modal = document.getElementById("projectModal");
  if (modal) {
    var pmShell = modal.querySelector(".pm__shell");
    var pmStage = document.getElementById("pmStage");
    var elTag = document.getElementById("pmTag");
    var elTitle = document.getElementById("pmTitle");
    var elClient = document.getElementById("pmClient");
    var elDesc = document.getElementById("pmDesc");
    var elMetrics = document.getElementById("pmMetrics");
    var elChallenge = document.getElementById("pmChallenge");
    var elSolution = document.getElementById("pmSolution");
    var elStack = document.getElementById("pmStack");
    var elVisit = document.getElementById("pmVisit");
    var elCase = document.getElementById("pmCase");
    var elCounter = document.getElementById("pmCounter");

    var CASE_STUDY = {
      ncube: "projects/ncube-beacons.html",
      laundrospin: "projects/laundrospin.html",
      ackcorp: "projects/ack-corp.html",
      witzone: "projects/witzone-hrms.html"
    };

    var current = 0;
    var lastFocus = null;

    var lock = '<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="5" y="11" width="14" height="8.5" rx="2" fill="currentColor"/></svg>';

    var siteMarkup = function (p) {
      var stats = p.metrics.map(function (m) {
        return '<div><b>' + m.v + '</b><span></span></div>';
      }).join("");
      var card = '<div class="fs__card"><u></u><i></i><i></i></div>';
      var grid = card + card + card + card;
      return '' +
        '<div class="fs">' +
          '<div class="fs__nav">' +
            '<div class="fs__logo"><i></i>' + p.name.split(" ")[0] + '</div>' +
            '<div class="fs__menu"><i></i><i></i><i></i></div>' +
          '</div>' +
          '<div class="fs__hero">' +
            '<div class="fs__pill">' + p.tag + '</div>' +
            '<div class="fs__h">' + p.heroTitle + '</div>' +
            '<div class="fs__sub"><i></i><i></i><i></i></div>' +
            '<div class="fs__cta"><div class="fs__btn fs__btn--p">Get started</div><div class="fs__btn fs__btn--g">Learn more</div></div>' +
          '</div>' +
          '<div class="fs__stats">' + stats + '</div>' +
          '<div class="fs__grid">' + grid + '</div>' +
          '<div class="fs__band"><b>' + p.bandText + '</b></div>' +
          '<div class="fs__grid">' + grid + '</div>' +
          '<div class="fs__foot"><i></i><i></i></div>' +
        '</div>';
    };

    var appMarkup = function (p) {
      var row = '<div class="fa__row"><u></u><div><i></i><i></i></div></div>';
      var rows = "";
      for (var i = 0; i < 7; i++) rows += row;
      return '' +
        '<div class="fa">' +
          '<div class="fa__top"><b>' + p.name.split(" ")[0] + '</b><u></u></div>' +
          '<div class="fa__hero"><span class="fa__ring"></span><b>' + (p.appHero || p.name) + '</b><i></i><div class="fa__btn">Begin session</div></div>' +
          rows +
          '<div class="fa__nav"><u></u><u></u><u></u><u></u></div>' +
        '</div>';
    };

    var liveMarkup = function (p) {
      return '' +
        '<div class="device__live">' +
          '<div class="device__live-load" aria-hidden="true"><span></span></div>' +
          '<iframe class="device__frame" src="' + p.live + '" title="' + p.name + ' — live website" ' +
            'loading="eager" referrerpolicy="no-referrer-when-downgrade" allow="fullscreen"></iframe>' +
        '</div>';
    };

    var deviceMarkup = function (p) {
      if (p.type === "app") {
        return '' +
          '<div class="device device--phone">' +
            '<div class="device__viewport"><div class="device__scroll"><div class="device__scroll-inner">' +
              appMarkup(p) +
            '</div></div></div>' +
          '</div>';
      }
      var body = p.live
        ? liveMarkup(p)
        : '<div class="device__scroll"><div class="device__scroll-inner">' + siteMarkup(p) + '</div></div>';
      return '' +
        '<div class="device device--browser' + (p.live ? ' device--live' : '') + '">' +
          '<div class="device__bar">' +
            '<div class="device__dots"><i></i><i></i><i></i></div>' +
            '<div class="device__url">' + lock + p.domain + '</div>' +
          '</div>' +
          '<div class="device__viewport">' + body + '</div>' +
        '</div>';
    };

    // Scale a live <iframe> so a full desktop layout fits the small frame.
    var setupLive = function () {
      var live = pmStage.querySelector(".device__live");
      if (!live) return;
      var vp = pmStage.querySelector(".device__viewport");
      var frame = live.querySelector(".device__frame");
      if (!vp || !frame) return;
      var scaleFrame = function () {
        var logical = 1280;
        var scale = vp.clientWidth / logical;
        if (!scale || scale <= 0) return;
        frame.style.width = logical + "px";
        frame.style.height = Math.ceil(vp.clientHeight / scale) + "px";
        frame.style.transform = "scale(" + scale + ")";
      };
      scaleFrame();
      if (!frame.dataset.scaleBound) {
        frame.dataset.scaleBound = "1";
        // re-scale once the document has loaded and layout has fully settled
        frame.addEventListener("load", function () {
          live.classList.add("is-loaded");
          scaleFrame();
        }, { once: true });
      }
    };

    var setScroll = function () {
      var vp = pmStage.querySelector(".device__viewport");
      var inner = pmStage.querySelector(".device__scroll-inner");
      if (!vp || !inner) return;
      var dist = Math.max(0, inner.scrollHeight - vp.clientHeight);
      inner.style.setProperty("--scrollTo", "-" + dist + "px");
      inner.style.setProperty("--scrollDur", Math.max(9, Math.round(dist / 26)) + "s");
    };

    var render = function (i) {
      var p = PROJECTS[i];
      modal.style.setProperty("--accent", p.accent);
      elTag.textContent = p.tag;
      elTitle.textContent = p.name;
      elClient.textContent = p.client;
      elDesc.textContent = p.desc;
      elMetrics.innerHTML = p.metrics.map(function (m) {
        return '<div class="pm__metric"><b>' + m.v + '</b><span>' + m.l + '</span></div>';
      }).join("");
      elChallenge.textContent = p.challenge;
      elSolution.textContent = p.solution;
      elStack.innerHTML = p.stack.map(function (s) { return "<span>" + s + "</span>"; }).join("");
      elVisit.href = "https://" + p.domain;
      if (elCase) {
        var cs = CASE_STUDY[p.id];
        if (cs) { elCase.href = cs; elCase.style.display = ""; }
        else { elCase.style.display = "none"; }
      }
      var two = function (n) { return (n < 10 ? "0" : "") + n; };
      elCounter.textContent = two(i + 1) + " / " + two(PROJECTS.length);
      pmStage.innerHTML = deviceMarkup(p);
      // Compute synchronously (layout is available even while hidden), then
      // refine on the next frame in case fonts/responsive widths settle late.
      setScroll();
      setupLive();
      requestAnimationFrame(function () { setScroll(); setupLive(); });
    };

    var open = function (i) {
      current = i;
      lastFocus = document.activeElement;
      render(i);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var closeBtn = modal.querySelector(".pm__close");
      if (closeBtn) closeBtn.focus();
    };

    var close = function () {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    var go = function (dir) {
      current = (current + dir + PROJECTS.length) % PROJECTS.length;
      render(current);
    };

    // Keep a live embed correctly scaled when the viewport changes.
    var resizeTimer;
    window.addEventListener("resize", function () {
      if (!modal.classList.contains("is-open")) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupLive, 150);
    });

    // Wire work cards
    document.querySelectorAll(".work-card[data-project]").forEach(function (card) {
      card.addEventListener("click", function () {
        var id = card.getAttribute("data-project");
        for (var i = 0; i < PROJECTS.length; i++) {
          if (PROJECTS[i].id === id) { open(i); break; }
        }
      });
    });

    // Close + nav controls
    modal.querySelectorAll("[data-pm-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    var prevBtn = modal.querySelector("[data-pm-prev]");
    var nextBtn = modal.querySelector("[data-pm-next]");
    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });

    // Keyboard: ESC to close, arrows to navigate, Tab focus trap
    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowLeft") { go(-1); return; }
      if (e.key === "ArrowRight") { go(1); return; }
      if (e.key === "Tab") {
        var focusables = pmShell.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
})();
