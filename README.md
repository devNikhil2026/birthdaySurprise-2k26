# Happy Birthday — Setup Guide

Everything works out of the box with placeholder text and graceful
fallback visuals. Here's what to personalize before sending it.

## 1. Add your photos (`assets/images/`)
- `hero.jpg` — the background photo behind the hero heading
- `gallery-1.jpg` through `gallery-6.jpg` — the Memory Gallery grid
- `album-cover.jpg` — album art in the music player

Until you add a file, that spot shows a clean "add a photo" placeholder
instead of a broken image icon — so it's safe to preview before you've
added anything.

## 2. Add your song (`assets/music/`)
- Add your file as `song.mp3` (must be named exactly that, or update
  the `src` on the `<audio>` tag near the bottom of `index.html`)
- Music starts on the first tap/click anywhere on the page (browsers
  block audio from autoplaying without interaction — this is expected)

## 3. Edit your words
- **The letter** (Chapter-style reveal): open `assets/js/script.js`,
  edit the `CONFIG.letterLines` array at the very top
- **Hero heading, subtitle, button**: in `index.html`, inside
  `<section id="hero">`
- **Timeline cards, flip-card backs, reasons list, footer name/date**:
  also directly in `index.html` — search for the section by its
  `<!-- ===== -->` comment headers

## 4. Preview it
Open `index.html` directly in a browser, or run a local server from
this folder (e.g. `npx serve .`) for the most accurate preview.

## 5. Deploy it
Drag the whole `birthdayWebsite` folder into Netlify's deploy area, or
push it to any static host. No build step needed.
