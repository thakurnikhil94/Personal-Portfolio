// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navLinksItems = document.querySelectorAll('.nav-links li');
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = document.querySelector('.fa-moon');
const sunIcon = document.querySelector('.fa-sun');
const contactForm = document.getElementById('contact-form');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});




/* ===== ELITE HEADER BEHAVIOR ===== */

let lastScrollTop = 0;
const header = document.querySelector(".curvy-header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  /* SHOW at very top */
if (scrollTop <= 60) {
    header.classList.remove("hide-header", "shrink", "glow");
    header.classList.add("show-header");
    return;
}

  /* Hide / Show */
if (scrollTop > lastScrollTop) {
    header.classList.remove("show-header");
    header.classList.add("hide-header");
} else {
    header.classList.remove("hide-header");
    header.classList.add("show-header");
}

  /* Shrink */
if (scrollTop > 120) {
    header.classList.add("shrink");
} else {
    header.classList.remove("shrink");
}

  /* Glow */
if (scrollTop > 200) {
    header.classList.add("glow");
} else {
    header.classList.remove("glow");
}

lastScrollTop = scrollTop;
});


/* ===== ACTIVE NAV LINK ===== */

window.addEventListener("scroll", () => {
let current = "";

sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
    current = section.getAttribute("id");
    }
});

navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
    link.classList.add("active");
    }
});
});



// Mobile Navigation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Prevent body scrolling when menu is open
});

window.addEventListener("scroll", function () {
const header = document.querySelector(".main-header");
header.classList.toggle("scrolled", window.scrollY > 50);
});


// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    // Toggle icons
    if (document.body.classList.contains('light-theme')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }

    // Save theme preference to localStorage
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    // Add animations with delay for elements
    const animateElements = () => {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-animate');
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(section);
        });
    };

    animateElements();
});


if (contactForm) {
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
    alert('⚠️ Please fill out all fields before submitting.');
    return;
    }

    // Optional: email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
    alert('⚠️ Please enter a valid email address.');
    return;
    }

    // Prepare data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    try {
      // Formspree endpoint
    const response = await fetch('use your link from Formspree here', { // use personal link
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        contactForm.innerHTML = `
        <div class="success-message" style="text-align:center; color:#28a745; padding:20px;">
            <i class="fas fa-check-circle" style="font-size:40px;"></i>
            <p>Thank you, ${name}! Your message has been sent successfully.</p>
        </div>
        `;
    } else {
        alert('❌ Error submitting your form. Try again later.');
    }

    } catch (error) {
    console.error('Error:', error);
    alert('⚠️ Network problem. Please try again.');
    }
});
}



// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if href is just "#"

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add typing effect to the binary in hero section
const binaryElement = document.querySelector('.binary');
if (binaryElement) {
    const originalText = binaryElement.innerText;
    binaryElement.innerText = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            binaryElement.innerText += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing effect when page loads
    setTimeout(typeWriter, 1000);
}
