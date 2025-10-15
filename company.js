// Floating CTA scroll effect
function initFloatingCTA() {
    const floatingCTA = document.querySelector('.floating-cta');
    
    if (floatingCTA) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const showThreshold = 300; // 300pxスクロールしたら表示
            
            if (scrollTop > showThreshold) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initFloatingCTA();
});

