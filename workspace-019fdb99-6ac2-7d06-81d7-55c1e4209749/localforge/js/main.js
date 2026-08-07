/* LocalForge — multi-page site interactions */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const isDesktop = window.matchMedia("(min-width: 961px)").matches && !isCoarse;

  // ----- Header scroll state -----
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ----- Mobile navigation -----
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      navLinks.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(open);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // ----- Reveal on scroll -----
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  document.querySelectorAll(".reveal-group").forEach((group) => {
    const kids = group.querySelectorAll(":scope > .reveal");
    kids.forEach((kid, i) => {
      if (!kid.className.match(/reveal-delay-/)) {
        kid.style.transitionDelay = Math.min(i * 0.08, 0.4) + "s";
      }
    });
  });

  // ----- Process step highlight -----
  const steps = document.querySelectorAll(".process-step");
  if (steps.length && "IntersectionObserver" in window && !reduceMotion) {
    const stepIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((s) => s.classList.remove("is-active"));
            entry.target.classList.add("is-active");
          }
        });
      },
      { threshold: 0.55, rootMargin: "-20% 0px -35% 0px" }
    );
    steps.forEach((s) => stepIo.observe(s));
  }

  // ----- FAQ accordion -----
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const ob = other.querySelector(".faq-q");
          if (ob) ob.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  // ----- Service query param → contact form -----
  const SERVICE_MAP = {
    "landing-page": "Landing Page",
    "business-website": "5-Page Website",
    "google-business": "Website + Google Business Optimization",
    maintenance: "Hosting & Maintenance",
  };

  const form = document.getElementById("contact-form");
  const needSelect = form ? form.querySelector('select[name="need"]') : null;

  function applyServiceParam() {
    if (!needSelect) return;
    const params = new URLSearchParams(window.location.search);
    const key = (params.get("service") || "").toLowerCase().trim();
    const label = SERVICE_MAP[key];

    if (label) {
      const opt = Array.from(needSelect.options).find((o) => o.value === label);
      if (opt) needSelect.value = label;
    } else {
      const fallback = Array.from(needSelect.options).find(
        (o) => o.value === "Not Sure Yet"
      );
      if (fallback) needSelect.value = "Not Sure Yet";
    }

    // Clean ugly query string from the address bar without reload
    if (window.location.search && window.history && window.history.replaceState) {
      const clean =
        window.location.pathname.split("/").pop() || "contact.html";
      window.history.replaceState({}, "", clean + (window.location.hash || ""));
    }
  }

  applyServiceParam();

  // ----- Contact form -----
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.getElementById("form-status");
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      const business = form.querySelector('[name="business"]');
      const need = form.querySelector('[name="need"]');
      const businessType = form.querySelector('[name="business_type"]');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        if (status) {
          status.className = "form-status error";
          status.textContent = "Please fill in your name, email, and message.";
        }
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        if (status) {
          status.className = "form-status error";
          status.textContent = "Please enter a valid email address.";
        }
        return;
      }

      const subject = encodeURIComponent(
        "Project inquiry from " +
          (business && business.value.trim()
            ? business.value.trim()
            : name.value.trim())
      );
      const body = encodeURIComponent(
        [
          "Name: " + name.value.trim(),
          "Business: " +
            (business && business.value.trim() ? business.value.trim() : "—"),
          "Email: " + email.value.trim(),
          "Business type: " +
            (businessType && businessType.value.trim()
              ? businessType.value.trim()
              : "—"),
          "Service interested in: " + (need && need.value ? need.value : "—"),
          "",
          message.value.trim(),
        ].join("\n")
      );

      window.location.href =
        "mailto:believerbk4@gmail.com?subject=" + subject + "&body=" + body;

      if (status) {
        status.className = "form-status success";
        status.textContent =
          "Thanks — your email app should open with the message ready to send. If it doesn’t, email us at believerbk4@gmail.com.";
      }

      form.reset();
    });
  }

  // ----- Hero atmosphere -----
  const hero = document.querySelector(".hero");
  const atmosphere = document.querySelector(".hero-atmosphere");
  const mesh = document.querySelector(".ha-mesh");
  const heroVisual = document.querySelector(".hero-visual");
  const particleCanvas = document.querySelector(".ha-particles");

  let pointerX = 0;
  let pointerY = 0;
  let smoothX = 0;
  let smoothY = 0;

  function lerp(a, b, n) {
    return a + (b - a) * n;
  }

  function tickMotion() {
    smoothX = lerp(smoothX, pointerX, 0.06);
    smoothY = lerp(smoothY, pointerY, 0.06);

    if (mesh) {
      mesh.style.transform =
        "translate3d(" + smoothX * 18 + "px," + smoothY * 14 + "px,0)";
    }

    if (heroVisual && isDesktop) {
      const mocks = heroVisual.querySelectorAll(".browser-mock");
      mocks.forEach((mock, i) => {
        const depth = (i + 1) * 7;
        mock.style.translate = smoothX * depth + "px " + smoothY * depth + "px";
      });
    }

    requestAnimationFrame(tickMotion);
  }

  if (!reduceMotion && hero && atmosphere) {
    if (isDesktop) {
      hero.addEventListener(
        "pointermove",
        (e) => {
          const rect = hero.getBoundingClientRect();
          pointerX = (e.clientX - rect.left) / rect.width - 0.5;
          pointerY = (e.clientY - rect.top) / rect.height - 0.5;
        },
        { passive: true }
      );
      hero.addEventListener(
        "pointerleave",
        () => {
          pointerX = 0;
          pointerY = 0;
        },
        { passive: true }
      );
      requestAnimationFrame(tickMotion);
    }

    if (particleCanvas && isDesktop && particleCanvas.getContext) {
      const ctx = particleCanvas.getContext("2d");
      let w = 0;
      let h = 0;
      let particles = [];
      let running = true;

      const resize = () => {
        const rect = atmosphere.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        w = Math.max(1, Math.floor(rect.width));
        h = Math.max(1, Math.floor(rect.height));
        particleCanvas.width = Math.floor(w * dpr);
        particleCanvas.height = Math.floor(h * dpr);
        particleCanvas.style.width = w + "px";
        particleCanvas.style.height = h + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.min(42, Math.max(18, Math.floor(w / 36)));
        particles = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.4,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -Math.random() * 0.18 - 0.04,
          a: Math.random() * 0.35 + 0.12,
        }));
      };

      const draw = () => {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx + smoothX * 0.15;
          p.y += p.vy + smoothY * 0.08;
          if (p.y < -8) {
            p.y = h + 6;
            p.x = Math.random() * w;
          }
          if (p.x < -8) p.x = w + 6;
          if (p.x > w + 8) p.x = -6;
          ctx.beginPath();
          ctx.fillStyle = "rgba(196, 92, 38," + p.a + ")";
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        requestAnimationFrame(draw);
      };

      resize();
      draw();
      window.addEventListener("resize", resize, { passive: true });
      document.addEventListener("visibilitychange", () => {
        running = !document.hidden;
        if (running) draw();
      });
    }
  }

  if (!reduceMotion && isDesktop) {
    document.querySelectorAll(".btn-primary, .btn-accent").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.06 + "px," + y * 0.08 + "px)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  // Smooth in-page anchors only
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        (header ? header.offsetHeight + 8 : 80);
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
