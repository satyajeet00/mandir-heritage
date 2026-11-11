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
