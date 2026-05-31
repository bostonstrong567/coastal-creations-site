INSERT OR IGNORE INTO listings (id, title, category, price, price_label, tag, media, image_class, image_url, description, status)
VALUES
  (1, 'Sea Glass Wind Chime', 'Wind Chimes', 68, NULL, 'One of a kind', 'video', 'quad windchime', NULL, 'Sea Glass Wind Chime handmade by Mary Jean with coastal materials.', 'Available'),
  (2, 'Coastal Rose Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12505.png', 'Coastal Rose Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (3, 'Coastal Christmas Wreath', 'Wreaths', 92, NULL, 'Seasonal', 'photo', 'quad wreath', NULL, 'Coastal Christmas Wreath handmade by Mary Jean with coastal materials.', 'Available'),
  (4, 'Starfish Ornament Set', 'Ornaments', 42, NULL, 'Gift ready', 'photo', 'quad ornaments', NULL, 'Starfish Ornament Set handmade by Mary Jean with coastal materials.', 'Available'),
  (5, 'Rose Garden Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12506.png', 'Rose Garden Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (6, 'Ocean Wings Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12507.png', 'Ocean Wings Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (7, 'Ocean Dreams Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12508.png', 'Ocean Dreams Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (8, 'Seashell Treasures Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12509.png', 'Seashell Treasures Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (9, 'Flip Flop Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12510.png', 'Flip Flop Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (10, 'Red Coastal Rose Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12511.png', 'Red Coastal Rose Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (11, 'Shell Treasures Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12512.png', 'Shell Treasures Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (12, 'Angel Wings Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12513.png', 'Angel Wings Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available'),
  (13, 'Shoreline Pearls Shell Earrings', 'Earrings', NULL, 'Price TBD', 'Shell earrings', 'photo', 'real-inventory', '/inventory/12514.png', 'Shoreline Pearls Shell Earrings handmade with beach-found shell details and coastal accents.', 'Available');

INSERT OR IGNORE INTO storefront_tiles (id, title, media, image_class, image_url)
VALUES
  (1, 'Wind Chimes', 'photo', 'quad windchime', NULL),
  (2, 'Shell Earrings', 'photo', 'quad earrings', NULL),
  (3, 'Featured Video', 'video', 'quad wreath', NULL),
  (4, 'Christmas Ornaments', 'photo', 'quad ornaments', NULL);
