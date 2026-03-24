// Professional Logo & Percentage Preloader (4.5s)
(function initProfessionalPreloader() {
    const preloader = document.getElementById('preloader');
    const percentEl = document.getElementById('load-percent');
    const fillEl = document.getElementById('progressFill');
    const statusEl = document.getElementById('statusMsg');

    if (!preloader || !percentEl || !fillEl || !statusEl) return;

    const statusMessages = [
        "INITIALIZING PORTFOLIO...",
        "FETCHING CREATIVE ASSETS...",
        "OPTIMIZING VISUAL EXPERIENCE...",
        "ESTABLISHING SECURE CONNECTION...",
        "READY TO LAUNCH..."
    ];

    let count = 0;
    const totalTime = 3500; // Reduced to 3.5s for snappier experience
    const stepTime = totalTime / 100;

    const teluguChars = ['అ', 'ఆ', 'క', 'చ', 'ట', 'త', 'ప', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ'];
    const saEl = document.getElementById('loader-sa');
    const iEl = document.getElementById('loader-i');

    const timer = setInterval(() => {
        count++;

        // Update UI
        percentEl.textContent = count;
        fillEl.style.width = `${count}%`;

        // Phase 0: English for first 25 ticks (~1s)
        if (count < 25) {
            saEl.textContent = 'SA';
            iEl.textContent = 'I';
        }
        // Phase 1: Rolling Telugu Character Translation Effect
        else if (count >= 25 && count < 92) {
            if (count % 3 === 0) {
                // Keep rolling if not locked
                if (count < 50) saEl.textContent = teluguChars[Math.floor(Math.random() * teluguChars.length)];
                if (count < 92) iEl.textContent = teluguChars[Math.floor(Math.random() * teluguChars.length)];
            }
            // Sequential lock
            if (count === 50) saEl.textContent = 'సా';
        } else if (count === 92) {
            // Lock translation
            saEl.textContent = 'సా';
            iEl.textContent = 'యి';
        }

        // Update Status Messages
        if (count % 20 === 0) {
            const msgIndex = Math.min(Math.floor(count / 20), statusMessages.length - 1);
            statusEl.textContent = statusMessages[msgIndex];
        }

        if (count >= 100) {
            clearInterval(timer);

            // Phase 2: Parallel Sliding Exit Animation
            setTimeout(() => {
                // Fade background
                preloader.style.transition = 'background-color 0.8s ease';
                preloader.style.backgroundColor = 'transparent';
                preloader.style.pointerEvents = 'none';

                // Fade out loader UI
                const loadingSystem = document.querySelector('.loading-system');
                const subtitle = document.getElementById('loaderSubtitle');
                loadingSystem.style.transition = 'opacity 0.5s ease';
                loadingSystem.style.opacity = '0';
                subtitle.style.transition = 'opacity 0.5s ease';
                subtitle.style.opacity = '0';

                // Setup the parallel slide and scale
                const flyingLogo = document.getElementById('flyingLogo');
                const navbarLogo = document.getElementById('navbarLogo');

                navbarLogo.style.opacity = '0'; // Hide real logo temporarily

                // Calculate FLIP positions
                const sourceRect = flyingLogo.getBoundingClientRect();
                const targetRect = navbarLogo.getBoundingClientRect();

                // Apply fixed positioning exactly where it currently is
                flyingLogo.style.position = 'fixed';
                flyingLogo.style.margin = '0';
                flyingLogo.style.top = sourceRect.top + 'px';
                flyingLogo.style.left = sourceRect.left + 'px';
                flyingLogo.style.width = sourceRect.width + 'px';
                flyingLogo.style.display = 'flex';
                // Force DOM reflow
                void flyingLogo.getBoundingClientRect();

                // Start animation
                flyingLogo.style.transition = 'all 0.8s cubic-bezier(0.8, 0, 0.2, 1)';
                flyingLogo.style.top = targetRect.top + 'px';
                flyingLogo.style.left = targetRect.left + 'px';

                const scaleX = targetRect.width / sourceRect.width;
                const scaleY = targetRect.height / sourceRect.height;
                const scale = Math.min(scaleX, scaleY);

                flyingLogo.style.transform = `scale(${scale})`;
                flyingLogo.style.transformOrigin = 'left top';

                document.body.style.overflow = 'auto'; // Re-enable scrolling

                setTimeout(() => {
                    // Start flip out of flying logo
                    flyingLogo.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
                    flyingLogo.style.transform = `scale(${scale}) rotateX(90deg)`;
                    flyingLogo.style.opacity = '0';

                    setTimeout(() => {
                        preloader.style.display = 'none';
                        // Start flip in of real logo
                        navbarLogo.style.transform = 'rotateX(-90deg)';
                        navbarLogo.style.transition = 'none';
                        navbarLogo.style.opacity = '1';

                        // Force reflow
                        void navbarLogo.offsetWidth;

                        navbarLogo.style.transition = 'transform 0.3s ease-out';
                        navbarLogo.style.transform = 'rotateX(0deg)';

                        // Start continuous flip after landing
                        setTimeout(() => {
                            startNameFlip(navbarLogo);
                        }, 500);

                    }, 300);
                }, 800);
            }, 200);
        }
    }, stepTime);

    // ── Continuous bilingual name flip ──
    function startNameFlip(el) {
        const TELUGU_NAME = 'సాయి';
        const ENGLISH_NAME = 'Sai';
        let isTeluguNow = false; // It starts as English in navbar

        setInterval(() => {
            el.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
            el.style.transform = 'rotateX(90deg)';
            el.style.opacity = '0';

            setTimeout(() => {
                isTeluguNow = !isTeluguNow;
                el.innerHTML = isTeluguNow ? TELUGU_NAME : 'Sai';

                el.style.transform = 'rotateX(-90deg)';
                void el.offsetWidth; // force reflow
                el.style.transform = 'rotateX(0deg)';
                el.style.opacity = '1';
            }, 350);
        }, 3500);
    }
})();

// Enhanced Orbital Parallax Effect
const orbitSystem = document.querySelector('.orbit-system');
if (orbitSystem) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        orbitSystem.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
}));

// Intersection Observer for scroll animations is now handled below in the "Advanced Scroll Animation Observer" section.

// Scroll Progress Bar Logic - Refined with gradient
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressLine = document.getElementById("scroll-progress");
    if (progressLine) {
        progressLine.style.width = scrolled + "%";
        // Dynamic opacity based on scroll position
        progressLine.style.opacity = Math.min(scrolled / 10, 1);
    }
});

// Navbar dynamic background on scroll - Refined
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll("section[id]");

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active Navigation Link updates
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 250)) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(li => {
        li.classList.remove("active");
        if (li.getAttribute("href") === `#${current}`) {
            li.classList.add("active");
        }
    });
});

// Advanced Scroll Animation Observer (Staggered Children)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');

            // If the element has children that should stagger
            const staggerChildren = entry.target.querySelectorAll('.stagger-item');
            staggerChildren.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.15}s`;
                child.classList.add('reveal-visible');
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
});

// Typing Animation
const textsToType = ["Machine Learning Enthusiast", "Computer Science Student", "Aspiring ML Engineer"];
const typingElement = document.querySelector(".typing-text");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentText = textsToType[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 120;

    // If word is completely typed
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at the end
        isDeleting = true;
    }
    // If word is completely deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 500);
});

// Aurora Glow Tracking for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Typing Animation logic remains below...

// Certificate Modal Interactions
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-modal');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        // Small delay to allow display block to take effect before opacity transition
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        // Wait for transition to finish before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }
}

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// Close modal on escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openModalElement = document.querySelector('.modal.show');
        if (openModalElement) {
            closeModal(openModalElement.id);
        }
    }
});

// Magnetic Button Effect
document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// Playful Contact Form Button
const btnWrapper = document.getElementById('btnWrapper');
const submitBtn = document.getElementById('submitBtn');
const contactForm = document.getElementById('contactForm');

if (btnWrapper && submitBtn && contactForm) {
    // When hovering over the wrapper area
    btnWrapper.addEventListener('mouseenter', () => {
        // If the form is NOT valid (empty fields), hide the button
        if (!contactForm.checkValidity()) {
            submitBtn.classList.add('hide');
        }
    });

    // When the mouse leaves the wrapper area, the button comes back
    btnWrapper.addEventListener('mouseleave', () => {
        submitBtn.classList.remove('hide');
    });

    // Handle Formspree submission with AJAX
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Change button to loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';

        // Check if user is still using the placeholder URL
        if (contactForm.action.includes('xbjnrvle')) {
            setTimeout(() => {
                alert('DEVELOPER NOTE:\nYou need to replace the Formspree URL in index.html with your own to receive actual emails! Showing demo success for now.');

                const successOverlay = document.getElementById('successMessage');
                if (successOverlay) successOverlay.classList.add('show');

                contactForm.reset();
                setTimeout(() => {
                    if (successOverlay) successOverlay.classList.remove('show');
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'all';
                }, 5000);
            }, 1000);
            return;
        }

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show Success Overlay Animation
                const successOverlay = document.getElementById('successMessage');
                if (successOverlay) {
                    successOverlay.classList.add('show');
                }

                // Reset form
                contactForm.reset();

                // Optionally hide the success message after a few seconds
                setTimeout(() => {
                    if (successOverlay) {
                        successOverlay.classList.remove('show');
                    }
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'all';
                }, 5000);
            } else {
                alert('Oops! The form endpoint rejected the submission. Make sure your Formspree account is active.');
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'all';
            }
        } catch (error) {
            alert('Oops! Network error. Please check your connection and try again.');
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.style.pointerEvents = 'all';
        }
    });
}
