# Episode videos

These files are **not in git** (they exceed GitHub’s 100 MB per-file limit). Keep them here on your machine for local development:

- `IMG_2388.MP4` — IQRA / Theodicy main chapter  
- `talk to uncle sami.MP4` — bonus path  

`simply get the book.MP4` is small enough and **is** tracked in the repository.

For production, upload the large files to object storage or a CDN and point `Frontend/src/lib/content.ts` at those URLs, or use [Git LFS](https://git-lfs.github.com).
