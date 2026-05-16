# status.lobner.dk worker

Cloudflare Worker that proxies `status.lobner.dk` to the Upptime-generated
status page hosted at `https://lobner.github.io/status/` (source repo:
[`lobner/status`](https://github.com/lobner/status)).

The page is built with a hardcoded baseUrl of `/status/` (Sapper/Upptime
config), so the worker prepends `/status` to incoming paths that don't
already have it. This keeps every asset reference and client-side route
working without rebuilding the source repo.

## Deploy

```sh
cd workers/status
CLOUDFLARE_ACCOUNT_ID=b0f57789d46c5ff502f30527929b55f2 \
CLOUDFLARE_API_TOKEN=<token> \
  npx wrangler@latest deploy
```

The `routes` entry in `wrangler.toml` with `custom_domain = true` makes
Cloudflare create and manage the DNS record for `status.lobner.dk`
automatically.

## Test

```sh
curl -I https://status.lobner.dk
curl -I https://status.lobner.dk/status/client/client.a921e7cb.js
```
