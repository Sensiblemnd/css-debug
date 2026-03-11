/** Returns the active tab in the current window, or null if unavailable. */
export const getActiveTab = async (): Promise<browser.tabs.Tab | null> => {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    return tabs[0] ?? null;
  } catch {
    return null;
  }
};
