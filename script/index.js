// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// Enhanced functionality with better error handling and accessibility

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const menuBtn = document.getElementById('menu-icon');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    const author = document.getElementById('author');
    let isMenuOpen = false;

    // ===== CHROME MOBILE FIX =====
    // Force show menu icon on mobile devices (Chrome fix)
    function checkMobileAndShowMenu() {
        if (window.innerWidth <= 768) {
            if (menuBtn) {
                menuBtn.style.display = 'block';
                menuBtn.style.visibility = 'visible';
                menuBtn.style.opacity = '1';
            }
        } else {
            if (menuBtn) {
                menuBtn.style.display = 'none';
            }
        }
    }

    // Check on load and resize
    checkMobileAndShowMenu();
    window.addEventListener('resize', checkMobileAndShowMenu);

    // Check if elements exist before adding event listeners
    if (menuBtn && nav && header && author) {
        // Toggle mobile menu
        menuBtn.addEventListener('click', function() {
            if (!isMenuOpen) {
                // Open menu
                nav.style.display = 'flex';
                menuBtn.src = 'images/icon-close-menu.svg';
                menuBtn.classList.add('menu-open');
                header.style.background = 'white';
                author.style.display = 'inline';
                isMenuOpen = true;
                
                // Update ARIA attributes
                nav.setAttribute('aria-expanded', 'true');
                menuBtn.setAttribute('aria-expanded', 'true');
                menuBtn.setAttribute('aria-label', 'Close navigation menu');
            } else {
                // Close menu
                nav.style.display = 'none';
                menuBtn.src = 'images/iconmonstr-menu-lined-32.png';
                menuBtn.classList.remove('menu-open');
                header.style.background = 'transparent';
                author.style.display = 'none';
                isMenuOpen = false;
                
                // Update ARIA attributes
                nav.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.setAttribute('aria-label', 'Open navigation menu');
            }
        });

        // Keyboard navigation for mobile menu
        menuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuBtn.click();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target) && isMenuOpen) {
                menuBtn.click();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                menuBtn.click();
            }
        });
    }

    // ===== PROJECT SLIDESHOW =====
    const mq = window.matchMedia("(max-width: 768px)");
    
    if (mq.matches) {
        let slideIndex = 1;
        const slides = document.getElementsByClassName('projectIMGs');
        
        // Initialize slideshow
        if (slides.length > 0) {
            showSlides(slideIndex);
        }

        // Make functions globally available
        window.fwdSlides = function(n) {
            slideIndex += n;
            showSlides(slideIndex);
        };

        window.currentSlide = function(n) {
            slideIndex = n;
            showSlides(slideIndex);
        };

        function showSlides(n) {
            try {
                if (n > slides.length) {
                    slideIndex = 1;
                }
                if (n < 1) {
                    slideIndex = slides.length;
                }
                
                // Hide all slides
                for (let i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                
                // Show current slide
                if (slides[slideIndex - 1]) {
                    slides[slideIndex - 1].style.display = "block";
                }
            } catch (error) {
                console.error('Error in slideshow:', error);
            }
        }

        // Auto-advance slideshow (optional)
        setInterval(function() {
            if (slides.length > 1) {
                slideIndex++;
                showSlides(slideIndex);
            }
        }, 5000); // Change slide every 5 seconds
    }

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== LAZY LOADING FOR IMAGES =====
    // Only apply lazy loading to images that are NOT navigation icons
    const lazyImages = document.querySelectorAll('img[loading="lazy"]:not([data-critical])');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add a small delay to ensure smooth loading
                    setTimeout(() => {
                        img.classList.add('loaded');
                    }, 100);
                    
                    observer.unobserve(img);
                }
            });
        }, {
            // Load images when they're 50px away from viewport
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Add scroll-based animations or effects here if needed
        }, 10);
    });

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-dark);
        color: var(--white);
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
        main.setAttribute('role', 'main');
    }

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send error reports to a logging service here
    });

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Create email body
            const emailBody = `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Subject: ${data.subject}
Message: ${data.message}
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:akadabunu@gmail.com?subject=${encodeURIComponent('Portfolio Contact: ' + data.subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Thank you! Your email client should open with a pre-filled message.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // ===== SMOOTH SCROLLING FOR AVAILABILITY BANNER =====
    const availabilityCta = document.querySelector('.availability-cta');
    if (availabilityCta) {
        availabilityCta.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (themeToggle) {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('theme', newTheme);
        });
    }

    // ===== SCROLL PROGRESS =====
    const scrollProgress = document.getElementById('scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // ===== ANIMATED SKILL BARS =====
    const skillBars = document.querySelectorAll('.skill-fill');
    
    if (skillBars.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillFill = entry.target;
                    const width = skillFill.getAttribute('data-width');
                    skillFill.style.width = width;
                    skillObserver.unobserve(skillFill);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // ===== TYPING ANIMATION =====
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Frontend Developer / System Administrator',
        'Problem Solver / Creative Thinker',
        'Always Learning / Always Growing',
        'Building Amazing Web Experiences'
    ];
    
    if (typingText) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before typing next text
            }
            
            setTimeout(typeText, typeSpeed);
        }
        
        // Start typing animation after initial load
        setTimeout(typeText, 2000);
    }

    // ===== PARTICLES BACKGROUND =====
    const particlesContainer = document.getElementById('particles-container');
    
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 6 + 's';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 6000);
        }
        
        // Create particles periodically
        setInterval(createParticle, 300);
        
        // Create initial particles
        for (let i = 0; i < 10; i++) {
            setTimeout(createParticle, i * 100);
        }
    }

    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c👋 Welcome to Aldo\'s Portfolio!', 'color: #f9c846; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ by Aldo Efui Adabunu', 'color: #8FC1E2; font-size: 14px;');
    console.log('%cFeel free to explore the code!', 'color: #120E26; font-size: 12px;');
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== EXPORT FOR TESTING (if using modules) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle
    };
}