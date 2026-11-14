/**
 * Screenshots of project sites running locally (dev tooling, not part of the build).
 * Usage: tsx scripts/project-shots.ts <name> <url> [width] [height] [scrollToSelector]
 * Output: screenshots/projects/<name>.png (git-ignored). Convert the chosen ones to WebP in public/projects/<id>/.
 */
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const [name, url, w = '1440', h = '900', selector] = process.argv.slice(2)
if (!name || !url) { console.error('usage: project-shots <name> <url> [width] [height] [selector]'); process.exit(1) }

mkdirSync('screenshots/projects', { recursive: true })
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) }, locale: 'es' })
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => page.waitForTimeout(3000))
  if (selector) await page.locator(selector).first().scrollIntoViewIfNeeded().catch(() => {})
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `screenshots/projects/${name}.png` })
  console.log(`ok ${name}`)
} finally {
  await browser.close()
}
