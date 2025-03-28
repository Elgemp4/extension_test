chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({
    path: "sidepanel.html",
    enabled: true,
  });
});
