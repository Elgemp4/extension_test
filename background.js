chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({
    path: "sidepanel.html",
    enabled: true,
  });
});

chrome.action.onClicked.addListener((tab) => {
  console.log(chrome.sidePanel);
  chrome.sidePanel.open({ tabId: tab.id });
});

const GOOGLE_ORIGIN = "https://www.google.com";

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on google.com
  if (true) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: "sidepanel.html",
      enabled: true,
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
});
