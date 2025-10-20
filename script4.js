// V4 Design - JavaScript
// 完全独立版（他のデザイン案と干渉しない）

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    initHeroSlider();
    
    // Contact Bar
    initContactBar();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Hamburger Menu
    initHamburgerMenu();
    
    // Flow Slider
    initFlowSlider();
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

// Hamburger Menu
function initHamburgerMenu() {
    const hamburger = document.querySelector('.v4-hamburger');
    const navMenu = document.querySelector('.v4-nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav item
    const navItems = document.querySelectorAll('.v4-nav-item');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Flow Slider - Refactored
function initFlowSlider() {
    const slider = document.querySelector('.v4-flow-slider');
    const slides = document.querySelectorAll('.v4-flow-slide');
    const prevBtn = document.querySelector('.v4-flow-prev');
    const nextBtn = document.querySelector('.v4-flow-next');
    const dots = document.querySelectorAll('.v4-flow-dot');
    
    if (!slider || slides.length === 0) {
        console.log('Flow slider elements not found');
        return;
    }
    
    let currentIndex = 0;
    let autoSlideInterval = null;
    const SLIDE_WIDTH = 300;
    const GAP = 24;
    const AUTO_SLIDE_INTERVAL = 4000;
    
    // Update slider position and states
    function updateSlider() {
        // Calculate center position
        const containerWidth = slider.parentElement.offsetWidth;
        const totalSlideWidth = SLIDE_WIDTH + GAP;
        const centerOffset = (containerWidth / 2) - (SLIDE_WIDTH / 2);
        const slideOffset = currentIndex * totalSlideWidth;
        const finalOffset = centerOffset - slideOffset;
        
        // Apply transform
        slider.style.transform = `translateX(${finalOffset}px)`;
        
        // Update slide active states
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        console.log(`Slide updated: ${currentIndex + 1}/${slides.length}`);
    }
    
    // Navigate to specific slide
    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentIndex = index;
            updateSlider();
            resetAutoSlide();
        }
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    }
    
    // Next slide
    function nextSlide() {
        goToSlide((currentIndex + 1) % slides.length);
    }
    
    // Auto slide function
    function autoSlide() {
        nextSlide();
    }
    
    // Start auto slide
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(autoSlide, AUTO_SLIDE_INTERVAL);
        console.log('Auto slide started');
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
            console.log('Auto slide stopped');
        }
    }
    
    // Reset auto slide (restart timer)
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    console.log(`Initializing flow slider with ${slides.length} slides`);
    updateSlider();
    startAutoSlide();
}

