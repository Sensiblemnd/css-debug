import "~/assets/pesticide.css";

export default defineContentScript({
  matches: ["https://*/*", "http://*/*"],
  main() {},
  cssInjectionMode: "manifest",
});
