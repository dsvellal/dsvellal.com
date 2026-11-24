# dsvellal.com

Run `npm run dev` from this directory and open http://127.0.0.1:4322/. The preview requires Python 3 and serves the finished portfolio in `live/`, including its extensionless page addresses.

The editable Astro portfolio lives in the private catalogue under `site-impact/`. From the catalogue root, `python3 -I scripts/publish_impact.py` builds, checks and copies the public files here. This command only updates the local checkout. GitHub Pages deploys `live/` from the `site-deploy` branch.

The earlier public records, claims, essays and media remain in `src/` and `public/`. Corrections belong in the private catalogue before generating the next public build.

The writing and images are not licensed for reuse.
