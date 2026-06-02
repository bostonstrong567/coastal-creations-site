CREATE TABLE IF NOT EXISTS shell_materials (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  source_file TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO shell_materials (id, name, description, image_url, source_file)
VALUES
  (1, 'Natural Driftwood Pieces', 'Pale natural driftwood pieces for wind chime frames, hangers, and coastal accents.', '/materials/natural-driftwood-pieces.jpg', 'natural-driftwood-pieces.jpg'),
  (2, 'Smooth Driftwood Sticks', 'Smooth weathered driftwood sticks in soft beige and tan tones.', '/materials/smooth-driftwood-sticks.jpg', 'smooth-driftwood-sticks.jpg'),
  (3, 'White Clam Shell', 'Large white clam shell with soft tan markings and a smooth interior.', '/materials/white-clam-shell.jpg', 'white-clam-shell.jpg'),
  (4, 'Green Sea Glass', 'Rounded frosted green sea glass pieces for soft coastal color.', '/materials/green-sea-glass.png', 'green-sea-glass.png'),
  (5, 'Coastal Accent Shells', 'Small coastal accent shells for delicate handmade details.', '/materials/coastal-accent-shells.jpg', 'coastal-accent-shells.jpg'),
  (6, 'White Starfish Accent', 'White starfish accent for seaside ornaments, chimes, and keepsakes.', '/materials/white-starfish-accent.jpg', 'white-starfish-accent.jpg'),
  (7, 'Large White Starfish', 'Large white starfish with textured arms for statement coastal pieces.', '/materials/large-white-starfish.jpg', 'large-white-starfish.jpg'),
  (8, 'Small White Starfish', 'Small white starfish accents for lightweight coastal designs.', '/materials/small-white-starfish.jpg', 'small-white-starfish.jpg'),
  (9, 'Sand Dollar', 'White sand dollar accent with a classic beach-found look.', '/materials/sand-dollar.jpg', 'sand-dollar.jpg'),
  (10, 'Blue Sea Glass', 'Bright frosted blue sea glass pieces for bold ocean color.', '/materials/blue-sea-glass.jpg', 'blue-sea-glass.jpg'),
  (11, 'Clear Sea Glass', 'Frosted clear sea glass pieces with soft translucent shine.', '/materials/clear-sea-glass.jpg', 'clear-sea-glass.jpg'),
  (12, 'Brown Sea Glass', 'Warm amber and brown sea glass pieces for natural beach tones.', '/materials/brown-sea-glass.jpg', 'brown-sea-glass.jpg')
ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  source_file = excluded.source_file,
  updated_at = CURRENT_TIMESTAMP;
