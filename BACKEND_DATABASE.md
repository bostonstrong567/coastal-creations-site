# Coastal Creations Backend Database

This site now has a Cloudflare Worker API and D1 schema for:

- Product/listing edits
- Storefront window cards
- Customer custom-gift ideas and requests
- Photo/video metadata
- Optional hover videos for product cards
- Drag-and-drop listing photo/video uploads through Cloudflare R2

The database stores records and media metadata. Large image/video files should be stored in Cloudflare R2 or another object store next; D1 should not hold large binary uploads.

## Create D1

Set a Cloudflare API token in the terminal, then run:

```bash
npm run db:create
```

Wrangler prints a `database_id`. Add this to `wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "coastal-creations-db",
    "database_id": "PASTE_DATABASE_ID_HERE"
  }
]
```

## Apply Tables And Seed Catalog

```bash
npm run db:migrate
```

This applies:

- `migrations/0001_coastal_creations.sql`
- `migrations/0002_seed_catalog.sql`
- `migrations/0003_listing_video_url.sql`
- `migrations/0004_listing_gallery_urls.sql`

## Create Media Storage

Large photo and video files should live in Cloudflare R2.

```bash
npm run media:create
```

Then add this binding to `wrangler.jsonc`:

```jsonc
"r2_buckets": [
  {
    "binding": "MEDIA_BUCKET",
    "bucket_name": "coastal-creations-media"
  }
]
```

Once this is connected, the admin listing edit page can drag/drop files, upload them to R2, and use the returned `/api/uploads/...` URL as the product photo or hover video.

## API Routes

- `GET /api/health`
- `GET /api/listings`
- `PUT /api/listings`
- `GET /api/storefront`
- `PUT /api/storefront`
- `GET /api/customer-requests`
- `POST /api/customer-requests`
- `GET /api/media`
- `POST /api/media`
- `POST /api/uploads`
- `GET /api/uploads/:key`

If D1 is not configured yet, these routes return clean JSON with `"database": false`, and the frontend falls back to local browser storage so the site still works.
