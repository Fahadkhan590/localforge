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
  mailtoInquiry: 'mailto:believerbk4@gmail.com?subject=LocalForge%20%E2%80%94%20Project%20Inquiry&body=Hi%20LocalForge%20team%2C%0A%0AI%27d%20like%20to%20discuss%20a%20website%20project%20for%20my%20business.%0A%0ABusiness%20name%3A%0A%0AWebsite%2Fservice%20needed%3A%0A%0AMessage%3A%0A%0AThanks%2C%0A',
  whatsappE164: "923145265503",
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
