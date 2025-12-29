// Hero Slider
let currentSlide = 0;
let heroSlides = [];
let totalSlides = 0;
let heroSliderInterval;

function initHeroSlider() {
    heroSlides = document.querySelectorAll('.hero-slide');
    totalSlides = heroSlides.length;
    
    console.log('Hero slider initialized:', totalSlides, 'slides found');
    
    if (totalSlides > 0) {
        // すべてのスライドを非アクティブにする
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
            // パララックス効果をリセット
            const img = slide.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        });
        
        // 最初のスライドをアクティブにする
        showSlide(0);
        
        // 自動スライド開始
        if (heroSliderInterval) {
            clearInterval(heroSliderInterval);
        }
        heroSliderInterval = setInterval(() => {
            console.log('Auto slide triggered, current:', currentSlide);
            nextSlide();
        }, 3000);
        
        console.log('Auto slide interval started');
    }
}

function showSlide(index) {
    if (totalSlides === 0 || index < 0 || index >= totalSlides) {
        console.log('showSlide: Invalid index', index, 'totalSlides:', totalSlides);
        return;
    }
    
    console.log('showSlide: Showing slide', index);
    
    // 現在のスライドインデックスを更新
    currentSlide = index;
    
    // すべてのスライドを非アクティブにする
    heroSlides.forEach((slide, i) => {
        if (i === index) {
            // アクティブにするスライド
            slide.classList.add('active');
            console.log('Slide', i, 'activated');
        } else {
            // 非アクティブなスライド
            slide.classList.remove('active');
            // 非アクティブなスライドのパララックス効果をリセット
            const img = slide.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        }
    });
    
    // スライド切り替え完了後にパララックス効果を再計算
    // 少し遅延を入れて、CSSトランジションと同期させる
    requestAnimationFrame(() => {
        setTimeout(() => {
            if (window.updateHeroParallax) {
                window.updateHeroParallax();
            }
        }, 50);
    });
}

function nextSlide() {
    if (totalSlides > 0) {
        const nextIndex = (currentSlide + 1) % totalSlides;
        console.log('nextSlide: Moving from', currentSlide, 'to', nextIndex);
        showSlide(nextIndex);
    } else {
        console.log('nextSlide: No slides available');
    }
}

// Hamburger Menu
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        // ハンバーガーボタンクリック
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // メニューアイテムクリック時に閉じる
        const navItems = mobileMenu.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
        
        // メニュー外クリックで閉じる
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
}

// Flow Section Step Animation
function initFlowSteps() {
    const steps = document.querySelectorAll('.flow-step');
    const images = document.querySelectorAll('.flow-image');
    let currentStep = 0;
    let autoPlayInterval;
    let isAnimationStarted = false;
    const INTERVAL_TIME = 4000; // 4秒間隔で統一

    function setActiveStep(index) {
        // 有効なインデックスかチェック
        if (index < 0 || index >= steps.length) return;
        
        // すべてのステップを非アクティブに
        steps.forEach((step, i) => {
            step.classList.remove('active', 'completed');
            if (i < index) {
                step.classList.add('completed');
            } else if (i === index) {
                step.classList.add('active');
            }
        });

        // すべての画像を非アクティブに
        images.forEach((image) => {
            image.classList.remove('active');
        });
        
        // アクティブな画像を設定（遅延なしで統一）
        if (images[index]) {
            images[index].classList.add('active');
        }

        currentStep = index;
    }

    function nextStep() {
        const nextIndex = (currentStep + 1) % steps.length;
        setActiveStep(nextIndex);
    }

    function startAutoPlay() {
        if (!isAnimationStarted) return;
        autoPlayInterval = setInterval(nextStep, INTERVAL_TIME);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    function startAnimation() {
        if (isAnimationStarted) return;
        isAnimationStarted = true;
        
        // 初期状態を設定
        setActiveStep(0);
        
        // 自動再生開始
        startAutoPlay();
    }

    // ステップクリックイベント
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            if (!isAnimationStarted) return;
            stopAutoPlay();
            setActiveStep(index);
            // 4秒後に自動再生再開（統一）
            setTimeout(startAutoPlay, INTERVAL_TIME);
        });
    });

    // マウスホバーで自動再生を停止/再開
    const container = document.querySelector('.flow-steps-container');
    if (container) {
        container.addEventListener('mouseenter', () => {
            if (!isAnimationStarted) return;
            stopAutoPlay();
        });
        container.addEventListener('mouseleave', () => {
            if (!isAnimationStarted) return;
            // 1秒後に自動再生再開（統一）
            setTimeout(startAutoPlay, 1000);
        });
    }

    // Intersection Observerでエリアに入ったらアニメーション開始
    const flowSection = document.querySelector('.flow-section');
    if (flowSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 0.5秒後にアニメーション開始（統一）
                    setTimeout(startAnimation, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(flowSection);
    }
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    let ticking = false;

    // ヒーロー画像のパララックス効果を更新する関数（外部から呼び出し可能）
    function updateHeroParallax() {
        // heroSlidesが定義されているか確認
        if (!heroSlides || heroSlides.length === 0) {
            heroSlides = document.querySelectorAll('.hero-slide');
        }
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // すべてのスライドの画像を処理
        heroSlides.forEach(slide => {
            const img = slide.querySelector('img');
            if (!img) return;
            
            if (slide.classList.contains('active')) {
                // アクティブなスライドの画像のみにパララックス効果を適用
                const yPos = -(scrollTop * 0.2);
                img.style.transform = `translateY(${yPos}px) scale(1.05)`;
            } else {
                // 非アクティブなスライドの画像はtransformをリセット
                img.style.transform = '';
            }
        });
    }
    
    // 外部から呼び出せるようにグローバルに公開
    window.updateHeroParallax = updateHeroParallax;

    function updateParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('parallax-slow') ? 0.5 :
                         element.classList.contains('parallax-medium') ? 0.3 :
                         element.classList.contains('parallax-fast') ? 0.1 : 0.2;
            
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Hero images parallax - アクティブなスライドの画像のみに適用
        updateHeroParallax();

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // 初期化時に一度実行（ページ読み込み時のスクロール位置に対応）
    updateParallax();
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    console.log('[ScrollAnim] 初期化開始 - 要素数:', animatedElements.length);
    
    if (animatedElements.length === 0) {
        console.log('[ScrollAnim] 対象要素が見つかりません');
        return;
    }
    
    // IntersectionObserverが使用可能か確認
    if (!('IntersectionObserver' in window)) {
        console.log('[ScrollAnim] IntersectionObserver非対応 - 全要素を即時表示');
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('[ScrollAnim] 表示:', entry.target.classList.toString());
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 初期表示時に画面内にある要素を即座に表示
    requestAnimationFrame(() => {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                console.log('[ScrollAnim] 初期表示:', element.classList.toString());
                element.classList.add('visible');
            }
        });
    });
    
    console.log('[ScrollAnim] 初期化完了');
}

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', () => {
    // パララックス効果を先に初期化（updateHeroParallax関数を利用可能にするため）
    initParallax();
    // その後、ヒーロースライダーを初期化
    initHeroSlider();
    initHeroHoverControl();
    initHeaderScroll();
    initFloatingCTA();
    initHamburgerMenu();
    initFlowSteps();
    // スクロールアニメーションを初期化
    initScrollAnimations();
    
    // 初期化完了後にパララックス効果を一度実行
    setTimeout(() => {
        if (window.updateHeroParallax) {
            window.updateHeroParallax();
        }
    }, 100);
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

// Pause on hover (moved to function to ensure proper initialization)
function initHeroHoverControl() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            if (heroSliderInterval) {
                clearInterval(heroSliderInterval);
                heroSliderInterval = null;
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            if (totalSlides > 0 && !heroSliderInterval) {
                heroSliderInterval = setInterval(nextSlide, 3000);
            }
        });
    }
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

// Window resize handler for voice slider
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateVoiceSlider();
    }, 250);
});

