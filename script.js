/* ============================================
   UNBOUND COLLECTIVE — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    
    const handleNavScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // === Mobile Menu Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Scroll Reveal Animation ===
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(other => other.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            } else {
                question.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // === Event Countdown Timer ===
    const eventDate = new Date('2026-03-28T14:00:00-07:00').getTime(); // PST

    const updateCountdown = () => {
        const now = Date.now();
        const diff = eventDate - now;

        if (diff <= 0) {
            document.getElementById('countDays').textContent = '00';
            document.getElementById('countHours').textContent = '00';
            document.getElementById('countMinutes').textContent = '00';
            document.getElementById('countSeconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countDays').textContent = String(days).padStart(2, '0');
        document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // === Newsletter & Contact Form Handlers ===
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! You\'ll receive our welcome email shortly.');
                newsletterForm.reset();
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you within 48 hours.');
            contactForm.reset();
        });
    }

    // === Hero Carousel ===
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let heroInterval;

    const goToSlide = (index) => {
        heroSlides.forEach(s => s.classList.remove('active'));
        heroDots.forEach(d => d.classList.remove('active'));
        currentSlide = index;
        heroSlides[currentSlide].classList.add('active');
        heroDots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % heroSlides.length);
    };

    // Auto-rotate every 6 seconds
    const startHeroRotation = () => {
        heroInterval = setInterval(nextSlide, 6000);
    };

    // Dot navigation
    heroDots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(heroInterval);
            goToSlide(parseInt(dot.dataset.dot));
            startHeroRotation();
        });
    });

    // Arrow navigation
    const heroArrowLeft = document.querySelector('.hero-arrow-left');
    const heroArrowRight = document.querySelector('.hero-arrow-right');

    if (heroArrowLeft) {
        heroArrowLeft.addEventListener('click', () => {
            clearInterval(heroInterval);
            goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
            startHeroRotation();
        });
    }

    if (heroArrowRight) {
        heroArrowRight.addEventListener('click', () => {
            clearInterval(heroInterval);
            nextSlide();
            startHeroRotation();
        });
    }

    if (heroSlides.length > 1) {
        startHeroRotation();
    }

});
