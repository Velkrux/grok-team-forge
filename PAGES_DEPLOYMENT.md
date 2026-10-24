# Deploy with GitHub Pages Actions

Live project site: https://velkrux.github.io/grok-team-forge/ . The initial [supported Actions deployment](https://github.com/Velkrux/grok-team-forge/actions/runs/40120515454) succeeded on 2026-10-24. See [actual verification and the remaining hosted-download limitation](TEST_REPORT.md). The following steps reproduce the configured deployment.

1. Publish only this clean reviewed source, never a private working checkout or its history. Configure repository Pages **Source: GitHub Actions** after the owner's explicit public-release approval.
2. CI automatically tests/builds pull requests and main pushes. Inspect its actual run result.
3. Manually run **Deploy Pages** on main. Its build job checks out the exact dispatch commit, tests, builds and verifies the source/static allowlists before uploading `dist/` only.
4. Deployment depends on the successful build job and uses the `github-pages` environment. Only deployment receives `pages: write` and `id-token: write`; the build only reads contents/Pages metadata. No app/API key is required.
5. Inspect the real deployment result and independently open the returned URL. Test missions, graph/editing, stress failure/diff/apply/rerun/revert, Bridge copy/import/download, mobile layout and README links.

No custom domain, paid runner, paid feature or private repository billing is needed. GitHub documents Pages support for public repositories on GitHub Free. Standard hosted runners are used. No remote CI/deployment success is claimed by the mere presence of these workflow files.

Local preview:

```sh
node tools/build.mjs
node tools/verify-release.mjs
node tools/preview-dist.mjs 4185
```

Open http://localhost:4185/grok-team-forge/?mode=bridge. This proves only local subpath compatibility, not public deployment.

Official sources, checked 2026-10-24:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Action pins and their verified official release commits: [ACTIONS_PINS.md](docs/ACTIONS_PINS.md).
