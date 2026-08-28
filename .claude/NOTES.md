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

- **Every page's opening needs to explain, not just define.** This has been corrected
  repeatedly (Auto CRUD Routes intro, the Filtering page, ModelRoute vs CRUDRoute, and again
  across all of Events & Notifications) and applies everywhere, not just conceptual pages —
  reference-heavy sections too. A page or `##` section that opens with a one-line class/API
  definition and drops straight into a signature or code block reads as terse reference
  material, which is explicitly not the goal anywhere on this site. Before dropping into
  syntax, ground the reader: what real problem does this solve, what's a concrete scenario
  where you'd reach for it, why does it exist as a separate thing from its neighbors. This is
  NOT the same as the "don't over-describe" rule above, that rule is about cutting tangential
  or restated detail from prose that's already explaining the right thing; this rule is about
  making sure the explanation is there at all before the reference material starts. Reference
  tables/parameter lists still stay tight and tabular per the rule above, it's the prose
  around them that needs the room to actually teach something.

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
- Full rewrite of Auth & RBAC (4 pages now, was 3): Overview, Authentication, Authorization
  (trimmed to role/scope checks), **Access Control Lists** (new). Old content had real
  grammar/typo issues ("coonfig", "decoratoring", "The RapidREST's authorization system") on
  top of the usual stale voice, but the bigger finding was depth genuinely missing, verified
  via a research pass over `RouteDecorators.ts`, `RouteUtils.ts`, `AuthMiddleware.ts`, and
  `security/ACLUtils.ts`:
  - `@Auth(strategies, require?)` has an undocumented second argument: `require: false` makes
    authentication best-effort rather than mandatory (missing and invalid/expired tokens are
    treated identically, request proceeds anonymously either way). Never mentioned before.
  - **ACL inheritance does not work the way "inheritance" implies.** Verified the exact
    algorithm in `ACLUtils.getRecord()`: a wildcard match on a *child* ACL blocks falling back
    to the parent even when the parent has a far more specific match. Parent is consulted only
    when the child ACL has zero matches of any kind. The old docs had one throwaway line
    ("an optional `parent` association when inheritance is desired") with no explanation of
    resolution order at all — this is exactly the kind of thing that causes a real production
    permission bug, so it got a dedicated, carefully-worded section with a concrete example.
  - **`@Protect` is two unrelated decorators that share a name**: one in `ModelDecorators.ts`
    (model classes, class vs. record-level ACLs) and one in `RouteDecorators.ts` (route classes
    and endpoint methods, with a class→method automatic parent chain via `parentUid`). The old
    docs only ever showed the model-level one; route-level `@Protect` had zero examples despite
    being real and having a genuinely useful zero-argument default (`@Protect()` → anonymous
    gets nothing, any authenticated caller gets everything, uid auto-generated from the class
    name — confirmed in `RouteDecorators.ts:278-301`).
  - `trusted_roles` and `@RequiresRole`/`@RequiresTrustedRole` are independent mechanisms that
    don't call into each other (confirmed in `RouteUtils.ts`'s `checkRequiredRoles`/
    `checkTrusedRoles` vs. `ACLUtils.hasPermission`'s own separate `trusted_roles` check) — a
    likely point of confusion, now called out explicitly as a note on both Authorization and
    the new ACL page.
  - Documented `ACLUtils`'s real public API (`hasPermission`/`findACL`/`saveACL`/`removeACL`
    for app code; `checkRequestPerms`/`populateParent`/`saveDefaultACL`/batch forms are
    framework-internal plumbing), previously only `hasPermission` had ever been shown.
  - Fixed 5 stale cross-links elsewhere on the site that pointed at `authorization.mdx` for
    content that moved to the new ACL page: `auto-crud-routes/crud-route.mdx`,
    `default-routes/acl.mdx` (×2), `http-engine/websockets.mdx`, `performance.mdx`.
- Background Jobs and Testing: both pages were already reasonably well-written technically
  (unlike the pre-rewrite Auth & RBAC), so this pass fixed a real structural bug and added
  verified depth rather than a full rewrite.
  - **Structural bug in both**: neither page had an actual H1 matching its section title, the
    frontmatter jumped straight into `# BackgroundService`/`# Setup` as same-level headings, so
    Docusaurus was rendering multiple H1s stacked on one page. Added the real `# Background
    Jobs`/`# Testing` H1 and demoted the rest to `##`.
  - Background Jobs gained three things verified against `service-core/src/
    BackgroundServiceManager.ts` and its own test suite (`test/BackgroundServiceManager.test.ts`):
    a thrown/rejected `run()` doesn't crash the server, it's caught and logged, and the service
    stays scheduled; overlapping ticks of a slow job are prevented automatically (a tick that
    fires while the previous `run()` is still in flight is skipped with a warning, not run
    concurrently); and — the one worth flagging most — **shutdown does not wait for an in-flight
    `run()` to finish**, `stop()` fires immediately and races against still-executing work, so a
    job doing something unsafe to interrupt has to handle that itself. None of this was
    documented before. Also documented `BackgroundServiceManager`'s full public API
    (`startAll`/`stopAll` alongside the already-shown `start`/`stop`/`getService`).
  - Testing gained a new "Stubbing a dependency" section. Confirmed there's no way to hand the
    DI container a pre-built fake ahead of real construction (`ObjectFactory` only exposes
    `register(class)`, not `registerInstance(object)`) — the actual pattern used throughout the
    codebase's own tests (e.g. `auth/test/routes/mongo/AuthElevationRoute.test.ts`) is
    `objectFactory.getInstance(RealClass)` to grab the already-constructed singleton, then
    `vi.spyOn()` one of its methods. Not documented anywhere before this.
- Events & Notifications: the existing 4 pages (Events, Notifications, Messaging, Alerts) were
  already well-written and accurate, so this pass was almost entirely additive rather than
  corrective. Spot-verified the notable claims anyway rather than trusting them (`@OnEvent`'s
  case-insensitive regex matching, confirmed in `EventListenerManager.ts:114`'s
  `new RegExp(entry[0], "i")`) — held up.
  - Added a new **Telemetry** page for `EventUtils`/`Event` (`@rapidrest/core`), a fifth,
    completely undocumented system before this: permanently recording that something happened
    via HTTP POST to an external analytics/observability service, authenticated with a
    long-lived service-identity token (not the calling user's), with an optional same-process
    `.on()`/`.off()` listener mechanism. Confirmed it's already initialized for every scaffolded
    project (`cli/templates/server/src/server.ts` calls `EventUtils.init()` at startup) and
    already wired into framework internals for free once `telemetry_services:url` is set:
    `ModelRoute`'s `create`/`update`/`delete`/`truncate` all accept a `recordEvent` option, and
    the Auth Library instruments elevation/rate-limit/session-revocation/MFA events the same way.
  - **Real gotcha worth remembering**: the pub/sub `Events` system and the new `Telemetry`
    system both import a type literally named `Event` from `@rapidrest/core` — same name, same
    package, completely unrelated systems (one is a Redis-delivered plain JSON message that only
    satisfies the `Event` shape structurally, the other is an actual `Event` class instance
    HTTP-POSTed to an external service). Added an explicit disambiguation note to both pages
    since this is an easy thing to conflate.
  - Also corrected a mistake in my own first draft before publishing: I wrote that
    `EventUtils.record()` throws when called before `init()`. It doesn't, verified the source,
    the "not initialized" check is inside `record()`'s own try/catch alongside the network-
    failure path, so it logs a warning and returns silently instead. `EventUtils.on()`/`off()`
    genuinely do throw in that case, `record()` does not, now stated correctly.

## 2026-08-27 (cont.): service-core dot-notation query fix
- `service-core` commit `336ae35` reverted an earlier over-broad restriction: a dot-notation
  query key (`category.name=eq(bunny)`) was being rejected outright as if it were operator
  injection. It's reverted back to only rejecting a `$`-prefixed *segment* anywhere in the key
  (`$where`, or `category.$where`), not the presence of a `.` itself — a dotted key is just a
  nested-field reference, MongoDB never treats it as an operator.
  - Updated `docs/auto-crud-routes/querying.mdx`: replaced the `:::note[No dotted or
    $-prefixed keys...]` block (which said dotted keys are rejected entirely) with accurate
    text plus a `GET /pets?category.name=bunny` example, and a note now scoped correctly to
    `$`-prefixed segments only.
  - `docs/performance.mdx`'s existing `GET /pet?category.name=bunny` benchmark example needed
    no change, it was flagged as stale in an earlier session (would have 400'd under the old
    restrictive behavior) but was never edited at the time; the revert makes it accurate again
    as originally written.
  - `docs/core-concepts/configuration.mdx`'s dot/colon note is about `nconf` key syntax, unrelated
    despite matching the same grep terms.

## 2026-08-27 (cont.): Events & Notifications intros warmed up
- User feedback, repeated enough times across sections to become a standing rule (see above,
  "Every page's opening needs to explain, not just define"): all six pages in this section
  (`index.mdx`, `events.mdx`, `notifications.mdx`, `messaging.mdx`, `alerts.mdx`,
  `telemetry.mdx`) opened with a one-line class/API definition and dropped straight into a
  signature or code block. Rewrote each opening to lead with a concrete scenario/problem before
  the definition: pet-adoption fan-out for Events, a live-viewing-user update for Notifications,
  password-change/signup/OTP messages for Messaging, a silent 3am health-check failure for
  Alerts, "useful later, not right now" framing for Telemetry, and a general "not every request
  needs to finish before other things happen" frame for the section Overview. No factual/API
  content changed, only the framing prose ahead of it.

## 2026-08-27 (cont.): Auth Server section — verification pass + Helm PostgreSQL support
- Full re-verification of all 5 pages against current `auth-server` source (a lot has shipped
  since the 08-26 pass that first created this section: elevation, MFA, refresh tokens, a
  critical JWT expiry fix, and several Helm chart bugfixes).
- **Resolved a previously open item**: the 08-26 log flagged the Helm chart's Dependencies
  table listing `@bitnami/postgresql` while `Chart.yaml` only actually depended on
  mongodb/redis, chart looked Mongo-only. That's no longer true, PostgreSQL support is now
  real and complete (`Chart.yaml`/`Chart.lock` depend on it, `values.yaml` has a full
  `postgresql.*`/`service.postgresql.*` block, `service-config.yaml`'s templating branches on
  `mongodb.create`/`postgresql.create` with Mongo taking priority if both are left on,
  `service.yaml` has a postgres-probe init container). Rewrote `docs/auth-server/deployment/
  helm.mdx` accordingly: filled in the Dependencies version, added a `### PostgreSQL`
  configuration subsection (mirroring `### MongoDB`), added `postgresql.*`/
  `service.postgresql.*` to the Parameters table, updated the architecture diagram/prose and
  the two-step-install note to cover Postgres too, and noted the Mongo-wins-if-both-enabled
  priority explicitly since nothing else surfaces that.
- **Still open, not fixed** (docs-only pass, chart/source bugs are out of scope): `values.yaml`'s
  `common.storageClass`/`common.logs.level` block is still unreferenced by any template, still
  correctly left out of the Parameters table rather than documented as if it did something.
- **New finding, fixed**: `docker.mdx` and `helm.mdx` both cited a fabricated `1.0.0` version
  for the published image/chart. Checked `package.json` (`0.1.0`), `RELEASE_NOTES.md` (`v0.1.0`
  only), and `git tag --list` (empty), there has never actually been a tagged release of this
  repo, so `ghcr.io/rapidrest/auth-server:1.0.0` / `oci://...:1.0.0` don't correspond to
  anything that exists. Confirmed via `.github/workflows/ci.yml` that image tags and the chart's
  `version`/`appVersion` are all set to match the git tag at publish time (`Chart.yaml`'s
  checked-in `1.0.0`/`0.1.0` are just placeholders CI overwrites), so there's no "current
  version" to cite honestly yet. Fixed both pages to say so plainly and, for the Helm install
  example, changed `--version 1.0.0` to omitting `--version` entirely (a real, correct way to
  install "whatever's newest" from an OCI registry, not a placeholder).
- Applied the "explain, not just define" rule (see standing decisions) to both deployment
  pages' openings: added a sentence on when you'd reach for Docker Compose vs Helm before
  either page's reference content starts.
- Verified and left unchanged (all matched source exactly): `building-on-it.mdx`'s route/model/
  job re-export examples against `src/mongo/routes/*.ts`, `src/mongo/Models.ts`, `src/mongo/
  Jobs.ts`; `react-ui.mdx`'s page tables and `apps/shared` file listing against the actual
  `apps/` tree; `docker.mdx`'s container topology, env var override syntax, and the production-
  secrets guard against `src/config.defaults.ts`'s `assertProductionSecretsAreSet`.

## 2026-08-27 (cont.): Plugins section — verification pass + real OIDC multi-provider bug fix
- Re-verified all 9 pages (`auth-library/` ×5, `ssr-react/` ×6 including its `index.mdx`)
  against current `@rapidrest/auth` (1.1.0) and `@rapidrest/react` (1.0.1) source.
- **Real, previously-undetected inaccuracy, now fixed**: `auth` commit `2bce9ac` (before this
  pass, already shipped in 1.1.0) fixed a genuine bug where every `BaseAuthOIDCRoute` subclass
  registered its strategy under the same hardcoded `"oauth"` name, so a second OIDC provider
  wired up the way the docs showed would silently collide with the first (last one loaded wins
  for both). The fix adds an overridable `strategyName` field, but using it requires ALSO
  overriding `login()` with a matching `@Auth([...])`, since `@Auth`'s metadata is read from the
  declaring class and isn't re-evaluated per subclass. Two existing docs examples predated this
  and were still showing the old, now-broken pattern (a second provider route with nothing but
  a different `providerConfig`): `docs/plugins/auth-library/routes.mdx`'s `AuthGoogleRoute`
  example and `docs/auth-server/building-on-it.mdx`'s `AuthGithubRoute` example. Fixed both to
  show the required `strategyName` + `login()` override, and tightened `strategies.mdx`'s OIDC
  paragraph and cross-linked it to `routes.mdx` for the full mechanism instead of restating it.
- **Gap filled**: `docs/plugins/` had no top-level `index.mdx`, unlike every other top-level
  section, so the sidebar category had nothing to land on. Added one explaining what "plugin"
  means here (an optional npm package, not extra weight in core/service-core) before pointing
  at Auth Library and SSR React.
- Everything else verified accurate against source with no changes needed: `ReactRoute`'s
  defaults (`appDir: "app"`, `hydrate: false`, `userFields: null`, `hydrateRootId`/
  `hydratePropsId`), `RapidRestViteOptions`/`StaticExportOptions`/`StaticExportApp` shapes, and
  the `rapidreact dev`/`build`/`export` CLI commands, all confirmed directly against
  `react/src/ReactRoute.tsx`, `vite.ts`, `static.ts`, and `cli.ts`. React's one other recent
  commit (a `rapidRestHydrationPlugin()` internal Vite bug fix) doesn't change any documented
  behavior, nothing to update there.
- Applied the "explain, not just define" rule to `data-fetching.mdx`'s opening (jumped straight
  into the props-merge formula with no motivating "why three sources" framing). Left
  `strategies.mdx`'s per-strategy `##` subsections alone despite being terse one-two sentence
  definitions, that page is a 7-item catalog and each entry being tight reads as a reference
  table in prose form, not the same failure mode as an entire page/concept skipping its
  explanation.

## 2026-08-27 (cont.): Deployment section — first full pass (was still outstanding since 08-26)
- All 4 pages (`index.mdx`, `bun.mdx`, `docker.mdx`, `kubernetes.mdx`) verified against current
  `cli` source (`src/commands/start.ts`, `src/commands/dev.ts`, `src/lib/bun.ts`,
  `templates/docker/*`, `templates/helm/helm/*`).
- **Real gaps found and fixed**:
  - `kubernetes.mdx` and `index.mdx` both said the Helm chart bundles MongoDB/Redis only. The
    CLI's generic chart template now has full PostgreSQL support too (`postgresql.create`
    condition, `service.postgresql.*` block, postgres-probe init container) — same feature that
    was found missing from `auth-server`'s own chart docs earlier this session. Added it
    everywhere: the overview bullet, the "What's in the chart" paragraph, the settings table,
    and the init-container-probe sentence.
  - `docker.mdx` said the builder stage "runs `rapidreact build`" — it doesn't; the `Dockerfile`
    runs the project's own `yarn build`/`npm run build` script, which happens to do `tsc` (or
    `tsc` + `vite build` for a React project) without going through the `rapidreact` CLI at all.
    Corrected, and used the correction to make a real point: the image is never built by a
    different path than what you already run and test locally.
  - `docker.mdx`'s entrypoint description was missing `--no-build` (the container CMD is
    actually `rapidrest start --docker --no-build`, confirmed in the `Dockerfile` template) and
    didn't explain why the `HEALTHCHECK` deliberately avoids `curl -f` (a non-React project's `/`
    legitimately 404s, and `-f` would treat that as unhealthy) — both are explained in the
    template's own comments, pulled into the doc.
  - `docker.mdx`'s Compose example was stale: verified by actually running
    `rapidrest generate docker` against a scratch project with the exact datastore mix the doc
    claimed (Mongo + 3 Redis datastores) rather than hand-tracing the Handlebars template, and
    the real output includes `datastores__acl__type=mongodb`/`datastores__mongo__type=mongodb`
    lines the doc's example was missing, plus a different service/link ordering (mongo before
    redis, not the reverse). Replaced the example with the actual generated output, and dropped
    the "real, unedited example from the Petstore reference app" claim (couldn't verify that
    repo) in favor of stating plainly it's what `generate docker` produces.
  - `docker.mdx`'s debug section said the debug command is `dev --docker`; the template's real
    command is `dev --inspect --docker` (`--inspect` is what actually enables the port-9229
    debugger this whole section is about). Fixed.
- Applied "explain, not just define" to `docker.mdx` and `kubernetes.mdx`, both opened directly
  with a bare `rapidrest generate ...` command and no prose. Added a sentence to each on why
  you'd reach for that deployment path before the command.

## 2026-08-27 (cont.): Deployment — added Architecture sections to Docker and Helm pages
- Added an `## Architecture` section to both `docs/deployment/docker.mdx` and
  `docs/deployment/kubernetes.mdx`, right after the intro/command and before the per-file detail
  sections, matching the placement and ASCII-diagram style already established on
  `docs/auth-server/deployment/{docker,helm}.mdx`.
- Docker's diagram shows the `server` container branching to whichever of `mongo`/`postgres`/
  `redis` containers the project actually configures (conditional, unlike auth-server's fixed
  three-container topology), plus which ports are host-exposed vs. compose-network-only.
- Kubernetes' diagram is the same Gateway → HTTPRoute → Service → Deployment (N replica pods) →
  optional MongoDB-or-PostgreSQL + optional Redis topology already verified for auth-server's
  chart, reused as-is since this CLI-generated chart is architecturally identical (confirmed via
  the same `2_services/api_services.yaml`/`3_gateways/api.yaml` template structure).

## 2026-08-27 (cont.): Deployment/kubernetes.mdx — restored the full Parameters table
- User caught that this page never actually had a complete Bitnami-style values.yaml reference
  table (checked `git log -p` on the file back to its creation in `07d298c`, it always had just
  a 6-row "settings you'll actually touch" table), unlike `docs/auth-server/deployment/helm.mdx`
  which does. Built the missing full `## Parameters` table by reading every relevant CLI chart
  template (`values.yaml`, `service-config.yaml`, `redis.yaml`, `_helpers.tpl`), the same
  exhaustive single-table convention used everywhere else on the site.
- This generic chart is close kin to `auth-server`'s own (same template structure, same
  `service.mongodb.*`/`service.postgresql.*` override shape), so the table is nearly identical,
  with the real differences reflected accurately: `service.image.repository`,
  `service.mongodb.mongo.name`, `service.postgresql.sql.name`, and `postgresql.auth.database`
  all default to the generated project's own name (`[[project_name]]` in the raw template, not
  a literal value), documented as "your project's name" rather than a fabricated concrete
  string. `mongodb.create`/`postgresql.create`/`redis.create` are conditionally emitted in a
  freshly generated project's `values.yaml`, present only for the datastore types that project
  actually configured, called out explicitly rather than claimed as a fixed default.
