# Grok Bot: manual setup, not deployment

For the V1.5 ordinary **Grok Chat** workflow, use [GROK_BRIDGE_GUIDE.md](GROK_BRIDGE_GUIDE.md). Full Grok Bot access is not required for that manual bridge. The instructions below are optional native-Bot setup materials, not a prerequisite.

Verified documentation context: **2026-10-24**. The product itself works locally without Grok or a paid subscription. No authenticated Bot session or native team-creation API is connected in this experiment.

1. Open the separate authenticated Grok Bot desktop/mobile product and confirm actual access and usage. Ordinary Grok chat or an X checkmark is insufficient evidence. See [Get started](https://docs.x.ai/grok-bot/get-started) and [Plans](https://cursor.com/help/grok-bot/plans).
2. Export your reviewed current configuration. It is generic Markdown/JSON, not a vendor-native installation format.
3. Manually create focused Bots for the roles you need; review the role's mission, responsibilities, inputs, output, source requirements and approval boundaries. [Create and manage Bots](https://docs.x.ai/grok-bot/bots).
4. Supply the mission, relevant source registry and handoff schema to each actual task. Ask for explicit source IDs/dates and uncertainty. If using a group, verify the actual handoff behavior rather than assuming the diagram runs it.
5. Test one safe task with read-only/disposable data. Preserve the untouched real response and tool-read evidence. The app's synthetic PASS does not prove a model complies with these instructions.
6. Refine a successful method into a reusable skill only after actual testing. A routine controls timing, not an automatically improving model. Routine Test performs real work and may consume usage. [Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations).
7. Keep sending, publication, purchases, deletion and production changes behind explicit scoped human approval and least-privilege tools. Separate named Bots are not isolation: the account's cloud computer/files/logins are shared. [Computer and apps](https://docs.x.ai/grok-bot/computer-and-apps), [Approvals](https://docs.x.ai/grok-bot/approvals-security-and-privacy).

Native skill updating, native API deployment, live Grok conversations, event triggers and GitHub actions on behalf of Grok are **not implemented**. Connector installation/account linking/usage costs need separate authorization. Portable instructions can also be adapted manually to other systems; that does not establish compatibility with every agent runner.

The initially guessed create-and-manage-bots URL was inaccessible; the actual current page is `/grok-bot/bots`, opened directly through the official docs navigation. This correction is reflected in the final exported setup materials.
