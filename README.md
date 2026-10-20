# Payday Calm – Safe-to-Spend Planner

A calm, ADHD-friendly paycheck budget planner that runs in the browser as an installable, fully offline **PWA**. One number tells you what's safe to spend **today** and **this week**.

- 🔒 No account, no bank connection, no subscription. Data stays on the device (IndexedDB)
- ✈️ Works offline after the first open (Workbox service worker)
- 🧠 Built for ADHD brains: one number, focus mode, quick actions, no shame, no streaks

## Features
**Core:** Safe to Spend TODAY + THIS WEEK · "How is this worked out?" breakdown · Path-to-payday forecast chart · Quick spend logging (quick-tap amounts, renamable categories, notes, edit/delete under the number) · Quick Actions command box · Focus mode · Brain dump · Example data → 4-step "Start fresh" wizard · "While you were away" catch-up.
**Bills:** soonest-first must-pays, still-to-go vs paid totals, 6 frequencies (monthly incl. "31 = last day", two days a month, every 2 weeks, weekly, every N months, one-off), per-occurrence ticks, "put a bit aside" accruals with no double counting.
**Money in:** multiple paychecks with their own schedules, countdown to the next one, paid-early-on-weekends, % auto-split, refunds/gifts/side income, optional multiple bank accounts (per-account Safe to Spend that sums exactly; savings never counted).
**Trackers:** savings goals, debt tracker (avalanche/snowball, payment history, minimums on the calendar), **payoff simulator chart**, credit-card payments without double counting, envelopes with neutral over-budget messages, month calendar with In/Out/Kept, **yearly payday & bill heatmap**, milestones (no streaks), month notes, **24-hour Impulse Pause** wishlist.
**System:** 51 currencies incl. crypto · Dawn Calm / Dusk Calm / Auto themes · Simple / Everything mode · 3 safety options (encrypted recovery copy via 20-char key or passkey, desktop auto-backup to a file, backup/restore + CSV) · Demo edition with a 40-spend limit.

## Quick start
```bash
npm install
npm run dev          # develop
npm run build        # FULL edition → dist/
npm run build:demo   # DEMO edition → dist-demo/
npm run preview      # test the real offline build at :4173
node tests/logic.test.mjs
```
Deploying (GitHub Pages / Netlify / Vercel) and testing install + offline: see **[docs/02-DEPLOY-AND-TEST.md](docs/02-DEPLOY-AND-TEST.md)**.

## Project structure
```
index.html                  App shell + splash
vite.config.js              Builds + PWA manifest (vite-plugin-pwa, injectManifest)
.env.demo / .env.production Edition flags (VITE_EDITION, VITE_SHOP_URL)
.github/workflows/deploy.yml GitHub Pages: demo at /, full at /<FULL_APP_PATH>/
netlify.toml                Netlify plan B
public/icons/               App icons (SVG mark, 192, 512, maskable, apple-touch, 1024)
src/
  main.js                   Boot, router, shell, PWA registration, away check
  service-worker.js         Workbox precache + offline navigation
  styles/app.css            Design system (Dawn Calm / Dusk Calm)
  core/
    config.js               Edition, demo limit, shop URL, DB names
    dates.js                Timezone-safe date helpers
    schedule.js             Recurrence engine for bills AND paychecks
    money.js                Currencies + formatting + amount parsing
    calc.js                 Safe-to-Spend, forecast, month summary, bill totals
    debt.js                 Avalanche/Snowball ordering + simulator
    actions.js              Every balance-changing action (single source of money truth)
    store.js / db.js        State + IndexedDB persistence
    backup.js               Recovery copy (AES-GCM), auto-backup, JSON/CSV
    commands.js             Quick Actions parser
    milestones.js           Quiet celebrations
    example.js              Realistic example planner
  ui/
    dom.js icons.js charts.js theme.js router.js shared.js onboarding.js
    screens/ today.js bills.js calendar.js money.js plan.js more.js settings.js
docs/
  01-PHASE1-BRAND-DESIGN-SITEMAP.md
  02-DEPLOY-AND-TEST.md
  etsy/  START-HERE.html/.pdf · HOW-TO-GUIDE.html/.pdf · ETSY-LISTING.md · img/
```

## Licence
© Payday Calm. All rights reserved. Sold as a personal-use digital product. Not financial or medical advice.
