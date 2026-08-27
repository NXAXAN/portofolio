/* =========================================
   NABIL PORTFOLIO - MAIN SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializePortfolioFilter();
    initializeSmoothScroll();
    initializeContactForm();
});

/* PORTFOLIO FILTER */
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            portfolioItems.forEach((item) => {
                const categories = (item.dataset.category || "")
                    .toLowerCase()
                    .split(" ");

                const shouldShow =
                    selectedFilter === "all" ||
                    categories.includes(selectedFilter.toLowerCase());

                item.classList.toggle("is-hidden", !shouldShow);
            });
        });
    });
}

/* SMOOTH SCROLL */
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/* CONTACT FORM */
function initializeContactForm() {
    const contactForm = document.querySelector("#contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        const requiredFields = contactForm.querySelectorAll("[required]");
        let isValid = true;

        requiredFields.forEach((field) => {
            const value = field.value.trim();
            field.classList.toggle("input-error", !value);
            if (!value) isValid = false;
        });

        const emailField = contactForm.querySelector('input[type="email"]');

        if (emailField && emailField.value.trim() &&
            !isValidEmail(emailField.value.trim())) {
            isValid = false;
            emailField.classList.add("input-error");
        }

        event.preventDefault();

        showFormMessage(
            contactForm,
            isValid
                ? "Your message is ready to send. Contact service will be connected soon."
                : "Please complete all required fields correctly.",
            isValid ? "success" : "error"
        );
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(form, message, type) {
    let messageElement = form.querySelector(".form-message");

    if (!messageElement) {
        messageElement = document.createElement("p");
        messageElement.className = "form-message";
        form.appendChild(messageElement);
    }

    messageElement.textContent = message;
    messageElement.classList.remove("success", "error");
    messageElement.classList.add(type);
}
