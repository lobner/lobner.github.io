---
name: manage-experience
description: Add, edit, or remove entries in the professional experience timeline on the Løbner.dk website (index.html). Use when a new job, role change, or end date needs to be reflected on the site.
license: MIT
compatibility: Requires only a text editor. No build step needed — changes apply immediately on deploy.
metadata:
  author: lobner
  version: "1.0"
allowed-tools: Read Write Edit
---

## Overview

The experience timeline lives in the `#experience` section of `index.html`.
Each position is a `.timeline-item` block with a fixed internal structure:

```html
<div class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-content">
    <span class="timeline-date">YYYY &ndash; YYYY</span>
    <h3>Job Title</h3>
    <p class="timeline-company">Company Name &mdash; City / City</p>
    <p class="timeline-desc">Description of the role and responsibilities.</p>
  </div>
</div>
```

Items are displayed in reverse-chronological order (most recent first).

---

## Fields

| Field | Element | Notes |
|---|---|---|
| Date range | `span.timeline-date` | Use `&ndash;` between years; use `Present` for current roles |
| Job title | `h3` | Plain text, no HTML formatting |
| Company & location | `p.timeline-company` | Format: `Company &mdash; City / City` |
| Description | `p.timeline-desc` | 1–3 sentences summarising the role |

---

## Step-by-Step Instructions

### Add a new entry

1. Open `index.html`.
2. Locate `<div class="timeline">` inside `<section … id="experience">`.
3. Insert a new `.timeline-item` block **before** the first existing item (most recent first).
4. Fill in all four fields using the template above.
5. Use `&ndash;` (`–`) between years and `&mdash;` (`—`) between company and location.

### Edit an existing entry

1. Open `index.html` and find the `.timeline-item` block for the target position.
2. Update only the field(s) that changed (date, title, company, or description).
3. If a role has ended, replace `Present` in `span.timeline-date` with the end year.

### Remove an entry

1. Open `index.html`.
2. Delete the entire `.timeline-item` block — from the opening `<div class="timeline-item">` to its closing `</div>` — inclusive.

---

## Example

### Adding a new current role

```html
<div class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-content">
    <span class="timeline-date">2025 &ndash; Present</span>
    <h3>Staff Engineer</h3>
    <p class="timeline-company">Acme Corp &mdash; Copenhagen</p>
    <p class="timeline-desc">Leading platform engineering for cloud-native services. Defining architecture standards and mentoring senior engineers across three product teams.</p>
  </div>
</div>
```

### Closing out a current role (marking it as ended)

Before:
```html
<span class="timeline-date">2014 &ndash; Present</span>
```

After:
```html
<span class="timeline-date">2014 &ndash; 2025</span>
```

---

## Common Edge Cases

- **Order**: Always keep entries in reverse-chronological order — most recent at the top of the `<div class="timeline">` container.
- **Entities**: Use `&ndash;` for date ranges and `&mdash;` to separate company from location. Do not use raw `–` or `—` characters.
- **Overlapping dates**: Parallel roles (e.g., consulting alongside employment) may have overlapping date ranges — this is acceptable.
- **Indentation**: Match the 8-space indentation used by existing `.timeline-item` blocks.
