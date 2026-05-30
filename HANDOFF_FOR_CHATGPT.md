# Mary Jean's Coastal Creations — Site Handoff for ChatGPT

> Paste this entire document to ChatGPT (or Claude/Cursor/Codex) so it can continue editing the site without losing context.

---

## 1 · What this site is

**Live URL:** https://coastal-creations.art
**www variant:** https://www.coastal-creations.art (301 redirect → apex)
**GitHub repo (source of truth):** https://github.com/bostonstrong567/coastal-creations-site
**Cloudflare project:** Workers & Pages → `coastal-creations` (account: cincotta10@gmail.com)
**Workers preview URL:** https://coastal-creations.cincotta10.workers.dev

Coastal Creations is a small handcrafted-coastal-keepsakes brand by Mary Jean (Boston). The site is a single-page Vite + TypeScript marketing site with a built-in **Shell Vision** preview tool that lets customers design a custom wind chime / earrings / etc. and see an AI-generated preview before ordering.

---

## 2 · Stack

| Layer | Choice |
|---|---|
| Build tool | Vite 8 |
| Language | TypeScript |
| Runtime | Cloudflare Workers (static assets + serverless function) |
| Plugin | `@cloudflare/vite-plugin` (bundles the Vite output into a Worker with assets binding) |
| Hosting | Cloudflare Workers + Static Assets (the "Pages successor" — uses `wrangler.jsonc`) |
| SSL | Cloudflare Universal SSL (auto-issued) |
| Backend API | Render web service `chime-builder` at https://chime-builder.onrender.com (separate repo) |
| Fonts | DM Sans + Libre Baskerville (Google Fonts CDN) |

Two repos in play:

- **`coastal-creations-site`** (this one) — public-facing website. Lives on Cloudflare Workers.
- **`chime-builder`** — the AI image-gen API. Lives on Render. See `chime-builder/INTEGRATION_PROMPT.md` for full API spec.

---

## 3 · Repo structure

```
coastal-creations-site/
├── index.html              # Vite entry — minimal, just <div id="app"></div>
├── package.json            # Vite + wrangler + @cloudflare/vite-plugin
├── bun.lock                # IMPORTANT: keep in sync with package.json
├── tsconfig.json
├── vite.config.ts          # Loads @cloudflare/vite-plugin
├── wrangler.jsonc          # Worker config (compatibility, assets dir, main entry)
├── DEPLOY.md               # Original deploy notes
├── HANDOFF_FOR_CHATGPT.md  # This file
├── worker/
│   └── index.ts            # Worker entry — proxies /chime-api/* → chime-builder.onrender.com, falls through to static SPA assets
├── functions/              # LEGACY Pages-function folder, UNUSED now (the Worker replaces it). Safe to delete.
│   └── chime-api/[[path]].ts
├── public/                 # Static files copied verbatim into dist
│   ├── favicon.svg
│   ├── icons.svg
│   └── inventory/          # Real product photos (12505.png, 12506.png, etc.)
└── src/
    ├── main.ts             # The entire site (single-page, ~700 lines). Storefront + Shell Vision builder + Cart + Admin Preview
    ├── style.css           # All site styles (~950 lines)
    ├── counter.ts          # Legacy Vite scaffold, unused
    └── assets/
        ├── banner-logo.png # The big header banner image (Mary Jean's logo)
        ├── product-grid.png
        ├── hero.png
        ├── site-concept.png
        └── logo.png
```

**Worker output (after `bun run build`):**
- `dist/client/` — static assets served by the Worker
- `dist/coastal_creations/index.js` — the Worker bundle
- `dist/coastal_creations/wrangler.json` — runtime config the deploy uses (auto-generated)

---

## 4 · How the site is wired

`src/main.ts` exports nothing — it just runs and stamps HTML into `<div id="app">`. The pattern is:

1. Module-level state objects: `shellVision`, `cart`, `products`, etc.
2. Template functions: `storefrontMarkup()`, `shellVisionMarkup()`, `productCardHtml()`, etc. — return template strings.
3. `renderApp()` reads current route from `location.pathname` and replaces `#app` innerHTML.
4. `wireEvents()` attaches click/input/submit handlers using data-attributes (`data-suggest`, `data-chime-id`, `data-shell-field`, etc.).
5. Calls to the chime-builder API go to `/chime-api/...`, which the Worker proxies to `https://chime-builder.onrender.com/...`. This keeps everything same-origin (no CORS friction) and hides the Render URL from the browser.

The Shell Vision (chime builder) flow:

```
User opens /shell-vision
  → fetch GET /chime-api/api/products  → 12 product types
  → fetch GET /chime-api/api/chimes    → catalog of material photos
  → user picks chimes, types title/message/keywords
  → "Suggest" button → POST /chime-api/api/suggest
  → "Generate Preview" → POST /chime-api/api/generate
  → response includes result_url + base64 PNG
  → render image inline
```

---

## 5 · Cloudflare deployment model

Every push to `main` triggers a build on Cloudflare Workers' build pipeline.

| Setting | Value |
|---|---|
| Repository | bostonstrong567/coastal-creations-site |
| Production branch | main |
| Build command | `npm run build` (which runs `tsc && vite build`) |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Compatibility date | 2026-05-30 |
| Compatibility flags | `nodejs_compat` |
| Assets binding | `ASSETS` (used by `worker/index.ts`) |
| SPA fallback | enabled (`not_found_handling: single-page-application`) |

**Important:** if you change `package.json`, also regenerate `bun.lock`:

```bash
bun install
git add bun.lock package.json
git commit -m "deps: ..."
```

Otherwise the CF build fails with `error: lockfile had changes, but lockfile is frozen`.

---

## 6 · DNS + Routing (in Cloudflare zone `coastal-creations.art`)

Already configured. For reference:

| Record | Value | Purpose |
|---|---|---|
| `coastal-creations.art` AAAA `100::` (proxied) | Worker binding for apex | CF routes apex to the Worker |
| `www` AAAA `100::` (proxied) | Worker binding for www | Same Worker handles, then redirect rule kicks in |
| Redirect Rule "WWW to root [Template]" | `https://www.*` → `https://${1}/${2}` (301) | Sends www traffic to apex |
| 5x MX records | eforward{1-5}.registrar-servers.com | Email forwarding via Namecheap |
| TXT SPF | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | Email SPF |

---

## 7 · Common tasks (and how to do them)

### Edit content (text, products, layout)

1. Open the repo: `gh repo clone bostonstrong567/coastal-creations-site && cd coastal-creations-site`
2. Edit `src/main.ts` (HTML/state) or `src/style.css` (styles)
3. Test locally: `bun install && bun run dev` → opens at `http://localhost:5173` with the chime-api proxy already wired through Vite dev server
4. Commit and push: `git add . && git commit -m "..." && git push origin main`
5. Cloudflare auto-deploys in ~30-60 seconds

### Add a new product to the storefront

In `src/main.ts`, find the `products: Product[]` array and add a new entry with `id`, `title`, `category`, `price` (or `priceLabel`), `tag`, `media`, `imageClass`, `imageUrl`.

### Change banner / hero / logo image

Drop new file into `src/assets/` (Vite will hash + bundle it) or `public/inventory/` (served as-is). Update the import or path in `src/main.ts`.

### Change banner size

Edit `.brand-banner img` in `src/style.css` (search for `.brand-banner img`). The height is `clamp(10rem, 22vw, 20rem)` for desktop and `9rem` at `max-width: 640px` mobile breakpoint. Bump those values to make the banner taller/shorter.

### Edit the Shell Vision builder UI

Find `function shellVisionMarkup()` in `src/main.ts`. The form fields, suggest buttons, and generate button live there.

### Tweak the API base URL (e.g. point to a staging chime-builder)

Edit `CHIME_API` at the top of `worker/index.ts`. Currently `https://chime-builder.onrender.com`. Change, push, redeploy.

### Add a new Cloudflare-side serverless function (e.g. Stripe checkout, contact form, future payments)

Don't use `functions/` (that's Pages-style, ignored now). Instead, add a new route inside `worker/index.ts`:

```ts
if (url.pathname.startsWith('/api/checkout')) {
  // your handler here
}
```

`worker/index.ts` is the single entry point. All routes flow through `export default { fetch }`.

### Edit a CSS variable / palette

Search `src/style.css` for `:root` — color, font, and spacing variables live there at the top.

### Add a redirect

CF dashboard → zone `coastal-creations.art` → Rules → Redirect Rules → Create. Or for code-level redirects, add inside `worker/index.ts`.

### Roll back a bad deploy

CF dashboard → Workers & Pages → `coastal-creations` → Deployments → find the last good deploy → "Rollback". Or `git revert <bad-sha> && git push`.

---

## 8 · API surface (the proxy)

The Worker forwards `/chime-api/*` 1:1 to `https://chime-builder.onrender.com/*`. So from the browser:

| Browser hits | Backend hits |
|---|---|
| `GET /chime-api/api/products` | `GET https://chime-builder.onrender.com/api/products` |
| `GET /chime-api/api/chimes` | `GET https://chime-builder.onrender.com/api/chimes` |
| `POST /chime-api/api/suggest` | `POST https://chime-builder.onrender.com/api/suggest` |
| `POST /chime-api/api/generate` | `POST https://chime-builder.onrender.com/api/generate` |
| `GET /chime-api/uploads/<file>` | image thumbnail |
| `GET /chime-api/results/<file>` | generated card PNG |

Full API spec, request/response shapes, rate limits, security rules: see https://raw.githubusercontent.com/bostonstrong567/chime-builder/main/INTEGRATION_PROMPT.md

**Admin operations** (uploading chime photos, etc.) need an `X-Admin-Key` header. **Never put this key in the frontend or in a Git commit.** Build a server-side helper for admin tasks if needed (e.g. a small `/api/admin/upload` route in `worker/index.ts` that reads the key from a CF Worker secret, then forwards).

---

## 9 · Cloudflare Worker secrets

If you need to add a secret to the Worker (e.g. `ADMIN_KEY` for an admin upload route, `STRIPE_SECRET` for checkout):

```bash
npx wrangler secret put SECRET_NAME
# Will prompt you to paste the value. Saved encrypted on CF.
# Read at runtime via env.SECRET_NAME inside worker/index.ts.
```

You also need to declare them in `worker/index.ts`:

```ts
interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  ADMIN_KEY?: string;   // optional secret
}
```

---

## 10 · Editing the site from ChatGPT — workflow

1. **Clone the repo** (one time):
   ```bash
   gh repo clone bostonstrong567/coastal-creations-site
   cd coastal-creations-site
   bun install
   ```

2. **Describe the change you want.** Example: "Add a fourth product card called 'Driftwood Mobile' under 'Wind Chimes' at $84, photo media, no video."

3. **ChatGPT/Codex** finds the right file (usually `src/main.ts` for content, `src/style.css` for styles, `worker/index.ts` for server-side logic) and edits it.

4. **Test locally:**
   ```bash
   bun run dev    # → http://localhost:5173, hot reload
   ```

5. **Build to sanity check:**
   ```bash
   bun run build  # if this errors, the CF deploy will too
   ```

6. **Commit + push:**
   ```bash
   git add -A
   git commit -m "feat: add Driftwood Mobile product card"
   git push origin main
   ```

7. **Cloudflare auto-deploys** in ~30-60 seconds. Check at https://coastal-creations.art.

8. **If the deploy fails**, check the build log at https://dash.cloudflare.com/?to=/:account/workers/services/view/coastal-creations/production/deployments — usually it's a missing dep or a TS type error. Fix locally + repush.

---

## 11 · The chime-builder API (in case you need to change it)

The image-gen API is a separate Render service. Repo: https://github.com/bostonstrong567/chime-builder. Handoff for it: https://raw.githubusercontent.com/bostonstrong567/chime-builder/main/HANDOFF_FOR_CHATGPT.md. Edit there only if you need to change product types, prompts, vision QC behavior, or add new endpoints — not for site content/styling changes.

---

## 12 · Things that are NOT done yet (TODO backlog)

These are intentional gaps the next session might want to tackle:

- **Payments / checkout** — no Stripe yet. Add a `worker/checkout.ts` handler + a Stripe secret + a checkout button on each product card. Stripe Checkout (hosted) is easiest; no PCI burden.
- **Real product photos** — `public/inventory/12505.png` through `12514.png` are placeholders. Replace with real catalog photos when Mary Jean has them.
- **Contact form backend** — the contact page currently uses a `mailto:`. Could move to a Worker handler + Cloudflare Email Workers (or external like Resend) for nicer UX.
- **Admin upload UI** — there's no in-browser way to upload chime material photos to the catalog. Today it's curl-only against `POST /api/chimes` on chime-builder (needs `X-Admin-Key`). Building a `/admin` page with a CF-stored secret would be the right shape.
- **SEO** — currently `robots: noindex, nofollow`. When ready to launch publicly, remove that meta tag, add OG/Twitter cards, add a sitemap.
- **Analytics** — none. CF Web Analytics is one click in the dashboard if wanted.
- **Cart persistence** — cart state is in-memory only. Lost on refresh. Switch to localStorage or a CF KV namespace if persistence needed.

---

## 13 · Sanity-check commands

```bash
# Make sure the site builds locally
cd coastal-creations-site && bun run build

# Live API health check (should return {"ok":true,...})
curl https://coastal-creations.art/chime-api/health

# Live list of products (should return 12)
curl https://coastal-creations.art/chime-api/api/products

# Verify www redirects to apex (should be 301)
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" -I https://www.coastal-creations.art/

# Open the site
open https://coastal-creations.art
```

---

**Live URL:** https://coastal-creations.art
**Repo:** https://github.com/bostonstrong567/coastal-creations-site
**CF dashboard:** https://dash.cloudflare.com/?to=/:account/workers/services/view/coastal-creations
**Render dashboard (for the API backend):** https://dashboard.render.com/web/srv-d8d14t7avr4c73f79e30
**Cloudflare account:** Cincotta10@gmail.com (Account ID `7083df782d38cc96b40cdaf3ac65c6bf`, Zone ID `b9cb5c92e159fb81f0956c43ee2cbc68`)
