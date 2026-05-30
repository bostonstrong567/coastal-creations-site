# Mary Jean's Coastal Creations Deploy Notes

Production domain: `coastal-creations.art`

## Cloudflare Pages

Use Cloudflare Pages for this Vite site.

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: whichever branch contains the finished site
- Custom domain: `coastal-creations.art`

## Shell Vision API

The frontend calls `/chime-api/...` instead of calling Render directly.

- Local dev: Vite proxies `/chime-api` to `https://chime-builder.onrender.com`
- Production: Cloudflare Pages Function at `functions/chime-api/[[path]].ts` proxies the same path

This avoids browser CORS issues and keeps the admin key out of client-side code.

## Important

Do not put the Chime Builder `ADMIN_KEY` in frontend JavaScript, HTML, or checked-in files.
Admin upload flows should be handled by a server-side function later.
