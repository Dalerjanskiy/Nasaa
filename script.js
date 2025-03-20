// Smooth scrolling for all links
document.addEventListener('DOMContentLoaded', function() {
    // Get all links that have a hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Add smooth scrolling
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });

    // Add email functionality
    const emailLink = document.querySelector('.fa-envelope').parentElement;
    emailLink.style.cursor = 'pointer';
    emailLink.addEventListener('click', () => {
        window.location.href = 'mailto:daler.janskiy@gmail.com';
    });

    // Add phone functionality
    const phoneLink = document.querySelector('.fa-phone').parentElement;
    phoneLink.style.cursor = 'pointer';
    phoneLink.addEventListener('click', () => {
        window.location.href = 'tel:+992990102535';
    });

    // Thanks button functionality
    function showThanks() {
        const thanksMessage = document.getElementById('thanksMessage');
        const thanksButton = document.querySelector('.thanks-button');
        
        // Show message with animation
        thanksMessage.classList.add('show');
        
        // Change button text
        thanksButton.innerHTML = '<i class="fas fa-heart"></i> Спасибо!';
        thanksButton.style.background = '#4caf50';
        
        // Add confetti effect
        createConfetti();
        
        // Reset after 3 seconds
        setTimeout(() => {
            thanksMessage.classList.remove('show');
            thanksButton.innerHTML = '<i class="fas fa-heart"></i> Сказать спасибо';
            thanksButton.style.background = '';
        }, 3000);
    }

    // Create confetti effect
    function createConfetti() {
        const colors = ['#ff4081', '#ffd700', '#2962ff', '#4caf50'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.opacity = Math.random();
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Add confetti styles
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: fixed;
            top: -10px;
            width: 10px;
            height: 10px;
            animation: fall linear forwards;
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Call showThanks function when thanks button is clicked
    const thanksButton = document.querySelector('.thanks-button');
    thanksButton.addEventListener('click', showThanks);

    // Animated counter for results section
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-value'));
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // Update every 16ms (60fps)
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Start counter animation when results section is in view
    function handleScroll() {
        const resultsSection = document.querySelector('.results-section');
        if (!resultsSection) return;

        const rect = resultsSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (isInView && !resultsSection.classList.contains('animated')) {
            resultsSection.classList.add('animated');
            document.querySelectorAll('.result-number').forEach(counter => {
                animateCounter(counter);
            });
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    // Add floating particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2 and 6 pixels
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random position
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            // Random animation duration and delay
            particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Reveal sections on scroll
    function revealSections() {
        const sections = document.querySelectorAll('.section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    }

    // Add hover effect to cards
    function addCardHoverEffect() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'none';
            });
        });
    }

    // Initialize animations
    createParticles();
    addCardHoverEffect();
    revealSections();
    
    // Add scroll event listener for section reveals
    window.addEventListener('scroll', revealSections);

    // Counter animation function
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Initialize result counters
    function initResultCounters() {
        const resultSection = document.querySelector('.results-section');
        const counters = document.querySelectorAll('.result-number');
        let hasAnimated = false;

        function startCounters() {
            if (isInViewport(resultSection) && !hasAnimated) {
                counters.forEach(counter => {
                    const targetValue = parseInt(counter.getAttribute('data-value'));
                    animateValue(counter, 0, targetValue, 2000);
                    
                    // Add animation class to icon
                    const icon = counter.parentElement.querySelector('.result-icon');
                    icon.classList.add('animate-icon');
                });
                hasAnimated = true;
            }
        }

        // Check on scroll
        window.addEventListener('scroll', startCounters);
        // Initial check
        startCounters();
    }

    // Add hover effects to result cards
    function addResultCardEffects() {
        const resultCards = document.querySelectorAll('.result-card');
        
        resultCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add glow effect
                card.style.boxShadow = `0 0 20px ${getComputedStyle(document.documentElement)
                    .getPropertyValue('--accent-color')}`;
                
                // Scale up icon
                const icon = card.querySelector('.result-icon i');
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            });

            card.addEventListener('mouseleave', () => {
                // Remove glow effect
                card.style.boxShadow = '';
                
                // Reset icon
                const icon = card.querySelector('.result-icon i');
                icon.style.transform = '';
            });

            // Add click effect
            card.addEventListener('click', () => {
                // Trigger pulse animation
                card.classList.add('pulse');
                
                // Update counter with random increment
                const counter = card.querySelector('.result-number');
                const currentValue = parseInt(counter.textContent);
                const increment = Math.floor(Math.random() * 5) + 1;
                const newValue = currentValue + increment;
                
                // Animate to new value
                animateValue(counter, currentValue, newValue, 500);
                counter.setAttribute('data-value', newValue);
                
                // Remove pulse class after animation
                setTimeout(() => {
                    card.classList.remove('pulse');
                }, 500);
            });
        });
    }

    // Initialize when document is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initResultCounters();
        addResultCardEffects();
        
        // Add CSS for pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .pulse {
                animation: pulse 0.5s ease-in-out;
            }
            .animate-icon {
                animation: bounce 1s ease infinite;
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    });

    // Handle navigation active states and smooth scrolling
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section');

        // Add smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active state on scroll
        function updateActiveLink() {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    currentSection = '#' + section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial check
    }

    // Initialize when document is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initNavigation();
    });

    // Add particle effect to the first button
    function initFirstButtonEffects() {
        const aboutButton = document.querySelector('.nav-links a[href="#about"]');
        
        // Add particles container
        const particles = document.createElement('div');
        particles.className = 'particles';
        aboutButton.appendChild(particles);

        // Create particles on hover
        aboutButton.addEventListener('mousemove', (e) => {
            const rect = aboutButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create particle
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 30 + 20;
            particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
            particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
            
            particles.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 600);
        });

        // Add ripple effect on click
        aboutButton.addEventListener('click', (e) => {
            const rect = aboutButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            aboutButton.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add 3D tilt effect
        aboutButton.addEventListener('mousemove', (e) => {
            const rect = aboutButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            aboutButton.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
        });

        aboutButton.addEventListener('mouseleave', () => {
            aboutButton.style.transform = 'none';
        });
    }

    // Initialize when document is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initFirstButtonEffects();
    });
});
