# Løbner.dk — Personal Website

> **Live site:** [lobner.dk](https://lobner.dk) · [lobner.github.io](https://lobner.github.io)

Personal portfolio and landing page for **Søren Løbner** — Software Engineer based in Ry, Denmark.

---

## Overview

Static single-page website hosted on **GitHub Pages** with a custom domain (`lobner.dk`).  
No build toolchain or static-site generator — pure hand-crafted HTML, CSS and vanilla JavaScript.

| File / Dir | Purpose |
|---|---|
| `index.html` | Single-page application markup (all sections) |
| `style.css` | Full responsive stylesheet (dark/light mode, mobile-first) |
| `app.js` | Vanilla JS: smooth scroll, sticky nav, theme toggle, animations |
| `assets/` | Static assets (profile image, etc.) |
| `CNAME` | Custom domain: `lobner.dk` |

---

## Sections

- **Hero** — Name, title, location, social links and CTA buttons
- **About** — Background, education (B.Sc. Computer Science, Aarhus University) and core competency cards
- **Experience** — Timeline covering positions at BiQ A/S (2014–present), CGI (2012–2014) and Logica (2010–2012)
- **Skills** — Categorised tags across Programming Languages, Backend & Data, Platforms & Tools, and Domain Expertise
- **Contact** — Email, location and LinkedIn

---

## Tech Stack

| Category | Details |
|---|---|
| **Languages** | Ruby, Java, JavaScript, Python, C#, C/C++, PHP |
| **Frameworks & APIs** | Ruby on Rails, REST APIs, Graph Algorithms, Minitest |
| **Databases & Search** | MSSQL, PostgreSQL, Elasticsearch |
| **DevOps & Tools** | Linux/Unix, macOS, Git, Docker |
| **Methodologies** | Agile, JIRA, Code Review |
| **Domain** | KYC / AML, Compliance, Business Intelligence, Risk Assessment |

---

## Local Development

No build step required — open `index.html` directly in a browser, or serve it with any static HTTP server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Ruby (built-in)
ruby -run -e httpd . -p 8080

# Node (npx)
npx serve .
```

Then navigate to `http://localhost:8080`.

---

## Deployment

Pushes to the `main` branch trigger the **GitHub Actions** workflow (`.github/workflows/static.yml`), which automatically builds and deploys the site to **GitHub Pages** using the `deploy-pages` action.  
The custom domain is configured through the `CNAME` file and DNS records pointing to GitHub's Pages servers.

---

## Contact

| | |
|---|---|
| **Email** | [soren@lobner.dk](mailto:soren@lobner.dk) |
| **LinkedIn** | [linkedin.com/in/lobner](https://linkedin.com/in/lobner) |
| **CV** | [cv.lobner.dk](https://cv.lobner.dk) |
| **Location** | Ry, Denmark |

---

© 2026 Søren Løbner
