# CSS Debug Extension — Roadmap & Log

> **Extension:** CSS Debug with Pesticide  
> **Stack:** WXT 0.20.8 · React 18.3.1 · TypeScript 5.6.2 · Radix UI · Chrome & Firefox MV3  
> **Current version:** 0.0.13  
> **Branch:** `Rll.testchatgpt-improvements` → merges into `main`

---

## Status Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🔄 | In progress |
| ⬜ | Not started |
| ❌ | Cancelled / out of scope |

---

## Phase 0 — Housekeeping & Bug Fixes

*Goal: clean slate before adding features. No new functionality, only correctness and maintainability.*

| # | Task | Status | Notes |
|---|------|--------|-------|
| 0.1 | Rename `popup/helpers copy/` → `popup/helpers/` | ✅ | Old folder deleted; new `helpers/` folder created |
| 0.2 | Create `helpers/constants.ts` with CSS class name constants | ✅ | `PESTICIDE_ACTIVE`, `PESTICIDE_HOVER`; used via `args` in executeScript |
| 0.3 | Add `try/catch` + tab ID guard to all 3 helper files | ✅ | All 3 helpers use async/await + try/catch + `tabs[0]?.id` guard |
| 0.4 | Fix click-to-outline bug in `add-element-listener.ts` | ✅ | Listener now persists; second button press deactivates it cleanly via `__pesticideClickActive` flag |
| 0.5 | Delete dead code `on-refresh.ts` | ✅ | Entire `helpers copy/` folder removed |
| 0.6 | Merge duplicate CSS into `entrypoints/shared/style.css` | ✅ | Both `main.tsx` files now import `../shared/style.css` |
| 0.7 | Remove unused `@radix-ui/react-switch` from `package.json` | ✅ | Removed from dependencies |
| 0.8 | Fix `<title>` tags in `popup/index.html` and `options/index.html` | ✅ | "CSS Debug — Popup" and "CSS Debug — Options" |

---

## Phase 1 — State Persistence

*Goal: toggle state survives page reloads. Highest priority feature request.*

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Upgrade `content.ts` to a real content script | ✅ | Reads `browser.storage.local` on load; re-applies `outlines`, `hover`, and `clickOutlines` classes for the current origin |
| 1.2 | Write toggle state to `browser.storage.local` | ✅ | New `helpers/storage.ts` with `getSiteState`/`setSiteState`/`isStorableOrigin`. All 3 helpers now return new boolean state and persist it. |
| 1.3 | Popup reads state on mount | ✅ | `useEffect` reads origin state on open; buttons use `variant="solid"` (active) vs `variant="outline"` (inactive) |
| 1.4 | Storage quota error fallback | ✅ | `setSiteState` catches errors and logs a warning — toggles still work in-tab, state just won’t persist |

---

## Phase 2 — Options Page Settings

*Goal: let users customise outline appearance. Currently the options page is read-only (colour reference only).*

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | Add colour picker | ⬜ | Customise primary outline colour; stored in `browser.storage.local` |
| 2.2 | Add outline width slider (1–4 px) | ⬜ | CSS variable override injected into page by content script |
| 2.3 | Add outline style selector | ⬜ | solid / dashed / dotted |
| 2.4 | Content script injects `<style>` with user overrides on load | ⬜ | Reads settings from storage; applies on top of `pesticide.css` |

---

## Phase 3 — New Features

*Goal: extend the tool beyond basic toggles.*

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Keyboard shortcuts | ⬜ | Add `commands` to `wxt.config.ts` for `toggle_outlines` and `toggle_hover` |
| 3.2 | Element inspector overlay | ⬜ | Tooltip on hover showing tag, classes, dimensions, "copy selector" button. Works in hover mode. |
| 3.3 | Box model visualisation modes | ⬜ | New CSS classes `pesticide-active-margin` / `pesticide-active-padding`; new buttons in popup |

---

## Phase 4 — Agent Instructions & Skills

*Goal: make future AI-assisted development context-aware and fast.*

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Create `.github/copilot-instructions.md` | ⬜ | Always-on workspace context: purpose, stack, folder conventions, key patterns |
| 4.2 | Create `.github/instructions/wxt-extension.instructions.md` | ⬜ | `applyTo: "entrypoints/**"` — recipe for new popup buttons, entry points, content scripts |
| 4.3 | Create `.github/instructions/i18n.instructions.md` | ⬜ | `applyTo: "locales/**,**/*.tsx"` — how to add new i18n keys (yml → json pipeline) |
| 4.4 | Create `.github/prompts/add-popup-button.prompt.md` | ⬜ | Parameterised prompt to scaffold a new toggle button end-to-end |
| 4.5 | Create `.github/prompts/add-i18n-key.prompt.md` | ⬜ | Parameterised prompt for adding a new localised string |

---

## Out of Scope (this plan)

| Item | Reason |
|------|--------|
| Premium / cloud features (`premium-ideas.md`) | Business decision; deferred |
| DevTools panel integration | High complexity; defer post-Phase 2 |
| Automated test suite | Defer until architecture stabilises after Phase 1 |
| No new third-party dependencies | Use already-installed packages only |

---

## Key Files Reference

| File | Relevance |
|------|-----------|
| `entrypoints/popup/App.tsx` | Main popup UI; buttons, state indicators |
| `entrypoints/content.ts` | State-aware content script; restores toggle state on page load |
| `entrypoints/options/App.tsx` | Options page; will get settings UI (Phase 2) |
| `entrypoints/popup/helpers/toggle-pesticide.ts` | Thin wrapper → `toggleBodyClass` |
| `entrypoints/popup/helpers/toggle-pesticide-hover.ts` | Thin wrapper → `toggleBodyClass` |
| `entrypoints/popup/helpers/toggle-body-class.ts` | Generic body-class toggle + storage write |
| `entrypoints/popup/helpers/add-element-listener.ts` | Click-to-outline mode toggle |
| `entrypoints/popup/helpers/reset-site.ts` | Clears all modes + persisted state |
| `entrypoints/popup/helpers/get-active-tab.ts` | Shared tab query helper |
| `entrypoints/shared/style.css` | Shared dark theme CSS for popup + options |
| `helpers/constants.ts` | CSS class names + click flag key |
| `helpers/storage.ts` | `getSiteState` / `setSiteState` / `clearSiteState` |
| `helpers/colors.ts` | 115-element colour map; referenced by options page |
| `wxt.config.ts` | Extension config; add keyboard commands (Phase 3) |
| `package.json` | Dependencies |
| `locales/en.yml` | Source of truth for i18n keys |
| `public/_locales/*/messages.json` | Compiled translation files |

---

## Verification Checklist (per phase)

- [ ] `npm run build` passes with no errors
- [ ] **Phase 0:** Load unpacked in Chrome — all 3 existing buttons work correctly including click-to-outline multiple times
- [ ] **Phase 1:** Toggle outlines, reload page → outlines still active for that site
- [ ] **Phase 2:** Change colour/width in options, reload page → custom styles applied
- [ ] **Phase 3:** Keyboard shortcuts fire (`chrome://extensions` → Keyboard shortcuts)
- [ ] **Phase 4:** Copilot Chat loads project context from `.github/copilot-instructions.md`

---

## Changelog

| Date | Version | Summary |
|------|---------|---------|
| 2026-03-10 | — | Roadmap created; codebase reviewed; plan agreed |
| 2026-03-10 | — | Phase 0 complete: folder rename, constants, bug fixes, dead code removed, shared CSS, dep cleanup, HTML titles |
| 2026-03-10 | — | Phase 1 complete: state persistence via storage.ts; content script restores state on load; popup shows active/inactive button state |
| 2026-03-10 | — | Add-ons: reset button; click-mode hover preview (dashed amber highlight + crosshair cursor); fix reset not clearing per-element outlines |
| 2026-03-10 | — | Refactor: `get-active-tab.ts` + `toggle-body-class.ts` shared helpers; `PESTICIDE_CLICK_FLAG` constant; two toggle helpers slimmed to wrappers; `makeHandler` factory in App.tsx; content.ts uses `getSiteState` |
| — | 0.0.13 | Current published version |
| — | 0.0.12 | Added click-to-outline feature |
| — | 0.0.10 | New extension icons |
