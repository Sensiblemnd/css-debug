export const togglePesticideHover = async () => {
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const { id } = tabs[0];

    id &&
      browser.scripting.executeScript({
        target: { tabId: id },
        func: () => {
          // I need to toggle a class on the body of the page
          document.body.classList.toggle("pesticide-active-hover");
        },
      });
  });
};
