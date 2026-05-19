/**
 * SwiftMove — Packers & Movers
 * script.js
 * Author: Rishav | Internship Assignment
 *
 * Features:
 *  1. Sticky navbar shadow on scroll
 *  2. Hamburger menu toggle (mobile)
 *  3. Close mobile menu on nav link click
 *  4. Scroll-triggered fade-up animations (IntersectionObserver)
 *  5. Contact form validation with inline error messages
 *  6. Smooth active state for nav links (optional scroll spy)
 */

/* ====================================================
   1. NAVBAR — Add shadow when page is scrolled
   ==================================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ====================================================
   2. HAMBURGER MENU — Toggle mobile nav open/close
   ==================================================== */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);

  // Accessibility: update aria-expanded
  hamburger.setAttribute('aria-expanded', isOpen.toString());
});


/* ====================================================
   3. CLOSE MOBILE MENU on link click
   ==================================================== */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


/* ====================================================
   4. SCROLL ANIMATIONS — IntersectionObserver
   Watches all .fade-up elements; adds .visible when
   they enter the viewport to trigger the CSS transition.
   ==================================================== */
const fadeElements = document.querySelectorAll('.fade-up');

const observerOptions = {
  threshold: 0.15,          // Trigger when 15% of element is visible
  rootMargin: '0px 0px -40px 0px'   // Slight offset from bottom
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing once animated — no need to re-run
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));


/* ====================================================
   5. CONTACT FORM — Validation & Submit Handler
   ==================================================== */
const form        = document.getElementById('quoteForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

// Helper: Show error message under a field
function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  input.classList.add('error');
  errorEl.textContent = message;
}

// Helper: Clear error for a field
function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);
  input.classList.remove('error');
  errorEl.textContent = '';
}

// Validate a phone number (basic: 10 digits, can have spaces/dashes)
function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-().+]/g, '');
  return /^\d{10,12}$/.test(cleaned);
}

// Run on form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();   // Prevent default page reload

  // Read field values
  const name    = document.getElementById('name').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;

  // Clear all previous errors first
  clearError('name',    'nameError');
  clearError('phone',   'phoneError');
  clearError('service', 'serviceError');
  formSuccess.classList.remove('show');

  let hasError = false;

  // --- Name validation ---
  if (!name) {
    showError('name', 'nameError', 'Please enter your full name.');
    hasError = true;
  } else if (name.length < 2) {
    showError('name', 'nameError', 'Name must be at least 2 characters.');
    hasError = true;
  }

  // --- Phone validation ---
  if (!phone) {
    showError('phone', 'phoneError', 'Please enter your phone number.');
    hasError = true;
  } else if (!isValidPhone(phone)) {
    showError('phone', 'phoneError', 'Enter a valid 10-digit phone number.');
    hasError = true;
  }

  // --- Service validation ---
  if (!service) {
    showError('service', 'serviceError', 'Please select a service.');
    hasError = true;
  }

  // Stop if there are errors
  if (hasError) return;

  // --- Simulate form submission (loading state) ---
  submitBtn.textContent = 'Submitting…';
  submitBtn.disabled = true;

  // Simulate a 1.5s network delay, then show success
  setTimeout(() => {
    // Reset form fields
    form.reset();

    // Restore button
    submitBtn.textContent = 'Submit Request';
    submitBtn.disabled = false;

    // Show success message
    formSuccess.classList.add('show');

    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);

  }, 1500);
});

// Clear field error on user input (live feedback)
['name', 'phone', 'service'].forEach(id => {
  const errorId = id + 'Error';
  document.getElementById(id).addEventListener('input', () => {
    clearError(id, errorId);
  });
});