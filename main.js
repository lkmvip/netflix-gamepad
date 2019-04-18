console.log('Hello, Netflix Gamepad!');

const injectedSrc = chrome.runtime.getURL('injected.js');
var scriptElem = document.createElement("script");
scriptElem.src = injectedSrc;
document.body.appendChild(scriptElem);