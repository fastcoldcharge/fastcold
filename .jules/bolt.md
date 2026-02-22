# Bolt - Performance Learnings

## 2025-02-22 - Static Export Optimization for Zero-Dependency Hosting
**Learning:** For landing pages that require high reliability and low latency, Next.js `output: 'export'` combined with `unoptimized: true` for images (if external sources are used or if a separate image optimizer isn't available) ensures the fastest possible Time to First Byte (TTFB) on static hosts.
**Action:** Always verify that all assets (images, icons) use relative paths in the generated `out/` directory to prevent breakage in sub-directory deployments.
**Action:** Use `priority` attribute on the Hero image to ensure the Largest Contentful Paint (LCP) is optimized during initial load.
