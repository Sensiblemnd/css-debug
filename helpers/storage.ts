export interface SiteState {
  outlines: boolean;
  hover: boolean;
  clickOutlines: boolean;
}

const DEFAULT_STATE: SiteState = {
  outlines: false,
  hover: false,
  clickOutlines: false,
};

const STORAGE_KEY = "sites";

/** Returns the persisted state for `origin`, or defaults if none / on error. */
export const getSiteState = async (origin: string): Promise<SiteState> => {
  try {
    const data = await browser.storage.local.get(STORAGE_KEY);
    const sites = (data[STORAGE_KEY] ?? {}) as Record<string, Partial<SiteState>>;
    return { ...DEFAULT_STATE, ...sites[origin] };
  } catch {
    return { ...DEFAULT_STATE };
  }
};

/** Merges `patch` into the stored state for `origin`. Logs a warning on quota/write failure. */
export const setSiteState = async (
  origin: string,
  patch: Partial<SiteState>
): Promise<void> => {
  try {
    const data = await browser.storage.local.get(STORAGE_KEY);
    const sites = (data[STORAGE_KEY] ?? {}) as Record<string, Partial<SiteState>>;
    sites[origin] = { ...DEFAULT_STATE, ...sites[origin], ...patch };
    await browser.storage.local.set({ [STORAGE_KEY]: sites });
  } catch (err) {
    console.warn("[css-debug] storage write failed — toggle state will not persist:", err);
  }
};

/** Removes persisted state for `origin` entirely (reset). */
export const clearSiteState = async (origin: string): Promise<void> => {
  try {
    const data = await browser.storage.local.get(STORAGE_KEY);
    const sites = (data[STORAGE_KEY] ?? {}) as Record<string, Partial<SiteState>>;
    delete sites[origin];
    await browser.storage.local.set({ [STORAGE_KEY]: sites });
  } catch (err) {
    console.warn("[css-debug] storage clear failed:", err);
  }
};

/** Returns true for http/https origins where persistence is meaningful. */
export const isStorableOrigin = (url: string): boolean => {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};
