function injectHook(url, type = '') {
    const hookScript = document.createElement("script");
    if (type !== '') hookScript.type = "module";
    hookScript.src = url;
    hookScript.onload = function () {
        this.remove();
    };
    (document.head || document.body || document.documentElement).appendChild(hookScript);
}


// injectHook(chrome.extension.getURL('/lib/emoji.js'));

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.message === 'TabUpdated' && document.location.href.includes('https://www.facebook.com/stories')) {
//         // injectHook(chrome.extension.getURL(`/lib/story.js?v=${getRandom(1, 100)}`), 'module');
//         // injectHook(chrome.extension.getURL(`/lib/story.js`), 'module');
//         // chrome.tabs.executeScript(null, {file: 'lib/story.js'});
//     }
// })

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}