# cal.lobner.dk worker

Cloudflare Worker that serves a static page embedding the personal Google
Calendar at `cal.lobner.dk` via Workers Static Assets.

## Deploy

```sh
cd workers/cal
CLOUDFLARE_ACCOUNT_ID=b0f57789d46c5ff502f30527929b55f2 \
CLOUDFLARE_API_TOKEN=<token> \
  npx wrangler@latest deploy
```

The `routes` entry in `wrangler.toml` with `custom_domain = true` makes
Cloudflare create and manage the DNS record for `cal.lobner.dk` automatically.

## Test

```sh
curl https://cal.lobner.dk
```
