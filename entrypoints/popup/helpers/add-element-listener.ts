import { PESTICIDE_ACTIVE, PESTICIDE_CLICK_FLAG, PESTICIDE_CLICK_MODE } from "../../../helpers/constants";
import { isStorableOrigin, setSiteState } from "../../../helpers/storage";
import { getActiveTab } from "./get-active-tab";

// Toggles per-element click-to-outline mode on the active tab.
// First call activates: hovering shows a preview highlight; each click toggles the outline.
// Calling again deactivates by removing the listener and hover highlight.
export const addElementListener = async (): Promise<boolean | null> => {
  try {
    const tab = await getActiveTab();
    if (!tab?.id) return null;

    const results = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: (clickClass: string, modeClass: string, flagKey: string) => {
        const doc = document as Document & { [key: string]: unknown };

        if (doc[flagKey]) {
          document.removeEventListener("click", doc[flagKey] as EventListener);
          delete doc[flagKey];
          document.body.classList.remove(modeClass);
          return false;
        }

        const handler = (e: Event) => {
          (e.target as Element)?.classList?.toggle(clickClass);
        };
        document.addEventListener("click", handler);
        doc[flagKey] = handler;
        document.body.classList.add(modeClass);
        return true;
      },
      args: [PESTICIDE_ACTIVE, PESTICIDE_CLICK_MODE, PESTICIDE_CLICK_FLAG],
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
