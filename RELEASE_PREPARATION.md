# Release boundaries

This source candidate contains only the manifest-listed application, tests, synthetic fixtures, prompts, docs, two curated awaiting-response product screenshots, license and workflows. Private browser observations, raw model output, authenticated conversations, client timezone-bearing screenshots, video projects, local archives and historical working Git objects are excluded.

`PUBLIC_FILES.json` is the explicit source allowlist. `node tools/verify-release.mjs` rejects unlisted source files, secrets/personal-location patterns and unexpected static files. Update the allowlist deliberately when changing the release; do not use it to silently approve unknown material.

The public site consists only of the verified static `dist/`: HTML, modules/CSS, the original icon and license/notices. It contains no private fixture explanation, transcript or build/research artifact. No release-video music is shipped with the app.

The independent clean repository has no imported private history. Original private evidence and approved V2 video stay in the owner's working project. Publishing a future private Evidence Kit requires a separate review/authorization.

Deployment uses a manual Pages workflow after owner approval. A successful local build or configured workflow is not a deployed website. Keep status/URLs accurate and inspect actual runs.
