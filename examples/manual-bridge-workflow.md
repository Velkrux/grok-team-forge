# Manual Bridge walkthrough

Follow [the five-step quickstart](../QUICKSTART.md). Each external model request is controlled by the user. The app never submits a prompt or starts the next agent.

The included frozen task has six fictional sources and known checks. A recorded development Scout run in ordinary Grok Chat passed 47 bounded checks. Its Verifier prompt was prepared but never run. No private raw transcript or Evidence Kit is bundled in this example. [Limited experiment summary](../docs/EXPERIMENT_SUMMARY.md).

Use tests/fixtures only as Synthetic QA specimens, not genuine Grok output. Preserve any real response unedited; FAIL or INCONCLUSIVE are valid findings.
