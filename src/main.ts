import './style.css'
import bannerLogoUrl from './assets/banner-logo.png'
import productGridUrl from './assets/product-grid.png'

const contactEmail = 'mjcoastalcreations@gmail.com'
const chimeApi = '/chime-api'
const siteApi = '/api'
const adminUsername = 'mjbussey'
const adminPasswordHash = '160816406f40159d0c1a6aeb1cdf51e4ee1552ec0451f960c57f1826aa3b6139'
const adminSessionKey = 'mjcc-admin-authenticated'
const listingStorageKey = 'mjcc-listing-edits-v1'
const storefrontStorageKey = 'mjcc-storefront-window-v1'

type ListingStatus = 'Available' | 'Sold' | 'Hidden' | 'Draft'
type AdminTab = 'storefront' | 'add' | 'listings' | 'materials' | 'orders' | 'requests' | 'messages'

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
  videoUrl?: string
  galleryUrls?: string[]
  description?: string
  status?: ListingStatus
}

type Chime = {
  id: number
  name: string
  description?: string | null
  image_url: string
}

type ShellVisionField = 'title' | 'message' | 'footer' | 'scene'

type AdminOrder = {
  id: string
  customer: string
  email: string
  item: string
  date: string
  status: 'New' | 'Confirmed' | 'Paid' | 'Shipped'
}

type AdminRequest = {
  id: string
  name: string
  email: string
  type: string
  budget: string
  neededBy: string
  message: string
  status: 'New' | 'In Progress' | 'Waiting on Customer'
}

type AdminMessage = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  status: 'Unread' | 'Replied'
}

type StorefrontTile = {
  id: number
  title: string
  media: 'photo' | 'video'
  imageClass: string
  imageUrl?: string
}

type StoredProductEdit = Partial<Omit<Product, 'price'>> & {
  id: number
  price?: number | null
}

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
  resultShareUrl: '',
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

const storefrontTiles: StorefrontTile[] = [
  {
    id: 1,
    title: 'Wind Chimes',
    media: 'photo',
    imageClass: 'quad windchime',
  },
  {
    id: 2,
    title: 'Shell Earrings',
    media: 'photo',
    imageClass: 'quad earrings',
  },
  {
    id: 3,
    title: 'Featured Video',
    media: 'video',
    imageClass: 'quad wreath',
  },
  {
    id: 4,
    title: 'Christmas Ornaments',
    media: 'photo',
    imageClass: 'quad ornaments',
  },
]
loadStoredStorefrontTiles()

const categories = [
  { label: 'Wind Chimes', slug: 'wind-chimes', category: 'Wind Chimes' },
  { label: 'Jewelry', slug: 'jewelry', category: 'Jewelry' },
  { label: 'Earrings', slug: 'earrings', category: 'Earrings' },
  { label: 'Wreaths', slug: 'wreaths', category: 'Wreaths' },
  { label: 'Christmas Ornaments', slug: 'christmas-ornaments', category: 'Ornaments' },
]
const cart = new Map<number, number>()
let adminLoginError = ''
let adminTab: AdminTab = 'storefront'
let editingListingId: number | null = null
let adminNotice = ''
let backendStateLoaded = false
let pendingListingPreview: Product | null = null
const productMediaIndex = new Map<number, number>()
const pendingListingFiles = new Map<number, File[]>()

products.forEach((product) => {
  product.status ??= 'Available'
  product.description ??= product.category === 'Earrings'
    ? `${product.title} handmade with beach-found shell details and coastal accents.`
    : `${product.title} handmade by Mary Jean with coastal materials.`
})
loadStoredListingEdits()

const sampleOrders: AdminOrder[] = [
  {
    id: 'MJ-1001',
    customer: 'Jennifer L.',
    email: 'jennifer@example.com',
    item: 'Coastal Rose Shell Earrings',
    date: 'May 30, 2026',
    status: 'New',
  },
  {
    id: 'MJ-1002',
    customer: 'Sarah M.',
    email: 'sarah@example.com',
    item: 'Rose Garden Shell Earrings',
    date: 'May 29, 2026',
    status: 'Confirmed',
  },
  {
    id: 'MJ-1003',
    customer: 'Michael T.',
    email: 'michael@example.com',
    item: 'Custom wind chime request',
    date: 'May 28, 2026',
    status: 'Paid',
  },
]

const sampleRequests: AdminRequest[] = [
  {
    id: 'CR-204',
    name: 'Angela P.',
    email: 'angela@example.com',
    type: 'Design your own wind chime',
    budget: '$75-$100',
    neededBy: 'June 20, 2026',
    message: 'Soft teal and white shells for a porch gift.',
    status: 'New',
  },
  {
    id: 'CR-205',
    name: 'Denise R.',
    email: 'denise@example.com',
    type: 'Custom earrings',
    budget: '$30-$50',
    neededBy: 'No rush',
    message: 'Looking for blush pink shells and silver hooks.',
    status: 'In Progress',
  },
]

const sampleMessages: AdminMessage[] = [
  {
    id: 'MSG-88',
    name: 'Kelly B.',
    email: 'kelly@example.com',
    subject: 'Shipping question',
    message: 'Can these be shipped as a birthday gift next week?',
    date: 'May 30, 2026',
    status: 'Unread',
  },
  {
    id: 'MSG-89',
    name: 'Tom C.',
    email: 'tom@example.com',
    subject: 'Holding an item',
    message: 'Can you hold the Angel Wings earrings until Friday?',
    date: 'May 29, 2026',
    status: 'Replied',
  },
]

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
  const isAdminPage = window.location.hash.startsWith('#admin')
  const categorySlug = window.location.hash.replace('#category-', '')
  const categoryPage = window.location.hash.startsWith('#category-')
  const adminAuthed = isAdminAuthenticated()

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <header class="site-header">
      <a class="brand-banner" href="#top" aria-label="Mary Jean's Coastal Creations home">
        <img src="${bannerLogoUrl}" alt="Mary Jean's Coastal Creations" />
      </a>
      <div class="nav-row">
        <nav aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#custom">Custom Gifts</a>
          ${adminAuthed ? '<a href="#admin">Admin</a>' : ''}
          <a href="mailto:${contactEmail}">Contact</a>
        </nav>
        <a class="shell-vision-header" href="#shell-vision">Create with Shell Vision</a>
        ${adminAuthed ? '<button class="admin-header-button admin-add-header-button" data-admin-add-shortcut>Add Listing</button>' : ''}
        ${adminAuthed
          ? '<button class="admin-header-button" data-admin-logout>Log Out</button>'
          : '<a class="admin-header-button" href="#admin">Admin Login</a>'
        }
        <button class="cart-button" data-open-cart aria-label="Open cart">
          <span class="cart-icon" aria-hidden="true">Cart</span>
          <span class="cart-count">${cartCount()}</span>
        </button>
      </div>
    </header>

    <main id="top">
      ${isShellVisionPage
        ? shellVisionMarkup(true)
        : isAdminPage
          ? protectedAdminMarkup()
          : categoryPage
            ? categoryPageMarkup(categorySlug)
            : storefrontMarkup()
      }
    </main>

    <dialog class="cart-dialog" data-cart-dialog>
      <form method="dialog" data-cart-order-form>
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
      ${categoryRailMarkup()}

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
          <div class="storefront-window-grid">
            ${storefrontTiles.map(storefrontTileMarkup).join('')}
          </div>
        </div>
      </section>

      <section id="shop" class="shop-section">
        <div class="section-heading">
          <div>
            <h2>Shop by category</h2>
            <p>Choose one section at a time. Earrings shows earrings only, wind chimes shows wind chimes only, and custom gifts opens the request form.</p>
          </div>
        </div>
        <div class="category-guide-grid">
          ${categories.map(categoryGuideCard).join('')}
          <a class="category-guide-card custom-guide-card" href="#custom">
            <span>Custom Gifts</span>
            <strong>Start a custom request</strong>
            <p>Send an idea, colors, budget, deadline, and inspiration photos.</p>
          </a>
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
        <form class="request-form" data-custom-request-form>
          <label>
            Name
            <input name="name" value="Sample Customer" required />
          </label>
          <label>
            Email for receipt and updates
            <input name="email" type="email" value="customer@email.com" required />
          </label>
          <label>
            What would you like made?
            <select name="requestType">
              <option>Design your own wind chime</option>
              <option>Custom earrings</option>
              <option>Christmas ornament set</option>
              <option>Special coastal gift</option>
            </select>
          </label>
          <label>
            Idea, colors, budget, or date needed
            <textarea name="message" required>I would like something beachy and handmade.</textarea>
          </label>
          <label>
            Inspiration photos
            <input type="file" multiple accept="image/*,video/*" data-upload-preview />
          </label>
          <div class="upload-preview" data-preview-target>
            <span>Photo and video previews will appear here.</span>
          </div>
          <button type="submit" class="primary-action full">Send Custom Request</button>
          <a class="email-link" href="mailto:${contactEmail}?subject=Custom%20Gift%20Request">Email ${contactEmail}</a>
        </form>
      </section>

  `
}

function categoryRailMarkup(activeSlug = '') {
  return `
    <section class="category-rail" aria-label="Shop categories">
      ${categories.map((item) => `
        <a class="${activeSlug === item.slug ? 'active' : ''}" href="#category-${item.slug}">${item.label}</a>
      `).join('')}
      <a href="#custom">Custom Gifts</a>
    </section>
  `
}

function categoryGuideCard(category: typeof categories[number]) {
  const count = products.filter((product) => product.category === category.category && isPublicListing(product)).length
  return `
    <a class="category-guide-card" href="#category-${category.slug}">
      <span>${escapeHtml(category.label)}</span>
      <strong>${count ? `${count} listing${count === 1 ? '' : 's'}` : 'Coming soon'}</strong>
      <p>${escapeHtml(categoryDescription(category.label))}</p>
    </a>
  `
}

function protectedAdminMarkup() {
  if (!isAdminAuthenticated()) {
    return adminLoginMarkup()
  }

  return adminDashboardMarkup()
}

function categoryPageMarkup(slug: string) {
  const category = categories.find((item) => item.slug === slug)

  if (!category) {
    return storefrontMarkup()
  }

  const listings = products.filter((product) => product.category === category.category && isPublicListing(product))

  return `
    ${categoryRailMarkup(category.slug)}
    <section class="category-page">
      <div class="category-page-head">
        <div>
          <h1>${escapeHtml(category.label)}</h1>
          <p>${categoryDescription(category.label)}</p>
        </div>
        <a class="secondary-action" href="#shop">Back to Shop</a>
      </div>
      <div class="product-grid category-product-grid">
        ${listings.length
          ? listings.map(productCard).join('')
          : `<div class="empty-category"><strong>No listings yet.</strong><span>Mary Jean can add ${escapeHtml(category.label.toLowerCase())} from the admin dashboard.</span></div>`
        }
      </div>
    </section>
  `
}

function categoryDescription(label: string) {
  if (label === 'Earrings') {
    return 'Shell earrings only, shown from the current real inventory.'
  }

  if (label === 'Jewelry') {
    return 'Necklaces, bracelets, and other coastal jewelry when Mary Jean adds them.'
  }

  if (label === 'Wind Chimes') {
    return 'Handmade coastal wind chimes made from shells, sea glass, driftwood, and beach-found details.'
  }

  if (label === 'Wreaths') {
    return 'Seasonal coastal wreaths, including Christmas pieces when available.'
  }

  if (label === 'Christmas Ornaments') {
    return 'Gift-ready coastal Christmas ornaments and shell keepsakes.'
  }

  return 'Browse the current handmade coastal collection.'
}

function isPublicListing(product: Product) {
  return !['Sold', 'Hidden', 'Draft'].includes(product.status ?? 'Available')
}

function adminLoginMarkup() {
  return `
    <section id="admin" class="admin-section admin-login-section">
      <div class="admin-login-card">
        <div>
          <h1>Admin Login</h1>
          <p>Mary Jean's dashboard is private. Log in to add listings, upload photos or videos, and review orders.</p>
        </div>
        <form class="admin-login-form" data-admin-login-form>
          <label>
            Username
            <input name="username" autocomplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autocomplete="current-password" required />
          </label>
          ${adminLoginError ? `<div class="admin-login-error">${escapeHtml(adminLoginError)}</div>` : ''}
          <button class="primary-action full" type="submit">Log In</button>
        </form>
      </div>
    </section>
  `
}

function adminDashboardMarkup() {
  const adminTabs: Array<{ id: AdminTab; label: string }> = [
    { id: 'storefront', label: 'Storefront Window' },
    { id: 'add', label: 'Add Listing' },
    { id: 'listings', label: 'My Listings' },
    { id: 'materials', label: 'Shell Vision Materials' },
    { id: 'orders', label: 'Orders' },
    { id: 'requests', label: 'Custom Requests' },
    { id: 'messages', label: 'Messages' },
  ]

  return `
    <section id="admin" class="admin-section">
      <div class="section-heading">
        <div>
          <h2>Mary Jean's simple admin</h2>
          <p>Large, plain-language controls for adding listings, uploading photos and videos, checking orders, and reviewing custom requests.</p>
        </div>
      </div>
      <div class="admin-layout">
        <aside class="admin-menu" aria-label="Admin sections">
          ${adminTabs.map((tab) => `
            <button class="${adminTab === tab.id ? 'active' : ''}" data-admin-tab="${tab.id}">${tab.label}</button>
          `).join('')}
        </aside>
        ${adminPanelMarkup()}
      </div>
    </section>
  `
}

function adminPanelMarkup() {
  if (adminTab === 'storefront') return adminStorefrontMarkup()
  if (adminTab === 'listings') return adminListingsMarkup()
  if (adminTab === 'materials') return adminShellMaterialsMarkup()
  if (adminTab === 'orders') return adminOrdersMarkup()
  if (adminTab === 'requests') return adminRequestsMarkup()
  if (adminTab === 'messages') return adminMessagesMarkup()
  return adminAddListingMarkup()
}

function storefrontTileMarkup(tile: StorefrontTile) {
  const inlineStyle = tile.imageUrl
    ? ` style="--window-img: url('${tile.imageUrl}')"`
    : ` style="--window-img: url('${productGridUrl}')"`

  return `
    <div class="storefront-window-tile product-photo ${tile.imageClass}"${inlineStyle}>
      <span>${escapeHtml(tile.title)}</span>
    </div>
  `
}

function adminStorefrontMarkup() {
  return `
    <div class="admin-panel">
      <div class="admin-panel-head">
        <div>
          <h3>Storefront Window</h3>
          <p class="admin-panel-note">These four cards are the front-page window shoppers see first. Change the title, photo/video label, or paste a hosted image/video URL for each spot.</p>
        </div>
        <span>4 cards</span>
      </div>
      ${adminNotice ? `<div class="admin-notice">${escapeHtml(adminNotice)}</div>` : ''}
      <div class="admin-storefront-grid">
        ${storefrontTiles.map((tile) => `
          <form class="admin-storefront-card" data-storefront-form data-tile-id="${tile.id}">
            <div class="storefront-preview product-photo ${tile.imageClass}" style="--window-img: url('${tile.imageUrl ?? productGridUrl}')">
              <span>${escapeHtml(tile.title)}</span>
            </div>
            <div class="admin-form-grid">
              <label>Card title<input name="title" value="${escapeHtml(tile.title)}" /></label>
              <label>Media type<select name="media">
                <option ${tile.media === 'photo' ? 'selected' : ''}>photo</option>
                <option ${tile.media === 'video' ? 'selected' : ''}>video</option>
              </select></label>
            </div>
            <label class="admin-description">Image or video URL<input name="imageUrl" value="${escapeHtml(tile.imageUrl ?? '')}" placeholder="Paste a hosted photo or video URL" /></label>
            <div class="admin-upload">
              <div>
                <strong>Upload replacement later</strong>
                <span>This preview shows the file name now. A permanent upload will connect to backend storage later.</span>
              </div>
              <input type="file" accept="image/*,video/*" data-upload-preview />
              <div class="upload-preview" data-preview-target></div>
            </div>
            <div class="admin-actions">
              <button class="primary-action" type="submit">Save Storefront Card</button>
            </div>
          </form>
        `).join('')}
      </div>
    </div>
  `
}

function adminAddListingMarkup() {
  return `
    <div class="admin-panel">
      <h3>Add a new listing</h3>
      <p class="admin-panel-note">Add the listing details, preview the card, then save it as a draft or publish it to the shop.</p>
      <form class="admin-edit-form" data-admin-add-form>
        <div class="admin-form-grid">
          <label>Title<input name="title" value="Sea Glass Wind Chime" required /></label>
          <label>Price<input name="price" value="$68.00" placeholder="Example: 34.00" /></label>
          <label>Category<select name="category"><option>Wind Chimes</option><option>Earrings</option><option>Jewelry</option><option>Wreaths</option><option>Ornaments</option><option>Custom Gifts</option></select></label>
          <label>Status<select name="status"><option>Available</option><option>Draft</option><option>Sold</option><option>Hidden</option></select></label>
        </div>
        <label class="admin-description">Description<textarea name="description">Handmade from beach-found shells, sea glass, and driftwood tones.</textarea></label>
        <div class="ai-card-maker">
          <div>
            <strong>AI Listing Card Maker</strong>
            <span>Upload the original photo, choose a card style, then make a polished Mary Jean product card.</span>
          </div>
          <div class="admin-form-grid">
            <label>Card style<select name="cardStyle">
              <option value="auto">Auto beach card</option>
              <option value="angel">Angel Wings</option>
              <option value="flipflop">Flip Flop</option>
              <option value="rose">Coastal Rose</option>
              <option value="treasure">Shell Treasures</option>
            </select></label>
            <label>Photo fit<select name="imageFit">
              <option value="fit-cover">Fill card</option>
              <option value="fit-contain">Show whole photo</option>
            </select></label>
            <label>Product photo size<select name="cardPhotoSize">
              <option value="medium">Medium</option>
              <option value="large" selected>Large</option>
              <option value="xlarge">Extra large</option>
            </select></label>
          </div>
          <button type="button" class="secondary-action" data-generate-listing-card>Create AI Listing Card</button>
          <input type="hidden" name="generatedCardUrl" />
          <div class="upload-preview ai-card-preview" data-ai-card-preview>
            <span>Generated card preview will appear here.</span>
          </div>
        </div>
        <label>Photo URL<input name="imageUrl" placeholder="Optional hosted image URL" /></label>
        <label>Video URL<input name="videoUrl" placeholder="Optional hosted video URL" /></label>
        <label class="admin-description">Gallery URLs<textarea name="galleryUrls" placeholder="Optional extra image or video URLs, one per line"></textarea></label>
        <div class="admin-upload">
          <div>
            <strong>Upload photos or videos</strong>
            <span>Choose from phone camera roll. Preview first, then save.</span>
          </div>
          <input type="file" multiple accept="image/*,video/*" data-upload-preview data-new-listing-media />
          <div class="upload-preview" data-preview-target>
            <span>Selected photos and videos will preview here.</span>
          </div>
        </div>
        <div class="admin-actions">
          <button type="submit" name="action" value="draft">Save Draft</button>
          <button type="submit" name="action" value="preview" class="primary-action">Preview & Publish</button>
        </div>
      </form>
      <dialog class="cart-dialog listing-preview-dialog" data-listing-preview-dialog>
        <form method="dialog">
          <div class="dialog-head">
            <h2>Listing Preview</h2>
            <button value="close" aria-label="Close preview">Close</button>
          </div>
          <div class="listing-preview-card" data-listing-preview-card></div>
          <div class="admin-actions">
            <button value="close">Keep Editing</button>
            <button type="button" class="primary-action" data-publish-preview-listing>Save & Publish</button>
          </div>
        </form>
      </dialog>
    </div>
  `
}

function adminListingsMarkup() {
  const allListings = [...products].sort((a, b) => b.id - a.id)
  const editingListing = editingListingId ? products.find((product) => product.id === editingListingId) : undefined

  if (editingListing) {
    return adminEditListingMarkup(editingListing)
  }

  return `
    <div class="admin-panel">
      <div class="admin-panel-head">
        <div>
          <h3>My Listings</h3>
          <p class="admin-panel-note">Every listing is shown here, including drafts, hidden items, sold items, earrings, wind chimes, wreaths, ornaments, and custom gifts.</p>
        </div>
        <span>${allListings.length} listings</span>
      </div>
      ${adminNotice ? `<div class="admin-notice">${escapeHtml(adminNotice)}</div>` : ''}
      <div class="admin-listing-grid">
        ${allListings.map((listing) => `
          <article class="admin-listing-card">
            ${listing.imageUrl ? `<img src="${listing.imageUrl}" alt="${escapeHtml(listing.title)}" />` : '<div class="empty-preview">No image yet.</div>'}
            <div>
              <p>${escapeHtml(listing.category)}</p>
              <h4>${escapeHtml(listing.title)}</h4>
              <span>${listing.price ? money(listing.price) : escapeHtml(listing.priceLabel ?? 'Price TBD')}</span>
              <small>${escapeHtml(listing.status ?? 'Available')}</small>
            </div>
            <div class="listing-actions">
              <button data-edit-listing="${listing.id}">Edit</button>
              <button data-status-listing="${listing.id}" data-status="Sold">Mark Sold</button>
              <button data-status-listing="${listing.id}" data-status="Hidden">Hide</button>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `
}

function adminEditListingMarkup(listing: Product) {
  const imageUrl = listing.imageUrl ?? ''
  const videoUrl = listing.videoUrl ?? ''
  const galleryUrls = listing.galleryUrls?.join('\n') ?? ''
  return `
    <div class="admin-panel">
      <div class="admin-panel-head">
        <div>
          <h3>Edit Listing</h3>
          <p class="admin-panel-note">Update the title, price, description, or status for this item.</p>
        </div>
        <button data-admin-cancel-edit>Back to My Listings</button>
      </div>
      <form class="admin-edit-form" data-admin-edit-form data-listing-id="${listing.id}">
        <div class="admin-edit-layout">
          <div class="admin-media-preview">
            ${imageUrl ? `<img src="${imageUrl}" alt="${escapeHtml(listing.title)}" />` : '<div class="empty-preview">No image yet.</div>'}
            ${videoUrl ? `<video src="${videoUrl}" muted loop playsinline controls></video>` : ''}
          </div>
          <div class="admin-form-grid">
            <label>Title<input name="title" value="${escapeHtml(listing.title)}" /></label>
            <label>Price<input name="price" value="${listing.price ? money(listing.price) : ''}" placeholder="Example: 34.00" /></label>
            <label>Category<select name="category">${['Earrings', 'Wind Chimes', 'Jewelry', 'Wreaths', 'Ornaments', 'Custom Gifts'].map((category) => `<option ${listing.category === category ? 'selected' : ''}>${category}</option>`).join('')}</select></label>
            <label>Status<select name="status">${['Available', 'Sold', 'Hidden', 'Draft'].map((status) => `<option ${listing.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label>
            <label>Photo fit<select name="imageFit">
              <option value="fit-cover" ${listing.imageClass.includes('fit-contain') ? '' : 'selected'}>Fill card</option>
              <option value="fit-contain" ${listing.imageClass.includes('fit-contain') ? 'selected' : ''}>Show whole photo</option>
            </select></label>
            <label>Main photo URL<input name="imageUrl" value="${escapeHtml(imageUrl)}" placeholder="/inventory/12505.png or hosted image URL" /></label>
            <label>Hover video URL<input name="videoUrl" value="${escapeHtml(videoUrl)}" placeholder="Paste a hosted .mp4/.webm URL" /></label>
          </div>
        </div>
        <label class="admin-description">Description<textarea name="description">${escapeHtml(listing.description ?? '')}</textarea></label>
        <label class="admin-description">Extra gallery photo/video URLs<textarea name="galleryUrls" placeholder="One photo or video URL per line">${escapeHtml(galleryUrls)}</textarea></label>
        <div class="admin-upload">
          <div>
            <strong>Drag photos or videos here</strong>
            <span>Drop files or tap to choose. Photos become the main image; videos become the hover video when storage is connected.</span>
          </div>
          <label class="drop-zone" data-drop-zone>
            <input type="file" multiple accept="image/*,video/*" data-upload-preview data-listing-media-upload="${listing.id}" />
            <span>Drop files here or choose from your device</span>
          </label>
          <div class="upload-preview media-preview-grid" data-preview-target></div>
        </div>
        <div class="admin-actions">
          <button type="button" data-admin-cancel-edit>Cancel</button>
          <button class="primary-action" type="submit">Save Listing</button>
        </div>
      </form>
    </div>
  `
}

function adminShellMaterialsMarkup() {
  return `
    <div class="admin-panel">
      <div class="admin-panel-head">
        <div>
          <h3>Shell Vision Materials</h3>
          <p class="admin-panel-note">Upload shells, sea glass, charms, driftwood, and other material photos for customers to choose inside Shell Vision.</p>
        </div>
        <button type="button" data-refresh-chimes>Refresh Materials</button>
      </div>
      ${adminNotice ? `<div class="admin-notice">${escapeHtml(adminNotice)}</div>` : ''}
      <form class="admin-edit-form" data-shell-material-form>
        <div class="admin-form-grid">
          <label>Material name<input name="name" placeholder="Example: Aqua sea glass mix" required /></label>
          <label>Material photos<input name="images" type="file" multiple accept="image/*" required data-upload-preview /></label>
        </div>
        <div class="upload-preview media-preview-grid" data-preview-target></div>
        <div class="admin-actions">
          <button class="primary-action" type="submit">Upload To Shell Vision</button>
        </div>
      </form>
      <div class="admin-panel-head shell-materials-head">
        <div>
          <h3>Current Shell Vision Catalog</h3>
          <p class="admin-panel-note">${shellVision.loadingChimes ? 'Loading materials...' : `${shellVision.chimes.length} materials available`}</p>
        </div>
      </div>
      <div class="chime-grid admin-material-grid">
        ${adminMaterialGridMarkup()}
      </div>
    </div>
  `
}

function adminMaterialGridMarkup() {
  if (shellVision.loadingChimes) {
    return '<div class="chime-empty">Loading Shell Vision materials...</div>'
  }

  if (!shellVision.chimes.length) {
    return '<div class="chime-empty">No Shell Vision materials are loaded yet. Upload the first material photo above.</div>'
  }

  return shellVision.chimes.map((chime) => `
    <article class="chime-pick admin-material-card">
      <img src="${chime.image_url}" alt="${escapeHtml(chime.name)}" />
      <strong>${escapeHtml(chime.name)}</strong>
      <span>${escapeHtml(chime.description ?? 'Material photo for Shell Vision')}</span>
    </article>
  `).join('')
}

function adminOrdersMarkup() {
  return `
    <div class="admin-panel">
      <h3>Orders</h3>
      <p class="admin-panel-note">Sample order layout. Real orders will land here when checkout/order saving is connected.</p>
      <div class="admin-table">
        ${sampleOrders.map((order) => `
          <div class="admin-row">
            <strong>${escapeHtml(order.id)}</strong>
            <span>${escapeHtml(order.customer)}<small>${escapeHtml(order.email)}</small></span>
            <span>${escapeHtml(order.item)}</span>
            <span>${escapeHtml(order.date)}</span>
            <em>${escapeHtml(order.status)}</em>
            <button>View</button>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

function adminRequestsMarkup() {
  return `
    <div class="admin-panel">
      <h3>Custom Requests</h3>
      <p class="admin-panel-note">Custom Requests are for structured custom work: design-your-own wind chimes, custom earrings, gifts, budgets, deadlines, and inspiration photos.</p>
      <div class="admin-inbox-list">
        ${sampleRequests.map((request) => `
          <article class="admin-inbox-card">
            <div>
              <strong>${escapeHtml(request.type)}</strong>
              <span>${escapeHtml(request.name)} · ${escapeHtml(request.email)}</span>
            </div>
            <p>${escapeHtml(request.message)}</p>
            <dl>
              <div><dt>Budget</dt><dd>${escapeHtml(request.budget)}</dd></div>
              <div><dt>Needed by</dt><dd>${escapeHtml(request.neededBy)}</dd></div>
              <div><dt>Status</dt><dd>${escapeHtml(request.status)}</dd></div>
            </dl>
          </article>
        `).join('')}
      </div>
    </div>
  `
}

function adminMessagesMarkup() {
  return `
    <div class="admin-panel">
      <h3>Messages</h3>
      <p class="admin-panel-note">Messages are general customer questions, shipping notes, and availability conversations.</p>
      <div class="admin-inbox-list">
        ${sampleMessages.map((message) => `
          <article class="admin-inbox-card">
            <div>
              <strong>${escapeHtml(message.subject)}</strong>
              <span>${escapeHtml(message.name)} · ${escapeHtml(message.email)} · ${escapeHtml(message.date)}</span>
            </div>
            <p>${escapeHtml(message.message)}</p>
            <em>${escapeHtml(message.status)}</em>
          </article>
        `).join('')}
      </div>
    </div>
  `
}

function productCard(product: Product) {
  const mediaItems = productMediaItems(product)
  const activeIndex = Math.min(productMediaIndex.get(product.id) ?? 0, Math.max(mediaItems.length - 1, 0))
  const activeMedia = mediaItems[activeIndex]
  const realInventoryImage = activeMedia
    ? activeMedia.type === 'video'
      ? `<video class="inventory-image product-gallery-video" src="${activeMedia.url}" muted loop playsinline preload="metadata" aria-label="${escapeHtml(product.title)} video"></video>`
      : `<img class="inventory-image" src="${activeMedia.url}" alt="${escapeHtml(product.title)}" />`
    : ''
  const hoverVideo = product.videoUrl && activeIndex === 0
    ? `<video class="product-hover-video" src="${product.videoUrl}" muted loop playsinline preload="metadata" aria-label="${escapeHtml(product.title)} hover video"></video>`
    : ''
  const carouselControls = mediaItems.length > 1
    ? `
      <button type="button" class="gallery-arrow gallery-prev" data-product-gallery="${product.id}" data-gallery-step="-1" aria-label="Previous media for ${escapeHtml(product.title)}">‹</button>
      <button type="button" class="gallery-arrow gallery-next" data-product-gallery="${product.id}" data-gallery-step="1" aria-label="Next media for ${escapeHtml(product.title)}">›</button>
    `
    : ''
  const imageStyle = activeMedia ? '' : ` style="--product-img: url('${productGridUrl}')"`
  const badge = activeMedia
    ? activeMedia.type === 'video'
      ? '<span>Video</span>'
      : mediaItems.length > 1
        ? '<span>Gallery</span>'
        : ''
    : `<span>${product.media === 'video' ? 'Video + photos' : 'Photos'}</span>`

  return `
    <article class="product-card ${product.videoUrl ? 'has-hover-video' : ''}">
      <div class="product-photo ${product.imageClass}"${imageStyle}>
        ${realInventoryImage}
        ${hoverVideo}
        ${carouselControls}
        ${badge}
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

function productMediaItems(product: Product) {
  const urls = [
    product.imageUrl,
    product.videoUrl,
    ...(product.galleryUrls ?? []),
  ].filter((url): url is string => Boolean(url))
  const uniqueUrls = Array.from(new Set(urls))

  return uniqueUrls.map((url) => ({
    url,
    type: isVideoUrl(url) ? 'video' : 'image',
  }))
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url)
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
          <p class="creator-note">Generation can take a few minutes while Shell Vision creates and checks the preview.</p>
          ${shellVision.error ? `<div class="creator-error">${escapeHtml(shellVision.error)}</div>` : ''}
        </div>

        <div class="creator-result">
          <h3>Preview card</h3>
          ${shellVision.resultUrl
            ? `<img src="${shellVision.resultUrl}" alt="Generated Shell Vision preview card" />`
            : `<div class="empty-preview"><strong>Your Shell Vision card will appear here.</strong><span>Pick materials, polish the wording, then generate a preview.</span></div>`
          }
          ${shellVision.resultUrl ? `
            <div class="preview-actions">
              <a class="secondary-action" href="${shellVision.resultUrl}" download="mary-jeans-shell-vision.png">Save Image</a>
              ${shellVision.resultShareUrl ? `<a class="secondary-action" href="${shellVision.resultShareUrl}" target="_blank" rel="noreferrer">Open Share Link</a>` : ''}
              <button type="button" class="secondary-action" data-copy-shell-result>Copy Link</button>
            </div>
          ` : ''}
          ${shellVision.qc ? `<details class="qc-note"><summary>Preview details</summary><p>${escapeHtml(shellVision.qc)}</p></details>` : ''}
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
      <span class="chime-check" aria-hidden="true">✓</span>
      <img src="${chime.image_url}" alt="${escapeHtml(chime.name)}" />
      <strong>${escapeHtml(chime.name)}</strong>
      <span>${escapeHtml(chime.description ?? 'Beach-found coastal material')}</span>
    </button>
  `).join('')
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
        <button type="button" data-remove-cart="${id}" aria-label="Remove ${escapeHtml(product.title)} from cart">Remove</button>
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

  document.querySelectorAll<HTMLButtonElement>('[data-remove-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.removeCart)
      cart.delete(id)
      render()
      document.querySelector<HTMLDialogElement>('[data-cart-dialog]')?.showModal()
    })
  })

  document.querySelector<HTMLFormElement>('[data-cart-order-form]')?.addEventListener('submit', (event) => {
    const submitter = (event as SubmitEvent).submitter as HTMLButtonElement | null
    if (submitter?.value !== 'confirm' || !cart.size) return
    event.preventDefault()
    void submitCartOrder(event.currentTarget as HTMLFormElement)
  })

  document.querySelectorAll<HTMLInputElement>('[data-upload-preview]').forEach((input) => {
    input.addEventListener('change', () => {
      void handleUploadPreview(input)
    })
  })

  document.querySelector<HTMLButtonElement>('[data-generate-listing-card]')?.addEventListener('click', () => {
    const form = document.querySelector<HTMLFormElement>('[data-admin-add-form]')
    if (!form) return
    void generateListingCard(form)
  })

  document.querySelectorAll<HTMLElement>('[data-drop-zone]').forEach((dropZone) => {
    const input = dropZone.querySelector<HTMLInputElement>('input[type="file"]')
    if (!input) return

    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault()
      dropZone.classList.add('drag-over')
    })

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over')
    })

    dropZone.addEventListener('drop', (event) => {
      event.preventDefault()
      dropZone.classList.remove('drag-over')
      if (!event.dataTransfer?.files.length) return
      input.files = event.dataTransfer.files
      void handleUploadPreview(input)
    })
  })

  document.querySelectorAll<HTMLElement>('.product-card.has-hover-video').forEach((card) => {
    const video = card.querySelector<HTMLVideoElement>('.product-hover-video')
    if (!video) return

    const playVideo = () => {
      video.currentTime = 0
      void video.play()
    }
    const pauseVideo = () => {
      video.pause()
      video.currentTime = 0
    }

    card.addEventListener('mouseenter', playVideo)
    card.addEventListener('focusin', playVideo)
    card.addEventListener('mouseleave', pauseVideo)
    card.addEventListener('focusout', pauseVideo)
  })

  document.querySelectorAll<HTMLButtonElement>('[data-product-gallery]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
      const productId = Number(button.dataset.productGallery)
      const product = products.find((item) => item.id === productId)
      if (!product) return
      const count = productMediaItems(product).length
      if (count < 2) return
      const current = productMediaIndex.get(productId) ?? 0
      const step = Number(button.dataset.galleryStep ?? 1)
      productMediaIndex.set(productId, (current + step + count) % count)
      render()
    })
  })

  document.querySelector<HTMLFormElement>('[data-custom-request-form]')?.addEventListener('submit', (event) => {
    event.preventDefault()
    void submitCustomRequest(event.currentTarget as HTMLFormElement)
  })

  document.querySelector<HTMLFormElement>('[data-shell-material-form]')?.addEventListener('submit', (event) => {
    event.preventDefault()
    void uploadShellMaterial(event.currentTarget as HTMLFormElement)
  })

  document.querySelector<HTMLFormElement>('[data-admin-login-form]')?.addEventListener('submit', (event) => {
    event.preventDefault()
    void handleAdminLogin(event.currentTarget as HTMLFormElement)
  })

  document.querySelectorAll<HTMLButtonElement>('[data-admin-logout]').forEach((button) => {
    button.addEventListener('click', () => {
      sessionStorage.removeItem(adminSessionKey)
      adminLoginError = ''
      adminTab = 'add'
      editingListingId = null
      adminNotice = ''
      window.location.hash = '#shop'
      render()
    })
  })

  document.querySelector<HTMLButtonElement>('[data-admin-add-shortcut]')?.addEventListener('click', () => {
    adminTab = 'add'
    adminNotice = ''
    window.location.hash = '#admin'
    render()
  })

  document.querySelectorAll<HTMLButtonElement>('[data-admin-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      adminTab = (button.dataset.adminTab as AdminTab) ?? 'add'
      editingListingId = null
      adminNotice = ''
      render()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-edit-listing]').forEach((button) => {
    button.addEventListener('click', () => {
      editingListingId = Number(button.dataset.editListing)
      adminNotice = ''
      render()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-admin-cancel-edit]').forEach((button) => {
    button.addEventListener('click', () => {
      editingListingId = null
      adminNotice = ''
      render()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-status-listing]').forEach((button) => {
    button.addEventListener('click', () => {
      const listing = products.find((product) => product.id === Number(button.dataset.statusListing))
      const status = button.dataset.status as ListingStatus
      if (listing && status) {
        listing.status = status
        saveListingEdits()
        void saveListingToBackend(listing)
        adminNotice = `${listing.title} is now ${status}.`
        render()
      }
    })
  })

  document.querySelectorAll<HTMLFormElement>('[data-storefront-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const tile = storefrontTiles.find((item) => item.id === Number(form.dataset.tileId))
      if (!tile) return

      const formData = new FormData(form)
      const imageUrl = String(formData.get('imageUrl') ?? '').trim()
      tile.title = String(formData.get('title') ?? tile.title).trim() || tile.title
      tile.media = String(formData.get('media') ?? tile.media) === 'video' ? 'video' : 'photo'
      tile.imageUrl = imageUrl || undefined
      saveStorefrontTiles()
      void saveStorefrontTileToBackend(tile)
      adminNotice = `${tile.title} storefront card was saved for this preview.`
      render()
    })
  })

  document.querySelector<HTMLFormElement>('[data-admin-add-form]')?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const submitter = (event as SubmitEvent).submitter as HTMLButtonElement | null
    const action = submitter?.value === 'draft' ? 'draft' : 'preview'
    const listing = await listingFromAddForm(form)

    if (action === 'draft') {
      listing.status = 'Draft'
      await saveNewListing(listing)
      adminTab = 'listings'
      adminNotice = `${listing.title} was saved as a draft.`
      form.reset()
      render()
      return
    }

    pendingListingPreview = { ...listing, status: 'Available' }
    showListingPreview(pendingListingPreview)
  })

  document.querySelector<HTMLButtonElement>('[data-publish-preview-listing]')?.addEventListener('click', async () => {
    if (!pendingListingPreview) return
    pendingListingPreview.status = 'Available'
    await saveNewListing(pendingListingPreview)
    document.querySelector<HTMLDialogElement>('[data-listing-preview-dialog]')?.close()
    adminTab = 'listings'
    adminNotice = `${pendingListingPreview.title} was published.`
    pendingListingPreview = null
    render()
  })

  document.querySelector<HTMLFormElement>('[data-admin-edit-form]')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const listing = products.find((product) => product.id === Number(form.dataset.listingId))
    if (!listing) return

    const formData = new FormData(form)
    const rawPrice = String(formData.get('price') ?? '').replace(/[^0-9.]/g, '')
    const parsedPrice = rawPrice ? Number(rawPrice) : undefined

    listing.title = String(formData.get('title') ?? listing.title).trim() || listing.title
    listing.category = String(formData.get('category') ?? listing.category)
    listing.status = String(formData.get('status') ?? listing.status) as ListingStatus
    listing.description = String(formData.get('description') ?? listing.description)
    listing.imageUrl = String(formData.get('imageUrl') ?? '').trim() || undefined
    listing.videoUrl = String(formData.get('videoUrl') ?? '').trim() || undefined
    listing.galleryUrls = parseGalleryUrls(String(formData.get('galleryUrls') ?? ''))
    listing.media = listing.videoUrl ? 'video' : 'photo'
    listing.imageClass = `real-inventory ${String(formData.get('imageFit') ?? 'fit-cover')}`
    if (parsedPrice && Number.isFinite(parsedPrice)) {
      listing.price = parsedPrice
      listing.priceLabel = undefined
    } else {
      listing.price = undefined
      listing.priceLabel = 'Price TBD'
    }

    const savedLocally = saveListingEdits()
    void saveListingToBackend(listing)
    void saveListingMediaToBackend(listing, form.querySelector<HTMLInputElement>('[data-listing-media-upload]')?.files)
    editingListingId = null
    if (savedLocally) {
      adminNotice = `${listing.title} was saved.`
    }
    render()
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

  document.querySelector<HTMLButtonElement>('[data-copy-shell-result]')?.addEventListener('click', async () => {
    const url = shellVision.resultShareUrl || shellVision.resultUrl
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      shellVision.qc = shellVision.qc ? `${shellVision.qc} Link copied.` : 'Link copied.'
    } catch {
      shellVision.error = 'Could not copy the link. Use Open Share Link instead.'
    }
    render()
  })

  if (!shellVision.chimesLoaded && !shellVision.loadingChimes) {
    void loadChimes()
  }
}

window.addEventListener('hashchange', render)
render()
void loadBackendState()

function isAdminAuthenticated() {
  return sessionStorage.getItem(adminSessionKey) === 'true'
}

async function listingFromAddForm(form: HTMLFormElement): Promise<Product> {
  const formData = new FormData(form)
  const rawPrice = String(formData.get('price') ?? '').replace(/[^0-9.]/g, '')
  const parsedPrice = rawPrice ? Number(rawPrice) : undefined
  const files = Array.from(form.querySelector<HTMLInputElement>('[data-new-listing-media]')?.files ?? [])
  const localMedia = files.length ? await filesToLocalMedia(files) : []
  const imageFromUpload = localMedia.find((file) => file.fileType.startsWith('image/'))?.url
  const videoFromUpload = localMedia.find((file) => file.fileType.startsWith('video/'))?.url
  const generatedCardUrl = String(formData.get('generatedCardUrl') ?? '').trim()
  const galleryUrls = Array.from(new Set([
    ...parseGalleryUrls(String(formData.get('galleryUrls') ?? '')),
    ...localMedia.map((file) => file.url),
  ]))
  const title = String(formData.get('title') ?? '').trim() || 'New Coastal Listing'

  return {
    id: nextListingId(),
    title,
    category: String(formData.get('category') ?? 'Earrings'),
    price: parsedPrice && Number.isFinite(parsedPrice) ? parsedPrice : undefined,
    priceLabel: parsedPrice && Number.isFinite(parsedPrice) ? undefined : 'Price TBD',
    tag: 'New listing',
    media: videoFromUpload || String(formData.get('videoUrl') ?? '').trim() ? 'video' : 'photo',
    imageClass: `real-inventory ${String(formData.get('imageFit') ?? 'fit-cover')}`,
    imageUrl: generatedCardUrl || imageFromUpload || String(formData.get('imageUrl') ?? '').trim() || undefined,
    videoUrl: videoFromUpload || String(formData.get('videoUrl') ?? '').trim() || undefined,
    galleryUrls,
    description: String(formData.get('description') ?? '').trim(),
    status: String(formData.get('status') ?? 'Available') as ListingStatus,
  }
}

function nextListingId() {
  return Math.max(0, ...products.map((product) => product.id)) + 1
}

async function saveNewListing(listing: Product) {
  const existingIndex = products.findIndex((product) => product.id === listing.id)
  if (existingIndex >= 0) {
    products[existingIndex] = listing
  } else {
    products.push(listing)
  }
  saveListingEdits()
  await saveListingToBackend(listing)
}

function showListingPreview(listing: Product) {
  const dialog = document.querySelector<HTMLDialogElement>('[data-listing-preview-dialog]')
  const preview = document.querySelector<HTMLElement>('[data-listing-preview-card]')
  if (!dialog || !preview) return

  preview.innerHTML = productCard(listing)
  dialog.showModal()
}

async function submitCartOrder(form: HTMLFormElement) {
  const orderedItems = Array.from(cart.entries()).map(([id, qty]) => {
    const product = products.find((item) => item.id === id)
    return product ? { product, qty } : undefined
  }).filter((item): item is { product: Product; qty: number } => Boolean(item))

  if (!orderedItems.length) return

  orderedItems.forEach(({ product }) => {
    product.status = 'Sold'
  })
  saveListingEdits()
  await Promise.all(orderedItems.map(({ product }) => saveListingToBackend(product)))

  const email = form.querySelector<HTMLInputElement>('input[type="email"]')?.value.trim() || 'customer@email.com'
  const zip = form.querySelectorAll<HTMLInputElement>('input')[1]?.value.trim() || ''
  const lines = orderedItems.map(({ product, qty }) => (
    `${product.title} x ${qty} - ${product.price ? money(product.price * qty) : 'Quote needed'}`
  ))
  const subject = encodeURIComponent('Mary Jean Order Request')
  const body = encodeURIComponent([
    'New order request:',
    '',
    ...lines,
    '',
    `Customer email: ${email}`,
    `Shipping ZIP: ${zip}`,
    `Subtotal: ${money(cartSubtotal())}`,
    '',
    'Inventory note: selected listing(s) were marked Sold in admin.',
  ].join('\n'))

  cart.clear()
  render()
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
}

async function handleAdminLogin(form: HTMLFormElement) {
  const formData = new FormData(form)
  const username = String(formData.get('username') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const passwordHash = await sha256(password)

  if (username === adminUsername && passwordHash === adminPasswordHash) {
    sessionStorage.setItem(adminSessionKey, 'true')
    adminLoginError = ''
    window.location.hash = '#admin'
    render()
    return
  }

  adminLoginError = 'That username or password is not correct.'
  render()
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value)
  const hash = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function loadStoredListingEdits() {
  try {
    const raw = localStorage.getItem(listingStorageKey)
    if (!raw) return

    applyListingEdits(JSON.parse(raw) as StoredProductEdit[])
  } catch {
    localStorage.removeItem(listingStorageKey)
  }
}

function applyListingEdits(edits: StoredProductEdit[]) {
  edits.forEach((edit) => {
    if (typeof edit.id !== 'number') return
    let product = products.find((item) => item.id === edit.id)
    if (!product) {
      product = {
        id: edit.id,
        title: typeof edit.title === 'string' ? edit.title : 'Untitled Listing',
        category: typeof edit.category === 'string' ? edit.category : 'Earrings',
        tag: typeof edit.tag === 'string' ? edit.tag : 'New listing',
        media: edit.media === 'video' ? 'video' : 'photo',
        imageClass: typeof edit.imageClass === 'string' ? edit.imageClass : 'real-inventory',
        status: 'Available',
      }
      products.push(product)
    }

    if (typeof edit.title === 'string') product.title = edit.title
    if (typeof edit.category === 'string') product.category = edit.category
    if (typeof edit.price === 'number') product.price = edit.price
    if (edit.price === null) product.price = undefined
    if (typeof edit.priceLabel === 'string') product.priceLabel = edit.priceLabel
    if (typeof edit.tag === 'string') product.tag = edit.tag
    if (edit.media === 'photo' || edit.media === 'video') product.media = edit.media
    if (typeof edit.imageClass === 'string') product.imageClass = edit.imageClass
    if (typeof edit.imageUrl === 'string') product.imageUrl = edit.imageUrl || undefined
    if (typeof edit.videoUrl === 'string') product.videoUrl = edit.videoUrl || undefined
    if (Array.isArray(edit.galleryUrls)) product.galleryUrls = edit.galleryUrls.filter((url): url is string => typeof url === 'string' && Boolean(url.trim()))
    if (typeof edit.description === 'string') product.description = edit.description
    if (typeof edit.status === 'string') product.status = edit.status as ListingStatus
  })
}

function saveListingEdits() {
  const edits = products.map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price ?? null,
    priceLabel: product.priceLabel,
    tag: product.tag,
    media: product.media,
    imageClass: product.imageClass,
    imageUrl: product.imageUrl,
    videoUrl: product.videoUrl,
    galleryUrls: product.galleryUrls ?? [],
    description: product.description,
    status: product.status,
  }))
  try {
    localStorage.setItem(listingStorageKey, JSON.stringify(edits))
    return true
  } catch {
    adminNotice = 'That photo or video is too large for browser-only saving. Use a smaller clip, or enable Cloudflare R2 for permanent uploads.'
    return false
  }
}

function loadStoredStorefrontTiles() {
  try {
    const raw = localStorage.getItem(storefrontStorageKey)
    if (!raw) return

    const edits = JSON.parse(raw) as Partial<StorefrontTile>[]
    edits.forEach((edit) => {
      if (typeof edit.id !== 'number') return
      const tile = storefrontTiles.find((item) => item.id === edit.id)
      if (!tile) return

      if (typeof edit.title === 'string') tile.title = edit.title
      if (edit.media === 'photo' || edit.media === 'video') tile.media = edit.media
      if (typeof edit.imageUrl === 'string') tile.imageUrl = edit.imageUrl || undefined
    })
  } catch {
    localStorage.removeItem(storefrontStorageKey)
  }
}

function saveStorefrontTiles() {
  localStorage.setItem(storefrontStorageKey, JSON.stringify(storefrontTiles))
}

async function loadBackendState() {
  if (backendStateLoaded) return
  backendStateLoaded = true

  try {
    const [listingResponse, storefrontResponse] = await Promise.all([
      fetch(`${siteApi}/listings`),
      fetch(`${siteApi}/storefront`),
    ])

    if (listingResponse.ok) {
      const data = await listingResponse.json() as { listings?: StoredProductEdit[] }
      if (data.listings?.length) {
        applyListingEdits(data.listings)
        saveListingEdits()
      }
    }

    if (storefrontResponse.ok) {
      const data = await storefrontResponse.json() as { tiles?: StorefrontTile[] }
      if (data.tiles?.length) {
        data.tiles.forEach((edit) => {
          const tile = storefrontTiles.find((item) => item.id === edit.id)
          if (!tile) return
          tile.title = edit.title || tile.title
          tile.media = edit.media === 'video' ? 'video' : 'photo'
          tile.imageClass = edit.imageClass || tile.imageClass
          tile.imageUrl = edit.imageUrl || undefined
        })
        saveStorefrontTiles()
      }
    }

    render()
  } catch {
    // D1 is optional locally; localStorage keeps the admin preview usable.
  }
}

async function saveListingToBackend(listing: Product) {
  try {
    await fetch(`${siteApi}/listings`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: listing.id,
        title: listing.title,
        category: listing.category,
        price: listing.price ?? null,
        priceLabel: listing.priceLabel,
        tag: listing.tag,
        media: listing.media,
        imageClass: listing.imageClass,
        imageUrl: listing.imageUrl,
        videoUrl: listing.videoUrl,
        galleryUrls: listing.galleryUrls ?? [],
        description: listing.description,
        status: listing.status,
      }),
    })
  } catch {
    // Local browser save already happened.
  }
}

async function saveListingMediaToBackend(listing: Product, files?: FileList | null) {
  if (!files?.length) return

  await Promise.all(Array.from(files).map((file) => fetch(`${siteApi}/media`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      ownerType: 'listing',
      ownerId: String(listing.id),
      fileName: file.name,
      fileType: file.type || 'application/octet-stream',
      fileSize: file.size,
      url: file.type.startsWith('video') ? listing.videoUrl : listing.imageUrl,
      notes: listing.title,
    }),
  }).catch(() => undefined)))
}

async function handleUploadPreview(input: HTMLInputElement) {
  const form = input.closest('form')
  const target = form?.querySelector<HTMLElement>('[data-preview-target]')
  const files = Array.from(input.files ?? [])
  if (!target || !files.length) return
  const listingId = Number(input.dataset.listingMediaUpload)
  if (listingId) {
    pendingListingFiles.set(listingId, files)
  }

  target.innerHTML = files
    .slice(0, 8)
    .map((file) => {
      const url = URL.createObjectURL(file)
      const label = file.type.startsWith('video') ? 'Video' : 'Photo'
      return `
        <figure>
          ${file.type.startsWith('video')
            ? `<video src="${url}" muted loop playsinline controls></video>`
            : `<img src="${url}" alt="${escapeHtml(file.name)}" />`
          }
          <figcaption>${label}: ${escapeHtml(file.name)}</figcaption>
        </figure>
      `
    })
    .join('')

  const listingIdText = input.dataset.listingMediaUpload
  if (!listingIdText || !form) return

  target.insertAdjacentHTML('beforeend', '<span class="upload-status">Uploading files...</span>')
  const result = await uploadListingFiles(listingIdText, files)
  target.querySelector('.upload-status')?.remove()

  if (!result.ok || !result.files.length) {
    const localFiles = await filesToLocalMedia(files)
    applyUploadedMediaToForm(form, localFiles)
    target.insertAdjacentHTML('beforeend', '<span class="upload-status">Saved locally in this browser. Connect Cloudflare R2 later for permanent website-wide file storage.</span>')
    return
  }

  applyUploadedMediaToForm(form, result.files.filter((file) => file.ok && file.url).map((file) => ({
    url: file.url!,
    fileType: file.fileType,
  })))
  target.insertAdjacentHTML('beforeend', '<span class="upload-status">Upload complete. Save the listing to publish these files.</span>')
}

function applyUploadedMediaToForm(form: Element, files: Array<{ url: string; fileType: string }>) {
  const image = files.find((file) => file.fileType.startsWith('image/'))
  const video = files.find((file) => file.fileType.startsWith('video/'))
  const imageInput = form.querySelector<HTMLInputElement>('input[name="imageUrl"]')
  const videoInput = form.querySelector<HTMLInputElement>('input[name="videoUrl"]')

  if (image?.url && imageInput) imageInput.value = image.url
  if (video?.url && videoInput) videoInput.value = video.url
  const galleryInput = form.querySelector<HTMLTextAreaElement>('textarea[name="galleryUrls"]')
  if (galleryInput) {
    const existing = parseGalleryUrls(galleryInput.value)
    const uploadedUrls = files.map((file) => file.url)
    galleryInput.value = Array.from(new Set([...existing, ...uploadedUrls])).join('\n')
  }
}

async function generateListingCard(form: HTMLFormElement) {
  const preview = form.querySelector<HTMLElement>('[data-ai-card-preview]')
  const hiddenInput = form.querySelector<HTMLInputElement>('input[name="generatedCardUrl"]')
  const imageUrlInput = form.querySelector<HTMLInputElement>('input[name="imageUrl"]')
  const titleInput = form.querySelector<HTMLInputElement>('input[name="title"]')
  const descriptionInput = form.querySelector<HTMLTextAreaElement>('textarea[name="description"]')
  const categorySelect = form.querySelector<HTMLSelectElement>('select[name="category"]')
  const file = Array.from(form.querySelector<HTMLInputElement>('[data-new-listing-media]')?.files ?? [])
    .find((item) => item.type.startsWith('image/'))

  if (!preview || !hiddenInput || !titleInput || !descriptionInput || !categorySelect) return
  if (!file && !imageUrlInput?.value.trim()) {
    preview.innerHTML = '<span>Upload a product photo first, then create the AI listing card.</span>'
    return
  }

  preview.innerHTML = '<span>Creating branded listing card...</span>'

  try {
    const cardStyle = String(new FormData(form).get('cardStyle') ?? 'auto')
    const titleSuggestion = listingTitleSuggestion(titleInput.value, file?.name ?? '', cardStyle)
    const descriptionSuggestion = listingDescriptionSuggestion(titleSuggestion, categorySelect.value, cardStyle)
    if (!titleInput.value.trim() || titleInput.value === 'Sea Glass Wind Chime') {
      titleInput.value = titleSuggestion
    }
    if (!descriptionInput.value.trim() || descriptionInput.value.includes('Handmade from beach-found shells')) {
      descriptionInput.value = descriptionSuggestion
    }

    const compressedPhoto = file ? await fileToCompressedImageDataUrl(file) : imageUrlInput?.value.trim() ?? ''
    const cardUrl = buildListingCardSvg({
      photoUrl: compressedPhoto,
      title: titleInput.value,
      category: categorySelect.value,
      tagline: listingTagline(titleInput.value, cardStyle),
      description: descriptionInput.value,
      photoSize: String(new FormData(form).get('cardPhotoSize') ?? 'large'),
    })

    hiddenInput.value = cardUrl
    preview.innerHTML = `<img src="${cardUrl}" alt="Generated listing card for ${escapeHtml(titleInput.value)}" />`
  } catch (error) {
    preview.innerHTML = `<span>${escapeHtml(error instanceof Error ? error.message : 'Could not create the listing card.')}</span>`
  }
}

function listingTitleSuggestion(currentTitle: string, fileName: string, style: string) {
  const text = `${currentTitle} ${fileName}`.toLowerCase()
  if (style === 'angel' || text.includes('wing')) return 'Angel Wings'
  if (style === 'flipflop' || text.includes('flip') || text.includes('12493')) return 'Flip Flop'
  if (style === 'rose') return 'Coastal Rose'
  if (style === 'treasure') return 'Shell Treasures'
  if (text.includes('star')) return 'Ocean Star'
  if (text.includes('pearl')) return 'Shoreline Pearls'
  return currentTitle.trim() && currentTitle !== 'Sea Glass Wind Chime' ? currentTitle.trim() : 'Shell Earrings'
}

function listingTagline(title: string, style: string) {
  const text = `${title} ${style}`.toLowerCase()
  if (text.includes('angel') || text.includes('wing')) return 'Wings of the sea.'
  if (text.includes('flip')) return 'Simple days. Salty vibes.'
  if (text.includes('rose')) return 'Wear a piece of the ocean.'
  if (text.includes('treasure')) return 'Treasures from the tides.'
  return 'Wear a piece of the ocean.'
}

function listingDescriptionSuggestion(title: string, category: string, style: string) {
  const kind = category === 'Earrings' || category === 'Jewelry' ? 'shell earrings' : category.toLowerCase()
  const styleNotes: Record<string, string> = {
    angel: 'soft wing detail and a keepsake feel',
    flipflop: 'a playful beach-day charm',
    rose: 'romantic coastal color and polished gift styling',
    treasure: 'tiny tide-washed textures and shore-inspired detail',
  }
  const note = styleNotes[style] ?? 'coastal texture and gift-ready detail'
  return `${title} ${kind} handmade by Mary Jean with beach-found treasures, ${note}.`
}

function buildListingCardSvg(input: { photoUrl: string; title: string; category: string; tagline: string; description: string; photoSize: string }) {
  const categoryLabel = input.category === 'Earrings' || input.category === 'Jewelry' ? 'Shell Earrings' : input.category
  const title = escapeHtml(input.title).toUpperCase()
  const tagline = escapeHtml(input.tagline)
  const description = escapeHtml(input.description)
  const photoUrl = input.photoUrl
  const photoBox = input.photoSize === 'xlarge'
    ? { x: 255, y: 615, width: 690, height: 610 }
    : input.photoSize === 'medium'
      ? { x: 350, y: 690, width: 500, height: 420 }
      : { x: 305, y: 650, width: 590, height: 520 }
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#eaf7fb"/>
          <stop offset="0.42" stop-color="#fffdf8"/>
          <stop offset="1" stop-color="#f5e2c8"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#sky)"/>
      <circle cx="205" cy="170" r="130" fill="#fffdf8" stroke="#caa56a" stroke-width="10"/>
      <text x="205" y="145" text-anchor="middle" font-family="Georgia, serif" font-size="42" font-style="italic" fill="#074757">Mary Jean's</text>
      <text x="205" y="200" text-anchor="middle" font-family="Georgia, serif" font-size="34" letter-spacing="7" fill="#074757">COASTAL</text>
      <text x="205" y="240" text-anchor="middle" font-family="Georgia, serif" font-size="23" letter-spacing="6" fill="#074757">CREATIONS</text>
      <text x="780" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="700" letter-spacing="5" fill="#073f4b">${title}</text>
      <text x="780" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="34" letter-spacing="12" fill="#073f4b">${escapeHtml(categoryLabel).toUpperCase()}</text>
      <text x="780" y="285" text-anchor="middle" font-family="Georgia, serif" font-size="38" font-style="italic" fill="#0f6f7c">${tagline}</text>
      <text x="780" y="335" text-anchor="middle" font-family="Georgia, serif" font-size="29" fill="#073f4b">Handmade with beach-found treasures.</text>
      <rect x="255" y="455" width="690" height="780" rx="34" fill="#f7eddf" stroke="#e6d8bf" stroke-width="4"/>
      <text x="600" y="535" text-anchor="middle" font-family="Georgia, serif" font-size="56" font-style="italic" fill="#074757">Mary Jean's</text>
      <text x="600" y="590" text-anchor="middle" font-family="Georgia, serif" font-size="31" letter-spacing="8" fill="#074757">COASTAL CREATIONS</text>
      <image href="${photoUrl}" x="${photoBox.x}" y="${photoBox.y}" width="${photoBox.width}" height="${photoBox.height}" preserveAspectRatio="xMidYMid meet"/>
      <text x="600" y="1305" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">${description.slice(0, 98)}</text>
      <text x="210" y="1420" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">BEACH-FOUND</text>
      <text x="210" y="1455" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">SHELLS</text>
      <text x="455" y="1420" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">HANDMADE</text>
      <text x="455" y="1455" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">WITH CARE</text>
      <text x="710" y="1420" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">OCEAN</text>
      <text x="710" y="1455" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">INSPIRED</text>
      <text x="970" y="1420" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">PERFECT GIFT</text>
      <text x="970" y="1455" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#073f4b">FOR HER</text>
      <path d="M0 1515 C240 1560 470 1470 720 1525 C930 1575 1080 1500 1200 1520 L1200 1600 L0 1600 Z" fill="#9fc8c1"/>
      <text x="600" y="1560" text-anchor="middle" font-family="Georgia, serif" font-size="38" font-style="italic" fill="#074757">Handmade by Mary Jean</text>
    </svg>
  `
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

async function fileToCompressedImageDataUrl(file: File, maxSide = 640, quality = 0.68) {
  const source = await fileToDataUrl(file)
  const image = await loadImage(source)
  const canvas = document.createElement('canvas')
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight))
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Could not prepare the uploaded photo.')
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', quality)
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', () => reject(new Error('Could not read the uploaded photo.')))
    image.src = src
  })
}

async function filesToLocalMedia(files: File[]) {
  return Promise.all(files.slice(0, 8).map(async (file) => ({
    url: file.type.startsWith('image/')
      ? await fileToCompressedImageDataUrl(file)
      : await fileToDataUrl(file),
    fileType: file.type.startsWith('image/') ? 'image/jpeg' : file.type || 'application/octet-stream',
  })))
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(String(reader.result ?? '')))
    reader.addEventListener('error', () => reject(reader.error))
    reader.readAsDataURL(file)
  })
}

function parseGalleryUrls(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((url) => url.trim())
    .filter(Boolean)
}

async function uploadListingFiles(listingId: string, files: File[]) {
  const preparedFiles = await prepareListingUploadFiles(files)
  const formData = new FormData()
  formData.set('ownerType', 'listing')
  formData.set('ownerId', listingId)
  preparedFiles.forEach((file) => formData.append('files', file))

  try {
    const response = await fetch(`${siteApi}/uploads`, {
      method: 'POST',
      body: formData,
    })
    return await response.json() as {
      ok: boolean
      files: Array<{ ok?: boolean; url?: string; fileName: string; fileType: string; fileSize?: number }>
    }
  } catch {
    return { ok: false, files: [] }
  }
}

async function prepareListingUploadFiles(files: File[]) {
  return Promise.all(files.slice(0, 8).map(async (file) => {
    if (!file.type.startsWith('image/')) return file

    const dataUrl = await fileToCompressedImageDataUrl(file)
    const blob = await (await fetch(dataUrl)).blob()
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'listing-photo'
    return new File([blob], `${baseName}-small.jpg`, { type: 'image/jpeg' })
  }))
}

async function saveStorefrontTileToBackend(tile: StorefrontTile) {
  try {
    await fetch(`${siteApi}/storefront`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(tile),
    })
  } catch {
    // Local browser save already happened.
  }
}

async function submitCustomRequest(form: HTMLFormElement) {
  const formData = new FormData(form)
  const files = Array.from(form.querySelector<HTMLInputElement>('[data-upload-preview]')?.files ?? [])
  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    requestType: String(formData.get('requestType') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  }

  try {
    const response = await fetch(`${siteApi}/customer-requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('request save failed')

    await Promise.all(files.map((file) => fetch(`${siteApi}/media`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ownerType: 'custom-request',
        ownerId: payload.email,
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        fileSize: file.size,
        notes: payload.requestType,
      }),
    })))

    form.querySelector('[data-preview-target]')!.innerHTML = '<span>Request saved. Mary Jean will receive it in the admin database.</span>'
  } catch {
    const subject = encodeURIComponent(`Custom Gift Request from ${payload.name || 'customer'}`)
    const body = encodeURIComponent(`${payload.message}\n\nEmail: ${payload.email}\nType: ${payload.requestType}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }
}

async function uploadShellMaterial(form: HTMLFormElement) {
  const formData = new FormData(form)
  const name = String(formData.get('name') ?? '').trim()
  const files = Array.from(form.querySelector<HTMLInputElement>('input[name="images"]')?.files ?? [])

  if (!name || !files.length) {
    adminNotice = 'Add a material name and at least one photo.'
    render()
    return
  }

  const upload = new FormData()
  files.forEach((file) => {
    upload.append('images', file)
    upload.append('names', name)
  })

  adminNotice = 'Uploading Shell Vision material...'
  render()

  try {
    const response = await fetch(`${siteApi}/shell-materials`, {
      method: 'POST',
      body: upload,
    })
    const data = await response.json() as { ok?: boolean; error?: string; created?: unknown[]; skipped?: unknown[] }
    if (!response.ok || !data.ok) {
      throw new Error(data.error ?? `Upload failed: ${response.status}`)
    }

    shellVision.chimesLoaded = false
    await loadChimes()
    adminTab = 'materials'
    adminNotice = `${data.created?.length ?? files.length} Shell Vision material photo${files.length === 1 ? '' : 's'} uploaded.`
    form.reset()
    render()
  } catch (error) {
    adminTab = 'materials'
    adminNotice = error instanceof Error ? error.message : 'Shell Vision upload failed.'
    render()
  }
}

async function loadChimes() {
  shellVision.loadingChimes = true
  shellVision.error = ''
  render()

  try {
    const response = await fetch(`${siteApi}/shell-materials`)
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
  shellVision.resultShareUrl = ''
  shellVision.resultPrompt = ''
  shellVision.qc = 'Generating can take a few minutes while the AI makes and checks the image.'
  render()

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 300_000)

  try {
    const response = await fetch(`${siteApi}/shell-generate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...shellVisionPayload(), return_b64: true }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = ''
      try {
        errorMessage = (JSON.parse(errorText) as { error?: string }).error ?? ''
      } catch {
        errorMessage = errorText
      }
      if (response.status === 429) throw new Error('Shell Vision is busy. Please wait a bit and try again.')
      throw new Error(errorMessage || `Generation failed: ${response.status}`)
    }

    const data = await response.json() as {
      b64?: string
      result_url?: string
      prompt?: string
      qc?: { score?: number; attempts?: number; issues?: string[] }
    }

    shellVision.resultUrl = data.b64 ? `data:image/png;base64,${data.b64}` : data.result_url ?? ''
    shellVision.resultShareUrl = data.result_url ?? ''
    shellVision.resultPrompt = data.prompt ?? ''
    shellVision.qc = data.qc
      ? `Vision score ${data.qc.score ?? 'n/a'} after ${data.qc.attempts ?? 'n/a'} attempt(s). ${(data.qc.issues ?? []).join(', ')}`
      : ''
  } catch (error) {
    shellVision.error = error instanceof DOMException && error.name === 'AbortError'
      ? 'Shell Vision took too long this time. Try again in a minute; the image service may still be warming up.'
      : error instanceof Error ? error.message : 'Unable to generate Shell Vision preview.'
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
