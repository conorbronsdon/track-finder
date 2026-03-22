# SoundCloud Track Finder

A simple browser-based tool for turning tracklists into SoundCloud search links. Paste a tracklist, get clickable search links for every track.

## Usage

1. Open `index.html` in your browser
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
