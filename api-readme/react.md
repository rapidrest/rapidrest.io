# @rapidrest/react

```bash
npm install @rapidrest/react
```

Server-side-rendered React pages, layered directly on top of [`@rapidrest/service-core`](/docs/api/service-core) — no second framework, dev server, or build pipeline running alongside it.

For narrative, task-oriented documentation, start with [SSR React](/docs/ssr-react).

## Quick links

- [`ReactRoute`](/docs/api/react/classes/ReactRoute) — the route class you extend to mount a React app (see [Getting Started](/docs/ssr-react/getting-started)).
- [`ReactService`](/docs/api/react/functions/ReactService) — the decorator for injecting server-side data-fetching services (see [Data Fetching](/docs/ssr-react/data-fetching)).

:::note[`./client` and `./vite` subpaths]
`@rapidrest/react/client` (`hydrateRoute`, `getHydrationProps`) and `@rapidrest/react/vite` (`createViteConfig`) each build against their own tsconfig and aren't included in this generated reference. They're documented by hand, with full signatures, in [Hydration & Production Builds](/docs/ssr-react/hydration).
:::

Everything else is in the sidebar, generated directly from source.
