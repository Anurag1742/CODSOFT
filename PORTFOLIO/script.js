// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 500);
});

// Enhanced AOS Initialization
AOS.init({
    duration: 1000,
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
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Particles.js Configuration
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

// Project Data
const projects = [
    {
        title: 'AI Desktop Partner (Jarvis)',
        description: 'Created a voice-controlled desktop assistant in Python, enabling 10+ voice commands to automate tasks like opening applications, sending emails, and conducting online searches. Achieved 95% command recognition accuracy, reducing user input errors by 30%.',
        image: 'project1.jpg',
        tags: ['ai'],
        demo: 'https://github.com/Anurag1742/Jarvis-AI-Assistant',
        github: 'https://github.com/Anurag1742/Jarvis-AI-Assistant'
    },
    {
        title: 'Parallax Website',
        description: 'Developed a visually engaging scroll-based interactive website using layered parallax effects, enhancing user engagement by 20%. Optimized animations and layout to reduce page load time by 25%, improving overall user experience and SEO ranking.',
        image: 'project2.jpg',
        tags: ['web'],
        demo: '#',
        github: '#'
    },
    {
        title: 'Employee Management System',
        description: 'Built a desktop application to manage employee records with CRUD operations, handling over 1,000 records efficiently. Integrated MySQL via JDBC with input validation and optimized SQL queries, improving data retrieval speed by 35%.',
        image: 'project3.jpg',
        tags: ['java'],
        demo: '#',
        github: '#'
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
            <img src="${project.image}" alt="${project.title}">
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
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Add scroll event listener for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
}); 