// Coastal Creations Worker: same-origin API, chime-builder proxy, and SPA assets.

const CHIME_API = 'https://chime-builder.onrender.com';

type D1Result<T = unknown> = { results?: T[]; success?: boolean };

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<D1Result<T>>;
  first<T = unknown>(): Promise<T | null>;
  run(): Promise<D1Result>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  DB?: D1Database;
}

type ListingInput = {
  id: number;
  title: string;
  category: string;
  price?: number | null;
  priceLabel?: string;
  tag?: string;
  media?: 'photo' | 'video';
  imageClass?: string;
  imageUrl?: string;
  description?: string;
  status?: string;
};

type StorefrontTileInput = {
  id: number;
  title: string;
  media?: 'photo' | 'video';
  imageClass?: string;
  imageUrl?: string;
};

type RequestInput = {
  name: string;
  email: string;
  requestType: string;
  message: string;
  budget?: string;
  neededBy?: string;
};

type MediaInput = {
  ownerType: string;
  ownerId: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
  url?: string;
  notes?: string;
};

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(url.origin) });
    }

    if (url.pathname.startsWith('/chime-api/')) {
      return proxyChimeApi(request, url);
    }

    if (url.pathname.startsWith('/api/')) {
      const response = await handleApi(request, env, url);
      response.headers.set('access-control-allow-origin', url.origin);
      response.headers.set('access-control-allow-headers', 'content-type');
      response.headers.set('access-control-allow-methods', 'GET,POST,PUT,OPTIONS');
      response.headers.set('vary', 'Origin');
      return response;
    }

    return env.ASSETS.fetch(request);
  },
};

async function proxyChimeApi(request: Request, url: URL) {
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

async function handleApi(request: Request, env: Env, url: URL) {
  if (!env.DB) {
    return databaseNotConfigured(request, url);
  }

  try {
    if (url.pathname === '/api/health') {
      return json({ ok: true, database: true });
    }

    if (url.pathname === '/api/listings' && request.method === 'GET') {
      const { results = [] } = await env.DB.prepare('SELECT * FROM listings ORDER BY id').all();
      return json({ ok: true, listings: results.map(mapListingRow) });
    }

    if (url.pathname === '/api/listings' && request.method === 'PUT') {
      const listing = sanitizeListing(await request.json());
      await env.DB.prepare(`
        INSERT INTO listings (id, title, category, price, price_label, tag, media, image_class, image_url, description, status, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          category = excluded.category,
          price = excluded.price,
          price_label = excluded.price_label,
          tag = excluded.tag,
          media = excluded.media,
          image_class = excluded.image_class,
          image_url = excluded.image_url,
          description = excluded.description,
          status = excluded.status,
          updated_at = CURRENT_TIMESTAMP
      `).bind(
        listing.id,
        listing.title,
        listing.category,
        listing.price ?? null,
        listing.priceLabel ?? null,
        listing.tag ?? '',
        listing.media ?? 'photo',
        listing.imageClass ?? '',
        listing.imageUrl ?? null,
        listing.description ?? null,
        listing.status ?? 'Available',
      ).run();
      return json({ ok: true, listing });
    }

    if (url.pathname === '/api/storefront' && request.method === 'GET') {
      const { results = [] } = await env.DB.prepare('SELECT * FROM storefront_tiles ORDER BY id').all();
      return json({ ok: true, tiles: results.map(mapStorefrontRow) });
    }

    if (url.pathname === '/api/storefront' && request.method === 'PUT') {
      const tile = sanitizeStorefrontTile(await request.json());
      await env.DB.prepare(`
        INSERT INTO storefront_tiles (id, title, media, image_class, image_url, updated_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          media = excluded.media,
          image_class = excluded.image_class,
          image_url = excluded.image_url,
          updated_at = CURRENT_TIMESTAMP
      `).bind(tile.id, tile.title, tile.media ?? 'photo', tile.imageClass ?? '', tile.imageUrl ?? null).run();
      return json({ ok: true, tile });
    }

    if (url.pathname === '/api/customer-requests' && request.method === 'POST') {
      const input = sanitizeRequest(await request.json());
      const result = await env.DB.prepare(`
        INSERT INTO customer_requests (name, email, request_type, message, budget, needed_by)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(input.name, input.email, input.requestType, input.message, input.budget ?? null, input.neededBy ?? null).run();
      return json({ ok: true, request: input, result });
    }

    if (url.pathname === '/api/customer-requests' && request.method === 'GET') {
      const { results = [] } = await env.DB.prepare('SELECT * FROM customer_requests ORDER BY created_at DESC LIMIT 100').all();
      return json({ ok: true, requests: results });
    }

    if (url.pathname === '/api/media' && request.method === 'POST') {
      const input = sanitizeMedia(await request.json());
      const result = await env.DB.prepare(`
        INSERT INTO media_items (owner_type, owner_id, file_name, file_type, file_size, url, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(
        input.ownerType,
        input.ownerId,
        input.fileName,
        input.fileType,
        input.fileSize ?? null,
        input.url ?? null,
        input.notes ?? null,
      ).run();
      return json({ ok: true, media: input, result });
    }

    if (url.pathname === '/api/media' && request.method === 'GET') {
      const { results = [] } = await env.DB.prepare('SELECT * FROM media_items ORDER BY created_at DESC LIMIT 100').all();
      return json({ ok: true, media: results });
    }

    return json({ ok: false, error: 'not found' }, 404);
  } catch (error) {
    return json({ ok: false, error: error instanceof Error ? error.message : 'api error' }, 400);
  }
}

async function databaseNotConfigured(request: Request, url: URL) {
  if (url.pathname === '/api/health') {
    return json({ ok: true, database: false });
  }

  if (url.pathname === '/api/listings' && request.method === 'GET') {
    return json({ ok: true, database: false, listings: [] });
  }

  if (url.pathname === '/api/storefront' && request.method === 'GET') {
    return json({ ok: true, database: false, tiles: [] });
  }

  if (url.pathname === '/api/customer-requests' && request.method === 'GET') {
    return json({ ok: true, database: false, requests: [] });
  }

  if (url.pathname === '/api/media' && request.method === 'GET') {
    return json({ ok: true, database: false, media: [] });
  }

  if (['POST', 'PUT'].includes(request.method)) {
    return json({ ok: false, database: false, saved: false, error: 'database not configured' });
  }

  return json({ ok: false, database: false, error: 'not found' }, 404);
}

function sanitizeListing(input: unknown): ListingInput {
  const value = input as Partial<ListingInput>;
  if (!Number.isFinite(value.id)) throw new Error('listing id is required');
  if (!value.title?.trim()) throw new Error('listing title is required');
  if (!value.category?.trim()) throw new Error('listing category is required');
  return {
    id: Number(value.id),
    title: value.title.trim(),
    category: value.category.trim(),
    price: typeof value.price === 'number' && Number.isFinite(value.price) ? value.price : null,
    priceLabel: value.priceLabel?.trim(),
    tag: value.tag?.trim(),
    media: value.media === 'video' ? 'video' : 'photo',
    imageClass: value.imageClass?.trim(),
    imageUrl: value.imageUrl?.trim(),
    description: value.description?.trim(),
    status: value.status?.trim() || 'Available',
  };
}

function sanitizeStorefrontTile(input: unknown): StorefrontTileInput {
  const value = input as Partial<StorefrontTileInput>;
  if (!Number.isFinite(value.id)) throw new Error('tile id is required');
  if (!value.title?.trim()) throw new Error('tile title is required');
  return {
    id: Number(value.id),
    title: value.title.trim(),
    media: value.media === 'video' ? 'video' : 'photo',
    imageClass: value.imageClass?.trim(),
    imageUrl: value.imageUrl?.trim(),
  };
}

function sanitizeRequest(input: unknown): RequestInput {
  const value = input as Partial<RequestInput>;
  if (!value.name?.trim()) throw new Error('name is required');
  if (!value.email?.trim()) throw new Error('email is required');
  if (!value.requestType?.trim()) throw new Error('request type is required');
  if (!value.message?.trim()) throw new Error('message is required');
  return {
    name: value.name.trim(),
    email: value.email.trim(),
    requestType: value.requestType.trim(),
    message: value.message.trim(),
    budget: value.budget?.trim(),
    neededBy: value.neededBy?.trim(),
  };
}

function sanitizeMedia(input: unknown): MediaInput {
  const value = input as Partial<MediaInput>;
  if (!value.ownerType?.trim()) throw new Error('owner type is required');
  if (!value.ownerId?.trim()) throw new Error('owner id is required');
  if (!value.fileName?.trim()) throw new Error('file name is required');
  if (!value.fileType?.trim()) throw new Error('file type is required');
  return {
    ownerType: value.ownerType.trim(),
    ownerId: value.ownerId.trim(),
    fileName: value.fileName.trim(),
    fileType: value.fileType.trim(),
    fileSize: Number.isFinite(value.fileSize) ? Number(value.fileSize) : undefined,
    url: value.url?.trim(),
    notes: value.notes?.trim(),
  };
}

function mapListingRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    price: row.price,
    priceLabel: row.price_label,
    tag: row.tag,
    media: row.media,
    imageClass: row.image_class,
    imageUrl: row.image_url,
    description: row.description,
    status: row.status,
  };
}

function mapStorefrontRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    media: row.media,
    imageClass: row.image_class,
    imageUrl: row.image_url,
  };
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: jsonHeaders,
  });
}

function corsHeaders(origin: string) {
  return {
    ...jsonHeaders,
    'access-control-allow-origin': origin,
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',
    vary: 'Origin',
  };
}
