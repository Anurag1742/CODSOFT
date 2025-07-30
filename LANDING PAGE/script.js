document.addEventListener("DOMContentLoaded", () => {
    // ===================================
    // LOGIC FOR MAIN SITE (index.html)
    // ===================================

    // --- Sticky Header ---
    const header = document.getElementById("main-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // --- Scroll Animations ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        scrollObserver.observe(element);
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    // ========================================
    // LOGIC FOR ANIMATED LOGIN (login.html)
    // ========================================
    const box = document.querySelector(".animated-login-page .box");
    const showSignupBtn = document.getElementById("show-signup");
    const showLoginBtn = document.getElementById("show-login");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    if (box && showSignupBtn && showLoginBtn) {
        // Switch to Sign Up form
        showSignupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            box.classList.add("signup-active");
            loginForm.classList.remove("active");
            signupForm.classList.add("active");
        });

        // Switch back to Login form
        showLoginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            box.classList.remove("signup-active");
            signupForm.classList.remove("active");
            loginForm.classList.add("active");
        });
    }
});

// login page
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// get in touch
document.querySelector('.cta-button').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('.signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Thank you for signing up!");
  e.target.reset();
});


// theme
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '🌙';
    }
  });

