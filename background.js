chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && tab.url.includes("https://www.facebook.com/stories/")) {
        // chrome.tabs.executeScript(null, {file: 'lib/story.js'})
    }
});