// ===== PERFORMANCE OPTIMIZATION SCRIPT =====
// This script handles various performance optimizations

document.addEventListener('DOMContentLoaded', function() {
    // ===== PRELOAD CRITICAL RESOURCES =====
    function preloadCriticalResources() {
        const criticalImages = [
            'images/hero_3.jpg',
            'images/aldo22.jpg',
            'images/logo.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // ===== OPTIMIZE IMAGES =====
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not already present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add decoding="async" for better performance
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // Add error handling
            img.addEventListener('error', function() {
                console.warn('Image failed to load:', this.src);
                // You could set a placeholder image here
            });
        });
    }

    // ===== DEBOUNCE SCROLL EVENTS =====
    function debounceScrollEvents() {
        let scrollTimeout;
        let isScrolling = false;
        
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    // Add scroll-based effects here if needed
                    isScrolling = false;
                });
                isScrolling = true;
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                // Scroll ended
            }, 150);
        });
    }

    // ===== OPTIMIZE ANIMATIONS =====
    function optimizeAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== LAZY LOAD NON-CRITICAL CSS =====
    function lazyLoadCSS() {
        const nonCriticalCSS = [
            // Add any non-critical CSS files here
        ];
        
        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function() {
                this.media = 'all';
            };
            document.head.appendChild(link);
        });
    }

    // ===== SERVICE WORKER REGISTRATION =====
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(function(err) {
                        console.log('ServiceWorker registration failed');
                    });
            });
        }
    }

    // ===== PERFORMANCE MONITORING =====
    function monitorPerformance() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes) {
            // Largest Contentful Paint
            if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            }

            // First Input Delay
            if (PerformanceObserver.supportedEntryTypes.includes('first-input')) {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            }

            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            });
            if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes('layout-shift')) {
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            }
        }
    }

    // ===== INITIALIZE ALL OPTIMIZATIONS =====
    preloadCriticalResources();
    optimizeImages();
    debounceScrollEvents();
    optimizeAnimations();
    lazyLoadCSS();
    registerServiceWorker();
    monitorPerformance();

    // ===== CONSOLE PERFORMANCE INFO =====
    console.log('%c⚡ Performance optimizations loaded!', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
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

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle
    };
}