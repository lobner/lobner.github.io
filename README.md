# lobner.github.io

Personal site for Lobner, served at **https://lobner.dk** via GitHub Pages.

## DNS Configuration

To point `lobner.dk` to GitHub Pages, configure the following records at your DNS registrar:

### Apex domain (lobner.dk) — A records

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

### www subdomain — CNAME record

| Type | Name | Value |
|------|------|-------|
| CNAME | www | lobner.github.io |

After adding these records, enable **Enforce HTTPS** in the repository's GitHub Pages settings (Settings → Pages).
