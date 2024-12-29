browser.browserAction.setBadgeText({ text: "" });

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showNotification") {
    browser.browserAction.setBadgeText({ text: "1" });
    browser.browserAction.setBadgeBackgroundColor({ color: "#80A3D5" });
  } else if (request.action === "clearNotification") {
    browser.browserAction.setBadgeText({ text: "" });
  }
});

async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

// Event listener for tab changes
browser.tabs.onActivated.addListener(async function (activeInfo) {
  // Get the active tab information
  try {
    const tab = await browser.tabs.get(activeInfo.tabId);
    const url = tab.url || "";

    const data = await getData(
      `https://thoughts.waylonwalker.com/link/?link=${encodeURIComponent(url)}`
    );

    if (data.hasOwnProperty("detail")) {
      await browser.browserAction.setBadgeText({ text: "" });
    } else {
      const localStorageKey = `formData-${url}`;
      await browser.browserAction.setBadgeText({ text: "1" });
      await browser.browserAction.setBadgeBackgroundColor({ color: "#80A3D5" });
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    }
  } catch (error) {
    console.error("Error:", error);
  }
});