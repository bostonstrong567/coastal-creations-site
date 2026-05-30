import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const OUT = resolve(process.cwd(), 'screenshots');
mkdirSync(OUT, { recursive: true });

const url = process.argv[2] || 'https://coastal-creations.art/';
const variant = (process.argv[3] || 'all') as 'desktop' | 'mobile' | 'tablet' | 'all';

const sizes = {
  desktop: { width: 1440, height: 800, label: 'desktop' },
  tablet:  { width: 800,  height: 1100, label: 'tablet'  },
  mobile:  { width: 390,  height: 844,  label: 'mobile'  },
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });

const targets = variant === 'all' ? Object.values(sizes) : [sizes[variant]];

for (const s of targets) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: s.width, height: s.height });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const path = resolve(OUT, `${s.label}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(s.label, '->', path);
  await page.close();
}

await browser.close();
