# dsvellal.com

Source for [dsvellal.com](https://dsvellal.com), the personal site of Datta Vellal.

The site is built with [Astro](https://astro.build). Every push to `main` builds it and deploys it to GitHub Pages through `.github/workflows/deploy.yml`.

## Running it locally

You need Node 22.12 or later.

```sh
npm ci
npm run dev
```

`npm run build` writes the static site to `dist/`.

## Where the content comes from

The Impact Record pages (`src/content/record/` and `src/content/record-summaries/`) are generated from a private archive of career records. A publishing script copies the whole tree here from a private repository, and each publish replaces everything, so changes made directly in this repository will be lost. Corrections go into the archive first.

The writing and images are not licensed for reuse.
