// Wait for the document to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 1. Contact Form Validation
    setupContactFormValidation();

    // 2. Dynamic Projects Feature
    setupShowMoreProjects();

    // 3. CV Page Toggle Skills
    setupToggleSkills();

    // 4. Dynamic Time-based Greeting
    displayTimeBasedGreeting();

    // Optional: Mobile Menu Toggle
    setupMobileMenu();
});

// 1. Contact Form Validation
function setupContactFormValidation() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            clearErrorMessages();

            let isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }

            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Message must be at least 10 characters long');
                isValid = false;
            }

            if (isValid) {
                contactForm.submit();
            }
        });
    }
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showError(inputElement, message) {
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '14px';
    errorElement.style.margin = '5px 0 0 0';

    inputElement.parentNode.appendChild(errorElement);
    inputElement.style.borderColor = 'red';
}

function clearErrorMessages() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '');
}

// 2. Dynamic Projects Feature
function setupShowMoreProjects() {
    const projectsContainer = document.querySelector('.portfolio-container');

    if (projectsContainer) {
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More Projects';
        showMoreButton.className = 'btn-download';
        showMoreButton.style.margin = '20px auto';
        showMoreButton.style.display = 'block';

        projectsContainer.parentNode.insertBefore(showMoreButton, projectsContainer.nextSibling);

        showMoreButton.addEventListener('click', function () {
            addNewProject();
            showMoreButton.style.display = 'none';
        });
    }
}

function addNewProject() {
    const projectsContainer = document.querySelector('.portfolio-container');
    
    if (projectsContainer) {
        const newProject = document.createElement('div');
        newProject.className = 'project-card';

        newProject.innerHTML = ` 
    
                <img src="assets/images/police.jpg" alt="Police Case Management System">
                <div class="project-content">
                    <h3>Police Case Management</h3>
                    <p>Developed a case management system for police stations to track and manage case information effectively.</p>
                    <time>Sep 2023</time>
                    <a href="https://github.com/misharii/CSC380-Police-Project.git" target="_blank">View Project</a>
                </div>
          
        `;

        newProject.style.opacity = '0';
        newProject.style.transform = 'translateY(20px)';
        newProject.style.transition = 'opacity 0.5s, transform 0.5s';

        projectsContainer.appendChild(newProject);

        setTimeout(() => {
            newProject.style.opacity = '1';
            newProject.style.transform = 'translateY(0)';
        }, 10);
    }
}

// 3. CV Page Toggle Skills
function setupToggleSkills() {
    const skillsSection = document.querySelector('.skills-grid');

    if (skillsSection) {
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Hide Skills';
        toggleButton.className = ' btn-toggle';
        // toggleButton.style.marginTop = '10px';
        // toggleButton.style.marginBottom = '10px';


        skillsSection.parentNode.insertBefore(toggleButton, skillsSection);

        toggleButton.addEventListener('click', function () {
            if (skillsSection.style.display === 'none') {
                skillsSection.style.display = 'grid';
                toggleButton.textContent = 'Hide Skills';
            } else {
                skillsSection.style.display = 'none';
                toggleButton.textContent = 'Show Skills';
            }
        });
    }
}

// 4. Dynamic Time-based Greeting
function displayTimeBasedGreeting() {
    const profileSection = document.querySelector('.hero');
    const onHomepage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

    if (profileSection && onHomepage) {
        const currentHour = new Date().getHours();
        let greeting = 'Welcome!';

        if (currentHour < 12) {
            greeting = 'Good morning!';
        } else if (currentHour < 18) {
            greeting = 'Good afternoon!';
        } else {
            greeting = 'Good evening!';
        }

        const greetingElement = document.createElement('div');
        greetingElement.className = 'greeting';
        greetingElement.textContent = greeting;
        greetingElement.style.fontSize = '24px';
        greetingElement.style.fontWeight = 'bold';
        greetingElement.style.marginBottom = '15px';
        greetingElement.style.color = '#4a89dc';

        profileSection.insertBefore(greetingElement, profileSection.firstChild);
    }
}

// Optional: Mobile menu toggle functionality
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
}
