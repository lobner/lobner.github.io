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

    const response = await fetch(upstreamRequest);
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('text/html')) {
      return response;
    }

    // The Upptime/Sapper page is built with baseUrl=/status/. When served from
    // the root of status.lobner.dk, Sapper's client-side router doesn't match
    // any route because window.location.pathname is "/" not "/status/". Rewrite
    // the base href and __SAPPER__.baseUrl so the SPA mounts at the root.
    const html = await response.text();
    const rewritten = html
      .replace('<base href=/status/ >', '<base href=/ >')
      .replace('__SAPPER__={baseUrl:"/status"', '__SAPPER__={baseUrl:""');

    const headers = new Headers(response.headers);
    headers.delete('content-encoding');
    headers.delete('content-length');

    return new Response(rewritten, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
