/* ========================================
   NORDWALL Systems - GSAP Animations
   ======================================== */

(function() {
    'use strict';

    // Wait for DOM and GSAP to be ready
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Configuration
    const config = {
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1
    };

    /* ========================================
       HERO SECTION ANIMATIONS
       ======================================== */

    function animateHero() {
        const tl = gsap.timeline({
            defaults: { duration: config.duration, ease: config.ease }
        });

        // Animate hero elements sequentially
        tl.to('.hero__tagline', {
            opacity: 1,
            y: 0,
            duration: 0.8
        })
        .to('.hero__title-line', {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8
        }, '-=0.4')
        .to('.hero__description', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, '-=0.4')
        .to('.hero__cta', {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, '-=0.4')
        .to('.hero__scroll', {
            opacity: 1,
            duration: 0.8
        }, '-=0.2');
    }

    /* ========================================
       SCROLL-TRIGGERED ANIMATIONS
       ======================================== */

    function createScrollAnimations() {
        // Service Cards
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: config.ease
            });
        });

        // Stats
        gsap.utils.toArray('.stat').forEach((stat, index) => {
            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: config.ease,
                onComplete: () => {
                    // Animate the counter
                    const numberEl = stat.querySelector('.stat__number');
                    if (numberEl && numberEl.dataset.count) {
                        animateCounter(numberEl, parseInt(numberEl.dataset.count));
                    }
                }
            });
        });

        // Values
        gsap.utils.toArray('.value').forEach((value, index) => {
            gsap.to(value, {
                scrollTrigger: {
                    trigger: value,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: config.ease
            });
        });

        // About Section
        gsap.to('.about__content', {
            scrollTrigger: {
                trigger: '.about__content',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: config.ease
        });

        gsap.to('.about__visual', {
            scrollTrigger: {
                trigger: '.about__visual',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: config.ease
        });

        // Review Cards
        gsap.utils.toArray('.review-card').forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: (index % 3) * 0.1,
                ease: config.ease
            });
        });

        // Project Cards
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: (index % 3) * 0.1,
                ease: config.ease
            });
        });

        // Contact Section
        gsap.to('.contact__info', {
            scrollTrigger: {
                trigger: '.contact__info',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: config.ease
        });

        gsap.to('.contact__form-wrapper', {
            scrollTrigger: {
                trigger: '.contact__form-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: config.ease
        });

        // CTA Section
        gsap.to('.cta__content', {
            scrollTrigger: {
                trigger: '.cta__content',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: config.ease
        });

        // Section Headers
        gsap.utils.toArray('.section__header').forEach(header => {
            gsap.from(header.children, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                ease: config.ease
            });
        });
    }

    /* ========================================
       COUNTER ANIMATION
       ======================================== */

    function animateCounter(element, target) {
        const duration = 2000; // ms
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(start + (target - start) * easeProgress);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /* ========================================
       PARALLAX EFFECTS
       ======================================== */

    function createParallaxEffects() {
        // Subtle parallax on hero background
        gsap.to('.hero__bg', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 100,
            ease: 'none'
        });

        // About accent box parallax
        gsap.to('.about__accent', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    }

    /* ========================================
       HOVER ANIMATIONS
       ======================================== */

    function createHoverAnimations() {
        // Service card icon animation
        gsap.utils.toArray('.service-card').forEach(card => {
            const icon = card.querySelector('.service-card__icon');

            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Button hover effect
        gsap.utils.toArray('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }

    /* ========================================
       MAGNETIC EFFECT (for CTAs)
       ======================================== */

    function createMagneticEffect() {
        const magneticButtons = document.querySelectorAll('.btn--primary');

        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    /* ========================================
       TEXT REVEAL ANIMATION (Optional)
       ======================================== */

    function splitTextAnimation(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = '';

            text.split('').forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                el.appendChild(span);
            });
        });
    }

    /* ========================================
       MOBILE-SPECIFIC ANIMATIONS
       ======================================== */

    function createMobileAnimations() {
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) return;

        // Staggered section header reveal
        gsap.utils.toArray('.section__header').forEach(header => {
            const children = header.querySelectorAll('.section__tagline, .section__title, .section__description');

            gsap.fromTo(children,
                {
                    opacity: 0,
                    y: 40,
                    scale: 0.95
                },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'back.out(1.2)',
                    onComplete: () => {
                        header.classList.add('animate-in');
                    }
                }
            );
        });

        // Service cards with rotation effect
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 60,
                    rotateX: 15
                },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    onComplete: () => {
                        card.classList.add('animate-in');
                    }
                }
            );
        });

        // Stats with scale bounce
        gsap.utils.toArray('.stat').forEach((stat, index) => {
            gsap.fromTo(stat,
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 30
                },
                {
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        stat.classList.add('animate-in');
                        const numberEl = stat.querySelector('.stat__number');
                        if (numberEl && numberEl.dataset.count) {
                            animateCounter(numberEl, parseInt(numberEl.dataset.count));
                        }
                    }
                }
            );
        });

        // Review cards horizontal slide
        gsap.utils.toArray('.review-card').forEach((card, index) => {
            const direction = index % 2 === 0 ? -50 : 50;

            gsap.fromTo(card,
                {
                    opacity: 0,
                    x: direction,
                    rotateY: direction > 0 ? -5 : 5
                },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 0.7,
                    delay: (index % 2) * 0.15,
                    ease: 'power3.out',
                    onComplete: () => {
                        card.classList.add('animate-in');
                    }
                }
            );
        });

        // Project cards with zoom reveal
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    scale: 0.9,
                    y: 40
                },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    delay: (index % 2) * 0.1,
                    ease: 'power3.out',
                    onComplete: () => {
                        card.classList.add('animate-in');
                    }
                }
            );
        });

        // Contact section slide animations
        gsap.fromTo('.contact__info',
            { opacity: 0, x: -40 },
            {
                scrollTrigger: {
                    trigger: '.contact__info',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out'
            }
        );

        gsap.fromTo('.contact__form-wrapper',
            { opacity: 0, y: 50, scale: 0.95 },
            {
                scrollTrigger: {
                    trigger: '.contact__form-wrapper',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: 0.2,
                ease: 'back.out(1.2)'
            }
        );
    }

    /* ========================================
       INITIALIZE ALL ANIMATIONS
       ======================================== */

    function init() {
        const isMobile = window.innerWidth <= 768;

        // Hero animations (immediate)
        animateHero();

        // Use mobile-specific animations on mobile
        if (isMobile) {
            createMobileAnimations();
        } else {
            // Scroll-triggered animations
            createScrollAnimations();

            // Parallax effects
            createParallaxEffects();

            // Hover animations
            createHoverAnimations();

            // Magnetic effect on buttons
            createMagneticEffect();
        }

        // Refresh ScrollTrigger after all animations are set up
        ScrollTrigger.refresh();

        console.log('NORDWALL - Animations Initialized');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

})();
