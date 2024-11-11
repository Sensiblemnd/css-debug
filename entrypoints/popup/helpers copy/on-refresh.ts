export const hasRefreshPage = async () => {
  browser.webNavigation.onCommitted.addListener(function (details) {
    if (details.transitionType === "reload") {
      return;
    }
  });
};
