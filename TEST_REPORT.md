# V1.5 release verification — 2026-10-24

## Current clean candidate

The 56 existing Node software tests passed again on the isolated clean release candidate (0 failures). Exact current output: [test-results.json](docs/test-results.json). This covers the original 28 simulation/domain cases plus 28 Bridge cases: source/date/schema rules, duplicate and unsafe JSON, provenance, explicit origin declarations, untrusted input, stale configurations, manual handoffs, export/reproduction and separation from persisted team state. These are software checks, not 56 model experiments.

The application modules, test suites and initial Scout prompt are unchanged from the final working V1.5 source. Release changes concern documentation, CI/Pages configuration, payload verification and distribution notices. The public source is explicitly allowlisted; the static output is audited before deployment.

## Actual model scope

One supervised ordinary Grok Chat Scout answer passed 47 bounded checks on one frozen fictional packet. Offline validation reproduced PASS. The exact model version was not established; a Verifier prompt was prepared but not submitted. Private raw response, authenticated browser observations and evidence bundles are excluded. See [the limited experiment summary](docs/EXPERIMENT_SUMMARY.md). A declaration/hash does not independently authenticate model identity.

## Earlier local UI checks — historical, not hosted acceptance

Existing V1.5 local browser checks exercised all eight simulation cases, FAIL → explicit proposal/apply → PASS → revert, prompt preparation/copy, synthetic FAIL/PASS import, handoff preparation and an actual Evidence Kit download/offline reproduction. Earlier layout checks at 390/768px are preserved in [layout-checks.json](docs/layout-checks.json); they are not results for a public deployment. Independent native clipboard round-trip was not verified by automation. Raw browser evidence remains private. Two curated awaiting-response screenshots are included; a timezone-bearing synthetic-result screenshot is excluded.

## Hosted status

CI and Pages workflows are prepared, not claimed to have run. There is no confirmed hosted website/CI result in this pre-publication candidate. Actual deployed-commit checks, public UI acceptance and confirmed links must be recorded after owner approval and deployment. Local/static checks cannot substitute for that step.

## Boundaries

No new Grok request, paid API, native Bot connection or model benchmark was used for this release. The evaluator checks the frozen case and bounded contracts; unsupported semantics remain INCONCLUSIVE. It is not an autonomous team runner, universal factual verifier or security guarantee. Bridge response exports contain raw input and client-local provenance; review them before sharing.

## Clean-build local preflight — 2026-10-24

The isolated static build loaded in an actual browser under `/grok-team-forge/`. The missing-date fixture produced FAIL; the visible diff added `observed_at` to all three handoffs; explicit apply/rerun produced PASS; revert/rerun restored FAIL. Bridge prepared its actual prompt, its copy control reported success, and one explicitly Synthetic QA input produced 47 bounded PASS. Its actual downloaded Evidence Kit opened without CRC errors and its offline script reproduced PASS with integrity true. This was not another Grok/model request. Bridge records were cleared afterward. All 17 intended static paths returned byte-identical HTTP 200, while five private/source/video paths returned 403/404. This remains local acceptance, not a public Pages result. Private local test traces/exports are not in the source payload.
