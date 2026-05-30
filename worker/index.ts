// Coastal Creations Worker — proxies /chime-api/* to chime-builder.onrender.com,
// falls through to static SPA assets for everything else.

const CHIME_API = 'https://chime-builder.onrender.com';

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/chime-api/')) {
      const path = url.pathname.replace(/^\/chime-api/, '');
      const target = new URL(path || '/', CHIME_API);
      target.search = url.search;

      const headers = new Headers(request.headers);
      headers.delete('host');

      const proxied = new Request(target.toString(), {
        method: request.method,
        headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
        redirect: 'manual',
      });

      const upstream = await fetch(proxied);
      const responseHeaders = new Headers(upstream.headers);
      responseHeaders.set('access-control-allow-origin', url.origin);
      responseHeaders.set('vary', 'Origin');

      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers: responseHeaders,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
