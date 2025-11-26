
        // Mobile menu toggle
        const burger = document.getElementById('burger');
        const mobileMenu = document.getElementById('mobileMenu');
        burger.addEventListener('click', () => {
            mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
        });

        // Simple testimonials rotator
        const testimonials = [
            '"خدمة رائعة وسرعة في التخليص — أنصح بهم بشدة" — شركة الغد',
            '"تعاون احترافي وأسعار مناسبة مع التزام بالمواعيد" — السيد/ محمد',
            '"فريق متكامل وتحديثات آنية عن حالة الشحنة" — شركة النيل'
        ];
        let tIdx = 0;
        const box = document.getElementById('testimonialBox');
        setInterval(() => {
            tIdx = (tIdx + 1) % testimonials.length;
            box.style.opacity = 0;
            setTimeout(() => { box.textContent = testimonials[tIdx]; box.style.opacity = 1 }, 300);
        }, 4000);

        // Contact form handling (demo only)
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const msgEl = document.getElementById('formMsg');
            if (!name || !email) {
                msgEl.textContent = 'الرجاء تعبئة الحقول المطلوبة.';
                msgEl.style.color = 'crimson';
                return;
            }
            // هنا يمكنك إرسال البيانات إلى API أو إلى بريد إلكتروني
            msgEl.textContent = 'تم استلام طلبك. سنقوم بالتواصل معك قريبًا.';
            msgEl.style.color = 'green';
            form.reset();
        });

        // Accessibility: close mobile menu on navigation click
        Array.from(document.querySelectorAll('#mobileMenu a')).forEach(a => a.addEventListener('click', () => { mobileMenu.style.display = 'none' }));