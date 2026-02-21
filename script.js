// Navigation Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        header.style.padding = '0';
    }
});

// Smooth scrolling functions for programmatic buttons
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

// Form Submission Handling
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.querySelector('.submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;

            // Simple validation and UX feedback
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                // Log simulated submission
                console.log('Form submission received:', {
                    name: `${firstName} ${lastName}`,
                    email,
                    company,
                    message
                });

                // Show success message
                formFeedback.innerHTML = `<strong>Success!</strong> Thank you, ${firstName}. We have received your inquiry. Our team will contact you at ${email} within 24 hours.`;
                formFeedback.className = 'success';
                formFeedback.style.display = 'block';

                // Reset form and button
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Scroll to feedback
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Hide feedback after 8 seconds
                setTimeout(() => {
                    formFeedback.style.opacity = '0';
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                        formFeedback.style.opacity = '1';
                    }, 500);
                }, 8000);

            }, 1200); // Simulated delay
        });
    }

    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        // Check for saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerHTML = '☀️';
        } else {
            themeToggleBtn.innerHTML = '🌙';
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '☀️';
            }
        });
    }

    // --- Quote Modal Logic (Cart Alternative) ---
    const quoteModal = document.getElementById('quoteModal');
    const closeBtn = document.querySelector('.close-btn');
    const itemInput = document.getElementById('quoteItem');

    // Open Modal when any 'add to cart' button is clicked
    document.querySelectorAll('.quote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemName = btn.getAttribute('data-item') || 'General Inquiry';
            if (itemInput) itemInput.value = itemName;
            if (quoteModal) quoteModal.classList.add('show');
            quoteModal.style.display = 'block';
        });
    });

    // Close Modal
    const closeModal = () => {
        if (quoteModal) {
            quoteModal.classList.remove('show');
            setTimeout(() => { quoteModal.style.display = 'none'; }, 300);
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === quoteModal) closeModal();
    });

    // Handle Modal Submit
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = quoteForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your inquiry has been sent. The owner will reach out shortly regarding pricing for: ' + itemInput.value);
                quoteForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                closeModal();
            }, 1000);
        });
    }

});
