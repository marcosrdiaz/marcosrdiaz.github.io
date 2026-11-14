/**
 * Visual check: builds nothing, serves `dist` with `vite preview` and screenshots every section
 * at desktop (1440) and mobile (390). Output: screenshots/ (git-ignored).
 * Usage: npm run build && npm run shots [-- <lang>]   (lang: es | en, default es)
 */
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const PORT = 4173
const lang = process.argv[2] === 'en' ? 'en' : 'es'
const sections = ['top', 'about', 'experience', 'projects', 'skills', 'fun', 'contact']
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } }

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
const stop = () => { try { server.kill() } catch { /* ignore */ } }
process.on('exit', stop)

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(`http://localhost:${PORT}/`)).ok) return } catch { /* not up yet */ }
    await new Promise(r => setTimeout(r, 200))
  }
  throw new Error('preview server did not start')
}

mkdirSync('screenshots', { recursive: true })
await waitForServer()
const browser = await chromium.launch()
const errors: string[] = []
try {
  for (const [name, vp] of Object.entries(viewports)) {
    const ctx = await browser.newContext({ viewport: vp, locale: lang, deviceScaleFactor: 1 })
    await ctx.addInitScript(l => localStorage.setItem('lang', l), lang)
    const page = await ctx.newPage()
    page.on('pageerror', e => errors.push(`[${name}] ${e.message}`))
    page.on('requestfailed', r => errors.push(`[${name}] request failed: ${r.url()}`))
    page.on('console', m => m.type() === 'error' && errors.push(`[${name}] console: ${m.text()}`))
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    for (const id of sections) {
      await page.evaluate(i => document.getElementById(i)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }), id)
      await page.waitForTimeout(1200)
      await page.screenshot({ path: `screenshots/${lang}-${name}-${id}.png` })
    }
    // Project cards (lower rows) and detail modal
    const cards = page.locator('#projects [role=button]')
    await cards.nth(1).scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await page.screenshot({ path: `screenshots/${lang}-${name}-projects-r17.png` })
    await cards.nth(2).scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await page.screenshot({ path: `screenshots/${lang}-${name}-projects-wiki.png` })
    await cards.nth(4).scrollIntoViewIfNeeded()
    await page.waitForTimeout(1200)
    await page.screenshot({ path: `screenshots/${lang}-${name}-projects-more.png` })
    for (const ci of [0, 1, 2, 3]) {
      await cards.nth(ci).scrollIntoViewIfNeeded()
      await cards.nth(ci).focus()
      await page.keyboard.press('Enter')
      await page.waitForTimeout(900)
      await page.screenshot({ path: `screenshots/${lang}-${name}-modal-${ci}.png` })
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
    }

    // Soft skills cards (below the stack boxes)
    await page.locator('#skills h4').first().scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollBy(0, 250))
    await page.waitForTimeout(1200)
    await page.screenshot({ path: `screenshots/${lang}-${name}-softskills.png` })

    // Timeline filter
    await page.evaluate(() => document.getElementById('experience')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }))
    await page.locator('#experience [role=group] button').nth(3).click()
    await page.waitForTimeout(1200)
    await page.screenshot({ path: `screenshots/${lang}-${name}-experience-filter.png` })
    await page.locator('#experience [role=group] button').nth(0).click()

    // Reaction game: wait for lights out, react, capture the grid
    const game = page.locator('#race')
    await game.scrollIntoViewIfNeeded()
    const pad = game.locator('button').first()
    await pad.click()
    await page.waitForFunction(() => document.querySelector('#race button')?.className.includes('emerald'), null, { timeout: 15000 })
    await page.waitForTimeout(230)
    await pad.click()
    await page.waitForTimeout(1200)
    await page.evaluate(() => document.getElementById('race')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' }))
    await page.waitForTimeout(400)
    await page.screenshot({ path: `screenshots/${lang}-${name}-game.png` })

    // Stack tooltips: hover icons in the first row of each box (they must paint above the next row)
    await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }))
    await page.waitForTimeout(800)
    const boxes = page.locator('#skills .spotlight')
    for (const [bi, ii] of [[0, 0], [1, 3], [2, 2]]) {
      await boxes.nth(bi).scrollIntoViewIfNeeded()
      await boxes.nth(bi).locator('[data-cursor]').nth(ii).hover()
      await page.waitForTimeout(400)
      await page.screenshot({ path: `screenshots/${lang}-${name}-tooltip-${bi}.png` })
    }
    await page.screenshot({ path: `screenshots/${lang}-${name}-full.png`, fullPage: true })

    if (name === 'desktop') {
      // Konami easter egg
      await page.evaluate(() => window.scrollTo(0, 0))
      for (const k of ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']) await page.keyboard.press(k)
      await page.waitForTimeout(500)
      await page.screenshot({ path: `screenshots/${lang}-konami-car.png` })
      await page.waitForTimeout(700)
      await page.screenshot({ path: `screenshots/${lang}-konami-flags.png` })
      // Command palette
      await page.waitForTimeout(1500)
      await page.keyboard.press('Control+k')
      await page.waitForTimeout(500)
      await page.screenshot({ path: `screenshots/${lang}-palette.png` })
    }
    await ctx.close()
  }
} finally {
  await browser.close()
  stop()
}
console.log(errors.length ? `Errors:\n${errors.join('\n')}` : 'No console/network errors')
