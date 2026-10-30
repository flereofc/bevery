# bevery-web

Showcase and download site for Bevery. Plain HTML, CSS, and a small script. No build step, nothing to install. It explains the platform, reflects the latest release, and hands people the Windows, Linux, and Android builds.

## Run it locally

Open `index.html` in a browser, or serve the folder so the download links behave like production:

```
npx serve .
```

## Current downloads

The site ships the official Bevery 0.7.0 beta assets:

| Platform | File | Size |
| --- | --- | --- |
| Windows x64 | `downloads/Bevery_0.7.0_x64-setup.exe` | 53.2 MB |
| Linux x64 (AppImage) | `downloads/Bevery-0.7.0-x86_64.AppImage` | 138.0 MB |
| Linux x64 (portable tarball) | `downloads/Bevery-0.7.0-linux-x64.tar.gz` | 136.1 MB |
| Android (public beta) | `downloads/bevery-mobile-public-beta.apk` | 5.1 MB |

The Windows, Linux, and Android cards in `index.html` link to these files directly. The hero button detects the visitor's platform and relabels itself, and the matching download card gets a "Your platform" badge.

## Publishing a new version

1. Build the release in the app repo. The current assets come from:
   - Windows: `npm run build:win` (Tauri NSIS) or `npm run build:win:electron`.
   - Linux: `npm run build:linux` (AppImage + tarball).
   - Android: `npm run android:apk` / the release workflow.
2. Copy the new files into `downloads/` using the official release names.
3. Update `index.html`:
   - The version strings in the hero, release card, download heading, and footer.
   - The three `href` values on the platform cards (plus the Linux tarball link).
   - The size labels shown under each download button.
   - The `What's new` section so it reflects the new release.
4. Regenerate the SHA-256 block in the "Verify your download" details. On Windows:

   ```powershell
   Get-ChildItem downloads -File | Get-FileHash -Algorithm SHA256
   ```

5. Delete the previous installer files from `downloads/` so nobody can grab a stale build.

The 0.7.0 release was a security update, so the old 0.2.0 installer was removed from this repo.

## Design

The site mirrors the app's **Field Notes** design system:

- Warm paper `#f4ecdd`, forest ink `#1c2a23`, pine `#1d5a44`, persimmon `#d45a3f`, marigold `#dfa93f`.
- Fraunces for display type, Instrument Sans for UI, IBM Plex Mono for labels and metadata.
- Flat colour, hard offset shadows, 2–4px corners, grain texture, and rotated marks.
- Light and dark themes. The toggle in the header stores the choice in `localStorage`; light is the default.

The design tokens live at the top of `styles.css`. Change them there rather than patching individual components.

## Deploying

The site is fully static, so it works on Firebase Hosting, Netlify, GitHub Pages, or any static host. If you use Firebase, run `firebase init` in this directory and deploy with:

```
npx firebase-tools deploy --only hosting
```

Make sure large installers (the Linux builds are over 100 MB) are served by a host that allows large static assets. If a host caps file size, move the installers to GitHub Releases and point the download cards at those URLs instead.
