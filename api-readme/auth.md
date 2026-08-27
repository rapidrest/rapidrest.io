# @rapidrest/auth

```bash
npm install @rapidrest/auth
```

A library for adding a complete authentication system to a RapidREST project: data models, persistence adapters, and HTTP routes for registering and authenticating users via password, TOTP, OTP (email/SMS), WebAuthn passkeys, FIDO2 hardware keys, multi-factor auth, and OpenID Connect / OAuth 2.0. Builds on [`@rapidrest/service-core`](/docs/api/service-core)'s `JWTStrategy` and `AuthMiddleware`. For the complete, pre-wired reference deployment built from this library, see [Auth Server](/docs/auth-server).

For narrative, task-oriented documentation, start with [Auth Library](/docs/plugins/auth-library).

## Quick links

- [Strategies](/docs/plugins/auth-library/strategies) — the 7 `AuthStrategy` implementations (`BasicStrategy`, `FIDO2Strategy`, `MFAStrategy`, `OIDCStrategy`, `OTPStrategy`, `PasskeyStrategy`, `TOTPStrategy`).
- [Data Models](/docs/plugins/auth-library/data-models) — `User`, `Alias`, `Secret`, `Profile`, and their Mongo/SQL variants.
- [Base Routes](/docs/plugins/auth-library/routes) — the route classes you subclass to expose auth endpoints.
- [Configuration](/docs/plugins/auth-library/configuration) — the full `auth:*` config tree, including the `session` block required by challenge-response flows.

Everything else is in the sidebar, generated directly from source.
