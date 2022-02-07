function injectHook(url, type = '') {
    const hookScript = document.createElement("script");
    if (type !== '') hookScript.type = "module";
    hookScript.src = url;
    (document.head || document.body || document.documentElement).appendChild(hookScript);
}


injectHook(chrome.extension.getURL('/lib/emoji.js'));
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'TabUpdated' && document.location.href.includes('https://www.facebook.com/stories')) {
        injectHook(chrome.extension.getURL('/lib/story.js'), 'module');
    }
})


