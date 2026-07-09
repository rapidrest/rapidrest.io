# @rapidrest/core

```bash
npm install @rapidrest/core
```

The foundation every other RapidREST package builds on: the `ObjectFactory` dependency-injection container, the `ClassLoader` that powers [auto-discovery](/docs/core-concepts/auto-discovery), and a set of shared utilities (JWT, [messaging](/docs/events-notifications/messaging), [alerting](/docs/events-notifications/alerts), telemetry) used throughout the framework. You'll rarely install this directly — `@rapidrest/service-core` depends on it — but its exports are what you're actually calling when you write `@Inject`, `@Config`, or `@Logger`.

For the detailed explanation of how these work and fit together, see [Core Concepts](/docs/core-concepts).

## Quick links

- [`ObjectFactory`](/docs/api/core/classes/ObjectFactory) — the dependency injection container itself.
- [`ObjectDecorators`](/docs/api/core/@rapidrest/namespaces/ObjectDecorators) — `@Inject`, `@Config`, `@Logger`, `@Init`, `@Destroy`, and friends.
- [`ClassLoader`](/docs/api/core/classes/ClassLoader) — the auto-discovery mechanism.
- [`JWTUtils`](/docs/api/core/classes/JWTUtils) — JWT creation/verification, used by both auth strategies.

Everything else is in the sidebar, generated directly from source.
