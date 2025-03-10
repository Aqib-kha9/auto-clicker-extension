# Auto Clicker Chrome Extension

## Overview
This is a simple Auto Clicker Chrome Extension that automatically clicks a "Call Now" button on a webpage at regular intervals. The script identifies the button using class names and text content and clicks it if found.

## Features
- **Automatic Clicking**: Clicks the "Call Now" button every second.
- **Status Check**: The script first checks whether the auto clicker is enabled.
- **Multiple Button Detection Methods**: It searches for the button using both class names and text content.
- **Error Handling**: Logs errors when the button is not found and retries after a short delay.

## Installation Guide

1. **Download the Extension Files**
   - Clone or download the repository containing the extension files.

2. **Load the Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle in the top-right corner).
   - Click "Load unpacked" and select the folder containing the extension files.

3. **Activate the Extension**
   - Click on the extension icon in the Chrome toolbar.
   - Toggle the auto clicker ON/OFF as needed.

## How It Works
1. The script loads and logs "✅ Auto Clicker Script Loaded!".
2. Every second, it checks if the auto clicker is active.
3. If active, it looks for a button matching the given class name (`button.sc-q0EtJz.sc-kCMKrZ.InGcOU.hDJykm`).
4. If not found, it searches for any button with "Call Now" in its text.
5. If a button is found, it clicks it and logs "✅ Button Found! Clicking...".
6. If no button is found, it logs "❌ Button not found! Retrying in 2 sec..." and retries.

## Code Overview

### **Main Script (content.js)**
```javascript
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

        // Try finding button by class name
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
```

## Permissions Required
- **`activeTab`**: To interact with the currently active tab.
- **`background`**: To keep the script running in the background.

## Possible Enhancements
- Add a **popup UI** to allow users to customize the clicking interval.
- Improve button detection using **machine learning or heuristics**.
- Add **support for multiple button variations** across different websites.

## Disclaimer
This extension is intended for **educational purposes** only. Use it responsibly and ensure compliance with website terms and conditions before enabling auto-clicking.

---

Enjoy your **Auto Clicker Chrome Extension!** 🚀

