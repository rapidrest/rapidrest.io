# rapidrest.io

The documentation and marketing website for [RapidREST](https://github.com/rapidrest), a TypeScript framework for rapidly building REST APIs with first-class server-side-rendered React support. Built with [Docusaurus](https://docusaurus.io/).

## Installation

```bash
yarn install
```

## Local Development

```bash
yarn start
```

This starts a local dev server and opens a browser window. Most changes are reflected live without restarting the server.

## Build

```bash
yarn build
```

Generates static content into the `build` directory, which can be served by any static hosting provider.

## Type checking

```bash
yarn typecheck
```

## Deployment

The site is hosted on GitHub Pages at the custom domain **rapidrest.dev**. Deployment is automatic: every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it via GitHub's official Pages deployment action — no manual `docusaurus deploy` step needed.

One-time repo setup (already done for this repo, documented here in case it's ever needed again — e.g. after a repo transfer):

1. **Settings → Pages → Build and deployment → Source**: set to **GitHub Actions** (not "Deploy from a branch").
2. **Settings → Pages → Custom domain**: enter `rapidrest.dev`. GitHub will verify DNS and provision an HTTPS certificate; check **Enforce HTTPS** once it's available.
3. At the domain registrar for `rapidrest.dev`, add:
   - `A` records for the apex domain pointing to GitHub Pages' IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `AAAA` records for IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - (optional) a `CNAME` record for `www` → `rapidrest.github.io`, if `www.rapidrest.dev` should also resolve

The `static/CNAME` file in this repo (containing `rapidrest.dev`) is what tells GitHub Pages which custom domain to serve the build under — it's copied into `build/` on every deploy, so the custom domain setting persists across deploys automatically.

> [!NOTE]
> `.dev` domains are on the HSTS preload list, meaning browsers *require* HTTPS for them with no fallback — make sure "Enforce HTTPS" is checked in Pages settings once available, or the domain won't load at all until it is.

## Contributing

Documentation content is sourced from the RapidREST framework repos under [github.com/rapidrest](https://github.com/rapidrest) — `core`, `service-core`, `react`, `cli`, and `petstore_example`. Issues and PRs are welcome.

## License

MIT
