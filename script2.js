// V2 Design JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initV2HeroSlider();
    initV2FloatingCTA();
    initV2ScrollAnimations();
});

// Hero Slider
let v2CurrentSlide = 0;
let v2HeroSlides = [];
let v2TotalSlides = 0;
let v2HeroSliderInterval;

function initV2HeroSlider() {
    v2HeroSlides = document.querySelectorAll('.v2-hero-slide');
    v2TotalSlides = v2HeroSlides.length;
    
    if (v2TotalSlides > 0) {
        showV2Slide(0);
        // 8秒後に次のスライドへ（アニメーション完了時間に合わせて）
        setTimeout(() => {
            v2HeroSliderInterval = setInterval(nextV2Slide, 8000);
        }, 8000);
    }
}

function showV2Slide(index) {
    if (v2TotalSlides === 0) return;
    
    // 全スライドを非表示
    v2HeroSlides.forEach((slide) => {
        slide.classList.remove('v2-active');
    });
    
    // 指定されたスライドを表示
    v2HeroSlides[index].classList.add('v2-active');
    
    // アニメーションをリセット
    const img = v2HeroSlides[index].querySelector('img');
    if (img) {
        img.style.animation = 'none';
        setTimeout(() => {
            img.style.animation = 'v2ZoomIn 8s ease-out forwards';
        }, 50);
    }
    
    v2CurrentSlide = index;
}

function nextV2Slide() {
    let nextIndex = (v2CurrentSlide + 1) % v2TotalSlides;
    showV2Slide(nextIndex);
}

// Floating CTA scroll effect
function initV2FloatingCTA() {
    const floatingCTA = document.querySelector('.v2-floating-cta');
    
    if (floatingCTA) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const showThreshold = 300; // 300pxスクロールしたら表示
            
            if (scrollTop > showThreshold) {
                floatingCTA.classList.add('v2-visible');
            } else {
                floatingCTA.classList.remove('v2-visible');
            }
        });
    }
}

// Scroll animations
function initV2ScrollAnimations() {
    const strengthItems = document.querySelectorAll('.v2-strength-item');
    const worksItems = document.querySelectorAll('.v2-works-item');
    const newsItems = document.querySelectorAll('.v2-news-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Strength items
    strengthItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Works items
    worksItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
        observer.observe(item);
    });
    
    // News items
    newsItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(item);
    });
}
