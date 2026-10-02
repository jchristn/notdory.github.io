<p align="center">
  <img src="assets/logo.png" alt="NotDory" width="192" height="192">
</p>

# notdory.ai

Marketing website for [NotDory](https://github.com/jchristn/NotDory), durable self-hosted memory for AI agents. Hosted on GitHub Pages at **[notdory.ai](https://notdory.ai)**.

Your agents forget everything. NotDory doesn't.

## Development

Plain static site: no build step, framework, or runtime dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Files

- `index.html` - the complete page
- `styles.css` - styling, with dark (default) and light themes driven by CSS variables
- `script.js` - theme toggle, mobile menu, harness tabs, copy buttons, and scroll animations
- `assets/` - logo, favicon, and icon
- `CNAME` - GitHub Pages custom domain (`notdory.ai`)

## Deployment

Pushing to `main` deploys through GitHub Pages. Product facts on the page (ports, default credentials, installer paths, benchmark numbers) come from the NotDory repository's README, `docs/`, and `benchmarks/RESULTS.md`; update them here when those change.
