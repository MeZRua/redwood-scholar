<div align="center">
  <img src="./logo.png" alt="Redwood Scholar Logo" height="100"/>
</div>

# Redwood Scholar

**English** · [中文](README_cn.md) · [Changelog](CHANGELOG.md)

Redwood Scholar is a warm, research-first academic homepage template built with Next.js, Tailwind CSS, and TypeScript.

It started from a PRISM-based engineering foundation, but it is now being reshaped into its own template direction:

- red-toned editorial visual system
- configuration-driven academic content
- BibTeX-powered publications
- blog posts with formula support
- collapsible homepage sections
- visitor globe / visitor map support

![Redwood Scholar Preview](screenshot.png)

## Features

- `content/` driven setup using `TOML`, `Markdown`, and `BibTeX`
- publication parsing from `content/publications.bib`
- formula-friendly blog via Markdown + math rendering
- homepage modules for bio, news, selected publications, research signals, and recent writing
- configurable visitor globe block
- static export for GitHub Pages / Netlify / Cloudflare Pages
- bilingual structure via `content/` and `content_zh/`

## Quick Start

```bash
git clone https://github.com/MeZRua/redwood-scholar.git
cd redwood-scholar
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Content Structure

```text
content/
├── config.toml          # site info, navigation, feature flags
├── about.toml           # homepage section layout
├── bio.md               # homepage bio
├── news.toml            # news items
├── publications.bib     # papers
├── blog/                # blog posts with frontmatter
└── *.toml / *.md        # CV, awards, services, teaching, etc.
```

Main customizable areas:

- `content/config.toml`: site title, author, social links, visitor globe, feature flags
- `content/about.toml`: homepage section composition
- `content/publications.bib`: publications and selected papers
- `content/blog/*.md`: blog posts and math notes

## Supported Page Types

- `text`
- `card`
- `publication`
- `blog`

## Deployment

Redwood Scholar uses static export:

```bash
npm run build
```

This generates `out/`, which can be deployed directly on Netlify or other static hosts.

For Netlify:

- Build command: `npm run build`
- Publish directory: `out`
- Node version: `22`

## Status

This repository is currently in active customization and cleanup. Some docs and deployment details are still being updated from the inherited base template.

## License

MIT
