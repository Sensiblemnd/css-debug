import { PESTICIDE_HOVER } from "../../../helpers/constants";
import { getActiveTab } from "./get-active-tab";
import { toggleBodyClass } from "./toggle-body-class";

export const togglePesticideHover = async (): Promise<boolean | null> => {
  try {
    const tab = await getActiveTab();
    if (!tab?.id) return null;
    return await toggleBodyClass(tab.id, tab.url, PESTICIDE_HOVER, "hover");
  } catch (err) {
    console.error("[css-debug] togglePesticideHover failed:", err);
    return null;
  }
};
