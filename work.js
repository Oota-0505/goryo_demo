// Work page functionality
class WorkPage {
    constructor() {
        this.init();
    }

    init() {
        this.initHeaderScroll();
        this.initContactBar();
        this.initScrollAnimations();
        this.initHamburgerMenu();
    }

    // Header scroll effect
    initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Contact Bar
    initContactBar() {
        const contactBar = document.querySelector('.v4-contact-bar');
        
        if (!contactBar) return;
        
        // Show contact bar after scrolling
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                contactBar.classList.add('v4-visible');
            } else {
                contactBar.classList.remove('v4-visible');
            }
        });
        
        // Show contact bar when near footer
        const footer = document.querySelector('.footer');
        if (footer) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        contactBar.classList.add('v4-visible');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            observer.observe(footer);
        }
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

