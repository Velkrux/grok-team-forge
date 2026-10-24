# Verified Actions pins

Verified 2026-10-24 against the official action repositories/release commits. These are workflow dependencies, not vendored app libraries.

| Action | Release | Commit / primary source |
|---|---|---|
| actions/checkout | v7.0.1 | https://github.com/actions/checkout/commit/3d3c42e5aac5ba805825da76410c181273ba90b1 |
| actions/setup-node | v7.1.0 | https://github.com/actions/setup-node/commit/949feb2413d6458794dcd2491c4babbbce0c15c1 |
| actions/configure-pages | v6.0.0 | https://github.com/actions/configure-pages/commit/45bfe0192ca1faeb007ade9deae92b16b8254a0d |
| actions/upload-pages-artifact | v5.0.0 | https://github.com/actions/upload-pages-artifact/commit/fc324d3547104276b827a68afc52ff2a11cc49c9 |
| actions/deploy-pages | v5.0.1 | https://github.com/actions/deploy-pages/commit/368f82528645a54fb793d4d04e342629a3f51346 |

Minimal permissions: CI reads contents; Pages build reads contents/Pages metadata; only the dependent deployment job writes Pages and requests an OIDC token. No user API key/PAT or additional repository permission is requested by the application. Pages is dispatched manually on main after the owner approves public release.
