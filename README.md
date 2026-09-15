# Vivek Verma — Portfolio

Personal portfolio of Vivek Verma — B.Tech CSE student at SRM University AP, building full-stack web applications and AI-powered solutions. A single-page, GSAP-animated site with a warm light theme, scroll-driven storytelling, and a small hand-rolled design-token system.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

The page renders as one smooth-scrolled flow of sections, in order: **Hero** (with an ambient network-constellation canvas that gently repels nodes around the pointer and draws temporary constellation lines near the cursor), **About** (word-by-word scroll reveal of the intro, quick-facts grid, and resume view/download buttons), **Skills** (28 technologies across 6 groups, with Simple Icons CDN logos and letter fallbacks), **Journey** (education and experience timelines whose cards unblur and activate on scroll while a vertical line fills with progress), **Projects** (4 featured builds on 3D-tilt cards with a cursor-tracking spotlight, tech tags, and live demo / GitHub links), **Certifications** (a scroll-pinned section that keeps a certificate list and image viewer in sync as you scroll or hover, with 3D tilt on the certificate images, issuer · date metadata lines, and a 01/04 position counter), and **Contact** (Formspree-powered form, availability status pill, email/phone/location details, and a dark three-column footer with quick links). A custom cursor follows the pointer site-wide, and the navbar scrolls smoothly to each section.

Accessibility and performance are part of the design: `prefers-reduced-motion` is respected throughout (the canvas drops to a slowed ~15% idle drift, pointer-repel and constellation effects switch off, tilt is disabled, and CSS transitions are neutralized), the canvas caps its frame rate and trims its node count on low-power devices, certificate and project imagery lazy-loads where appropriate, and ESLint 9 with the React Hooks and React Refresh plugins guards the codebase.

To run it locally:

```bash
git clone https://github.com/vivekcode12345/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
```

Designed & built by Vivek Verma.
