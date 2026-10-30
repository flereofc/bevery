# bevery-web

Showcase site for Bevery. Plain HTML, CSS, and a small script. No build step, nothing to install. It does one job: explain the platform and hand people the Windows installer.

## Run it locally

Open `index.html` in a browser, or serve the folder so the download links behave like production:

```
npx serve .
```

## Publishing a download

The site links to two files, mirrored in the hero section and the download section:

- `downloads/Bevery-Setup-0.2.0-x64.exe`
- `downloads/Bevery-Setup-0.2.0-x86.exe`

Both file names are referenced in `index.html` (they appear as href values on the download buttons). When you ship a new version:

1. Build the installer in the app repo. The current one is the Tauri build: `npm run build:win`. The installer lands at `src-tauri/target/release/bundle/nsis/Bevery_<version>_x64-setup.exe`. The Electron fallback (`npm run build:win:electron`) outputs a much bigger NSIS installer into `release/`.
2. Copy the installer into this repo's `downloads/` folder and rename it to `Bevery-Setup-<version>-x64.exe`.
3. Search `index.html` for the old version string `0.2.0` and replace the hrefs, the version chip in the hero, and the size line if the size changed.

Currently the app repo ships the x64 NSIS build via `npm run build:win` (Tauri). The x86 button is wired up for when you start shipping a 32 bit build too; until then it reads as "coming soon".

## Deploying

The site is fully static, so it works on Firebase Hosting, Netlify, GitHub Pages, or any static host. If you use Firebase, `firebase.init` the directory and deploy with `npx firebase-tools deploy --only hosting`.
