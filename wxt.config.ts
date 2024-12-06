import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],

  manifest: {
    default_locale: "en",
    name: "CSS Debug with Pesticide",
    short_name: "CSS Pesticide",
    description: "Toggle outlines on all elements to help debug CSS",

    homepage_url: "https://github.com/Sensiblemnd/css-debug",
    permissions: ["activeTab", "scripting"],
  },
});
