console.log("✅ Auto Clicker Script Loaded!");

// Function to get Auto Clicker Status
function getAutoClickerStatus(callback) {
    chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
        if (chrome.runtime.lastError || !response) {
            console.error("❌ Error getting status:", chrome.runtime.lastError);
            callback(false);
        } else {
            callback(response.autoClicker);
        }
    });
}

// Function to Click the Call Now Button
function autoClick() {
    getAutoClickerStatus((isActive) => {
        if (!isActive) return; // Stop if disabled

        // Try finding button by class name (From Screenshot)
        let btn = document.querySelector("button.sc-q0EtJz.sc-kCMKrZ.InGcOU.hDJykm");

        if (!btn) {
            // Try finding by text content if class selector fails
            btn = [...document.querySelectorAll("button")].find(b => b.innerText.includes("Call Now"));
        }

        if (btn) {
            console.log("✅ Button Found! Clicking...");
            btn.click();
        } else {
            console.log("❌ Button not found! Retrying in 2 sec...");
        }
    });
}

// Run autoClick every 2 seconds
setInterval(autoClick, 1000);