import { type SiteState, isStorableOrigin, setSiteState } from "../../../helpers/storage";

/**
 * Generic helper: toggles a single class on document.body of the given tab,
 * persists the new boolean state under `storageKey`, and returns the new value.
 */
export const toggleBodyClass = async (
  tabId: number,
  tabUrl: string | undefined,
  className: string,
  storageKey: keyof SiteState
): Promise<boolean | null> => {
  const results = await browser.scripting.executeScript({
    target: { tabId },
    func: (cls: string) => {
      document.body.classList.toggle(cls);
      return document.body.classList.contains(cls);
    },
    args: [className],
  });

  const isActive = (results[0]?.result as boolean) ?? false;
  if (tabUrl && isStorableOrigin(tabUrl)) {
    await setSiteState(new URL(tabUrl).origin, { [storageKey]: isActive });
  }
  return isActive;
};
