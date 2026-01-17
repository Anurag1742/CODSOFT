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

    // Update auth button (Login/Register -> Profile) when a user is logged in
    updateAuthNavLink();

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

function setAuthNavLoggedOut(linkEl) {
    linkEl.href = 'login.html';
    linkEl.textContent = 'Login / Register';
}

async function updateAuthNavLink() {
    const linkEl = document.getElementById('auth-nav-link');
    if (!linkEl) return;

    const token = localStorage.getItem('token');
    if (!token) {
        setAuthNavLoggedOut(linkEl);
        return;
    }

    try {
        const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) {
            localStorage.removeItem('token');
            setAuthNavLoggedOut(linkEl);
            return;
        }

        linkEl.href = 'profile.html';
        const username = data.user && data.user.username ? String(data.user.username) : '';
        linkEl.textContent = username ? `Profile (${username})` : 'Profile';
    } catch (_err) {
        localStorage.removeItem('token');
        setAuthNavLoggedOut(linkEl);
    }
}

// login page
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

if (registerLink && wrapper) {
    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.add('active');
    });
}

if (loginLink && wrapper) {
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        wrapper.classList.remove('active');
    });
}

if (btnPopup && wrapper) {
    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });
}

if (iconClose && wrapper) {
    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
    });
}

// ========================================
// API CONNECTIVITY (MongoDB-backed backend)
// ========================================
async function postJson(url, body) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data && data.message ? data.message : `Request failed (${res.status})`;
        throw new Error(message);
    }
    return data;
}

const loginFormEl = document.getElementById('login-form');
if (loginFormEl) {
    loginFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email')?.value?.trim();
        const password = document.getElementById('login-password')?.value;

        try {
            const result = await postJson('/api/auth/login', { email, password });
            if (result.token) localStorage.setItem('token', result.token);
            alert(result.message || 'Login successful');
            window.location.href = 'index.html';
        } catch (err) {
            alert(err.message || 'Login failed');
        }
    });
}

const registerFormEl = document.getElementById('register-form');
if (registerFormEl) {
    registerFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('register-username')?.value?.trim();
        const email = document.getElementById('register-email')?.value?.trim();
        const password = document.getElementById('register-password')?.value;

        try {
            const result = await postJson('/api/auth/register', { username, email, password });
            if (result.token) localStorage.setItem('token', result.token);
            alert(result.message || 'Registered successfully');
            // Switch back to login view after successful registration
            if (wrapper) wrapper.classList.remove('active');
        } catch (err) {
            alert(err.message || 'Registration failed');
        }
    });
}

// get in touch
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// const signupForm = document.querySelector('.signup-form');
// if (signupForm) {
//     signupForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         alert("Thank you for signing up!");
//         e.target.reset();
//     });
// }


// theme
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

    if (toggleBtn) {
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
    }

