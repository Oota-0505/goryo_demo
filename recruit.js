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

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    initContactBar();
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // フォームデータを取得
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // 送信ボタンを無効化
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            try {
                // 実際の送信処理（メールサーバーやAPIに送信する場合はここに実装）
                // 現在はデモとして成功メッセージを表示
                await simulateFormSubmission(data);

                // 成功メッセージを表示
                showMessage('お問い合わせを受け付けました。ご連絡いただきありがとうございます。', 'success');
                
                // フォームをリセット
                contactForm.reset();

            } catch (error) {
                // エラーメッセージを表示
                showMessage('送信に失敗しました。もう一度お試しください。', 'error');
                console.error('Form submission error:', error);
            } finally {
                // 送信ボタンを元に戻す
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // 5秒後にメッセージを非表示
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // フォーム送信のシミュレーション（実際の実装では削除してください）
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            // コンソールにデータを出力（デバッグ用）
            console.log('Form data:', data);
            
            // 1秒後に成功として処理
            setTimeout(() => {
                // ランダムで成功/失敗を決定（実際の実装では削除）
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Simulation error'));
                }
            }, 1000);
        });
    }

    // 実際のメール送信を実装する場合の例：
    /*
    async function submitForm(data) {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    }
    */
});

