import { PESTICIDE_ACTIVE } from "../../../helpers/constants";
import { getActiveTab } from "./get-active-tab";
import { toggleBodyClass } from "./toggle-body-class";

export const togglePesticide = async (): Promise<boolean | null> => {
  try {
    const tab = await getActiveTab();
    if (!tab?.id) return null;
    return await toggleBodyClass(tab.id, tab.url, PESTICIDE_ACTIVE, "outlines");
  } catch (err) {
    console.error("[css-debug] togglePesticide failed:", err);
    return null;
  }
};
