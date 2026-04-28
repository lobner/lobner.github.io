# ip.lobner.dk worker

Cloudflare Worker that returns the visitor's IP address as plain text.

## Deploy

```sh
cd workers/ip
CLOUDFLARE_ACCOUNT_ID=b0f57789d46c5ff502f30527929b55f2 \
CLOUDFLARE_API_TOKEN=<token> \
  npx wrangler@latest deploy
```

The `routes` entry in `wrangler.toml` with `custom_domain = true` makes
Cloudflare create and manage the DNS record for `ip.lobner.dk` automatically.

## Test

```sh
curl https://ip.lobner.dk
```
