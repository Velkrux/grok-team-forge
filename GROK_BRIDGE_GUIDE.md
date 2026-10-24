# Grok Bridge — Manual Live Mode
## What it is
A user-mediated ordinary-chat workflow: prepare → manually submit → paste → validate → manually hand off. It is not Grok Bot, a browser automation, an API integration or model training. The app never sends the prompt to Grok.

The frozen task is fictional release-status extraction. The packet version is forge-bridge-2026-10-24.v1, as of 2026-10-24T12:00:00Z. Six records contain earlier/corrected/future/stale/out-of-scope/untrusted material. The evaluator's expected facts are independently maintained in bridge-fixture.js. The prompt contains the source data and selection rules, not a fabricated model transcript.

## Origin and dates
- User-declared Grok Chat means the person says they ran Grok. It is not authenticated origin.
- User-declared other model is separate.
- Synthetic QA is never counted as a model run.
- Imported timestamps come from the browser/client clock and timezone, not an authenticated server clock.
- observed_at in the response is the frozen snapshot timestamp, not claimed live retrieval.

## The artifact contract
Plain JSON object only. No wrappers/fences, duplicate keys or more than 60,000 characters. Required fields include fixture/task/role IDs, cutoff/snapshot dates, claims with exact source excerpts, source IDs, explicit uncertainty, draft-only approval, no actions and the configured next role.
Core checks are strict independently of editable simulation switches. Extra user-required handoff fields must be present, but their semantics remain INCONCLUSIVE without a fixture rule. Wrong dates, unsupported source IDs, unsupported factual claims or unauthorized actions fail. An unknown fixture cannot receive factual PASS.

## Evidence and changes
The original pasted text is retained unchanged, even after failure. A corrected prompt adds the exact failed-check feedback; it does not rewrite historical raw output. A PASS can prepare a downstream role prompt only if the team configuration still matches the imported record. A stale configuration must be rerun. Handoffs are explicitly labeled prepared/not executed.

Evidence export includes records, original prompts/raw text, fixture/rule snapshots, hashes, source declarations, local timestamps, manual steps, validator source and an offline reproduction script. Hashes detect changes; they do not authenticate Grok or establish human approval. A result card also retains the source-declaration/QA limitation.

## Privacy
No Bridge records/raw responses are saved to localStorage by the app. Reload/clear removes the private in-memory session. Export is explicit and includes raw text. Keep the evidence ZIP private until reviewed. Never commit private chat transcripts or credentials to the public source repository.

## Your next manual run
Use [the initial Scout prompt](prompts/SCOUT_TEST_PROMPT.md) in ordinary [Grok Chat](https://grok.com/) and import the full unedited output. One supervised development Scout run has already passed the fixed contract; its private raw records are not bundled. See [the limited summary](docs/EXPERIMENT_SUMMARY.md). Your result may pass, fail or remain inconclusive. Never fabricate a failure from synthetic controls.

## Documentation checks
The ordinary Grok web entry was opened 2026-10-24. Account quotas/model labels were not inspected; do not assume unlimited access. Full Bot instructions remain separately grounded in [official docs](https://docs.x.ai/grok-bot/get-started). Local app usage needs no paid integration.
