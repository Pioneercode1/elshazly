/**
 * CONFIGURATION
 * ---------------------
 * Add new photos here to update the gallery.
 */
const galleryImages = [
    { src: './images/elshazly.jpg', alt: 'فريق العمل' },
    { src: './images/volvo2.avif', alt: 'شاحناتنا' },
    { src: './images/elshazly-Image2.jpeg', alt: 'اجتماعات العمل' },
    { src: './images/actros_m.avif', alt: 'أسطول النقل' },
    { src: './images/banner-image.avif', alt: 'السفر' },
    // To add a new photo, copy the line above and change the filename:
    { src: './images/elshazly-Image3.jpeg', alt: 'المدير' },
    { src: './images/elshazly-Image5.jpeg', alt: 'المدير' },
    { src: './images/guide-on-Air.jpg', alt: 'عمل' }
];

// --- 1. Gallery Logic (Dynamic & Scrolling) ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && galleryImages.length > 0) {
        // A. Render Images
        galleryImages.forEach(imgData => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';

            const img = document.createElement('img');
            img.src = imgData.src;
            img.alt = imgData.alt;
            img.loading = "lazy"; // Performance optimization

            slide.appendChild(img);
            track.appendChild(slide);
        });

        // B. Scrolling Logic
        const scrollAmount = 320; // Width of slide + gap roughly
        let autoScrollInterval;

        const scrollNext = () => {
            // Check if we are at the end
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
                // If at end, scroll back to start smoothly
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        const scrollPrev = () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        };

        // Event Listeners for Buttons
        if (nextBtn) nextBtn.addEventListener('click', () => {
            scrollNext();
            resetAutoScroll(); // Reset timer on manual interaction
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            scrollPrev();
            resetAutoScroll();
        });

        // C. Auto-Scroll Feature
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(scrollNext, 3000); // Scroll every 3 seconds
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        const resetAutoScroll = () => {
            stopAutoScroll();
            startAutoScroll();
        };

        // Start initially
        startAutoScroll();

        // Pause on Hover
        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);
    }
});

// --- 2. Mobile Menu Toggle ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
    });
}

// --- 3. Testimonials Rotator ---
const testimonials = [
    '"خدمة رائعة وسرعة في التخليص — أنصح بهم بشدة" — شركة الغد',
    '"تعاون احترافي وأسعار مناسبة مع التزام بالمواعيد" — السيد/ محمد',
    '"فريق متكامل وتحديثات آنية عن حالة الشحنة" — شركة النيل',
    '"أفضل شركة تعاملت معها في مجال التخليص الجمركي، دقة وأمانة" — المهندس/ أحمد',
    '"شكراً لفريق الشاذلي على المجهود الرائع في تخليص شحنتنا الأخيرة" — شركة الأمل للاستيراد',
    '"سرعة في الإجراءات وتواصل ممتاز طوال الوقت" — الأستاذ/ محمود',
    '"خدمة عملاء متميزة وحلول لوجستية ذكية" — شركة النور',
    '"التزام تام بالمواعيد، وهذا أهم ما يميزهم" — السيد/ علي',
    '"خبرة واضحة في التعامل مع المشاكل الجمركية وحلها بسرعة" — شركة الفجر',
    '"أنصح كل من يبحث عن راحة البال في الشحن بالتعامل معهم" — الأستاذ/ حسن'
];
let tIdx = 0;
const box = document.getElementById('testimonialBox');
if (box) {
    setInterval(() => {
        tIdx = (tIdx + 1) % testimonials.length;
        box.style.opacity = 0;
        setTimeout(() => { box.textContent = testimonials[tIdx]; box.style.opacity = 1 }, 300);
    }, 4000);
}

// --- 4. Accessibility: Close mobile menu on navigation click ---
const menuLinks = document.querySelectorAll('#mobileMenu a');
if (menuLinks) {
    Array.from(menuLinks).forEach(a => a.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.style.display = 'none'
    }));
}

// --- 5. Contact form handling with EmailJS ---
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const msgEl = document.getElementById('formMsg');

        // Change button text to indicate loading
        const originalBtnText = btn.innerText;
        btn.innerText = 'جاري الإرسال...';
        btn.disabled = true;

        // Prepare the parameters matching your EmailJS template variables
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS DASHBOARD
        // Example: emailjs.send('service_xyz', 'template_abc', templateParams)
        emailjs.send('service_9ej7o8k', 'template_lwtnerh', templateParams)
            .then(() => {
                msgEl.textContent = 'تم إرسال طلبك بنجاح! سنقوم بالتواصل معك قريباً.';
                msgEl.style.color = 'green';
                form.reset();

                // Restore button emailjs.init('YOUR_PUBLIC_KEY')
                btn.innerText = originalBtnText;
                btn.disabled = false;

                // Remove message after 5 seconds
                setTimeout(() => { msgEl.textContent = ''; }, 5000);
            }, (error) => {
                console.error('FAILED...', error);
                msgEl.textContent = 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخري أو الاتصال بنا مباشرة.';
                msgEl.style.color = 'crimson';

                // Restore button
                btn.innerText = originalBtnText;
                btn.disabled = false;
            });
    });
}