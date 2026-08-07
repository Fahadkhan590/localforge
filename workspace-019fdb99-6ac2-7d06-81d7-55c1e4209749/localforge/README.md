# LocalForge Ecosystem

Professional multi-page agency site + three industry concept demos.

## A) LocalForge agency

| Page | Purpose |
|------|---------|
| `index.html` | Concise homepage |
| `work.html` | Portfolio / concept projects |
| `services.html` | Full services + CTAs |
| `pricing.html` | Transparent pricing + CTAs |
| `about.html` | About the studio |
| `faq.html` | Full FAQ |
| `contact.html` | Email / WhatsApp / Call + form |
| `privacy-policy.html` | Privacy |
| `terms.html` | Terms |

**Main nav:** Home · Work · Services · Pricing · Contact · **Start a Project**

### Service → Contact auto-select

| CTA | URL |
|-----|-----|
| Landing Pages | `contact.html?service=landing-page` |
| 5-Page Business Website | `contact.html?service=business-website` |
| Website + Google Business | `contact.html?service=google-business` |
| Hosting & Maintenance | `contact.html?service=maintenance` |

`js/main.js` maps the param, selects the form option, then cleans the query string via `history.replaceState`.

### Demo URLs (single config)

Edit **`js/config.js`**:

```js
demoUrls: {
  clearflow: "/demos/clearflow/index.html",
  greenedge: "/demos/greenedge/index.html",
  summitshield: "/demos/summitshield/index.html",
}
```

When demos are live on Vercel, replace those values with full `https://…` URLs. Any link with `data-demo="clearflow|greenedge|summitshield"` picks up the config automatically.

### Contact

- Email: `mailto:believerbk4@gmail.com`
- WhatsApp: `https://wa.me/923145265503` (+92 314 526 5503)
- Call: `tel:+923145265503` (0314 526 5503)

## B) Concept demos

Each demo is a multi-page mini-site with its own identity:

```
demos/clearflow/     index, services, about, faq, contact + favicon + images
demos/greenedge/     index, services, about, faq, contact + favicon + images
demos/summitshield/  index, services, about, faq, contact + favicon + images
```

All demos:

- Concept / Demo Project disclaimer
- `noindex, nofollow`
- Inter typography
- Hamburger mobile nav
- Optimized hero WebP images
- No fake phones, licenses, reviews, or awards

## Local preview

```bash
cd localforge
python3 -m http.server 8080
```

Open `http://localhost:8080/`

## Quality standards applied

- Responsive breakpoints through 320px–1920px+
- Touch-friendly controls (min ~44px)
- Visible `:focus-visible` states
- `prefers-reduced-motion` respected
- Lazy-load below-fold images; preload critical heroes
- No decorative/serif gimmick fonts
