/**
 * main.js
 * Comprehensive Portfolio Interactivity & UX Polish
 * M S Thanu Shree Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. Page Preloader
    // =========================================
    const preloader = document.querySelector('.preloader');
    const dismissPreloader = () => {
        if (preloader && !preloader.classList.contains('dismissed')) {
            preloader.classList.add('dismissed');
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.classList.add('loaded');
            }, 500);
        }
    };

    window.addEventListener('load', dismissPreloader);
    // Fallback dismiss after 1.2s to ensure fast UX
    setTimeout(dismissPreloader, 1200);

    // =========================================
    // 2. Scroll Progress Bar
    // =========================================
    const scrollProgress = document.querySelector('.scroll-progress');
    const updateScrollProgress = () => {
        if (!scrollProgress) return;
        const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollLen = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
        scrollProgress.style.width = scrollLen + "%";
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateScrollProgress);
    }, { passive: true });

    // =========================================
    // 3. Custom Cursor
    // =========================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursor && cursorDot && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // Mouse leave/enter window visibility
        document.addEventListener('mouseleave', () => {
            cursor.classList.add('hidden');
            cursorDot.classList.add('hidden');
        });
        document.addEventListener('mouseenter', () => {
            cursor.classList.remove('hidden');
            cursorDot.classList.remove('hidden');
        });

        // Smooth follow ring
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.16;
            cursorY += (mouseY - cursorY) * 0.16;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor click scale
        window.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
        window.addEventListener('mouseup', () => cursor.classList.remove('cursor-click'));

        // Dynamic hover binding function
        const attachCursorHovers = () => {
            const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .info-card, .contact-card, .filter-btn, .theme-toggle, .timeline-content');
            hoverTargets.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('cursor-hover');
                    cursorDot.classList.add('cursor-hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('cursor-hover');
                    cursorDot.classList.remove('cursor-hover');
                });
            });
        };
        attachCursorHovers();
    }

    // =========================================
    // 4. Interactive Particle Background
    // =========================================
    const canvas = document.getElementById('particle-canvas');
    let updateParticlesTheme = null;

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let isLight = document.body.classList.contains('light-theme');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 35 : 75;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1.8;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.refreshColor();
            }

            refreshColor() {
                if (isLight) {
                    this.color = Math.random() > 0.5 ? 'rgba(2, 132, 199, 0.45)' : 'rgba(124, 58, 237, 0.45)';
                } else {
                    this.color = Math.random() > 0.5 ? 'rgba(0, 245, 255, 0.4)' : 'rgba(139, 92, 246, 0.4)';
                }
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        updateParticlesTheme = (lightModeActive) => {
            isLight = lightModeActive;
            particles.forEach(p => p.refreshColor());
        };

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const lineStroke = isLight ? 'rgba(15, 23, 42, 0.07)' : 'rgba(255, 255, 255, 0.07)';

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = lineStroke;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        };

        initParticles();
        animateParticles();
    }

    // =========================================
    // 5. Theme Toggle & Persistence
    // =========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeToggle) themeToggle.setAttribute('title', 'Switch to dark theme');
            if (updateParticlesTheme) updateParticlesTheme(true);
        } else {
            document.body.classList.remove('light-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeToggle) themeToggle.setAttribute('title', 'Switch to light theme');
            if (updateParticlesTheme) updateParticlesTheme(false);
        }
    };

    // Initialize from storage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isCurrentlyLight = document.body.classList.contains('light-theme');
            const nextTheme = isCurrentlyLight ? 'dark' : 'light';
            applyTheme(nextTheme);
            localStorage.setItem('portfolio-theme', nextTheme);
            showToast('Theme Updated', `Switched to ${nextTheme} mode`, nextTheme === 'light' ? '☀️' : '🌙');
        });
    }

    // =========================================
    // 6. Mobile Navigation
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        const toggleMenu = () => {
            const isActive = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        };

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        };

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // =========================================
    // 7. Navbar Scroll State & Active Links
    // =========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Sticky Navbar styling
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active link detection
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================
    // 8. Typing Effect in Hero
    // =========================================
    const typeTarget = document.querySelector('.typing-text');
    const phrases = [
        'ECE Student at Dr AIT',
        'Web Developer & UI Enthusiast',
        'Ideathon Participant & Innovator',
        'VLSI & Embedded Systems Explorer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function runTypeEffect() {
        if (!typeTarget) return;

        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 35 : 85;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 450; // Pause before typing new phrase
        }

        setTimeout(runTypeEffect, speed);
    }

    setTimeout(runTypeEffect, 800);

    // =========================================
    // 9. Animated Stats Counters
    // =========================================
    const counterElements = document.querySelectorAll('[data-count]');

    if (counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetVal = parseFloat(el.getAttribute('data-count'));
                    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
                    const suffix = el.getAttribute('data-suffix') || '';

                    let current = 0;
                    const duration = 1200; // ms
                    const startTime = performance.now();

                    const step = (now) => {
                        const progress = Math.min((now - startTime) / duration, 1);
                        // Ease out cubic
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        current = targetVal * easeOut;

                        if (decimals > 0) {
                            el.textContent = current.toFixed(decimals) + suffix;
                        } else {
                            el.textContent = Math.round(current) + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            if (decimals > 0) {
                                el.textContent = targetVal.toFixed(decimals) + suffix;
                            } else {
                                el.textContent = targetVal + suffix;
                            }
                        }
                    };

                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.4 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    // =========================================
    // 10. Project Filtering
    // =========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // =========================================
    // 11. Project Details Modal
    // =========================================
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalActionBtn = document.getElementById('modal-action-btn');
    const modalTitle = document.getElementById('modal-project-title');
    const modalSubtitle = document.getElementById('modal-project-subtitle');
    const modalBadge = document.getElementById('modal-project-badge');
    const modalBody = document.getElementById('modal-project-body');

    const projectData = {
        schemewise: {
            title: 'SchemeWise',
            subtitle: 'Voice-Driven Welfare Scheme Matcher',
            badge: '🏆 Ideathon Selected — Sept 2026',
            body: `
                <div class="modal-section">
                    <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
                    <p>Millions of informal workers, domestic help, daily-wage laborers, and street vendors qualify for essential state and national social security schemes but remain deprived due to complex bureaucratic documentation, low text literacy, and linguistic barriers.</p>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-lightbulb"></i> Solution & Architecture</h4>
                    <p>SchemeWise provides an accessible web application where users simply speak their occupation, age, and state in their native language. A structured JSON-driven decision tree matches their criteria against welfare schemes, returning simplified audio-visual eligibility guides.</p>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-check-circle"></i> Key Highlights</h4>
                    <ul class="modal-features-list">
                        <li><strong>Voice Input:</strong> Integrates Web Speech recognition for natural queries.</li>
                        <li><strong>JSON Rule Engine:</strong> Instant local client-side evaluation of welfare eligibility criteria.</li>
                        <li><strong>High Contrast & Simplicity:</strong> Intuitive typography and iconography suited for all devices.</li>
                        <li><strong>Audio Guidance:</strong> Speaks back concise requirements in simple vernacular terms.</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-user-check"></i> My Contribution</h4>
                    <p>Constructed the responsive frontend interface, researched the JSON scheme structure, and designed the user journey specifically for non-technical users.</p>
                </div>
            `
        },
        oilguard: {
            title: 'OilGuard',
            subtitle: 'Transformer Oil Quality Monitoring & Protection',
            badge: '🔬 Engineering Mini-Project',
            body: `
                <div class="modal-section">
                    <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
                    <p>Power transformers represent critical electrical substation assets. Mineral oil serves as both cooling agent and dielectric insulator. Gradual oil contamination, moisture ingress, and thermal stress lead to catastrophic explosions and expensive blackouts.</p>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-lightbulb"></i> Project Scope & Methodology</h4>
                    <p>An applied engineering mini-project targeting continuous dielectric monitoring. Investigates sensor setups to measure dielectric breakdown voltage, moisture in ppm, and oil temperature, flagging degradation before insulation failure occurs.</p>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-check-circle"></i> Key Highlights</h4>
                    <ul class="modal-features-list">
                        <li><strong>Literature Review:</strong> Identified research gaps in cost-effective real-time dielectric testing.</li>
                        <li><strong>Sensor Integration:</strong> Prepared system design mapping microcontroller interfaces to capacitive moisture sensors.</li>
                        <li><strong>Technical Synopsis:</strong> Authored formal project synopsis, objective criteria, and development milestones.</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-user-check"></i> My Contribution</h4>
                    <p>Conducted extensive feasibility analysis, authored the technical problem statement, prepared the synopsis documentation, and defined the sensor integration roadmap.</p>
                </div>
            `
        },
        digitaltwin: {
            title: 'Green-Building Digital Twin',
            subtitle: 'AI & Vision-Driven Building Telemetry',
            badge: '💡 Concept Phase',
            body: `
                <div class="modal-section">
                    <h4><i class="fas fa-bullseye"></i> Problem Statement</h4>
                    <p>Commercial and institutional facilities consume enormous energy due to unoptimized HVAC and lighting systems that lack real-time occupancy and environmental spatial awareness.</p>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-lightbulb"></i> Conceptual Innovation</h4>
                    <p>Combines low-cost camera streams via smartphone IP Webcam feeds with Generative AI and digital twin spatial modeling. Creates an interactive digital replica of rooms to track occupancy patterns and compute estimated carbon footprints in real time.</p>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-check-circle"></i> Key Highlights</h4>
                    <ul class="modal-features-list">
                        <li><strong>IP Webcam Integration:</strong> Re-purposes accessible mobile cameras for edge video feeds.</li>
                        <li><strong>Generative AI Spatial Mapping:</strong> Generates responsive digital twin representations.</li>
                        <li><strong>Carbon Metric Dashboard:</strong> Translates live headcounts and lighting status into carbon conservation metrics.</li>
                    </ul>
                </div>
                <div class="modal-section">
                    <h4><i class="fas fa-user-check"></i> My Contribution</h4>
                    <p>Formulated the digital twin architecture, evaluated IP Webcam streaming feasibility, and researched Generative AI workflows for room telemetry modeling.</p>
                </div>
            `
        }
    };

    const openProjectModal = (projectId) => {
        const data = projectData[projectId];
        if (!data || !projectModal) return;

        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalBadge.textContent = data.badge;
        modalBody.innerHTML = data.body;

        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.btn-card-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalActionBtn) modalActionBtn.addEventListener('click', closeProjectModal);
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    // =========================================
    // 12. Resume Modal
    // =========================================
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const resumeCloseBtn = document.getElementById('resume-close-btn');
    const printResumeBtn = document.getElementById('print-resume-btn');

    const openResumeModal = () => {
        if (!resumeModal) return;
        resumeModal.classList.add('open');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeResumeModal = () => {
        if (!resumeModal) return;
        resumeModal.classList.remove('open');
        resumeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (resumeBtn) resumeBtn.addEventListener('click', openResumeModal);
    if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResumeModal);
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResumeModal();
        });
    }

    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Universal ESC key for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeResumeModal();
        }
    });

    // =========================================
    // 13. Toast Notification System
    // =========================================
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastCloseBtn = document.getElementById('toast-close-btn');
    let toastTimer = null;

    window.showToast = (title = 'Success!', message = 'Action completed.', icon = '✅') => {
        if (!toast) return;

        if (toastTitle) toastTitle.textContent = title;
        if (toastMessage) toastMessage.textContent = message;
        if (toastIcon) toastIcon.textContent = icon;

        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(window.closeToast, 4000);
    };

    window.closeToast = () => {
        if (toast) toast.classList.remove('show');
    };

    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', window.closeToast);
    }

    // =========================================
    // 14. Contact Form Handler & Floating Labels
    // =========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');

        // Manage floating label state on load and input
        formInputs.forEach(input => {
            const group = input.closest('.form-group');

            const checkValue = () => {
                if (group) {
                    if (input.value.trim().length > 0) {
                        group.classList.add('has-value');
                    } else {
                        group.classList.remove('has-value');
                    }
                }
            };

            input.addEventListener('input', () => {
                checkValue();
                if (group) group.classList.remove('has-error');
            });
            input.addEventListener('blur', checkValue);
            checkValue();
        });

        // Form Submit
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = document.getElementById('submit-btn');

            let isValid = true;

            // Validate Name
            if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
                nameInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            } else {
                nameInput.closest('.form-group').classList.remove('has-error');
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            } else {
                emailInput.closest('.form-group').classList.remove('has-error');
            }

            // Validate Message
            if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
                messageInput.closest('.form-group').classList.add('has-error');
                isValid = false;
            } else {
                messageInput.closest('.form-group').classList.remove('has-error');
            }

            if (!isValid) {
                showToast('Form Error', 'Please correct the highlighted fields.', '⚠️');
                return;
            }

            // Show loading state
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-flex';
            submitBtn.disabled = true;

            // Simulate sending message
            setTimeout(() => {
                const senderName = nameInput.value.trim();
                contactForm.reset();

                // Clear floating labels
                formInputs.forEach(inp => {
                    const grp = inp.closest('.form-group');
                    if (grp) {
                        grp.classList.remove('has-value');
                        grp.classList.remove('has-error');
                    }
                });

                if (btnText) btnText.style.display = 'inline-flex';
                if (btnLoader) btnLoader.style.display = 'none';
                submitBtn.disabled = false;

                showToast('Message Sent!', `Thank you ${senderName}, I will reply shortly.`, '🚀');
            }, 1200);
        });
    }

    // =========================================
    // 15. Click-to-Copy for Contact Details
    // =========================================
    const copyableCards = document.querySelectorAll('.copyable-card');

    copyableCards.forEach(card => {
        card.addEventListener('click', async () => {
            const textToCopy = card.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                const copyIcon = card.querySelector('.copy-icon i');
                if (copyIcon) {
                    copyIcon.className = 'fas fa-check text-success';
                    setTimeout(() => {
                        copyIcon.className = 'far fa-copy';
                    }, 2000);
                }
                showToast('Copied to Clipboard!', textToCopy, '📋');
            } catch (err) {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast('Copied to Clipboard!', textToCopy, '📋');
            }
        });
    });

    // =========================================
    // 16. Tilt Effect on Project Cards (Fine Pointer Only)
    // =========================================
    if (window.matchMedia("(pointer: fine)").matches) {
        const tiltCards = document.querySelectorAll('.project-card, .education-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                card.style.transition = 'none';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.4s ease';
            });
        });
    }

    // =========================================
    // 17. Scroll-triggered Staggered Animations
    // =========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.12
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Stagger child cards if present
                    const gridChildren = entry.target.querySelectorAll('.skill-card, .info-card, .timeline-item');
                    if (gridChildren.length > 0) {
                        gridChildren.forEach((child, idx) => {
                            child.style.transitionDelay = `${idx * 80}ms`;
                            child.classList.add('visible');
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
    } else {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

});
