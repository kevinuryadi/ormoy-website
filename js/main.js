document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Scroll indicator click
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        document.querySelector('#tentang').scrollIntoView({ behavior: 'smooth' });
    });

    // Active nav link on scroll
    const allSections = document.querySelectorAll('section[id], footer[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const updateActiveNav = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // If at bottom of page, activate "Kontak"
        if (scrollY + windowHeight >= docHeight - 50) {
            navItems.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#kontak');
            });
            return;
        }

        let current = '';
        allSections.forEach(section => {
            const top = section.offsetTop - 150;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    };
    window.addEventListener('scroll', updateActiveNav);

    // Product tab filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productsSection = document.querySelector('.products');
    const productsOverlay = document.querySelector('.products-overlay');

    const collectionBgs = {
        signature: { src: 'images/collection-signature.jpg', pos: 'center 60%' },
        comfort: { src: 'images/collection-comfort.jpg', pos: 'center 75%' },
        fresh: { src: 'images/collection-fresh.jpg', pos: 'center 60%' },
        sweet: { src: 'images/collection-sweet.jpg', pos: 'center 70%' }
    };

    // Inject category badges into all product cards
    productCards.forEach(card => {
        const category = card.dataset.category;
        const imageEl = card.querySelector('.product-image');
        if (!imageEl) return;
        const existing = imageEl.querySelector('.product-badge');
        if (existing) existing.remove();
        const badge = document.createElement('span');
        badge.className = 'product-badge';
        badge.textContent = category.toUpperCase();
        imageEl.appendChild(badge);
    });

    // Set initial state for Signature tab
    productsSection.style.backgroundImage = `url('${collectionBgs.signature.src}')`;
    productsSection.style.backgroundPosition = collectionBgs.signature.pos;
    productsOverlay.style.opacity = '1';
    productCards.forEach(card => {
        card.classList.toggle('hidden', card.dataset.category !== 'signature');
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            const col = collectionBgs[category];
            productsSection.style.backgroundImage = `url('${col.src}')`;
            productsSection.style.backgroundPosition = col.pos;
            productsOverlay.style.opacity = '1';

            productCards.forEach(card => {
                const show = card.dataset.category === category;
                card.classList.toggle('hidden', !show);
                if (show) {
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = '';
                }
            });
        });
    });

    // Scroll fade-in animations
    const fadeElements = document.querySelectorAll(
        '.honey-wood-video, .honey-wood-content, .about-text, .about-stats, .stat, .product-card, .why-card, .cta-inner, .section-label, .section-title'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => observer.observe(el));

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current;
                }, 30);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
