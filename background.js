// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log(`🔄 Tab Updated: ${tab.url}`);
    
//     if (changeInfo.status === "complete" && tab.url.includes("http://127.0.0.1:5501/test.html")) {
//         console.log("✅ Matched URL, executing script...");

//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ["content.js"]
//         }).then(() => {
//             console.log("✅ content.js injected successfully!");
//         }).catch(err => {
//             console.error("❌ Error injecting content.js:", err);
//         });
//     }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getStatus") {
        chrome.storage.local.get(["autoClicker"], (data) => {
            sendResponse({ autoClicker: data.autoClicker || false });
        });
        return true; // Asynchronous response ke liye return true
    }
});

