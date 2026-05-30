import './style.css'
import bannerLogoUrl from './assets/banner-logo.png'
import productGridUrl from './assets/product-grid.png'

const contactEmail = 'mjcoastalcreations@gmail.com'
const chimeApi = '/chime-api'

type Product = {
  id: number
  title: string
  category: string
  price?: number
  priceLabel?: string
  tag: string
  media: 'photo' | 'video'
  imageClass: string
  imageUrl?: string
}

type Chime = {
  id: number
  name: string
  description?: string | null
  image_url: string
}

type ShellVisionField = 'title' | 'message' | 'footer' | 'scene'

const shellVision = {
  productType: 'Wind Chime',
  chimes: [] as Chime[],
  picks: [] as number[],
  title: 'Whispers From The Shore',
  message: 'A handmade coastal keepsake inspired by the colors, shells, and memories you choose.',
  footer: 'Handmade by Mary Jean, from the beach to you.',
  scene: 'hanging on a bright seaside porch with soft ocean light',
  keywords: 'sea glass teal, beach-found shells, soft coral, thoughtful gift',
  loadingChimes: false,
  chimesLoaded: false,
  busyField: '',
  generating: false,
  error: '',
  resultUrl: '',
  resultPrompt: '',
  qc: '',
}

const products: Product[] = [
  {
    id: 1,
    title: 'Sea Glass Wind Chime',
    category: 'Wind Chimes',
    price: 68,
    tag: 'One of a kind',
    media: 'video',
    imageClass: 'quad windchime',
  },
  {
    id: 2,
    title: 'Coastal Rose Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12505.png',
  },
  {
    id: 3,
    title: 'Coastal Christmas Wreath',
    category: 'Wreaths',
    price: 92,
    tag: 'Seasonal',
    media: 'photo',
    imageClass: 'quad wreath',
  },
  {
    id: 4,
    title: 'Starfish Ornament Set',
    category: 'Ornaments',
    price: 42,
    tag: 'Gift ready',
    media: 'photo',
    imageClass: 'quad ornaments',
  },
  {
    id: 5,
    title: 'Rose Garden Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12506.png',
  },
  {
    id: 6,
    title: 'Ocean Wings Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12507.png',
  },
  {
    id: 7,
    title: 'Ocean Dreams Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12508.png',
  },
  {
    id: 8,
    title: 'Seashell Treasures Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12509.png',
  },
  {
    id: 9,
    title: 'Flip Flop Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12510.png',
  },
  {
    id: 10,
    title: 'Red Coastal Rose Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12511.png',
  },
  {
    id: 11,
    title: 'Shell Treasures Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12512.png',
  },
  {
    id: 12,
    title: 'Angel Wings Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12513.png',
  },
  {
    id: 13,
    title: 'Shoreline Pearls Shell Earrings',
    category: 'Earrings',
    priceLabel: 'Price TBD',
    tag: 'Shell earrings',
    media: 'photo',
    imageClass: 'real-inventory',
    imageUrl: '/inventory/12514.png',
  },
]

const categories = ['All', 'Wind Chimes', 'Jewelry', 'Earrings', 'Wreaths', 'Ornaments']
const cart = new Map<number, number>()
let selectedCategory = 'All'

const money = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

function cartSubtotal() {
  return Array.from(cart.entries()).reduce((total, [id, qty]) => {
    const product = products.find((item) => item.id === id)
    return total + (product?.price ? product.price * qty : 0)
  }, 0)
}

function render() {
  const isShellVisionPage = window.location.hash.startsWith('#shell-vision')

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <header class="site-header">
      <a class="brand-banner" href="#top" aria-label="Mary Jean's Coastal Creations home">
        <img src="${bannerLogoUrl}" alt="Mary Jean's Coastal Creations" />
      </a>
      <div class="nav-row">
        <nav aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#shell-vision">Shell Vision</a>
          <a href="#custom">Custom Gifts</a>
          <a href="#admin">Admin Preview</a>
          <a href="mailto:${contactEmail}">Contact</a>
        </nav>
        <a class="shell-vision-header" href="#shell-vision">Create with Shell Vision</a>
        <button class="cart-button" data-open-cart aria-label="Open cart">
          <span class="cart-icon" aria-hidden="true">Cart</span>
          <span class="cart-count">${cartCount()}</span>
        </button>
      </div>
    </header>

    <main id="top">
      ${isShellVisionPage ? shellVisionMarkup(true) : storefrontMarkup()}
    </main>

    <dialog class="cart-dialog" data-cart-dialog>
      <form method="dialog">
        <div class="dialog-head">
          <h2>Cart & Order Request</h2>
          <button aria-label="Close cart">Close</button>
        </div>
        ${cartItemsMarkup()}
        <div class="totals">${totalsMarkup()}</div>
        <div class="checkout-fields">
          <label>Email required for receipt<input type="email" value="customer@email.com" /></label>
          <label>Shipping ZIP for tax estimate<input value="02539" /></label>
        </div>
        <button class="primary-action full" value="confirm">Submit Order Request</button>
        <a class="email-link" href="mailto:${contactEmail}?subject=Mary%20Jean%20Order%20Request">Email order request to ${contactEmail}</a>
      </form>
    </dialog>
  `

  attachEvents()
}

function storefrontMarkup() {
  return `
      <section class="hero">
        <div class="hero-copy">
          <h1>Handmade by the sea, inspired by nature.</h1>
          <p>Beach-found shells, sea glass, driftwood details, and coastal keepsakes made into wind chimes, jewelry, wreaths, ornaments, and custom gifts.</p>
          <div class="hero-actions">
            <a class="primary-action" href="#shop">Shop Coastal Finds</a>
            <a class="shell-vision-action" href="#shell-vision">Create with Shell Vision</a>
            <a class="secondary-action" href="#custom">Design a Gift</a>
          </div>
        </div>
        <div class="hero-media" aria-label="Featured coastal handmade products">
          <div class="media-card main-product product-photo windchime" style="--product-img: url('${productGridUrl}')">
            <span>Featured Video</span>
          </div>
          <div class="media-card small-product product-photo real-inventory" style="--product-img: url('/inventory/12505.png')">
            <span>Real Inventory</span>
          </div>
        </div>
      </section>

      <section class="category-rail" aria-label="Shop categories">
        ${['Wind Chimes', 'Jewelry', 'Earrings', 'Wreaths', 'Christmas Ornaments', 'Custom Gifts'].map((item) => `
          <a href="${item === 'Custom Gifts' ? '#custom' : '#shop'}">${item}</a>
        `).join('')}
      </section>

      <section id="shop" class="shop-section">
        <div class="section-heading">
          <div>
          <h2>Fresh from Mary Jean's table</h2>
            <p>Small-batch coastal pieces with photos, short videos, availability, shipping, and tax estimates. Orders and questions go to ${contactEmail}.</p>
          </div>
          <div class="filters" role="group" aria-label="Filter products">
            ${categories.map((category) => `
              <button class="${selectedCategory === category ? 'active' : ''}" data-filter="${category}">${category}</button>
            `).join('')}
          </div>
        </div>
        <div class="product-grid">
          ${filteredProducts().map(productCard).join('')}
        </div>
      </section>

      <section id="custom" class="custom-section">
        <div>
          <h2>Custom Gifts & Inspirations</h2>
          <p>Customers can request a custom wind chime, earrings, ornaments, or a thoughtful coastal gift. They can upload inspiration photos and include colors, budget, and date needed.</p>
          <div class="custom-options">
            <span>Design your own wind chime</span>
            <span>Custom earrings</span>
            <span>Gift inspiration uploads</span>
          </div>
        </div>
        <form class="request-form">
          <label>
            Name
            <input value="Sample Customer" />
          </label>
          <label>
            Email for receipt and updates
            <input type="email" value="customer@email.com" />
          </label>
          <label>
            What would you like made?
            <select>
              <option>Design your own wind chime</option>
              <option>Custom earrings</option>
              <option>Christmas ornament set</option>
              <option>Special coastal gift</option>
            </select>
          </label>
          <label>
            Inspiration photos
            <input type="file" multiple accept="image/*,video/*" data-upload-preview />
          </label>
          <div class="upload-preview" data-preview-target>
            <span>Photo and video previews will appear here.</span>
          </div>
          <button type="button" class="primary-action full">Send Custom Request</button>
          <a class="email-link" href="mailto:${contactEmail}?subject=Custom%20Gift%20Request">Email ${contactEmail}</a>
        </form>
      </section>

      <section class="checkout-strip">
        <div><strong>Order email</strong><span>Orders and communications go to ${contactEmail}.</span></div>
        <div><strong>Automatic tax</strong><span>Designed for Stripe Tax or Square tax settings.</span></div>
        <div><strong>Shipping ready</strong><span>Collects address before final confirmation.</span></div>
      </section>

      <section id="admin" class="admin-section">
        <div class="section-heading">
          <div>
            <h2>Mary Jean's simple admin</h2>
            <p>Large, plain-language controls for adding listings, uploading photos and videos, checking orders, and reviewing custom requests.</p>
          </div>
          <button class="admin-login">Admin Login Preview</button>
        </div>
        <div class="admin-layout">
          <aside class="admin-menu" aria-label="Admin sections">
            <button class="active">Add Listing</button>
            <button>My Listings</button>
            <button>Orders</button>
            <button>Custom Requests</button>
            <button>Messages</button>
          </aside>
          <div class="admin-panel">
            <h3>Add a new listing</h3>
            <div class="admin-form-grid">
              <label>Title<input value="Sea Glass Wind Chime" /></label>
              <label>Price<input value="$68.00" /></label>
              <label>Category<select><option>Wind Chimes</option><option>Earrings</option><option>Wreaths</option><option>Ornaments</option></select></label>
              <label>Status<select><option>Available</option><option>Sold</option><option>Hidden</option><option>Draft</option></select></label>
            </div>
            <label class="admin-description">Description<textarea>Handmade from beach-found shells, sea glass, and driftwood tones.</textarea></label>
            <div class="admin-upload">
              <div>
                <strong>Upload photos or videos</strong>
                <span>Choose from phone camera roll, preview, then publish.</span>
              </div>
              <input type="file" multiple accept="image/*,video/*" data-upload-preview />
            </div>
            <div class="admin-actions">
              <button>Save Draft</button>
              <button class="primary-action">Preview & Publish</button>
            </div>
          </div>
        </div>
      </section>
  `
}

function productCard(product: Product) {
  const realInventoryImage = product.imageUrl
    ? `<img class="inventory-image" src="${product.imageUrl}" alt="${product.title}" />`
    : ''

  return `
    <article class="product-card">
      <div class="product-photo ${product.imageClass}" style="--product-img: url('${product.imageUrl ?? productGridUrl}')">
        ${realInventoryImage}
        <span>${product.media === 'video' ? 'Video + photos' : 'Photos'}</span>
      </div>
      <div class="product-info">
        <div>
          <p>${product.category}</p>
          <h3>${product.title}</h3>
          <span>${product.tag}</span>
        </div>
        <strong>${product.price ? money(product.price) : product.priceLabel ?? 'Price TBD'}</strong>
      </div>
      <button data-add-cart="${product.id}">${product.price ? 'Add to Cart' : 'Request Item'}</button>
    </article>
  `
}

function shellVisionMarkup(isPage = false) {
  return `
    <section id="shell-vision-page" class="shell-vision-section ${isPage ? 'shell-vision-page' : ''}">
      <div class="shell-vision-intro">
        <div>
          <h2>Create with Shell Vision</h2>
          <p>Choose a creation type, select coastal materials, then let AI draft a polished title, keywords, description letter, scene, and preview card for the product they create.</p>
        </div>
        ${isPage ? '<a class="secondary-action" href="#shop">Back to Shop</a>' : '<a class="primary-action" href="#shell-vision">Start Creating</a>'}
      </div>

      <div id="shell-vision-builder" class="shell-vision-builder">
        <aside class="creator-panel">
          <label>
            Type of creation
            <select data-shell-field="productType">
              ${['Wind Chime', 'Earrings', 'Jewelry', 'Christmas Ornament', 'Wreath', 'Custom Gift'].map((item) => `
                <option ${shellVision.productType === item ? 'selected' : ''}>${item}</option>
              `).join('')}
            </select>
          </label>

          <div class="creator-field">
            <div class="field-head">
              <label for="shell-title">Title</label>
              <button type="button" data-suggest="title">${shellVision.busyField === 'title' ? 'Writing...' : 'Suggest'}</button>
            </div>
            <input id="shell-title" data-shell-field="title" value="${escapeHtml(shellVision.title)}" />
          </div>

          <div class="creator-field">
            <div class="field-head">
              <label for="shell-keywords">Keywords and personal touches</label>
            </div>
            <textarea id="shell-keywords" data-shell-field="keywords">${escapeHtml(shellVision.keywords)}</textarea>
          </div>

          <div class="creator-field">
            <div class="field-head">
              <label for="shell-message">Description letter</label>
              <button type="button" data-suggest="message">${shellVision.busyField === 'message' ? 'Writing...' : 'Suggest'}</button>
            </div>
            <textarea id="shell-message" data-shell-field="message">${escapeHtml(shellVision.message)}</textarea>
          </div>

          <div class="creator-field two-column-fields">
            <div>
              <div class="field-head">
                <label for="shell-scene">Scene</label>
                <button type="button" data-suggest="scene">${shellVision.busyField === 'scene' ? 'Writing...' : 'Suggest'}</button>
              </div>
              <textarea id="shell-scene" data-shell-field="scene">${escapeHtml(shellVision.scene)}</textarea>
            </div>
            <div>
              <div class="field-head">
                <label for="shell-footer">Footer</label>
                <button type="button" data-suggest="footer">${shellVision.busyField === 'footer' ? 'Writing...' : 'Suggest'}</button>
              </div>
              <textarea id="shell-footer" data-shell-field="footer">${escapeHtml(shellVision.footer)}</textarea>
            </div>
          </div>
        </aside>

        <div class="creator-panel">
          <div class="field-head chime-head">
            <div>
              <h3>Choose coastal pieces</h3>
              <span>${shellVision.loadingChimes ? 'Loading material catalog...' : `${shellVision.picks.length} selected`}</span>
            </div>
            <button type="button" data-refresh-chimes>Refresh</button>
          </div>
          <div class="chime-grid">
            ${chimeGridMarkup()}
          </div>
          <button type="button" class="primary-action full generate-button" data-generate-shell ${shellVision.generating ? 'disabled' : ''}>
            ${shellVision.generating ? 'Creating preview card...' : 'Generate Shell Vision Preview'}
          </button>
          <p class="creator-note">Generation can take 30-90 seconds, longer after a cold start. This uses the live Coastal Creations builder API and never exposes the admin key.</p>
          ${shellVision.error ? `<div class="creator-error">${escapeHtml(shellVision.error)}</div>` : ''}
        </div>

        <div class="creator-result">
          <h3>Preview card</h3>
          ${shellVision.resultUrl
            ? `<img src="${shellVision.resultUrl}" alt="Generated Shell Vision preview card" />`
            : `<div class="empty-preview"><strong>Your Shell Vision card will appear here.</strong><span>Pick materials, polish the wording, then generate a preview.</span></div>`
          }
          ${shellVision.qc ? `<p class="qc-note">${escapeHtml(shellVision.qc)}</p>` : ''}
          ${shellVision.resultPrompt ? `<details><summary>Generated prompt</summary><p>${escapeHtml(shellVision.resultPrompt)}</p></details>` : ''}
        </div>
      </div>
    </section>
  `
}

function chimeGridMarkup() {
  if (shellVision.loadingChimes) {
    return '<div class="chime-empty">Loading chime materials...</div>'
  }

  if (!shellVision.chimes.length) {
    return '<div class="chime-empty">No chime materials are available yet. Try Refresh, or add materials from the admin API later.</div>'
  }

  return shellVision.chimes.map((chime) => `
    <button type="button" class="chime-pick ${shellVision.picks.includes(chime.id) ? 'selected' : ''}" data-chime-id="${chime.id}">
      <img src="${chime.image_url}" alt="${escapeHtml(chime.name)}" />
      <strong>${escapeHtml(chime.name)}</strong>
      <span>${escapeHtml(chime.description ?? 'Beach-found coastal material')}</span>
    </button>
  `).join('')
}

function filteredProducts() {
  if (selectedCategory === 'All') return products
  if (selectedCategory === 'Jewelry') return products.filter((product) => ['Jewelry', 'Earrings'].includes(product.category))
  return products.filter((product) => product.category === selectedCategory)
}

function cartCount() {
  return Array.from(cart.values()).reduce((total, qty) => total + qty, 0)
}

function cartItemsMarkup() {
  if (!cart.size) {
    return '<p class="empty-cart">Your cart is ready for coastal finds. Add an item to see estimated totals.</p>'
  }

  return Array.from(cart.entries()).map(([id, qty]) => {
    const product = products.find((item) => item.id === id)!
    return `
      <div class="cart-line">
        <span>${product.title} x ${qty}</span>
        <strong>${product.price ? money(product.price * qty) : 'Quote'}</strong>
      </div>
    `
  }).join('')
}

function totalsMarkup() {
  const subtotal = cartSubtotal()
  const shipping = subtotal > 0 ? 9.95 : 0
  const tax = subtotal * 0.0625
  return `
    <div><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
    <div><span>Estimated shipping</span><strong>${money(shipping)}</strong></div>
    <div><span>Estimated tax</span><strong>${money(tax)}</strong></div>
    <div class="grand-total"><span>Total estimate</span><strong>${money(subtotal + shipping + tax)}</strong></div>
  `
}

function attachEvents() {
  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.filter ?? 'All'
      render()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-add-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.addCart)
      cart.set(id, (cart.get(id) ?? 0) + 1)
      render()
      document.querySelector<HTMLDialogElement>('[data-cart-dialog]')?.showModal()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-open-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector<HTMLDialogElement>('[data-cart-dialog]')?.showModal()
    })
  })

  document.querySelectorAll<HTMLInputElement>('[data-upload-preview]').forEach((input) => {
    input.addEventListener('change', () => {
      const target = input.closest('form')?.querySelector('[data-preview-target]')
      if (!target || !input.files?.length) return
      target.innerHTML = Array.from(input.files)
        .slice(0, 4)
        .map((file) => `<span>${file.type.startsWith('video') ? 'Video' : 'Photo'}: ${file.name}</span>`)
        .join('')
    })
  })

  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[data-shell-field]').forEach((field) => {
    const updateField = () => {
      const key = field.dataset.shellField as keyof typeof shellVision
      if (typeof shellVision[key] === 'string') {
        ;(shellVision[key] as string) = field.value
      }
    }
    field.addEventListener('input', updateField)
    field.addEventListener('change', updateField)
  })

  document.querySelectorAll<HTMLButtonElement>('[data-chime-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.chimeId)
      shellVision.picks = shellVision.picks.includes(id)
        ? shellVision.picks.filter((pick) => pick !== id)
        : [...shellVision.picks, id]
      render()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-suggest]').forEach((button) => {
    button.addEventListener('click', () => {
      void suggestShellVision(button.dataset.suggest as ShellVisionField)
    })
  })

  document.querySelector<HTMLButtonElement>('[data-refresh-chimes]')?.addEventListener('click', () => {
    shellVision.chimesLoaded = false
    void loadChimes()
  })

  document.querySelector<HTMLButtonElement>('[data-generate-shell]')?.addEventListener('click', () => {
    void generateShellVision()
  })

  if (!shellVision.chimesLoaded && !shellVision.loadingChimes) {
    void loadChimes()
  }
}

window.addEventListener('hashchange', render)
render()

async function loadChimes() {
  shellVision.loadingChimes = true
  shellVision.error = ''
  render()

  try {
    const response = await fetch(`${chimeApi}/api/chimes`)
    if (!response.ok) throw new Error(`Catalog failed: ${response.status}`)
    const data = await response.json() as { chimes: Chime[] }
    shellVision.chimes = data.chimes
    shellVision.chimesLoaded = true
    if (!shellVision.picks.length && data.chimes[0]) {
      shellVision.picks = [data.chimes[0].id]
    }
  } catch (error) {
    shellVision.error = error instanceof Error ? error.message : 'Unable to load Shell Vision materials.'
    shellVision.chimesLoaded = true
  } finally {
    shellVision.loadingChimes = false
    render()
  }
}

async function suggestShellVision(field: ShellVisionField) {
  shellVision.busyField = field
  shellVision.error = ''
  render()

  try {
    const response = await fetch(`${chimeApi}/api/suggest`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(shellVisionPayload(field)),
    })
    if (!response.ok) throw new Error(`Suggestion failed: ${response.status}`)
    const data = await response.json() as { text: string }
    shellVision[field] = data.text
  } catch (error) {
    shellVision.error = error instanceof Error ? error.message : 'Unable to write that suggestion.'
  } finally {
    shellVision.busyField = ''
    render()
  }
}

async function generateShellVision() {
  if (!shellVision.picks.length) {
    shellVision.error = 'Choose at least one coastal piece before generating.'
    render()
    return
  }

  shellVision.generating = true
  shellVision.error = ''
  shellVision.resultUrl = ''
  shellVision.resultPrompt = ''
  shellVision.qc = ''
  render()

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 180_000)

  try {
    const response = await fetch(`${chimeApi}/api/generate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...shellVisionPayload(), return_b64: true }),
      signal: controller.signal,
    })

    if (!response.ok) {
      if (response.status === 429) throw new Error('Shell Vision is busy. Please wait a bit and try again.')
      throw new Error(`Generation failed: ${response.status}`)
    }

    const data = await response.json() as {
      b64?: string
      result_url?: string
      prompt?: string
      qc?: { score?: number; attempts?: number; issues?: string[] }
    }

    shellVision.resultUrl = data.b64 ? `data:image/png;base64,${data.b64}` : data.result_url ?? ''
    shellVision.resultPrompt = data.prompt ?? ''
    shellVision.qc = data.qc
      ? `Vision score ${data.qc.score ?? 'n/a'} after ${data.qc.attempts ?? 'n/a'} attempt(s). ${(data.qc.issues ?? []).join(', ')}`
      : ''
  } catch (error) {
    shellVision.error = error instanceof Error ? error.message : 'Unable to generate Shell Vision preview.'
  } finally {
    window.clearTimeout(timeout)
    shellVision.generating = false
    render()
  }
}

function shellVisionPayload(field?: ShellVisionField) {
  return {
    ...(field ? { field } : {}),
    picks: shellVision.picks,
    title: shellVision.title,
    message: shellVision.message,
    footer: shellVision.footer,
    scene: shellVision.scene,
    keywords: `${shellVision.productType}. ${shellVision.keywords}`,
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
