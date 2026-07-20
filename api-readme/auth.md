# @rapidrest/auth

```bash
npm install @rapidrest/auth
```

:::note[Beta]
`@rapidrest/auth` is currently `1.0.0-beta.1`. The API surface, especially around `OIDCStrategy` and MFA option shapes, may still change before a stable `1.0.0`.
:::

A complete authentication server for RapidREST: data models, persistence adapters, and HTTP routes for registering and authenticating users via password, TOTP, OTP (email/SMS), WebAuthn passkeys, FIDO2 hardware keys, multi-factor auth, and OpenID Connect / OAuth 2.0. Builds on [`@rapidrest/service-core`](/docs/api/service-core)'s `JWTStrategy` and `AuthMiddleware`.

For narrative, task-oriented documentation, start with [Auth Server](/docs/auth).

## Quick links

- [Strategies](/docs/auth/strategies) — the 7 `AuthStrategy` implementations (`BasicStrategy`, `FIDO2Strategy`, `MFAStrategy`, `OIDCStrategy`, `OTPStrategy`, `PasskeyStrategy`, `TOTPStrategy`).
- [Data Models](/docs/auth/data-models) — `User`, `Alias`, `Secret`, `Profile`, and their Mongo/SQL variants.
- [Base Routes](/docs/auth/routes) — the route classes you subclass to expose auth endpoints.
- [Configuration](/docs/auth/configuration) — the full `auth:*` config tree, including the `session` block required by challenge-response flows.

Everything else is in the sidebar, generated directly from source.
