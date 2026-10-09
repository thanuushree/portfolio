// =========================================
// Mobile Navigation Toggle
// =========================================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));
}

// =========================================
// Typing Effect for Hero Section
// =========================================
const typeTarget = document.querySelector('.typing-text');
const textToType = "Electronics & Communication Student";
let charIndex = 0;

function typeEffect() {
    if (typeTarget && charIndex < textToType.length) {
        typeTarget.textContent += textToType.charAt(charIndex);
        charIndex++;
        // Randomize typing speed slightly for realism
        setTimeout(typeEffect, Math.random() * 50 + 50);
    }
}

// Start typing effect shortly after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 600);
});

// =========================================
// Intersection Observer for Scroll Animations
// =========================================
// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before the element enters the viewport
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to happen only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));
} else {
    // If reduced motion is preferred, immediately show all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.classList.add('visible');
    });
}

// =========================================
// Sticky Navbar Blur Effect on Scroll
// =========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});
