/* MoksFix — GA4 lead/conversion events.
   Tracks click-to-call (tel:) and click-to-email (mailto:) on every page.
   Form submissions fire "generate_lead" from main.js (homepage). */
(function () {
  "use strict";
  function track(eventName, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf("tel:") === 0) {
      track("click_to_call", {
        phone_number: href.replace("tel:", ""),
        link_text: (a.textContent || "").trim(),
        page_location: location.href
      });
    } else if (href.indexOf("mailto:") === 0) {
      track("click_to_email", {
        email_address: href.replace("mailto:", ""),
        link_text: (a.textContent || "").trim(),
        page_location: location.href
      });
    }
  }, true);
})();
