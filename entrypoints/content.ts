import "~/assets/pesticide.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {},
  cssInjectionMode: "manifest",
});
