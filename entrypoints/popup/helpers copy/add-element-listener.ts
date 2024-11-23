export const addElementListener = async () => {
  browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const { id } = tabs[0];

    id &&
      browser.scripting.executeScript({
        target: { tabId: id },
        func: () => {
          const listenToClick = (e: Event) => {
            (e.target as Element).removeEventListener(e.type, listenToClick);
            (e.target as Element)?.classList?.toggle("pesticide-active");
          };
          document.addEventListener("click", listenToClick);
        },
      });
  });
};
