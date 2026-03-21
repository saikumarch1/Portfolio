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

    const timer = setInterval(() => {
        count++;

        // Update UI
        percentEl.textContent = count;
        fillEl.style.width = `${count}%`;

        // Update Status Messages
        if (count % 20 === 0) {
            const msgIndex = Math.min(Math.floor(count / 20), statusMessages.length - 1);
            statusEl.textContent = statusMessages[msgIndex];
        }

        if (count >= 100) {
            clearInterval(timer);

            // Final snap to site
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.style.overflow = 'auto'; // Re-enable scrolling

                // Cleanup
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 300); // Tiny pause at 100%
        }
    }, stepTime);
})();

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
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
const textsToType = ["Machine Learning Enthusiast", "Bachelor of Technology", "Third Year Student"];
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