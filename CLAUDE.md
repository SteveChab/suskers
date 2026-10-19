# Matt Susko

mattsusko.com: a one-page portfolio for Matt Susko, an abstract artist in Washington, PA. Visitors step through his art, pick a scene that tears it apart, and pick an overlay effect. The artist's name is spelled **Susko**.

## Structure

Static site on GitHub Pages, no build step. `CNAME` holds `mattsusko.com`. `_config.yml` keeps this file out of the published site.

- `index.html`: the whole app. Markup, the `images` array (title, alt text, file), the scene and effect lists, and all JavaScript are inline.
- `css/site.css`: tokens, base type, components (`.control`, `.btn`, `.field`, `.gate`, `.social`). `css/piece.css`: the frame, the top and bottom bars, the responsive layout.
- `js/piece.js`: play toggle, turning mark, reduced-motion copy for the motion warning. `js/jump.js`: skip-link focus.
- `images/`: the art, all JPEGs. `images/effects/`: the five overlay GIFs.
- `fonts/`: Roboto Mono only, self-hosted variable woff2.
- `share-card.jpg` (1200x630, Open Graph and Twitter), `favicon-32.png`, `icon.png`: all made from the piece titled 512.
- `robots.txt`, `sitemap.xml`: one address.
- `originals/`: untouched source files, gitignored, never published.

## Decisions

- **First image is 512.** It is also the favicon and the share card. `loadParams` falls back to `images[0]`, and the readout in the HTML is hard-coded to match, so change both together.
- **Adding art:** save a JPEG in `images/` (underscores for spaces, no spaces or `+` in names, 2000px or less on the long side, quality 82), then add an entry to the `images` array: `name` (the title), `desc` (the alt text, opening on the noun, no leading "a"), `url`. File names are case-sensitive on GitHub Pages; match them exactly. Never hotlink.
- **Titles** come from the file name when it reads like a title, otherwise from the alt text.
- **Social links:** Reddit, Tumblr, X, and Instagram, in the top bar and in the JSON-LD `sameAs`. `twitter:site` is `@mattsuskoartist`, matching the X address.
- **Preview tags** point at `https://mattsusko.com/`; change them together if the domain moves.
- **No JavaScript fallback.**
- **No outside requests.** Fonts and scripts are local.

## Design

- **One font, Roboto Mono.** Small text (readout, description, captions, field label, address box, warning body and buttons, hint) shares one style: `--meta-size` (.75rem), `--meta-tracking`, weight 400, lowercase for labels and captions, sentence case for real sentences. Headings are bold and larger: the name 1.3rem, the art title 1.15rem (1rem on phones).
- **The top bar, bottom bar, hint, and motion warning are light on near-black** (`#0a0a0a`), in light mode too. Set by custom properties on `.piece__head, .bar, .hint, .gate` in `piece.css`.
- **Tight chrome.** Side padding (`--shell-pad`) is .5rem to match top and bottom, so the art gets the room.
- **Controls are 40px squares**, the same height as the address box, with captions beneath. Social icons are 32px. WCAG 2.2 AA asks for 24px; do not go below that.
- **600px and up:** one bottom row: title and description, address box, controls.
- **Under 600px:** the address box is hidden. Title and description sit left of the controls. The scene and effect line stays in the DOM for screen readers but leaves the screen. A title clamps to one line and a description to four, and the bar has a 7rem minimum height so it keeps one height for every piece. Checked at 320px and 375px.
- **The motion warning** opens on the first request to play, not on load. Color Strobe and B&W Strobe flash on purpose and only run after the viewer accepts it.

## Checking a change

Serve the folder (`python3 -m http.server`) and check in Chrome, Firefox, and Safari engines at about 320px, 375px, 600px, 768px, and 1000px wide. The in-app browser caches CSS hard; add `?v=n` to the address. After touching the art list, confirm every `url` exists with exact capitalization, and step through all of the images checking that the bottom bar keeps one height on a phone. Stepping through pictures hundreds of times in seconds trips Safari's limit on history updates; a person never will.
