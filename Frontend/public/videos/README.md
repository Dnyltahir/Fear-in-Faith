# Served videos

- `simply get the book.MP4` — in git, works on Vercel.

Large episodes (`IMG_2388.MP4`, `talk to uncle sami.MP4`) live in the repo’s top-level **`videos/`** folder (gitignored).

## Local dev only (do **not** commit these symlinks)

Create symlinks so `/videos/...` works in `next dev`. They are **gitignored** because Vercel’s build copies `public/` and **breaks** on symlinks that point outside `Frontend/` (“Cannot copy … to a subdirectory of itself”).

```bash
cd Frontend/public/videos
ln -sf ../../../videos/IMG_2388.MP4 IMG_2388.MP4
ln -sf "../../../videos/talk to uncle sami.MP4" "talk to uncle sami.MP4"
```

## Production (Vercel)

Host the two large MP4s on a CDN / object storage and point `src/lib/content.ts` at those URLs, or use Git LFS + a host that serves the files. The deployed app does not include files from the repo-root `videos/` folder when Root Directory is `Frontend`.
