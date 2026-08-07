/* Shared service → contact select for concept demos.
   Reads ?service= once on load, selects matching <select name="need"> option.
   Does not overwrite after the visitor changes the field manually. */
(function () {
  "use strict";

  var MAPS = {
    clearflow: {
      "emergency-plumbing": "Emergency Plumbing",
      emergency: "Emergency Plumbing",
      "drain-cleaning": "Drain Cleaning",
      drains: "Drain Cleaning",
      "water-heater": "Water Heater Service",
      "water-heaters": "Water Heater Service",
      heater: "Water Heater Service",
      "residential-plumbing": "Residential Plumbing",
      residential: "Residential Plumbing",
      other: "Something else",
      "something-else": "Something else",
    },
    greenedge: {
      "lawn-care": "Lawn Care",
      lawn: "Lawn Care",
      "landscape-design": "Landscape Design",
      design: "Landscape Design",
      "yard-cleanup": "Yard Cleanup",
      cleanup: "Yard Cleanup",
      irrigation: "Irrigation Services",
      "irrigation-services": "Irrigation Services",
      other: "Something else",
      "something-else": "Something else",
    },
    summitshield: {
      "roof-replacement": "Roof Replacement",
      replacement: "Roof Replacement",
      "roof-repair": "Roof Repair",
      repair: "Roof Repair",
      "storm-inspection": "Storm Damage Inspection",
      storm: "Storm Damage Inspection",
      "storm-damage": "Storm Damage Inspection",
      "residential-roofing": "Residential Roofing",
      residential: "Residential Roofing",
      other: "Something else",
      "something-else": "Something else",
    },
  };

  function detectBrand() {
    var path = (window.location.pathname || "").toLowerCase();
    if (path.indexOf("clearflow") !== -1) return "clearflow";
    if (path.indexOf("greenedge") !== -1) return "greenedge";
    if (path.indexOf("summitshield") !== -1) return "summitshield";
    var body = document.body && document.body.getAttribute("data-brand");
    return body || "";
  }

  function apply() {
    var select =
      document.querySelector('select[name="need"]') ||
      document.getElementById("need") ||
      document.getElementById("h-svc") ||
      document.getElementById("svc");
    if (!select) return;

    // Only apply initial URL selection once
    if (select.getAttribute("data-service-applied") === "1") return;

    var brand = detectBrand();
    var map = MAPS[brand] || {};
    var key = "";
    try {
      key = (new URLSearchParams(window.location.search).get("service") || "")
        .toLowerCase()
        .trim();
    } catch (e) {
      key = "";
    }

    var label = map[key] || "";
    var matched = false;

    if (label) {
      // Prefer value match, then text match
      for (var i = 0; i < select.options.length; i++) {
        var opt = select.options[i];
        var val = (opt.value || "").trim();
        var text = (opt.textContent || "").trim();
        if (val === label || text === label) {
          select.selectedIndex = i;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      // Default: Something else / Not sure / first generic
      for (var j = 0; j < select.options.length; j++) {
        var t = (select.options[j].textContent || "").trim().toLowerCase();
        var v = (select.options[j].value || "").trim().toLowerCase();
        if (
          t === "something else" ||
          v === "something else" ||
          t.indexOf("not sure") !== -1 ||
          t === "other"
        ) {
          select.selectedIndex = j;
          matched = true;
          break;
        }
      }
    }

    select.setAttribute("data-service-applied", "1");

    // Remember manual changes so we never fight the user
    select.addEventListener(
      "change",
      function () {
        select.setAttribute("data-user-changed", "1");
      },
      { once: false }
    );

    // Clean query string from address bar (keep path)
    if (window.location.search && window.history && window.history.replaceState) {
      try {
        window.history.replaceState(
          {},
          "",
          window.location.pathname + (window.location.hash || "")
        );
      } catch (err) {
        /* ignore */
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
