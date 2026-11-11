# Pratiayodhya Shri Kshetra Ram-mal — Temple Website

Bilingual (मराठी / English) single-page site for Sadguru Yashwant Baba Tapobhumi, Unchakhadak.
Built with Next.js 16, React 19 and Tailwind CSS 4.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

All text lives in `src/data/mandirContent.json`, with every string as `{ "mr": "...", "en": "..." }`.
Sections map to top-level keys: `temple`, `hero`, `history`, `architecture`, `gallery`,
`darshan`, `utsavs`, `dengi` (UPI, bank, WhatsApp), `visitorGuide`, `footer`, `aartis`.

Images are in `public/images/`. The UPI QR (`public/images/upi-qr.svg`) must be regenerated
whenever the UPI ID changes.

> Next.js here has breaking changes from older versions — see `AGENTS.md` and
> `node_modules/next/dist/docs/` before changing framework-level code.

## Before going live

The repo currently holds **dummy** donation, contact and visit data so the design can be reviewed.
`npm run check:launch` lists everything that still needs replacing and exits non-zero until done:

1. `src/data/mandirContent.json` → `dengi` (UPI ID, bank, account no., IFSC, PTR no., WhatsApp), `temple.phone`/`email`, and the `visitorGuide.plan` text (remove "(sample info)" and the `XX` distances).
2. Regenerate the QR: `node scripts/make-qr.mjs`, then scan it with a real UPI app and confirm the payee name.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for metadata, sitemap, robots, JSON-LD).
4. Replace `public/images/drone-shot-pravara.jpg` with a wide landscape aerial photo, then `node scripts/make-og.mjs` to refresh the share image.
5. Opening hours are 5:00 AM – 9:00 PM: keep `hero.liveStatus`, `hero.deityCard.hours` and the JSON-LD in `src/app/layout.tsx` in sync if they change.
