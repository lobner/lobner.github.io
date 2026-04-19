---
name: update-content
description: Edit the hero, about, and contact sections of the Løbner.dk single-page website (index.html). Use when the owner's name, job title, bio, competency card text, email address, location label, or LinkedIn URL needs to change.
license: MIT
compatibility: Requires only a text editor. No build step needed — changes apply immediately on deploy.
metadata:
  author: lobner
  version: "1.0"
allowed-tools: Read Write Edit
---

## Overview

All site copy lives in a single file: `index.html` in the repository root.
This skill covers the three sections that contain personal content:

- **Hero** (`#hero`) — greeting, name, job title, location
- **About** (`#about`) — lead sentence, body paragraph, three competency cards
- **Contact** (`#contact`) — email, location label, LinkedIn URL

Do **not** alter surrounding HTML structure, SVG icons, CSS classes, or `data-*` attributes.

---

## Field Reference

### Hero section

| Field | CSS selector | Notes |
|---|---|---|
| Greeting | `.hero-greeting` | Short line before the name ("Hello, I'm") |
| Name | `.hero-name` | Full display name |
| Job title | `.hero-title` | Professional title |
| Location | `.hero-location` | Text node only — the SVG icon must stay intact |

### About section

| Field | CSS selector | Notes |
|---|---|---|
| Lead sentence | `.about-lead` | Bold one-liner |
| Body paragraph | `.about-text > p:nth-of-type(2)` | Longer bio paragraph |
| Card 1 heading | `.stat-card:nth-child(1) h3` | |
| Card 1 description | `.stat-card:nth-child(1) p` | |
| Card 2 heading | `.stat-card:nth-child(2) h3` | |
| Card 2 description | `.stat-card:nth-child(2) p` | |
| Card 3 heading | `.stat-card:nth-child(3) h3` | |
| Card 3 description | `.stat-card:nth-child(3) p` | |

### Contact section

| Field | Selector / attribute | Notes |
|---|---|---|
| Email | `a.contact-card[href^="mailto"]` — `href` + inner `<span>` | Update both the `href` value and the visible text |
| Location label | `a.contact-card[href*="maps"] span` | Display text only |
| LinkedIn URL | `a.contact-card[href*="linkedin"]` — `href` + inner `<span>` | Update both `href` and visible text |

---

## Step-by-Step Instructions

1. Open `index.html`.
2. Search for the CSS class or element listed in the field reference.
3. Change **only** the text content (or `href` attribute where specified).
4. Keep all HTML entities as-is (`&amp;`, `&mdash;`, `&ndash;`, etc.).
5. Ensure external links retain `target="_blank" rel="noopener"`.
6. Save the file. No build step is required.

---

## Example

Change the job title from "Software Engineer" to "Principal Software Engineer":

Before:
```html
<p class="hero-title">Software Engineer</p>
```

After:
```html
<p class="hero-title">Principal Software Engineer</p>
```

---

## Common Edge Cases

- **Location field**: The `.hero-location` element contains an SVG icon followed by a text node. Edit only the trailing text node — do not remove or move the `<svg>`.
- **Email update**: The email appears in two places — the `href="mailto:…"` attribute and the `<span>` text. Both must be updated together.
- **HTML entities**: The bio paragraph uses `&amp;` for `&`. Keep entities encoded; do not replace them with literal characters.
