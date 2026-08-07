# LocalForge

Professional website design for US local service businesses.

This repository contains the LocalForge agency website — a static, multi-page marketing site built to present services, transparent pricing, concept portfolio work, and a clear path to start a project.

**Live stack:** HTML, CSS, and vanilla JavaScript. No build step required.

---

## About

LocalForge is an independent remote web design studio focused on local service brands such as plumbers, roofers, landscapers, HVAC companies, electricians, contractors, and similar trades.

The site is structured for conversion and clarity:

- What LocalForge builds
- Who it is for
- How much it costs
- How to get in touch

LocalForge works with businesses across the United States remotely.

---

## Services

| Service | Price range |
|---------|-------------|
| **Landing Pages** | $300–$500 |
| **5-Page Business Websites** | $700–$1,200 |
| **Website + Google Business Optimization** | $1,000–$1,500 |
| **Hosting & Maintenance** | $30–$100/month |

Final pricing depends on scope and is confirmed before work begins. The site does not promise search rankings or guaranteed leads.

---

## Project structure

```
localforge/
├── index.html              # Agency homepage (concise, high-converting)
├── work.html               # Portfolio / selected concept work
├── services.html           # Full service descriptions + CTAs
├── pricing.html            # Transparent pricing + CTAs
├── about.html              # About LocalForge
├── faq.html                # Frequently asked questions
├── contact.html            # Contact methods + inquiry form
├── privacy-policy.html     # Privacy policy
├── terms.html              # Terms of use
├── css/
│   └── main.css            # Shared design system
├── js/
│   ├── config.js           # Public config (demo URLs, contact display helpers)
│   └── main.js             # Navigation, reveals, form, service deep-links
├── assets/
│   ├── favicons/           # LocalForge favicon
│   └── images/             # Optimized homepage hero/CTA images (WebP + JPEG)
├── work/
│   ├── clearflow.html      # Portfolio case page → embeds/links ClearFlow demo
│   ├── greenedge.html      # Portfolio case page → GreenEdge demo
│   └── summitshield.html   # Portfolio case page → SummitShield demo
├── demos/
│   ├── clearflow/          # Full multi-page plumbing concept demo
│   ├── greenedge/          # Full multi-page landscaping concept demo
│   └── summitshield/       # Full multi-page roofing concept demo
├── sitemap.xml
├── robots.txt
└── README.md
```

### Page roles

| File | Role |
|------|------|
| `index.html` | Main agency homepage — hero, value prop, previews, final CTA |
| `work.html` | Dedicated portfolio listing all concept projects |
| `services.html` | Full service details with CTAs into contact |
| `pricing.html` | Full pricing cards with CTAs into contact |
| `about.html` | Studio positioning and process |
| `faq.html` | Extended FAQ |
| `contact.html` | Email, WhatsApp, Call + project inquiry form |
| `privacy-policy.html` / `terms.html` | Legal pages |
| `work/*.html` | Individual portfolio **case** pages (description + live demo embed) |
| `demos/*/` | Standalone **live demo** mini-sites (industry concepts) |

`work/` and `demos/` are **not duplicates**:

- **`work/*.html`** — LocalForge portfolio case studies (agency chrome, project notes, iframe/demo link)
- **`demos/*/`** — Full fictional business websites used as design samples

---

## Demo projects (concept / fictional)

These are **concept demos** created to show design quality. They are **not** live client websites and must not be presented as real LocalForge clients.

| Demo | Industry | Example market |
|------|----------|----------------|
| **ClearFlow Plumbing** | Residential plumbing | Austin, TX |
| **GreenEdge Landscaping** | Landscaping / lawn care | Phoenix, AZ |
| **SummitShield Roofing** | Residential roofing | Charlotte, NC |

Each demo is multi-page (`index`, `services`, `about`, `faq`, `contact`), includes its own favicon, uses `noindex,nofollow`, and shows a “Concept / Demo Project by LocalForge” banner.

---

## Technology

Inspected and actually used in this repo:

- **HTML5** (static multi-page site)
- **CSS3** (`css/main.css` + demo-scoped styles)
- **Vanilla JavaScript** (`js/main.js`, `js/config.js`)
- **Google Fonts** — Inter
- **Optimized raster assets** — WebP with JPEG fallbacks
- **SVG favicons**

Not used: React, Next.js, Vue, npm build pipeline, backend server, database, or third-party form APIs.

---

## Service → Contact deep links

Service and pricing CTAs open the contact form with the matching option pre-selected:

| CTA | URL |
|-----|-----|
| Landing Page | `contact.html?service=landing-page` |
| 5-Page Business Website | `contact.html?service=business-website` |
| Website + Google Business Optimization | `contact.html?service=google-business` |
| Hosting & Maintenance | `contact.html?service=maintenance` |

`js/main.js` maps the `service` query parameter to the **Service Interested In** select.  
If the parameter is missing or invalid, the form defaults to **Not Sure Yet**.  
The query string is then cleaned from the address bar with `history.replaceState` (selection remains).

---

## Configuration (`js/config.js`)

Public front-end config only (safe to commit):

```js
demoUrls: {
  clearflow: "/demos/clearflow/index.html",
  greenedge: "/demos/greenedge/index.html",
  summitshield: "/demos/summitshield/index.html",
}
```

Any link with `data-demo="clearflow|greenedge|summitshield"` is updated from this file on page load.

When demos are hosted on separate Vercel URLs, replace those values with full `https://…` URLs.  
Do **not** put API keys, tokens, or secrets in this file.

---

## Contact

| Channel | Value |
|---------|--------|
| **Email** | [believerbk4@gmail.com](mailto:believerbk4@gmail.com) |
| **WhatsApp** | [+92 314 526 5503](https://wa.me/923145265503) |
| **Phone** | [0314 526 5503](tel:+923145265503) |

---

## Local preview

```bash
# from the project root (this folder)
python3 -m http.server 8080
```

Open [http://localhost:8080/](http://localhost:8080/)

Because paths are root-relative for demos in `config.js`, serve from the project root (not a parent directory).

---

## Deploy (GitHub → Vercel)

This is a **static** site. Suitable for Vercel static hosting:

1. Push this folder to a GitHub repository.
2. Import the repo in Vercel.
3. **Framework preset:** Other  
4. **Build command:** none  
5. **Output directory:** `.` (project root)
6. Deploy.

**Production site:** [https://localforgeweb.vercel.app](https://localforgeweb.vercel.app)

Canonical URLs, Open Graph tags, structured data, `sitemap.xml`, and `robots.txt` use this domain.

1. Optionally set separate live demo URLs in `js/config.js` when demos have their own hosts.
2. Submit `https://localforgeweb.vercel.app/sitemap.xml` in Google Search Console.

---

## SEO notes

- `sitemap.xml` lists public agency HTML pages only (not demos, CSS, JS, or images).
- Concept demos use `noindex, nofollow`.
- Production domain in metadata: `https://localforgeweb.vercel.app`
- No LocalBusiness schema with a physical address (remote studio; no public office address on the site).

---

## License / usage

Portfolio concept businesses (ClearFlow, GreenEdge, SummitShield) are fictional samples for demonstrating design work.
