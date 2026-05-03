# Served videos

- `simply get the book.MP4` — in git, works on Vercel.

Large episode files (`IMG_2388.MP4`, `talk to uncle sami.MP4`) are kept in the repo’s top-level `videos/` folder locally (gitignored) or on a CDN; wire their URLs in `src/lib/content.ts` for production.
