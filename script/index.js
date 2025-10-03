// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// Enhanced functionality with better error handling and accessibility

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const menuBtn = document.getElementById('menu-icon');
    const closeMenu = document.getElementById('menu-close');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    const author = document.getElementById('author');

    // Check if elements exist before adding event listeners
    if (menuBtn && closeMenu && nav && header && author) {
        // Open mobile menu
        menuBtn.addEventListener('click', function() {
            nav.style.display = 'flex';
            menuBtn.style.display = 'none';
            header.style.background = 'white';
            author.style.display = 'inline';
            
            // Add ARIA attributes for accessibility
            nav.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-expanded', 'true');
            
            // Focus management
            closeMenu.focus();
        });

        // Close mobile menu
        closeMenu.addEventListener('click', function() {
            nav.style.display = 'none';
            menuBtn.style.display = 'block';
            header.style.background = 'transparent';
            author.style.display = 'none';
            
            // Remove ARIA attributes
            nav.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-expanded', 'false');
            
            // Focus management
            menuBtn.focus();
        });

        // Keyboard navigation for mobile menu
        menuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuBtn.click();
            }
        });

        closeMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeMenu.click();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.style.display === 'flex') {
                closeMenu.click();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.style.display === 'flex') {
                closeMenu.click();
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
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
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