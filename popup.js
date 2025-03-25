document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleBtn");

    if (!toggleBtn) {
        console.error("Button not found!");
        return;
    }

    // chrome.storage
    chrome.storage.local.get(["adBlockEnabled"], function (data) {
        const isEnabled = data.adBlockEnabled ?? true; // default
        updateButton(isEnabled);
    });

    // toggle button click
    toggleBtn.addEventListener("click", function () {
        chrome.storage.local.get(["adBlockEnabled"], function (data) {
            const newState = !(data.adBlockEnabled ?? true); // toggle state
            chrome.storage.local.set({ adBlockEnabled: newState }, function () {
                updateButton(newState);
                chrome.runtime.sendMessage({ action: "toggleAdBlock", enabled: newState });
            });
        });
    });

    function updateButton(isEnabled) {
        toggleBtn.textContent = isEnabled ? "Disable AdBlock" : "Enable AdBlock";
        toggleBtn.classList.toggle("enabled", isEnabled);
    }
});
