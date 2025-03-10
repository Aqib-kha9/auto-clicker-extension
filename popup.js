document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start");
    const stopBtn = document.getElementById("stop");
    const statusText = document.getElementById("status");

    // Function to update status
    function updateStatus() {
        chrome.storage.local.get(["autoClicker"], (data) => {
            statusText.textContent = data.autoClicker ? "Running" : "Stopped";
        });
    }

    startBtn.addEventListener("click", () => {
        chrome.storage.local.set({ autoClicker: true }, updateStatus);
    });

    stopBtn.addEventListener("click", () => {
        chrome.storage.local.set({ autoClicker: false }, updateStatus);
    });

    // Load initial status
    updateStatus();
});
// "host_permissions": ["http://127.0.0.1:5501/*"], 
// "matches": ["http://127.0.0.1:5501/*"],  