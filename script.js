// ========================================
// PROFESSIONAL PORTFOLIO - ENHANCED JAVASCRIPT
// ========================================

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Enhanced Particle Background Effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 30 + 15;
        const delay = Math.random() * 5;

        const colors = ['#ff0040', '#00d9ff', '#b026ff', '#ff006e'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.4 + 0.2};
            box-shadow: 0 0 ${size * 5}px ${color};
            animation: float ${duration}s ease-in-out infinite ${delay}s,
                       fadeInOut ${duration * 0.5}s ease-in-out infinite ${delay}s;
        `;

        particlesContainer.appendChild(particle);
    }
}

// Add fade in/out animation for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
    }
`;
document.head.appendChild(particleStyle);

// Enhanced Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Setup scroll animations for multiple element types
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .about-text, .social-btn, .timeline-item, .hero-stat'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Typing Effect with improved animation
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        setTimeout(() => {
            typeWriter(typingElement, originalText, 60);
        }, 1000);
    }
}

// Parallax effect for hero section
function initParallax() {
    const heroShapes = document.querySelectorAll('.hero-shape');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Smooth cursor tracking effect for project cards
function addCardTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Animated counter for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value, .hero-stat .stat-value');

    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const number = parseInt(target);

        if (isNaN(number)) return;

        let current = 0;
        const increment = number / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
            }
        }, stepTime);
    });
}

// Trigger counter animation when stats become visible
function setupCounterAnimation() {
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add dynamic skill tag interactions
function initSkillTagAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'tag-ripple';
            ripple.style.cssText = `
                position: absolute;
                background: radial-gradient(circle, rgba(255, 0, 64, 0.4), transparent);
                border-radius: 50%;
                width: 10px;
                height: 10px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: tagRipple 0.8s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 800);
        });
    });
}

// Add ripple animation
const tagStyle = document.createElement('style');
tagStyle.textContent = `
    @keyframes tagRipple {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(tagStyle);

// Enhanced scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Navigation bar scroll effect
function initNavScrollEffect() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add scrolled class for styling
        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Auto-hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Animate timeline items on scroll
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Add floating effect to social buttons
function animateSocialButtons() {
    const buttons = document.querySelectorAll('.social-btn');

    buttons.forEach((button, index) => {
        setInterval(() => {
            button.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 3}px)`;
        }, 50);

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px) scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Create gradient animation for backgrounds
function initGradientAnimation() {
    const sections = document.querySelectorAll('.section');

    sections.forEach((section, index) => {
        const gradientOverlay = document.createElement('div');
        gradientOverlay.style.cssText = `
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at ${50 + index * 10}% 50%, 
                                      rgba(255, 0, 64, 0.03), 
                                      transparent 60%);
            pointer-events: none;
            animation: gradientMove 20s ease-in-out infinite;
            animation-delay: ${index * 2}s;
        `;
        section.style.position = 'relative';
        section.insertBefore(gradientOverlay, section.firstChild);
    });
}

const gradientStyle = document.createElement('style');
gradientStyle.textContent = `
    @keyframes gradientMove {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }
`;
document.head.appendChild(gradientStyle);

// Magnetic effect for buttons
function addMagneticEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupScrollAnimations();
    initTypingEffect();
    initParallax();
    addCardTiltEffect();
    setupCounterAnimation();
    initSkillTagAnimations();
    createScrollProgress();
    initNavScrollEffect();
    animateTimeline();
    animateSocialButtons();
    initGradientAnimation();
    addMagneticEffect();

    // Add entrance animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add performance optimization
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

// Console message
console.log('%c🎯 Portfolio by Khushi Kakade', 'color: #ff0040; font-size: 20px; font-weight: bold;');
console.log('%c💼 Professional & Dynamic Design', 'color: #00d9ff; font-size: 14px;');
console.log('%c🚀 Built with modern web technologies', 'color: #b026ff; font-size: 14px;');
