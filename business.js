// Business Page Animations and Interactions

// Smooth scroll animation for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.about-section, .services-section, .promises-section, .awards-section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });

    // Observe promise items
    const promiseItems = document.querySelectorAll('.promise-item');
    promiseItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Floating CTA scroll effect
function initFloatingCTA() {
    const floatingCTA = document.querySelector('.floating-cta');
    
    if (floatingCTA) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const showThreshold = 500;
            
            if (scrollTop > showThreshold) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }
}

// Service item hover effects
function initServiceItemEffects() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const image = item.querySelector('.service-image img');
        
        if (image) {
            item.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        }
    });
}

// Promise item interaction effects
function initPromiseItemEffects() {
    const promiseItems = document.querySelectorAll('.promise-item');
    
    promiseItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const number = item.querySelector('.promise-number');
            if (number) {
                number.style.transform = 'scale(1.1) rotate(5deg)';
                number.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const number = item.querySelector('.promise-number');
            if (number) {
                number.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Table row hover effects for awards
function initAwardsTableEffects() {
    const tableRows = document.querySelectorAll('.awards-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f5f5f5';
            row.style.transition = 'background-color 0.2s ease';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
}

// Smooth reveal animation for text elements
function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('.about-text, .services-intro-text, .promises-subtitle');
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        textObserver.observe(element);
    });
}

// Hamburger menu functionality
function initHamburgerMenu() {
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

// Tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initHeaderScrollEffect();
    initFloatingCTA();
    initServiceItemEffects();
    initPromiseItemEffects();
    initAwardsTableEffects();
    initTextRevealAnimations();
    initHamburgerMenu();
    initTabs();
});

