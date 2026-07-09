# @rapidrest/service-core

```bash
npm install @rapidrest/service-core
```

The web framework itself, built on [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js): routing, models and persistence, auth and RBAC, background jobs, the event bus, and automatic OpenAPI generation. If you scaffolded your project with `rapidrest generate server`, you're already using this package — the CLI wires it up for you.

For a detailed explanation of how these work and fit together, start with [Getting Started](/docs/getting-started).

## Quick links

- [`RouteDecorators`](/docs/api/service-core/@rapidrest/namespaces/RouteDecorators) — `@Route`, `@Get`/`@Post`/etc., and the request parameter decorators (see [Routing & Controllers](/docs/routing-controllers)).
- [`PersistenceDecorators`](/docs/api/service-core/@rapidrest/namespaces/PersistenceDecorators) / [`ModelDecorators`](/docs/api/service-core/@rapidrest/namespaces/ModelDecorators) — `@Entity`, `@Column`, `@DataStore`, `@Cache`, and friends (see [Models & Persistence](/docs/models-persistence)).
- [`ModelRoute`](/docs/api/service-core/classes/ModelRoute) / [`CRUDRoute`](/docs/api/service-core/classes/CRUDRoute) — the auto-CRUD base classes (see [Auto CRUD Routes](/docs/auto-crud-routes)).
- [`BackgroundService`](/docs/api/service-core/classes/BackgroundService) / [`BackgroundServiceManager`](/docs/api/service-core/classes/BackgroundServiceManager) — see [Background Jobs](/docs/background-jobs).

Everything else is in the sidebar, generated directly from source.
