import { PESTICIDE_ACTIVE } from "../../../helpers/constants";
import { isStorableOrigin, setSiteState } from "../../../helpers/storage";

export const togglePesticide = async (): Promise<boolean | null> => {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    if (!tab?.id) return null;

    const results = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: (className: string) => {
        document.body.classList.toggle(className);
        return document.body.classList.contains(className);
      },
      args: [PESTICIDE_ACTIVE],
    });

    const isActive = (results[0]?.result as boolean) ?? false;
    if (tab.url && isStorableOrigin(tab.url)) {
      await setSiteState(new URL(tab.url).origin, { outlines: isActive });
    }
    return isActive;
  } catch (err) {
    console.error("[css-debug] togglePesticide failed:", err);
    return null;
  }
};
