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
- Full rewrite of Models & Persistence (5 pages now, was 4): Overview, Entities & Columns,
  **Validation** (new), Datastores & Connections, Base Entities & Caching. The existing content
  here was already fixed for decorator-name accuracy in the very first framework-alignment
  pass, so this round was mostly voice recalibration, plus one genuine, verified gap: `@Nullable`
  and `@Validator` (from `@rapidrest/core`'s `ObjectDecorators`) plus `ValidationUtils`'s built-in
  checks (`checkEmail`/`checkURL`/`checkPhone`/`checkUUID`/`checkSemVer`/`checkIP`/`checkDate`/
  `checkJSON`/`checkName`) are real, and genuinely wired into `RepoUtils.create()`/`update()`
  automatically (`core/src/ObjectUtils.ts`'s `_validate()`, called from
  `service-core/src/models/RepoUtils.ts`'s own `validate()`) — every field is required by
  default unless marked `@Nullable`, on every write, through any code path. `@Nullable` had
  appeared exactly once on the whole site before this, unexplained, in a code example. Found a
  real usage example to build the new page's snippets from:
  `auth/src/models/mongo/ProfileMongo.ts`'s `birthdate` field uses
  `@Validator(ValidationUtils.checkDate)` combined with `@Nullable`.
- Full rewrite of Auto CRUD Routes (3 pages now, was 1 malformed page with no top-level H1 and
  two stray H1s mid-document): Overview, **Endpoints** (new), **Filtering, Pagination &
  Sorting** (new). The big find this round: the query-string filter/pagination/sort DSL that
  `doFind`/`doCount` actually implement (`service-core/src/models/ModelUtils.ts`'s
  `buildSearchQuery`, `RepoUtils.find()`) was completely undocumented anywhere on the site —
  operator syntax (`gt()`/`in()`/`range()`/`like()`/etc via `field=op(value)`), repeated-key OR,
  the `me` token, the base64 `q` param escape hatch, `limit`/`page` pagination (capped at 1000),
  and JSON-object `sort` syntax for descending/multi-field. Verified via a research pass over
  `ModelUtils.ts`/`RepoUtils.ts`/`RouteUtils.ts` plus real working query strings from
  `petstore_example/k6-tests/*.ts` (`find_pets.ts`, `find_users.ts`, `find_admins.ts`).
  **Found, not yet fixed**: `docs/performance.mdx`'s `find_bunnies` section uses
  `GET /pet?category.name=bunny` as a real example query, but a security fix
  (mentioned in `service-core` commit `932b6e2`) now rejects any dotted or `$`-prefixed query
  key on MongoDB-backed models with `400`, so that exact request would fail against current
  code. The benchmark *numbers* were presumably real when measured, only the example request
  shown alongside them is now stale. Flagged to the user, not touched, since fixing it well
  means deciding whether to reword the query to something still valid or annotate it as
  historical, not just a one-line find-and-replace.
- Default Routes reviewed for the same treatment, needed far less work than every other
  section so far: all 8 pages were already accurate and already at roughly the right voice
  (likely benefited from the very first framework-alignment pass at the start of this project).
  Spot-verified every endpoint table (Admin, Metrics, OpenAPI, Status, Push, ACL, Static)
  directly against source (`BaseAdminRoute.ts`, `BaseMetricsRoute.ts`, `BaseOpenAPIRoute.ts`,
  `BaseStatusRoute.ts`, `security/BaseACLRoute.ts`, `BaseStaticRoute.ts`) rather than assuming —
  every verb/path/decorator/permission-model claim held up. Only changes made: tightened the
  Overview's opening paragraph (grammar, wordiness) and removed a confusing tangential
  reference to `AuthRoute`/`UserRoute` (those come from the separate `generate auth` command's
  template, `cli/templates/auth/src/routes/`, not from `generate server`'s default-routes
  prompt being discussed in that paragraph — comparing them there was more confusing than
  useful). No new pages added, no real documentation gap found this time.
- Split Models & Persistence further per explicit request: pulled `@Transactional` (plus
  `@EntityManager`/`@MongoSession`, nesting modes, `registerRollbackHook`) out of
  `datastores.mdx` into a new **Transactions** page, and pulled `@Repository`/`RepoUtils` out
  into a new **Repository & RepoUtils** page (7 pages now: Overview, Entities & Columns,
  Validation, Datastores & Connections, Repository & RepoUtils, Transactions, Base Entities &
  Caching). `datastores.mdx` now covers only `@DataStore` and raw connection injection
  (`@DataSource`/`@Redis`), and picked up a previously-undocumented detail while trimming it:
  both decorators' `required` param (default `true`) throws at instantiation if the named
  connection isn't configured, verified in `service-core/src/ObjectFactory.ts`'s
  `injectDataSource`/`injectRepository` handling.
  - The new Repository page states the `@Repository` vs `RepoUtils` distinction explicitly for
    the first time anywhere on the site: `@Repository` is the raw, un-guarded TypeORM/Mongo
    repository (no ACL check, no cache invalidation, no notifications); `RepoUtils` is the
    same thing `ModelRoute` itself is built on, with all of that included. Previously the docs
    showed both side by side with no guidance on which to reach for.
  - Caught and fixed a real bug in my own draft while writing this: `RepoUtils.update(obj,
    existing, options)` is NOT "mutate the fetched object and pass it as both arguments", I
    verified the real call shape against `ModelRoute.doUpdate()` — `obj` is the partial patch,
    `existing` is a value fetched fresh via `findOne()` beforehand. Fixed before publishing,
    not after, but a reminder that a plausible-looking example still needs the source check.
  - Fixed 3 cross-links elsewhere on the site that pointed at the old `datastores.mdx`
    anchors (`#transactional`, `#direct-repository-and-connection-injection`):
    `core-concepts/dependency-injection.mdx`, `models-persistence/validation.mdx`,
    `testing/index.mdx`.
- Added orienting intro paragraphs (previously these pages jumped straight into the first `##`
  decorator with no framing) to Entities & Columns, Datastores & Connections, Transactions, and
  Base Entities. Also split `@Cache`/`@Shard` out of Base Entities into a new **Caching &
  Sharding** page, per explicit request — Models & Persistence is 8 pages now. Base Entities
  keeps `@TrackChanges`/`@ChildEntity` alongside the base classes, since those are about entity
  shape/history, not performance at scale, unlike caching/sharding. Fixed the resulting
  cross-links: `datastores.mdx`'s Redis-for-caching pointer now targets the new page instead of
  Base Entities, and `auto-crud-routes/endpoints.mdx`'s link label updated to match the rename.
- Added a `ConnectionManager` section to Datastores & Connections, verified against
  `service-core/src/database/ConnectionManager.ts` directly. Caught and fixed a mistake in my
  own first draft before publishing: I initially wrote that `ConnectionManager` stamps a
  model's `datasource` property onto the class, but `@DataStore` does that itself, synchronously,
  at decoration time (`ModelDecorators.ts`'s `DataStore()` calls `Object.defineProperty(target,
  "datasource", ...)` directly). `ConnectionManager`'s actual role is *matching* each model
  class to its configured connection (via that stamped property, or via an `entities` list in
  the datastore's own config) and re-confirming it, not originating it. Also ties together, for
  the first time, why `@Transactional`'s "falls back to non-transactional" behavior on
  standalone MongoDB exists (`ConnectionManager.detectMongoTransactionSupport()`), and why
  `@Repository`/`@DataSource`/`@Redis` all fail with the identical "Unable to find database
  connection with name" error, they all resolve against the same shared connection map.
- Restructured Auto CRUD Routes again per explicit request: the "Endpoints" page (CRUDRoute
  table + ModelRoute function table crammed together) was awkward, split into dedicated
  **ModelRoute** and **CRUDRoute** pages instead, each with a full "why this one, why not the
  other" explanation, mirroring the Repository vs RepoUtils treatment. Page order is
  Overview → ModelRoute → CRUDRoute → Filtering/Pagination/Sorting, foundation first (the
  business logic with no HTTP surface), then the batteries-included class built on top of it,
  same ordering logic as `@Repository` before `RepoUtils`. `doDelete`'s `version`/`purge`
  options are described briefly on the ModelRoute page with a cross-link to CRUDRoute's fuller
  `?version=`/`?purge=true` query-parameter writeup, since the query-string framing is
  HTTP-specific and belongs with the endpoint that actually parses it.
- Also rewrote the Filtering, Pagination & Sorting page's connective prose (not its reference
  tables, which stay tabular on purpose) after the user flagged it as still reading in the old
  terse/reference voice even after everything else moved on. Reference tables presented as
  reference tables is correct; the sentences around them jumping straight from heading to code
  block with zero framing is what needed fixing.
