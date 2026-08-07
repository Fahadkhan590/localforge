/* LocalForge site configuration
   Update DEMO_URLS when deploying demos to Vercel (or any host).
   Leave as relative paths for local preview. */
window.LocalForgeConfig = {
  /* Root-relative paths work from any page depth.
     When demos are live on Vercel, replace these with full https:// URLs. */
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

/* Apply demo URLs to any [data-demo] links after DOM is ready */
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
