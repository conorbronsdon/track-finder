# Ideas & Roadmap

Running list of feature ideas, deferred work, and things considered and skipped. Open-ended items are tracked as GitHub issues; this file holds the narrative and the "why not" items.

Open an [issue](https://github.com/conorbronsdon/track-finder/issues) with your own.

## Tracked in issues

| # | Idea | Status |
|---|------|--------|
| [#1](https://github.com/conorbronsdon/track-finder/issues/1) | Import tracklist from YouTube playlist URL | Shipped (`api/import/youtube.js`) |
| [#2](https://github.com/conorbronsdon/track-finder/issues/2) | Import tracklist from 1001tracklists URL | Closed — bookmarklet covers it |
| [#3](https://github.com/conorbronsdon/track-finder/issues/3) | Import tracklist from MixesDB URL | Closed — bookmarklet covers it |
| [#4](https://github.com/conorbronsdon/track-finder/issues/4) | Create actual playlists on destination platforms (playlistify-style) | Spotify MVP shipped; open for more platforms |
| [#5](https://github.com/conorbronsdon/track-finder/issues/5) | Additional search platforms (Tidal, Bandcamp, Mixcloud, Deezer) | Shipped in PR #8 |

## Context on the bigger ones

### 1001tracklists / MixesDB import (#2, #3) — how they got resolved
1001tracklists is now fully client-side rendered. A plain server fetch returns a page shell with "Please enable JavaScript for full functionality" and no track data. Existing open-source scrapers (e.g., [elte0/1001-tracklists-api](https://github.com/elte0/1001-tracklists-api)) target the older server-rendered layout and no longer work. Three real paths were on the table: headless browser (heavy), reverse-engineered JSON endpoint (lightest if it exists), bookmarklet/extension (most durable).

**Resolution:** the bookmarklet won. Rather than build and maintain a per-site server fetcher for each source, `bookmarklet.html` scrapes the tracklist from *any* page (1001tracklists, MixesDB, SoundCloud descriptions, Reddit) in the user's already-authenticated tab and hands it to Track Finder — sidestepping the anti-bot problem entirely. The 1001TL-aware parser cleanup (timestamps, `w/` overlays, `[ID]` lines, `[Label]` tags) backs up the copy-paste flow. See `parseTracklist` in `index.html`. Both #2 and #3 closed against this single durable approach.

### Playlist creation (#4) — Spotify MVP shipped client-side
Originally scoped as a separate backend product (OAuth per platform, token storage, session state). Spotify turned out not to need a backend: the "Create in Spotify" button runs the full Authorization Code + PKCE flow client-side (no client secret, token held in-memory only and never persisted), creates a private playlist, matches each track via the search API, and reports unmatched tracks back. See the `spotify*` functions in `index.html`. Live use still needs the owner to set a real `SPOTIFY_CLIENT_ID` (currently a placeholder). The issue stays open for the harder platforms — Apple Music, YouTube Music (no public write API) — which are still a different-product problem.

## Parked without an issue

### Import from a SoundCloud set description
Many DJ sets include a tracklist in the description. The existing parser already handles most of what you'd paste — not worth automating until it becomes a real pattern.

### Naming — renamed to Track Finder across the board
Renamed 2026-04-19 after the platform selector shipped: H1, page title, meta tags, README, GitHub repo (`conorbronsdon/track-finder`), and Vercel primary domain (`track-finder.vercel.app`). Old slugs 301 to the new ones, so existing stars, inbound links from the launch post, and bookmarks all keep working.

## Not planned

### Shazam-style ID of flips that only live on SoundCloud/YouTube
Suggested April 2026. Audio fingerprinting against an index of non-commercial releases is a fundamentally different app — indexing, ingestion, DMCA surface area, a real backend. Not an extension of this tool.
