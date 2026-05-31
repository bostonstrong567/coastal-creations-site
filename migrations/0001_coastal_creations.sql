CREATE TABLE IF NOT EXISTS listings (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL,
  price_label TEXT,
  tag TEXT NOT NULL DEFAULT '',
  media TEXT NOT NULL DEFAULT 'photo',
  image_class TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Available',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS storefront_tiles (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  media TEXT NOT NULL DEFAULT 'photo',
  image_class TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  request_type TEXT NOT NULL,
  message TEXT NOT NULL,
  budget TEXT,
  needed_by TEXT,
  status TEXT NOT NULL DEFAULT 'New',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_type TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  url TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_customer_requests_status ON customer_requests(status);
CREATE INDEX IF NOT EXISTS idx_media_owner ON media_items(owner_type, owner_id);
