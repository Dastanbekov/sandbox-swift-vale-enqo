// JavaScript functionality for smooth scrolling, form validation, and animation triggers
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                const errorSpan = field.parentElement?.querySelector('.error-message');
                if (!field.value.trim()) {
                    isValid = false;
                    if (errorSpan) {
                        errorSpan.textContent = 'This field is required.';
                    } else {
                        // fallback: add a small error message
                        const span = document.createElement('span');
                        span.className = 'error-message';
                        span.textContent = 'This field is required.';
                        field.parentElement?.appendChild(span);
                    }
                } else {
                    if (errorSpan) {
                        errorSpan.textContent = '';
                    }
                }
            });
            // Email validation if email field exists
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    const errorSpan = emailField.parentElement?.querySelector('.error-message');
                    if (errorSpan) {
                        errorSpan.textContent = 'Please enter a valid email address.';
                    }
                }
            }
            if (isValid) {
                // Optionally submit the form (or show success)
                // form.submit(); // uncomment to actually submit
                alert('Form submitted successfully!');
            }
        });
    }

    // Animation triggers using Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally stop observing after it becomes visible
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }
});
