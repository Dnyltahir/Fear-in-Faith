# Served videos

- `simply get the book.MP4` — in git, works on Vercel.

Large episodes (`IMG_2388.MP4`, `talk to uncle sami.MP4`) live in the repo’s top-level **`videos/`** folder (gitignored). For **local dev**, point them into this folder so `/videos/...` URLs work:

```bash
cd Frontend/public/videos
ln -sf ../../../videos/IMG_2388.MP4 IMG_2388.MP4
ln -sf "../../../videos/talk to uncle sami.MP4" "talk to uncle sami.MP4"
```

On **Vercel** (root = `Frontend`), those two files are not in the deploy unless you host them elsewhere and change URLs in `src/lib/content.ts`.
