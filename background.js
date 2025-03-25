let adBlockEnabled = true;

chrome.storage.local.get(["adBlockEnabled"], function (data) {
    adBlockEnabled = data.adBlockEnabled ?? true;
});

chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === "toggleAdBlock") {
        adBlockEnabled = message.enabled;
        chrome.storage.local.set({ adBlockEnabled });
        updateRules();
    }
});

const rules = [
    {
        "id": 1,
        "action": { "type": "block" },
        "condition": {
            "urlFilter": ".*youtube.com.*ad.*",
            "resourceTypes": ["main_frame", "sub_frame"]
        }
    },
    {
        "id": 2,
        "action": { "type": "block" },
        "condition": {
            "urlFilter": ".*googlevideo.com.*ad.*",
            "resourceTypes": ["main_frame", "sub_frame"]
        }
    }
];

function updateRules() {
    chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
        const existingIds = existingRules.map(rule => rule.id);
        const removeParams = existingIds.length > 0 ? { removeRuleIds: existingIds } : {};

        chrome.declarativeNetRequest.updateDynamicRules({
            ...removeParams,
            addRules: adBlockEnabled ? rules : []
        });
    });
}

updateRules();
