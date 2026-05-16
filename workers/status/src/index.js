const UPSTREAM_ORIGIN = 'https://lobner.dk';
const UPSTREAM_PREFIX = '/status';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    let upstreamPath = url.pathname;
    if (upstreamPath === '/') {
      upstreamPath = UPSTREAM_PREFIX + '/';
    } else if (!upstreamPath.startsWith(UPSTREAM_PREFIX + '/') && upstreamPath !== UPSTREAM_PREFIX) {
      upstreamPath = UPSTREAM_PREFIX + upstreamPath;
    }

    const upstreamUrl = UPSTREAM_ORIGIN + upstreamPath + url.search;
    const upstreamRequest = new Request(upstreamUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    return fetch(upstreamRequest);
  },
};
