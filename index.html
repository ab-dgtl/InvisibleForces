/* ===========================
   MAIN.JS — Invisible Supports
=========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========================
    // FAVICON — 4-point star
    // ========================
    (function generateFavicon() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#0D0D14';
        ctx.fillRect(0, 0, 64, 64);

        // Draw 4-point star ✦
        ctx.save();
        ctx.translate(32, 32);
        ctx.fillStyle = '#C9A84C';

        function draw4Star(cx, cy, r1, r2) {
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4 - Math.PI / 2;
                const r = i % 2 === 0 ? r1 : r2;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
        }

        draw4Star(0, 0, 26, 8);

        // Glow center
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 14);
        grad.addColorStop(0, 'rgba(232,201,106,0.5)');
        grad.addColorStop(1, 'rgba(232,201,106,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = canvas.toDataURL('image/png');
        document.head.appendChild(link);
    })();

    // ========================
    // STARFIELD (Hero canvas)
    // ========================
    const starCanvas = document.getElementById('starfield');
    if (starCanvas) {
        const sCtx = starCanvas.getContext('2d');
        let stars = [];
        let raf;

        function resizeStarCanvas() {
            starCanvas.width = starCanvas.offsetWidth;
            starCanvas.height = starCanvas.offsetHeight;
        }

        function initStars() {
            stars = [];
            const count = Math.floor((starCanvas.width * starCanvas.height) / 5000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * starCanvas.width,
                    y: Math.random() * starCanvas.height,
                    r: Math.random() * 1.2 + 0.2,
                    alpha: Math.random(),
                    speed: Math.random() * 0.004 + 0.002,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        function drawStars(time) {
            sCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
            stars.forEach(s => {
                const a = (Math.sin(time * s.speed + s.phase) + 1) / 2;
                const opacity = 0.08 + a * 0.45;
                sCtx.beginPath();
                sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                sCtx.fillStyle = `rgba(220, 210, 190, ${opacity})`;
                sCtx.fill();
            });
            raf = requestAnimationFrame(drawStars);
        }

        resizeStarCanvas();
        initStars();
        raf = requestAnimationFrame(drawStars);

        window.addEventListener('resize', () => {
            resizeStarCanvas();
            initStars();
        });
    }

    // ========================
    // PARTICLES
    // ========================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const p = document.createElement('div');
        p.classList.add('particle');

        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 15;
        const opacity = Math.random() * 0.4 + 0.1;

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${opacity};
        `;

        particlesContainer.appendChild(p);
    }

    // ========================
    // HEADER SCROLL
    // ========================
    const header = document.getElementById('header');

    function updateHeader() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // ========================
    // BURGER MENU
    // ========================
    const burger = document.getElementById('navBurger');
    const navMenu = document.getElementById('navMenu');

    burger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        burger.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
            navMenu.classList.remove('open');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ========================
    // ACTIVE NAV LINK
    // ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link:not(.nav__cta)');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ========================
    // AOS — Animate on Scroll
    // ========================
    const aosElements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.aosDelay || 0);

                setTimeout(() => {
                    el.classList.add('aos-animate');
                }, delay);

                aosObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));

    // ========================
    // SMOOTH SCROLL
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = header.offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        });
    });

    // ========================
    // REVIEW IMAGE LIGHTBOX
    // ========================
    const reviewImgWraps = document.querySelectorAll('.review-screenshot');

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__overlay"></div>
        <div class="lightbox__content">
            <button class="lightbox__close" aria-label="Закрыть">
                <i class="fas fa-times"></i>
            </button>
            <img src="" alt="Отзыв" class="lightbox__img">
        </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox styles
    const lbStyles = document.createElement('style');
    lbStyles.textContent = `
        .lightbox {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .lightbox.active {
            opacity: 1;
            pointer-events: all;
        }
        .lightbox__overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.92);
            backdrop-filter: blur(8px);
        }
        .lightbox__content {
            position: relative;
            z-index: 1;
            max-width: min(90vw, 700px);
            max-height: 90vh;
        }
        .lightbox__img {
            width: 100%;
            height: auto;
            border-radius: 16px;
            box-shadow: 0 20px 80px rgba(0,0,0,0.8);
            max-height: 90vh;
            object-fit: contain;
        }
        .lightbox__close {
            position: absolute;
            top: -16px;
            right: -16px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(201,168,76,0.2);
            border: 1px solid rgba(201,168,76,0.4);
            color: #E8C96A;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            z-index: 2;
            transition: all 0.2s;
        }
        .lightbox__close:hover {
            background: rgba(201,168,76,0.35);
        }
    `;
    document.head.appendChild(lbStyles);

    const lbImg = lightbox.querySelector('.lightbox__img');
    const lbClose = lightbox.querySelector('.lightbox__close');
    const lbOverlay = lightbox.querySelector('.lightbox__overlay');

    function openLightbox(src) {
        lbImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 300);
    }

    reviewImgWraps.forEach(wrap => {
        wrap.addEventListener('click', () => {
            const img = wrap.querySelector('img');
            if (img) openLightbox(img.src);
        });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbOverlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ========================
    // HERO PARALLAX (subtle)
    // ========================
    const heroCircles = document.querySelectorAll('.hero__circle');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;

        if (scrollY < maxScroll) {
            heroCircles.forEach((circle, i) => {
                const speed = 0.1 + i * 0.05;
                circle.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
    }, { passive: true });

    // ========================
    // NUMBER COUNTER ANIMATION
    // ========================
    const statsSection = document.querySelector('.hero__stats');
    const statNums = document.querySelectorAll('.hero__stat-num');

    const targets = [];
    statNums.forEach(el => {
        const text = el.textContent;
        const num = parseFloat(text.replace(/[^\d.]/g, ''));
        const suffix = text.replace(/[\d.]/g, '');
        targets.push({ el, num, suffix, started: false });
    });

    function animateCounter(el, target, suffix, duration = 1500) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                clearInterval(timer);
                el.textContent = target + suffix;
            } else {
                el.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }

    if ('IntersectionObserver' in window && statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    targets.forEach(({ el, num, suffix }) => {
                        animateCounter(el, num, suffix);
                    });
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ========================
    // ZODIAC SIGN ROTATION
    // ========================
    const zodiacContainer = document.querySelector('.about__zodiac-signs');
    if (zodiacContainer) {
        let angle = 0;
        function rotateZodiac() {
            angle += 0.15;
            const signs = zodiacContainer.querySelectorAll('span');
            signs.forEach((sign, i) => {
                const baseAngle = (i * 30 + angle) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(baseAngle) * radius;
                const y = Math.sin(baseAngle) * radius;
                sign.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                sign.style.position = 'absolute';
                sign.style.top = '50%';
                sign.style.left = '50%';
            });
            requestAnimationFrame(rotateZodiac);
        }
        rotateZodiac();
    }

    // ========================
    // GOLD SHIMMER ON CARDS
    // ========================
    const goldCards = document.querySelectorAll('.service-card--gold, .contact__card');

    goldCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Add shimmer style
    const shimmerStyle = document.createElement('style');
    shimmerStyle.textContent = `
        .service-card--gold,
        .contact__card {
            --mouse-x: 50%;
            --mouse-y: 50%;
        }
        .service-card--gold::after,
        .contact__card::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(201,168,76,0.07) 0%, transparent 60%);
            pointer-events: none;
            transition: opacity 0.3s;
            opacity: 0;
            z-index: 0;
        }
        .service-card--gold:hover::after,
        .contact__card:hover::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(shimmerStyle);

    console.log('✦ Невидимые Опоры — Upgrade24k initialized');
});
