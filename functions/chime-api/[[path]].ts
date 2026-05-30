const CHIME_API = 'https://chime-builder.onrender.com'

export async function onRequest(context: {
  request: Request
  params: { path?: string | string[] }
}) {
  const pathParam = context.params.path
  const path = Array.isArray(pathParam) ? pathParam.join('/') : pathParam ?? ''
  const sourceUrl = new URL(context.request.url)
  const targetUrl = new URL(`/${path}`, CHIME_API)
  targetUrl.search = sourceUrl.search

  const headers = new Headers(context.request.headers)
  headers.delete('host')

  const proxiedRequest = new Request(targetUrl, {
    method: context.request.method,
    headers,
    body: ['GET', 'HEAD'].includes(context.request.method) ? undefined : context.request.body,
    redirect: 'manual',
  })

  const response = await fetch(proxiedRequest)
  const responseHeaders = new Headers(response.headers)
  responseHeaders.set('access-control-allow-origin', sourceUrl.origin)
  responseHeaders.set('vary', 'Origin')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  })
}
