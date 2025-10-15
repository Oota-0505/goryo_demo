// V4 Design - JavaScript
// 完全独立版（他のデザイン案と干渉しない）

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    initHeroSlider();
    
    // Contact Bar
    initContactBar();
    
    // Scroll Animations
    initScrollAnimations();
});

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.v4-hero-slide');
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('v4-active'));
        slides[index].classList.add('v4-active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto play every 5 seconds
    setInterval(nextSlide, 5000);
}

// Contact Bar
function initContactBar() {
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
    const footer = document.querySelector('.v4-footer-main');
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

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.v4-fade-in, .v4-fade-in-left, .v4-fade-in-right, .v4-zoom-in');
    
    if (animatedElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('v4-visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

