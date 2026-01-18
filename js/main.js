/* ========================================
   NORDWALL Systems - Main JavaScript
   ======================================== */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const contactForm = document.getElementById('contact-form');

    // State
    let lastScrollY = 0;
    let isMenuOpen = false;

    /* ========================================
       MOBILE NAVIGATION
       ======================================== */

    function openMenu() {
        navMenu.classList.add('show-menu');
        isMenuOpen = true;
        document.body.style.overflow = 'hidden';

        // Animate hamburger to X
        if (navToggle) {
            navToggle.style.transform = 'rotate(90deg) scale(0)';
            navToggle.style.opacity = '0';
        }
    }

    function closeMenu() {
        navMenu.classList.remove('show-menu');
        isMenuOpen = false;
        document.body.style.overflow = '';

        // Animate X back to hamburger
        if (navToggle) {
            navToggle.style.transform = 'rotate(0) scale(1)';
            navToggle.style.opacity = '1';
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', openMenu);
        // Add touch feedback
        navToggle.addEventListener('touchstart', () => {
            navToggle.style.transform = 'scale(0.9)';
        }, { passive: true });
        navToggle.addEventListener('touchend', () => {
            if (!isMenuOpen) {
                navToggle.style.transform = 'scale(1)';
            }
        }, { passive: true });
    }

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Close menu on link click with delay for animation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                // Small delay to show tap effect
                setTimeout(closeMenu, 150);
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Close menu on outside click
    navMenu.addEventListener('click', (e) => {
        if (e.target === navMenu) {
            closeMenu();
        }
    });

    /* ========================================
       MOBILE TOUCH INTERACTIONS
       ======================================== */

    // Detect if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // Add touch feedback to cards
        const interactiveCards = document.querySelectorAll('.service-card, .review-card, .project-card, .value');

        interactiveCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });

            card.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });

            card.addEventListener('touchcancel', function() {
                this.style.transform = '';
            }, { passive: true });
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: rippleEffect 0.6s ease-out forwards;
                    pointer-events: none;
                    left: ${x}px;
                    top: ${y}px;
                    width: 100px;
                    height: 100px;
                    margin-left: -50px;
                    margin-top: -50px;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            }, { passive: true });
        });

        // Add ripple keyframes if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes rippleEffect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /* ========================================
       SMOOTH SCROLL
       ======================================== */

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });

    /* ========================================
       HEADER SCROLL BEHAVIOR
       ======================================== */

    function handleHeaderScroll() {
        const scrollY = window.scrollY;

        // Add shadow on scroll
        if (scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll direction (optional - can be enabled)
        // if (scrollY > lastScrollY && scrollY > 200) {
        //     header.classList.add('header--hidden');
        // } else {
        //     header.classList.remove('header--hidden');
        // }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    /* ========================================
       ACTIVE NAVIGATION STATE
       ======================================== */

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    /* ========================================
       CONTACT FORM HANDLING
       ======================================== */

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            const errors = validateForm(data);

            if (errors.length > 0) {
                showFormMessage(errors.join('<br>'), 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';

            // Simulate API call
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    function validateForm(data) {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter a valid name');
        }

        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Please enter a message (at least 10 characters)');
        }

        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.innerHTML = message;

        // Style the message
        messageEl.style.cssText = `
            padding: 1rem 1.5rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            line-height: 1.6;
            ${type === 'success'
                ? 'background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.2);'
                : 'background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2);'
            }
        `;

        // Insert before form
        contactForm.insertBefore(messageEl, contactForm.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transition = 'opacity 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }

    /* ========================================
       FORM INPUT ANIMATIONS
       ======================================== */

    const formInputs = document.querySelectorAll('.form__input');

    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

    /* ========================================
       INITIALIZE
       ======================================== */

    function init() {
        // Add loaded class to body for initial animations
        document.body.classList.add('loaded');

        // Initial active link check
        updateActiveNavLink();

        // Log for debugging
        console.log('NORDWALL Systems - Website Initialized');
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
