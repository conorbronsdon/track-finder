# Ideas & Roadmap

Running list of feature ideas, deferred work, and things considered and skipped. Open-ended items are tracked as GitHub issues; this file holds the narrative and the "why not" items.

Open an [issue](https://github.com/conorbronsdon/track-finder/issues) with your own.

## Tracked in issues

| # | Idea | Status |
|---|------|--------|
| [#1](https://github.com/conorbronsdon/track-finder/issues/1) | Import tracklist from YouTube playlist URL | Planned |
| [#2](https://github.com/conorbronsdon/track-finder/issues/2) | Import tracklist from 1001tracklists URL | Investigating |
| [#3](https://github.com/conorbronsdon/track-finder/issues/3) | Import tracklist from MixesDB URL | Deferred to after #2 |
| [#4](https://github.com/conorbronsdon/track-finder/issues/4) | Create actual playlists on destination platforms (playlistify-style) | Parked — needs OAuth + backend |
| [#5](https://github.com/conorbronsdon/track-finder/issues/5) | Additional search platforms (Tidal, Bandcamp, Mixcloud, Deezer) | Wait for user demand |

## Context on the bigger ones

### 1001tracklists import (#2) — why it's harder than it looks
1001tracklists is now fully client-side rendered. A plain server fetch returns a page shell with "Please enable JavaScript for full functionality" and no track data. Existing open-source scrapers (e.g., [elte0/1001-tracklists-api](https://github.com/elte0/1001-tracklists-api)) target the older server-rendered layout and no longer work. Three real paths: headless browser (heavy), reverse-engineered JSON endpoint (lightest if it exists), bookmarklet/extension (most durable, different distribution model). Issue #2 has the full breakdown.

**Interim:** copy-paste flow. Parser handles 1001TL-specific artifacts (timestamps, `w/` overlays, `[ID]` lines, `[Label]` tags). See `parseTracklist` in `index.html`.

### Playlist creation (#4) — why it's a different product
Current app returns search links; user clicks through to add tracks manually. Writing playlists directly requires OAuth per platform, token management, user session state, encrypted token storage, and track-matching logic. That's a backend product, not an extension of Track Finder. Likely wants its own repo.

## Parked without an issue

### Import from a SoundCloud set description
Many DJ sets include a tracklist in the description. The existing parser already handles most of what you'd paste — not worth automating until it becomes a real pattern.

### Naming — renamed to Track Finder across the board
Renamed 2026-04-19 after the platform selector shipped: H1, page title, meta tags, README, GitHub repo (`conorbronsdon/track-finder`), and Vercel primary domain (`track-finder.vercel.app`). Old slugs 301 to the new ones, so existing stars, inbound links from the launch post, and bookmarks all keep working.

## Not planned

### Shazam-style ID of flips that only live on SoundCloud/YouTube
Suggested April 2026. Audio fingerprinting against an index of non-commercial releases is a fundamentally different app — indexing, ingestion, DMCA surface area, a real backend. Not an extension of this tool.
