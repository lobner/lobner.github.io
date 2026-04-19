# AGENTS.md — Løbner.dk

General guidance for AI agents working in this repository.

---

## Repository Overview

**Løbner.dk** is a static, single-page personal portfolio and landing page for **Søren Løbner** — Software Engineer, Ry, Denmark.  
Hosted on **GitHub Pages** with a custom domain (`lobner.dk`).

| File / Dir | Purpose |
|---|---|
| `index.html` | All page markup — one file, multiple sections |
| `style.css` | Responsive stylesheet with dark/light mode support |
| `app.js` | Vanilla JS: smooth scroll, sticky nav, theme toggle, scroll animations |
| `assets/` | Static assets (profile image, favicons) |
| `CNAME` | Custom domain: `lobner.dk` |
| `skills/` | Agent skill definitions (see [Skills](#skills)) |

---

## Architecture

- **No build step** — pure HTML, CSS and vanilla JavaScript. Changes take effect immediately on deploy.
- **No framework or bundler** — do not introduce npm, webpack, or any build toolchain.
- **Single HTML file** — all sections (`#hero`, `#about`, `#experience`, `#skills`, `#contact`) live in `index.html`.
- **CSS custom properties** drive theming (dark/light mode via `data-theme` attribute on `<html>`).
- **Deployment** — pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/static.yml`), which deploys to GitHub Pages automatically.

---

## Page Sections

| Section ID | Description |
|---|---|
| `#hero` | Name, title, location, social links and CTA buttons |
| `#about` | Bio, education and three competency cards |
| `#experience` | Timeline of professional positions |
| `#skills` | Categorised skill tag groups |
| `#contact` | Email, location and LinkedIn cards |

---

## Coding Conventions

- **Indentation**: 2 spaces throughout HTML, CSS and JS.
- **HTML**: Semantic elements; all images must have `alt` text.
- **CSS**: Mobile-first. Variables declared in `:root`. Dark-mode overrides inside `[data-theme="dark"]`.
- **JS**: Vanilla ES6+, no external libraries. Keep `app.js` focused on UI behaviour only.
- **Links**: External links must use `target="_blank" rel="noopener"`.
- **Language**: Site copy is in English; the `<html lang="da">` attribute reflects the owner's locale.

---

## What to Avoid

- Do not add a build system, package.json, or any external dependencies.
- Do not split `index.html` into multiple pages.
- Do not change the font families (Inter + JetBrains Mono via Google Fonts).
- Do not remove or rename existing section IDs — they are used by in-page anchor links and smooth-scroll JS.
- Do not commit secrets, API keys, or personal data beyond what is already public on the live site.

---

## Skills

Reusable skills for common tasks on this site, specified per the [agentskills.io](https://agentskills.io/specifications) format.  
Each skill lives in its own directory under `skills/` and contains a `SKILL.md` file with YAML frontmatter and step-by-step instructions.

| Skill | Directory | Purpose |
|---|---|---|
| Update Content | [`skills/update-content/`](skills/update-content/SKILL.md) | Edit hero, about, and contact copy |
| Manage Experience | [`skills/manage-experience/`](skills/manage-experience/SKILL.md) | Add, edit or remove timeline entries |
