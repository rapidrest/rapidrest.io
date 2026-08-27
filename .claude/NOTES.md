# rapidrest.dev — Design Decisions & Session Notes

This file exists so that Claude sessions working in this repo don't re-litigate settled
decisions or re-discover the same issues from scratch. It is local to this repo (not tied to
any one machine's global Claude memory), so it travels with the code.

**Maintenance rule:** when a standing decision changes, update the section below in place
(don't just append a contradiction lower down). When a new investigation/session produces a
decision, finding, or reverted approach worth remembering, add a dated entry under Session Log.
Keep entries terse — this is a reference, not a transcript.

## Standing design decisions & constraints

- **Commit discipline.** Don't `git commit` unless explicitly asked, even after a full
  review-and-fix cycle with passing tests. Leave changes staged/unstaged and say so.

- **Prose style for reference pages** (Helm/CLI parameter references, deployment guides, and
  similar). Minimize em dashes (" — "); split into separate sentences instead. Don't
  over-describe: cut tangential detail, restated context already on a sibling page, and
  generic/obvious boilerplate — but reference tables (settings, parameters, dependencies) are
  the exception and should stay exhaustive. For a Helm chart's values, follow the Bitnami
  convention: a dedicated page with `## Architecture` (diagram + pod/service topology),
  `## Prerequisites`, `## Configuration and installation details` (narrative subsections per
  config area), then `## Parameters` as a **single** `| Name | Description | Value |` table
  (not grouped into per-category sub-tables) with literal default values in backticks. Prefer
  numbered steps for procedures. Use concrete example values over `<placeholder>` syntax where
  a real one works. Document one primary path, not every alternative, unless asked for both.

- **Audience level for conceptual/onboarding pages** (Getting Started, Core Concepts, HTTP
  Engine, and — per stated intent — eventually the rest of the narrative docs). Target reader:
  someone who has built **one Express.js or Next.js project before**, not an expert, not a
  total beginner. Don't explain what `npm install`, a database, CRUD/REST/middleware, or `curl`
  are. Do explain what's actually novel about RapidREST (decorator-driven auto-discovery and
  DI, aspect-oriented programming as the unifying idea), stated confidently on its own terms.
  **Don't lean on repeated named comparisons to Express/Next** ("unlike `app.use()`...",
  "similar to `next dev`...") — the site is selling RapidREST, not advertising the alternative.
  A brief, brand-free nod to prior backend experience in an opening paragraph is fine; a
  running comparison throughout the page is not. A dedicated migration guide (not yet written)
  is the right home for direct, sustained Express/Next comparisons.

## Session Log

### 2026-08-26 — Framework-alignment pass + Auth/Plugins restructure + doc voice calibration

- Full pass reconciling the docs site against the current state of all 7 framework repos
  (core, service-core, auth, auth-server, react, cli, plus the docs site itself). Fixed
  decorator/API drift that had made several code samples non-functional (`@RedisConnection` →
  `@Redis`, `@RequireRole` → `@RequiresRole`, a fabricated `@MongoRepository` decorator that
  never existed), documented previously-uncovered features (`@Transactional`, MFA recovery
  codes, `@RequiresElevation`, SSR React static export and multi-app support, `generate auth`,
  `doctor`/`upgrade`), and regenerated the typedoc API reference from source.
- Restructured the auth-related docs: **Auth & RBAC** now covers only the native
  `service-core` JWT/RBAC primitives; the `@rapidrest/auth` library moved to a new top-level
  **Plugins** section (`docs/plugins/auth-library/`) alongside **SSR React**
  (`docs/plugins/ssr-react/`, moved from a standalone top-level section); **Auth Server**
  became its own top-level section about the `auth-server` reference-implementation project
  specifically (what it is, its React UX, how to extend it, how to deploy it), not the library.
- `docs/auth-server/deployment/` split into `docker.mdx` and `helm.mdx`, each following the
  Bitnami-style structure above (Architecture/Prerequisites/Configuration details/Parameters).
- **Open items flagged to the user, not yet resolved:** the Helm chart's Dependencies table
  lists `@bitnami/postgresql`, but `helm/Chart.yaml` only depends on `mongodb`/`redis` — the
  chart appears to be Mongo-only today despite Docker Compose supporting both. `values.yaml`
  also has an unused `common.storageClass`/`common.logs.level` block not referenced by any
  template. Separately (found while auditing the CLI): `cli`'s `generate route --no-test` flag
  is referenced in its own examples/README but never registered, so it currently errors.
- Began a beginner-friendly rewrite of the conceptual docs (Getting Started, all of Core
  Concepts including a new **Decorators & Aspects** page, all of HTTP Engine) per the audience
  calibration above — arrived at after two rounds of correction (first too basic/ELI10, then
  over-indexed on Express/Next comparisons). **Still needs the same pass:** Routing &
  Controllers, Models & Persistence, Auto CRUD Routes, Default Routes, Background Jobs, Events
  & Notifications, Auth & RBAC, Testing, Deployment.
- Applied the "one prior Express/Next project" calibration to Core Concepts specifically:
  removed a from-scratch regex explainer in Auto-Discovery, tightened coddling phrases
  ("you don't need to memorize this table") in Configuration, and trimmed hand-holding
  transitions in Decorators & Aspects and Dependency Injection. No content was cut that
  explains something genuinely novel (decorators/AOP, the DI container) — those stayed at
  full depth, since even an experienced Express/Next developer hasn't necessarily met them.
  The distinction going forward: cut explanations of things the target reader already knows,
  keep (and don't rush) explanations of things RapidREST does differently.
- Updated `docs/intro.mdx` for accuracy, not voice, the user had already rewritten this page to
  the prose/style they want, it only needed a content refresh: fixed a stale `@ReactService`
  claim (the SSR entry point is `ReactRoute`; `@ReactService` is for injecting data-fetching
  services into a page, not for mounting one), and updated the RapidREST Libraries table to
  reflect `react`/`auth` now being documented as opt-in plugins with a pointer to `auth-server`.
  **The History section is intentionally untouched, always leave it exactly as written.**
- Revamped `docs/intro.mdx`'s Core Features section into the "sell it" pitch it's meant to be.
  Old version buried the framework's actual differentiators (HTTP engine performance, the full
  auth system, aspect-oriented decorators) under generic bullets, and never mentioned the CLI
  scaffolding workflow at all. New version leads with concrete, verifiable numbers pulled
  straight from `docs/performance.mdx` (up to 28% more throughput than Express/Fastify on
  identical business logic; a 14x cache-hit speedup on `get_pet`, computed from that page's own
  cache/RBAC ablation table) rather than unverifiable marketing language. Every claim traces to
  a real page/decorator/class from the current codebase, this is meant to stay a place future
  sessions add a bullet when a new differentiated feature ships, not just prose to polish.
- **Nuance on the "don't lean on named Express/Next comparisons" rule** (see the audience-level
  standing decision above): that rule is about not peppering general narrative prose with
  repeated "unlike Express..." asides. It does NOT rule out a single, deliberate, honest
  code-level comparison when the user asks for one to make a specific point land, as in
  `docs/core-concepts/aspect-oriented-programming.mdx`'s opening example, which now shows real,
  idiomatic Express (middleware functions, `req.params`, router registration) side by side with
  the RapidREST equivalent. The key to keeping this honest: don't strawman the other framework.
  Express's router already parses path params and already supports composable middleware, say
  so, then make the sharper and true point instead of a false one (here: the auth rule and the
  handler it protects live in two different files in Express, held together only by whoever
  remembered to wire them up at the router; a decorator sits directly on the method it governs).
- Full rewrite of HTTP Engine (7 pages now, was 5): Overview, **Error Handling** (new),
  Sessions, Cookies & CORS, Streaming Responses, **WebSockets** (new), Global Middleware.
  Verified against source before writing rather than assuming: `ApiError`/`ApiErrors` (from
  `@rapidrest/core`/`service-core`) and the Express-style `(req,res,next)`/4-arg-error-handler
  convention that turns a thrown error into a JSON response (`service-core/src/http/
  MiddlewareChain.ts`); `@WebSocket()`/`@Socket`/`IWebSocketShim` (exported from
  `service-core`'s root, via `export * from "./http/index.js"`) for hand-written WS routes,
  with `BasePushRoute`'s channel pub/sub (already documented at `docs/default-routes/push.mdx`
  and `docs/events-notifications/notifications.mdx`) positioned as the ready-made alternative,
  not duplicated; `trusted_proxies` and graceful-shutdown behavior folded into the Overview.
  **Confirmed NOT to exist in `service-core`, don't invent pages for these**: a general-purpose
  rate-limiting decorator/config (rate limiting is `@rapidrest/auth`-specific, login-attempt
  throttling only), request ID/tracing, response compression, per-request timeouts.
- Fixed a real regression the user caught in `docs/http-engine/sessions.mdx`: the "only one
  Set-Cookie header per response" limitation is no longer true. `HttpResponse` gained
  `appendHeader(key, value)` (adds a header value without clobbering, sent as repeated lines on
  the wire on both engines) alongside the existing `setHeader()` (replaces), and session
  middleware itself now uses `res.appendHeader("Set-Cookie", ...)`
  (`service-core/src/http/session/sessionMiddleware.ts`). Swept the rest of HTTP Engine for the
  same class of drift (interface/behavior changes since a page was written) rather than just
  patching the one spot: fixed `docs/http-engine/cookies-cors.mdx`'s cookie-setting example to
  use `appendHeader`, updated the `HttpResponse`/`HttpRequest` snippet in
  `docs/http-engine/index.mdx` to include `appendHeader`/`getHeader`/`onFinish` (all real,
  confirmed in `service-core/src/http/types.ts`), and tightened a session-persistence-timing
  claim to "once the response finishes" (matching the actual `res.onFinish()` hook, not
  "when your handler returns"). Re-verified CORS behavior, the error-handling default response
  shape, and Streaming/WebSockets' `flushHeaders`/`write`/`onAbort`/`IWebSocketShim` against
  source directly (not just re-reading the docs) — all still accurate, no changes needed there.
  **Lesson for future sweeps**: `flushHeaders`/`write`/`onAbort` are implemented identically on
  both `BunAdapters.ts` and `uWS/Adapters.ts` but are NOT declared on the shared `HttpResponse`
  TypeScript interface in `types.ts`, that's a gap in the framework's own typing, not the docs,
  don't "fix" the docs to match the interface if a method demonstrably exists on both concrete
  response classes.
- Full rewrite of Routing & Controllers (5 pages now, was 4): Overview, Defining Routes, Request
  Parameters, Lifecycle & Validation, **API Documentation** (new). Two real fixes surfaced by
  verifying against `service-core/src/decorators/RouteDecorators.ts` and `RouteUtils.ts` rather
  than trusting the existing page text:
  1. **The request-lifecycle pipeline diagram was missing three stages.** The old diagram read
     `auth strategies → @RequiresRole → ACL check → @Validate → @Before → handler → @After`.
     The actual order, read straight out of `RouteUtils.ts`'s route-registration code (which
     pushes middleware in this exact sequence, then registers as
     `app[verb](path, authMw, ...middleware)`), is: auth strategies → `@RequiresElevation` →
     `@RequiresTrustedRole` → `@RequiresRole` → `@RequiresScope` → ACL check → `@Validate` →
     `@Before` → handler → `@After`. Note the source file's own comment above that code lists
     a *different*, wrong order ("1. Requires Elevation, 2. Auth Strategies...") — don't trust
     that comment either, `authMw` is prepended separately and always runs first.
  2. **`@Body()` does not exist.** Grepped every exported decorator in `RouteDecorators.ts`
     directly — there is no `Body` export. The request body is always the first *undecorated*
     handler argument. This had already been correctly documented in
     `docs/routing-controllers/request-parameters.mdx`, but I'd introduced a `@Body()` in a
     code example on `docs/core-concepts/aspect-oriented-programming.mdx` in an earlier session
     turn without re-checking it against source, now fixed there too. Lesson: an example
     written from memory in one page, even by me, needs the same source verification as a page
     being rewritten from scratch.
  - New "API Documentation" page covers `@Summary`/`@Description`/`@Returns`/`@TypeInfo`/
    `@Example`/`@Default`/`@Format`/`@Tags` (from `service-core/src/decorators/DocDecorators.ts`)
    — real, exported, used throughout the framework's own `CRUDRoute`/`ModelRoute`, but not
    documented anywhere on the site before this.
  - Trimmed the WebSocket example duplicated across `defining-routes.mdx` and
    `request-parameters.mdx` down to a cross-link, full coverage now lives at
    `docs/http-engine/websockets.mdx` (written in the HTTP Engine pass) rather than in two
    places that could drift apart from each other.
