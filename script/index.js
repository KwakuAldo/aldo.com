// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// Enhanced functionality with better error handling and accessibility

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE DETECTION AND FORCE STYLES =====
    function isMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Force mobile styles if on mobile
    function applyMobileStyles() {
        if (isMobile()) {
            const menuBtn = document.getElementById('menu-icon');
            if (menuBtn) {
                // Apply proper mobile styles
                menuBtn.style.display = 'block';
                menuBtn.style.padding = '1.25rem 0 0 1.25rem';
                menuBtn.style.position = 'relative';
                menuBtn.style.visibility = 'visible';
                menuBtn.style.opacity = '1';
                menuBtn.style.zIndex = '9999';
            }
        }
    }
    
    // Apply on load
    applyMobileStyles();
    
    // Apply on resize/orientation change
    window.addEventListener('resize', applyMobileStyles);
    window.addEventListener('orientationchange', applyMobileStyles);

    // ===== IMAGE LOADING =====
    // Hero image loading
    const heroImg = document.getElementById('hero_img');
    if (heroImg) {
        // Add error handling for hero image with fallback
        heroImg.addEventListener('error', function() {
            // Try alternative image
            if (this.src.includes('hero_3.jpg')) {
                this.src = 'images/hero_2.jpg';
            } else if (this.src.includes('hero_2.jpg')) {
                this.src = 'images/aldo22.jpg';
            }
        });
    }

    // Profile image loading (for resume page)
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        // Add error handling for profile image with fallback
        profileImg.addEventListener('error', function() {
            // Try alternative image
            if (this.src.includes('aldo22.jpg')) {
                this.src = 'images/hero_3.jpg';
            } else if (this.src.includes('hero_3.jpg')) {
                this.src = 'images/hero_2.jpg';
            }
        });
    }

    // Social icons loading
    const socialIcons = document.querySelectorAll('.socialIcons');
    socialIcons.forEach((icon, index) => {
        icon.addEventListener('error', function() {
            console.log(`Social icon ${index + 1} failed to load:`, this.src);
        });
        icon.addEventListener('load', function() {
            console.log(`Social icon ${index + 1} loaded successfully:`, this.src);
        });
    });

    // ===== MOBILE NAVIGATION =====
    const menuBtn = document.getElementById('menu-icon');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    const author = document.getElementById('author');
    let isMenuOpen = false;

    // Check if elements exist before adding event listeners
    if (menuBtn && nav && header && author) {
        // Toggle mobile menu
        menuBtn.addEventListener('click', function() {
            if (!isMenuOpen) {
                // Open menu
                nav.style.display = 'flex';
                menuBtn.src = 'images/icon-close-menu.svg';
                menuBtn.alt = 'Close';
                header.style.background = 'white';
                author.style.display = 'inline';
                isMenuOpen = true;
            } else {
                // Close menu
                nav.style.display = 'none';
                menuBtn.src = 'images/iconmonstr-menu-lined-32.png';
                menuBtn.alt = 'Menu';
                header.style.background = 'transparent';
                author.style.display = 'none';
                isMenuOpen = false;
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