export default {
  fetch(request) {
    const ip = request.headers.get('CF-Connecting-IP') ?? '';
    return new Response(ip + '\n', {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  },
};
