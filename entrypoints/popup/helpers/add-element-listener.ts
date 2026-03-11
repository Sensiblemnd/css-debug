import { PESTICIDE_ACTIVE, PESTICIDE_CLICK_MODE } from "../../../helpers/constants";
import { isStorableOrigin, setSiteState } from "../../../helpers/storage";

// Toggles per-element click-to-outline mode on the active tab.
// First call activates: hovering shows a preview highlight; each click toggles the outline.
// Calling again deactivates by removing the listener and hover highlight.
export const addElementListener = async (): Promise<boolean | null> => {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab?.id) return null;

    const results = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: (clickClass: string, modeClass: string) => {
        const FLAG = "__pesticideClickActive";
        const doc = document as Document & { [key: string]: unknown };

        if (doc[FLAG]) {
          document.removeEventListener("click", doc[FLAG] as EventListener);
          delete doc[FLAG];
          document.body.classList.remove(modeClass);
          return false;
        }

        const handler = (e: Event) => {
          (e.target as Element)?.classList?.toggle(clickClass);
        };
        document.addEventListener("click", handler);
        doc[FLAG] = handler;
        document.body.classList.add(modeClass);
        return true;
      },
      args: [PESTICIDE_ACTIVE, PESTICIDE_CLICK_MODE],
    });

    const isActive = (results[0]?.result as boolean) ?? false;
    if (tab.url && isStorableOrigin(tab.url)) {
      await setSiteState(new URL(tab.url).origin, { clickOutlines: isActive });
    }
    return isActive;
  } catch (err) {
    console.error("[css-debug] addElementListener failed:", err);
    return null;
  }
};
