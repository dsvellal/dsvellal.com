# dsvellal.com

Source for [dsvellal.com](https://dsvellal.com), the personal site of Datta Vellal.

The site is a finished static build in `live/`. There are two branches. `main` holds everything reviewed and never deploys by itself. `site-deploy` is the only branch GitHub Pages deploys, through `.github/workflows/deploy.yml`; it is moved to `main` by `scripts/promote_site.sh` in the private repository. Nothing is built here: the site is built, checked and staged by the private catalogue repository (`scripts/publish_impact.py`), so corrections go there. The earlier Astro source (`src/`, `public/`, `astro.config.mjs`) is kept for reference only and is not deployed.

## Previewing it locally

Open `live/index.html` through any static server, for example `npx serve live`.

## Where the content comes from

The Impact, Talks and Socials pages (`src/content/record/`, `src/content/record-summaries/` and `src/content/talks/`) are generated from a private archive of career records. A publishing script copies the whole tree here from a private repository, and each publish replaces everything, so changes made directly in this repository will be lost. Corrections go into the archive first.

The writing and images are not licensed for reuse.
