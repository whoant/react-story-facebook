function injectHook(url) {
    const hookScript = document.createElement("script");
    hookScript.type = "module";
    hookScript.src = url;
    (document.head || document.body || document.documentElement).appendChild(hookScript);
}

function injectJs(url) {
    const hookScript = document.createElement("script");
    hookScript.src = url;
    (document.head || document.body || document.documentElement).appendChild(hookScript);
}

injectJs(chrome.extension.getURL('/lib/emoji.js'));
injectHook(chrome.extension.getURL('/lib/story.js'));
