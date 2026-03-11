import { PESTICIDE_ACTIVE, PESTICIDE_CLICK_MODE, PESTICIDE_HOVER } from "../../../helpers/constants";
import { clearSiteState, isStorableOrigin } from "../../../helpers/storage";

// Removes all pesticide classes and the click listener from the active tab,
// and clears the persisted state for that origin.
export const resetSite = async (): Promise<void> => {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab?.id) return;

    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: (active: string, hover: string, clickMode: string) => {
        // Remove body-level mode classes
        document.body.classList.remove(active, hover, clickMode);

        // Remove per-element outlines applied by click-to-outline mode
        document.querySelectorAll(`.${active}`).forEach((el) => {
          el.classList.remove(active);
        });

        // Tear down the click listener
        const FLAG = "__pesticideClickActive";
        const doc = document as Document & { [key: string]: unknown };
        if (doc[FLAG]) {
          document.removeEventListener("click", doc[FLAG] as EventListener);
          delete doc[FLAG];
        }
      },
      args: [PESTICIDE_ACTIVE, PESTICIDE_HOVER, PESTICIDE_CLICK_MODE],
    });

    if (tab.url && isStorableOrigin(tab.url)) {
      await clearSiteState(new URL(tab.url).origin);
    }
  } catch (err) {
    console.error("[css-debug] resetSite failed:", err);
  }
};
