// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 500);
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Enhanced AOS Initialization
AOS.init({
    duration: prefersReducedMotion ? 0 : 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out',
    delay: 100,
    mirror: false
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = body.dataset.theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', body.dataset.theme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.dataset.theme = savedTheme;
    themeToggle.innerHTML = savedTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Mobile Navigation
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
    hamburger.classList.toggle('active');
    const isOpen = navbar.classList.contains('nav-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth > 768) return;
    if (!navbar.classList.contains('nav-open')) return;
    if (navbar.contains(e.target)) return;

    navbar.classList.remove('nav-open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('nav-open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
    }
});

// Particles.js Configuration
if (!prefersReducedMotion) {
particlesJS('particles-js', {
    particles: {
        number: {
            value: 140,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#2563eb"
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 200,
            color: '#2563eb',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});
}

// Project Data
const PLACEHOLDER_IMG = (() => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#111827"/>
                    <stop offset="1" stop-color="#1f2937"/>
                </linearGradient>
            </defs>
            <rect width="1200" height="675" fill="url(#g)"/>
            <circle cx="240" cy="170" r="160" fill="#00ff00" opacity="0.18"/>
            <circle cx="980" cy="520" r="210" fill="#3b82f6" opacity="0.20"/>
            <text x="60" y="620" fill="#e5e7eb" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700" opacity="0.95">Project Preview</text>
        </svg>
    `.trim();
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
})();

const projects = [
    {
        title: 'AI Desktop Partner (Jarvis)',
        description: 'Created a voice-controlled desktop assistant in Python, enabling 10+ voice commands to automate tasks like opening applications, sending emails, and conducting online searches. Achieved 95% command recognition accuracy, reducing user input errors by 30%.',
        image: 'Project1.png',
        tags: ['AI & ML'],
        demo: 'https://github.com/Anurag1742/AI-Desktop-Partner-Jarvis-',
        github: 'https://github.com/Anurag1742'
    },
    {
        title: 'Parallax Website',
        description: 'Developed a visually engaging scroll-based interactive website using layered parallax effects, enhancing user engagement by 20%. Optimized animations and layout to reduce page load time by 25%, improving overall user experience and SEO ranking.',
        image: 'Project2.png',
        tags: ['web'],
        demo: 'https://github.com/Anurag1742/Parallax-Website-Nature-',
        github: 'https://github.com/Anurag1742'
    },
    {
        title: 'Employee Management System',
        description: 'Built a desktop application to manage employee records with CRUD operations, handling over 1,000 records efficiently. Integrated MySQL via JDBC with input validation and optimized SQL queries, improving data retrieval speed by 35%.',
        image: 'Project3.png',
        tags: ['java'],
        demo: 'https://github.com/Anurag1742/Employee-Management-System',
        github: 'https://github.com/Anurag1742'
    }
];

// Render Projects
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.tags.includes(filter));

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        
        projectCard.innerHTML = `
            <img src="${project.image || PLACEHOLDER_IMG}" alt="${project.title}" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}';">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.demo}" class="btn primary" target="_blank">Live Demo</a>
                <a href="${project.github}" class="btn secondary" target="_blank">GitHub</a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });

    // Ensure AOS picks up dynamically injected elements
    if (window.AOS) {
        if (typeof AOS.refreshHard === 'function') AOS.refreshHard();
        else if (typeof AOS.refresh === 'function') AOS.refresh();
    }
}

// Initialize projects
renderProjects();

// Project Filter
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProjects(button.dataset.filter);
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to your backend
    // For now, we'll just log it and show a success message
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navbar.classList.remove('nav-open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open menu');
            }
        }
    });
});

// Scroll UI: navbar, progress bar, back-to-top
const progressBar = document.querySelector('.scroll-progress__bar');
const backToTop = document.querySelector('.back-to-top');

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const progress = scrollable > 0 ? y / scrollable : 0;
    if (progressBar) progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;

    if (backToTop) backToTop.classList.toggle('visible', y > 500);
}); 

// Initialize scroll-driven UI state on first paint
window.dispatchEvent(new Event('scroll'));
