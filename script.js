// Hero Slider
let currentSlide = 0;
let heroSlides = [];
let totalSlides = 0;
let heroSliderInterval;

function initHeroSlider() {
    heroSlides = document.querySelectorAll('.hero-slide');
    totalSlides = heroSlides.length;
    
        if (totalSlides > 0) {
            showSlide(0);
            // アニメーション完了後に次のスライドに切り替え
            setTimeout(() => {
                heroSliderInterval = setInterval(nextSlide, 4000);
            }, 4000);
        }
}

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    if (totalSlides > 0) {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
        
        // アニメーションをリセット
        const currentImg = heroSlides[currentSlide].querySelector('img');
        if (currentImg) {
            currentImg.style.animation = 'none';
            currentImg.offsetHeight; // リフローを強制
            // 少し遅延してアニメーション開始
            setTimeout(() => {
                currentImg.style.animation = 'zoomIn 4s ease-in-out';
            }, 100);
        }
    }
}

function prevSlide() {
    if (totalSlides > 0) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
}

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initHeaderScroll();
    initFloatingCTA();
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', () => {
            const heroHeight = heroSection.offsetHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > heroHeight) {
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
            const showThreshold = 300; // 300pxスクロールしたら表示
            
            if (scrollTop > showThreshold) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }
}

// Pause on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        if (heroSliderInterval) {
            clearInterval(heroSliderInterval);
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
        if (totalSlides > 0) {
            heroSliderInterval = setInterval(nextSlide, 5000);
        }
    });
}

// Voice Slider
let currentVoiceSlide = 0;
const voiceSlider = document.querySelector('.voice-slider');
const voiceSlides = document.querySelectorAll('.voice-slide');
const totalVoiceSlides = voiceSlides.length;
const prevBtn = document.querySelector('.slider-btn-prev');
const nextBtn = document.querySelector('.slider-btn-next');

function updateVoiceSlider() {
    const slideWidth = voiceSlides[0].offsetWidth + 30; // width + gap
    voiceSlider.style.transform = `translateX(-${currentVoiceSlide * slideWidth}px)`;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentVoiceSlide > 0) {
            currentVoiceSlide--;
            updateVoiceSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentVoiceSlide < totalVoiceSlides - 1) {
            currentVoiceSlide++;
            updateVoiceSlider();
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Window resize handler for voice slider
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateVoiceSlider();
    }, 250);
});

