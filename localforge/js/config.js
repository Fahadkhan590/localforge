/* LocalForge — public front-end configuration (safe to commit).
   No API keys or secrets belong here.

   demoUrls: used by any element with data-demo="clearflow|greenedge|summitshield".
   Paths are root-relative so they work from nested pages (e.g. /work/clearflow.html)
   when the site is deployed at the domain root (typical Vercel static setup).

   After demos have their own production URLs, replace the values with full https:// links.
*/
window.LocalForgeConfig = {
  demoUrls: {
    clearflow: "/demos/clearflow/index.html",
    greenedge: "/demos/greenedge/index.html",
    summitshield: "/demos/summitshield/index.html",
  },
  contactEmail: "believerbk4@gmail.com",
  whatsappE164: "923145265503",
  phoneE164: "+923145265503",
  phoneDisplay: "0314 526 5503",
  whatsappDisplay: "+92 314 526 5503",
};

document.addEventListener("DOMContentLoaded", function () {
  var cfg = window.LocalForgeConfig || {};
  var urls = cfg.demoUrls || {};
  document.querySelectorAll("[data-demo]").forEach(function (el) {
    var key = el.getAttribute("data-demo");
    if (key && urls[key]) {
      el.setAttribute("href", urls[key]);
      if (el.tagName === "A") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
  });
});
