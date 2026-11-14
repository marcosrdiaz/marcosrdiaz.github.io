/**
 * Generates public/og.png (1200x630) with name and role, using the self-hosted fonts and the profile photo.
 * Dev tooling only: `npx tsx scripts/og-image.ts`.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const font = (pkg: string, file: string) => pathToFileURL(resolve('node_modules/@fontsource-variable', pkg, 'files', file)).href
const photo = `data:image/jpeg;base64,${readFileSync('public/sources/foto.jpg').toString('base64')}`

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:SG;src:url(${font('space-grotesk', 'space-grotesk-latin-wght-normal.woff2')});font-weight:300 700}
@font-face{font-family:JB;src:url(${font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')});font-weight:100 800}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#050816;color:#fff;font-family:SG;position:relative;overflow:hidden}
.glow{position:absolute;width:900px;height:520px;left:-100px;top:-220px;border-radius:50%;background:rgba(37,99,235,.35);filter:blur(120px)}
.glow2{position:absolute;width:520px;height:520px;right:-120px;bottom:-200px;border-radius:50%;background:rgba(34,211,238,.18);filter:blur(120px)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(59,130,246,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.08) 1px,transparent 1px);background-size:56px 56px}
.wrap{position:absolute;inset:0;padding:84px 90px;display:flex;align-items:center;justify-content:space-between}
.kicker{font-family:JB;font-size:24px;letter-spacing:.25em;color:#22d3ee;text-transform:uppercase}
h1{font-size:92px;line-height:.98;font-weight:700;letter-spacing:-.02em;margin-top:22px}
h1 span{background:linear-gradient(100deg,#93c5fd,#3b82f6 40%,#22d3ee);-webkit-background-clip:text;color:transparent}
p{font-size:34px;color:#cbd5e1;margin-top:30px;font-weight:500}
.sub{font-family:JB;font-size:24px;color:#94a3b8;margin-top:14px}
.ph{width:300px;height:300px;border-radius:50%;object-fit:cover;border:6px solid #050816;box-shadow:0 0 0 4px #3b82f6,0 0 80px rgba(59,130,246,.45)}
</style><div class="glow"></div><div class="glow2"></div><div class="grid"></div>
<div class="wrap"><div><div class="kicker">Portfolio</div><h1>Marcos Rodrigo<br><span>Díaz</span></h1><p>Software Developer en Sensia</p><div class="sub">React · TypeScript · C++</div></div><img class="ph" src="${photo}"></div>`

mkdirSync('screenshots', { recursive: true })
writeFileSync('screenshots/og.html', html)
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto(pathToFileURL(resolve('screenshots/og.html')).href)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'public/og.png' })
  console.log('public/og.png written')
} finally {
  await browser.close()
}
