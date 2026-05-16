# cpr.lobner.dk worker

Cloudflare Worker that serves the static CPR iterator (HTML + JS) at
`cpr.lobner.dk` via Workers Static Assets. All logic runs in the browser; no
CPR data leaves the client.

## Deploy

```sh
cd workers/cpr
CLOUDFLARE_ACCOUNT_ID=b0f57789d46c5ff502f30527929b55f2 \
CLOUDFLARE_API_TOKEN=<token> \
  npx wrangler@latest deploy
```

The `routes` entry in `wrangler.toml` with `custom_domain = true` makes
Cloudflare create and manage the DNS record for `cpr.lobner.dk` automatically.

## Test

```sh
curl https://cpr.lobner.dk
```
