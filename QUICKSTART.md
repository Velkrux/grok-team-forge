# Quickstart

Run `node server.mjs 4180` with Node 22+, then open http://localhost:4180. No install or API key is needed.

## One reproducible manual Bridge workflow

1. Choose **AI releases** and **Forge team**. Inspect Scout → Verifier → Analyst → Reporter. These are defined roles, not running Bots.
2. Switch to **Real Grok Output**, select Scout and prepare/copy its prompt. It contains six fictional frozen sources and an explicit output contract. The exact [prompt file](prompts/SCOUT_TEST_PROMPT.md) is a fallback if clipboard access differs.
3. Submit the whole unchanged prompt yourself in ordinary [Grok Chat](https://grok.com/). Save the complete response; don't repair or remove prose/fences before checking it. No full Grok Bot access is required.
4. Paste the output into Bridge, choose its truthful origin declaration, enter a model label only if shown, confirm and **Evaluate output**. Inspect specific PASS/FAIL/INCONCLUSIVE checks. A PASS can prepare the next manual prompt; preparation executes no agent.
5. **Export Evidence Kit** before reloading. Extract it and run `node reproduce.mjs` with Node 22+ to verify saved input/output hashes and reproduce the bounded result offline. Review raw/private content before sharing.

## Try the product without any model

Use Local Simulation, run **Break My Team**, inspect a failing synthetic handoff, review the proposed diff, then explicitly apply/rerun or reject/revert. These are deterministic stress fixtures, never real Grok mistakes.

One supervised Grok Chat Scout experiment has already been completed and passed 47 bounded checks on the fictional task. It is reported in [the summary](docs/EXPERIMENT_SUMMARY.md); private conversation/evidence files are not bundled. Your own result may pass, fail or be inconclusive.

Raw Bridge data is in-memory; team configuration persists locally. The app grants no publishing permissions or autonomous execution.
