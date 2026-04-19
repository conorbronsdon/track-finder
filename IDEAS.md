# Ideas & Roadmap

Running list of feature ideas, deferred work, and things considered and skipped. Open an [issue](https://github.com/conorbronsdon/track-finder/issues) with your own.

## On deck

### More platforms
Easy additions — same URL-template pattern as the existing five.
- **Tidal** — `https://tidal.com/search?q=<query>`
- **Bandcamp** — `https://bandcamp.com/search?q=<query>`
- **Mixcloud** — `https://www.mixcloud.com/search/?q=<query>`
- **Deezer** — `https://www.deezer.com/search/<query>`

### Import from a 1001tracklists URL
Harder than initially scoped: 1001tracklists is now fully client-side rendered — a server-side fetch returns "Please enable JavaScript for full functionality" with no track data in the HTML. Existing open-source scrapers (elte0/1001-tracklists-api) were written for an older server-rendered version and no longer work. Paths forward:
1. **Headless browser** on a Vercel serverless function (Puppeteer or Playwright). Real memory/cold-start cost, may need to leave hobby tier, fragile against redesigns.
2. **Reverse-engineer the client-side JSON endpoint** the page calls to populate the tracklist. Lightest if it exists and is stable.
3. **Bookmarklet / browser extension** — runs in the user's already-authenticated tab, scrapes the DOM locally, opens Track Finder with tracks pre-filled. Sidesteps the server-side anti-bot problem entirely. Different distribution model.

Interim: copy-paste flow. User selects the tracklist on the 1001TL page, pastes into the textarea. Parser needs 1001TL-aware cleanup (strip timestamps, `w/` overlay markers, `[ID]` entries, `[Label]` tags).

### Import from MixesDB URL
MixesDB has a larger catalog of older sets than 1001TL and is more static HTML. Same evaluation needed — likely easier than 1001TL. Defer until 1001TL approach is settled; reuse the same serverless-fetch pattern.

### Import from a YouTube playlist URL
YouTube Data API v3 `playlistItems.list` returns video titles — clean path. Needs an API key, so requires a Vercel serverless function (don't ship the key to the client). Heavy lift is title cleanup: strip `[FREE DL]`, `[Official Video]`, `(Prod. by...)`, `【MV】`, leading channel prefixes, trailing label tags. Recommended next URL-paste feature after 1001TL copy-paste lands.

### Create actual playlists (playlistify.app-style)
Bigger scope: instead of returning search links, push the tracks directly into a SoundCloud/Spotify/Apple Music/YouTube playlist on the user's account. Needs OAuth flows per platform, user auth tokens, session management, and a real backend — this is a different product (probably a different repo) rather than an extension of Track Finder. Reference: [playlistify.app](https://playlistify.app). Park for now, revisit after the search-link product has real usage.

### Import a YouTube playlist as a tracklist
Paste a YouTube playlist URL, fetch video titles, clean them up, feed into the existing parser.

- Fetch via YouTube Data API (`playlistItems.list`) — needs API key, ideally behind a small Vercel serverless function so the key isn't in the client
- Title cleanup is the hard part, not the fetch: strip `[FREE DL]`, `[Official Video]`, `(Prod. by...)`, `【...】` markers, leading channel prefixes, trailing release-label tags
- Stretch: also support Spotify playlists via Web API

### Import from a SoundCloud set description
Many DJ sets include a tracklist in the description. Could be:
- A pasted-description flow (the existing parser already handles most of these formats)
- Automated via the SoundCloud API if I can get app approval (hard since 2021)

## Considered

### Naming — renamed to Track Finder across the board
Renamed 2026-04-19 after the platform selector shipped: H1, page title, meta tags, README, GitHub repo (`conorbronsdon/track-finder`), and Vercel primary domain (`track-finder.vercel.app`). Old slugs 301 to the new ones, so existing stars, inbound links from the launch post, and bookmarks all keep working.

## Not planned

### Shazam-style ID of flips that only live on SoundCloud/YouTube
Suggested April 2026. Audio fingerprinting against an index of non-commercial releases is a fundamentally different app — indexing, ingestion, DMCA surface area, and probably a real backend. Not an extension of this tool.
