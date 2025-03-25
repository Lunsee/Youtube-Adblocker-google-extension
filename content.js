function removeAds() {
    const adSelectors = [
        '.ytp-ad-player-overlay', 
        '.ytp-ad-preview-text',    
        '.ytp-ad-text',            
        '.ad-container',           
        '.video-ads',              
    ];

    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
    });

    const skipButton = document.querySelector('.ytp-ad-skip-button');
    if (skipButton) {
        skipButton.click();
    }
}

setInterval(removeAds, 1000);
