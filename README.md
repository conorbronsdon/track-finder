# SoundCloud Track Finder

A simple browser-based tool for turning tracklists into SoundCloud search links. Paste a tracklist, get clickable search links for every track.

**Live site:** https://soundcloud-track-finder.vercel.app

## Usage

1. Visit https://soundcloud-track-finder.vercel.app (or open `index.html` locally)
2. Paste a tracklist (one track per line)
3. Click **Generate**
4. Click **Search** next to each track to find it on SoundCloud
5. Click **Done** to mark tracks as you add them to your playlist

Progress is saved in your browser's localStorage, so you can close the tab and come back later.

## Tracklist Format

```
Artist- Track Name
Artist & Artist2- Track Name (Remix)
```

Also handles `Artist — Title`, numbered lists (`1. Artist- Title`), and bullet points.

## Features

- No backend, no dependencies — just a single HTML file
- Progress tracking with localStorage persistence
- Saved playlists you can return to
- Ctrl+Enter shortcut to generate

## Deployment

Hosted on Vercel as a static site. The project is linked to this repo, so pushes to the default branch auto-deploy.

To deploy your own fork:

```bash
npx vercel        # preview deployment
npx vercel --prod # production
```

No build step or `vercel.json` required — Vercel serves `index.html` from the repo root.

---

## Disclaimer

*All views, opinions, and statements expressed on this account are solely my own and are made in my personal capacity. They do not reflect, and should not be construed as reflecting, the views, positions, or policies of Modular. This account is not affiliated with, authorized by, or endorsed by Modular in any way.*
