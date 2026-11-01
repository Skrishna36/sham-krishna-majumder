# Sham Krishna Majumder — academic portfolio

A dependency-free static site (HTML, CSS, vanilla JavaScript). No build step.

## Run locally

Open `index.html` directly, or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000.

## Where to edit things

Almost everything lives in **`js/content.js`**: text, research cards, projects, timeline, skills, links and the "last updated" date. The page is rendered from it by `js/app.js`.

| To change | Edit |
|---|---|
| Email, LinkedIn, Google Scholar | `links.email`, `links.linkedin`, `links.scholar` (null hides/placeholders them) |
| Portrait | put a photo in `assets/img/` and set `person.portrait` |
| Research / project figures | set `figure.src` (e.g. `"assets/img/binder.png"`) and optionally add an `alt` |
| Project code/report link | set `link` on the project |
| Artwork | set `src` on items in `interests` |
| CV | save your PDF as `assets/cv/Sham_Krishna_Majumder_CV.pdf` (or change `links.cv`) |
| Last-updated date | `lastUpdated` (YYYY-MM-DD) |
| Colours / fonts | CSS variables at the top of `css/styles.css` |

## Items still to supply (explicit placeholders)

- Email address and LinkedIn URL: no CV was available when this was built, so they were not invented.
- CV PDF, portrait, all research figures and artwork.
- After deployment, add the real site URL to `<meta property="og:url">` in `index.html`, plus an `og:image`.

Image tips: export figures as WebP/PNG/JPEG, up to ~1600 px wide, and keep each under ~300 KB.

## Deploy

Any static host works; publish the folder root.

- **GitHub Pages**: push to a repository, then Settings → Pages → deploy from branch `main`, `/ (root)`.
- **Netlify / Cloudflare Pages / Vercel**: drag-and-drop the folder, or connect the repo with no build command and `.` as the publish directory.

## Notes

- Fonts (Source Serif 4, Inter) load from Google Fonts; system fonts are the fallback.
- Dark mode follows the system setting until the toggle is used, then the choice is remembered.
- Motion is disabled under `prefers-reduced-motion`.
