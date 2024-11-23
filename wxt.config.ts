import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],

  manifest: {
    name: "CSS Debug with Pesticide",
    short_name: "CSS Pesticide",
    description: "Toggle outlines on all elements to help debug CSS",

    developer: {
      name: "Rob Lloveras",
      url: "https://bsky.app/profile/lloveras.info",
    },
    homepage_url: "https://github.com/Sensiblemnd/css-debug",
    permissions: ["activeTab", "scripting"],
  },
});
