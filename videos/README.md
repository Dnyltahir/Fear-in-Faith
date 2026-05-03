# Episode videos (local / large files)

These two files are **not in git** (they exceed GitHub’s 100 MB per-file limit). Keep them in this folder on your machine for local development:

- `IMG_2388.MP4` — IQRA / Theodicy main chapter  
- `talk to uncle sami.MP4` — bonus path  

`simply get the book.MP4` lives in **`Frontend/public/videos/`** (tracked in git) so Vercel and other hosts can serve it without leaving the app directory.

The app loads episodes from **`/videos/...`** paths in `Frontend/src/lib/content.ts`. For production, you can upload large files to object storage or a CDN and point `content.ts` at those URLs, or use [Git LFS](https://git-lfs.github.com).
