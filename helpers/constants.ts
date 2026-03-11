// CSS class names toggled on document.body to activate pesticide modes.
// These must match the selectors in assets/pesticide.css.
// Note: when passing these into browser.scripting.executeScript,
// use the `args` parameter so the injected function can receive them.
export const PESTICIDE_ACTIVE = "pesticide-active";
export const PESTICIDE_HOVER = "pesticide-active-hover";
// Applied to body while click-to-outline mode is active;
// enables the pre-click hover highlight via CSS.
export const PESTICIDE_CLICK_MODE = "pesticide-click-mode";
