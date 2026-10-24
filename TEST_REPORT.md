# V1.5 release verification — 2026-10-24

## Current clean candidate

The 56 existing Node software tests passed again on the isolated clean release candidate (0 failures). Exact current output: [test-results.json](docs/test-results.json). This covers the original 28 simulation/domain cases plus 28 Bridge cases: source/date/schema rules, duplicate and unsafe JSON, provenance, explicit origin declarations, untrusted input, stale configurations, manual handoffs, export/reproduction and separation from persisted team state. These are software checks, not 56 model experiments.

The application modules, test suites and initial Scout prompt are unchanged from the final working V1.5 source. Release changes concern documentation, CI/Pages configuration, payload verification and distribution notices. The public source is explicitly allowlisted; the static output is audited before deployment.

## Actual model scope

One supervised ordinary Grok Chat Scout answer passed 47 bounded checks on one frozen fictional packet. Offline validation reproduced PASS. The exact model version was not established; a Verifier prompt was prepared but not submitted. Private raw response, authenticated browser observations and evidence bundles are excluded. See [the limited experiment summary](docs/EXPERIMENT_SUMMARY.md). A declaration/hash does not independently authenticate model identity.

## Earlier local UI checks — historical, not hosted acceptance

Existing V1.5 local browser checks exercised all eight simulation cases, FAIL → explicit proposal/apply → PASS → revert, prompt preparation/copy, synthetic FAIL/PASS import, handoff preparation and an actual Evidence Kit download/offline reproduction. Earlier layout checks at 390/768px are preserved in [layout-checks.json](docs/layout-checks.json); they are not results for a public deployment. Independent native clipboard round-trip was not verified by automation. Raw browser evidence remains private. Two curated awaiting-response screenshots are included; a timezone-bearing synthetic-result screenshot is excluded.

## Hosted launch — 2026-10-24

Public application: https://velkrux.github.io/grok-team-forge/ . Repository: https://github.com/Velkrux/grok-team-forge . Initial deployed commit: `09518dcdc1eb0076c026c0962810bdc7b5a90c59`.

- [Actual CI run](https://github.com/Velkrux/grok-team-forge/actions/runs/40120341288): SUCCESS, including 56 software tests, build and 60/17-file payload audit.
- [Actual Pages run](https://github.com/Velkrux/grok-team-forge/actions/runs/40120515454): SUCCESS, with dependent successful build/deploy jobs.
- The real public site opened. All three missions, graph role/contract selection, saved role edit, eight-case simulation, failure explanation, exact diff, apply/rerun and revert/rerun worked.
- Native Copy Prompt → paste into the actual input matched all 5,273 characters. The original prepared prompt matched the prior supervised submission byte-for-byte.
- The already-saved genuine Scout answer was reimported in client memory and again passed 47 bounded checks. This was a replay, not another Grok request or independent model trial. Private raw output/provenance were not published.
- At a 390px browser viewport (375px document width after scrollbar), scroll width was 375px, prompt width 305px, and both mode controls were about 80.8px high. The real mobile prompt/import layout was visually inspected. The temporary viewport override was reset.
- All 16 required public assets returned HTTP 200 with bytes matching the reviewed build. The local `.nojekyll` marker returned 404 from Pages; it is not a required runtime asset. An initial all-17 HTTP expectation was corrected to record this platform difference explicitly. Private/source metadata paths returned 404.

### Remaining hosted-download verification limit

The public UI requested an Evidence Kit export, but the automation download helper stalled and reset; no new downloaded public-site ZIP could be inspected. A recovery attempt cleared records too early during asynchronous export and produced an explicit “Import an actual response before exporting evidence” message. That attempt is not a successful download. A native Chrome fallback could not acquire app approval (timeout). Thus hosted ZIP delivery/CRC/offline reproduction is **NOT VERIFIED** here; earlier actual local ZIP checks remain separate evidence. This does not establish a defect in normal user-browser download behavior. Keep records intact until download completes. No raw evidence was uploaded to the repository/site.

The source/Pages deployment and 11 other acceptance areas are verified; do not describe all twelve public acceptance checks as passing. This follow-up documentation changes no application modules or deployed static assets.

## Boundaries

No new Grok request, paid API, native Bot connection or model benchmark was used for this release. The evaluator checks the frozen case and bounded contracts; unsupported semantics remain INCONCLUSIVE. It is not an autonomous team runner, universal factual verifier or security guarantee. Bridge response exports contain raw input and client-local provenance; review them before sharing.

## Clean-build local preflight — 2026-10-24

The isolated static build loaded in an actual browser under `/grok-team-forge/`. The missing-date fixture produced FAIL; the visible diff added `observed_at` to all three handoffs; explicit apply/rerun produced PASS; revert/rerun restored FAIL. Bridge prepared its actual prompt, its copy control reported success, and one explicitly Synthetic QA input produced 47 bounded PASS. Its actual downloaded Evidence Kit opened without CRC errors and its offline script reproduced PASS with integrity true. This was not another Grok/model request. Bridge records were cleared afterward. All 17 intended static paths returned byte-identical HTTP 200, while five private/source/video paths returned 403/404. This remains local acceptance, not a public Pages result. Private local test traces/exports are not in the source payload.
