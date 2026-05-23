export default {
  async fetch(request) {
    const url = new URL(request.url);

    // If root or /filmsamling.html, proxy to the filmsamling.html file
    if (url.pathname === "/" || url.pathname === "/filmsamling.html") {
      const upstreamUrl = "https://lobner.dk/filmsamling.html";
      const response = await fetch(upstreamUrl, {
        headers: request.headers,
        redirect: "follow",
      });
      return response;
    }

    // Otherwise proxy to the original path on the domain
    const upstreamUrl = "https://lobner.dk" + url.pathname + url.search;
    return fetch(upstreamUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "manual",
    });
  },
};
