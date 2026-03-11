import "~/assets/pesticide.css";
import { PESTICIDE_ACTIVE, PESTICIDE_CLICK_MODE, PESTICIDE_HOVER } from "~/helpers/constants";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "manifest",

  async main() {
    try {
      const origin = window.location.origin;
      if (!origin.startsWith("http")) return;

      const data = await browser.storage.local.get("sites");
      const sites = (data.sites ?? {}) as Record<
        string,
        { outlines?: boolean; hover?: boolean; clickOutlines?: boolean }
      >;
      const state = sites[origin];
      if (!state) return;

      if (state.outlines) document.body.classList.add(PESTICIDE_ACTIVE);
      if (state.hover) document.body.classList.add(PESTICIDE_HOVER);

      if (state.clickOutlines) {
        const FLAG = "__pesticideClickActive";
        const doc = document as Document & { [key: string]: unknown };
        const handler = (e: Event) => {
          (e.target as Element)?.classList?.toggle(PESTICIDE_ACTIVE);
        };
        document.addEventListener("click", handler);
        doc[FLAG] = handler;
        document.body.classList.add(PESTICIDE_CLICK_MODE);
      }
    } catch (err) {
      console.warn("[css-debug] Failed to restore state on load:", err);
    }
  },
});
