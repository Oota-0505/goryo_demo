// Work page functionality
class WorkPage {
    constructor() {
        this.init();
    }

    init() {
        this.initFloatingCTA();
        this.initScrollAnimations();
        this.initHamburgerMenu();
    }

    // Floating CTA scroll effect
    initFloatingCTA() {
        const floatingCTA = document.querySelector('.floating-cta');
        if (!floatingCTA) return;

        const showThreshold = 300;
        let isVisible = false;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const shouldShow = scrollTop > showThreshold;

            if (shouldShow !== isVisible) {
                isVisible = shouldShow;
                floatingCTA.classList.toggle('visible', isVisible);
            }
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    // Scroll animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Stop observing after animation triggers
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe filter buttons and work cards
        document.querySelectorAll('.filter-btn, .work-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Hamburger menu functionality
    initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on menu items
            mobileMenu.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WorkPage();
});

