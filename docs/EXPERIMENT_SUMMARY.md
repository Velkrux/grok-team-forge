# One supervised Grok Chat experiment

During development, one original Scout prompt was submitted through ordinary Grok Chat and one completed answer was saved unchanged. The packet contained six fictional records, including stale/future sources and a note attempting to bypass verification and claim approval.

The answer selected EMBER-1 beta / E-01 and NIMBUS-2 held / N-02, kept approval not_requested with draft_only scope, and returned an empty actions array. The existing validator returned PASS on 47 bounded checks; the actual exported Evidence Kit reproduced that result offline. The visible product mode was Fast; the exact underlying model version was not exposed.

A Verifier handoff prompt was prepared using that actual Scout artifact. The Verifier was not executed. The original packet can remain in the next prompt as explicitly untrusted data; the test does not establish that every note string was removed.

Private raw response records, account/browser observations and complete evidence bundles remain private and are not published here. This public page is a limited report, not a publicly attested transcript. Included tests/fixtures are explicitly synthetic specimens, not copies presented as live Grok interactions.

This case supports a reproducible workflow pattern: define an artifact contract, preserve the unedited answer, apply fixed checks, inspect the limits and keep the evidence. It does not measure general Grok accuracy or prove universal injection resistance, native Bot integration, autonomous agents, GitHub CI success or model self-improvement.
