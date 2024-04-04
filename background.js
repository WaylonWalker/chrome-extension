chrome.browserAction.setBadgeText({ text: "" });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showNotification") {
    chrome.browserAction.setBadgeText({ text: "1" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#80A3D5" });
  } else if (request.action === "clearNotification") {
    chrome.browserAction.setBadgeText({ text: "" });
  }
});

async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// Event listener for tab changes
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // Get the active tab information
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const url = tab.url || "";

    getData(
      `https://thoughts.waylonwalker.com/link/?link=${encodeURIComponent(url)}`,
    ).then((data) => {
      if (data.hasOwnProperty("detail")) {
        chrome.browserAction.setBadgeText({ text: "" });
      } else {
        localStorageKey = `formData-${url}`;
        chrome.browserAction.setBadgeText({ text: "1" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "#80A3D5" });
        localStorage.setItem(localStorageKey, JSON.stringify(data));
      }
    });
  });
});
