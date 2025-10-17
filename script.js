document.addEventListener('DOMContentLoaded', () => {
    initMenacingEffect();
    initMenuItemAnimations();
    initScrollAnimations();
    initColorShiftEffect();
});

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    menuSection.scrollIntoView({ behavior: 'smooth' });
}

function initMenacingEffect() {
    const menacingBg = document.getElementById('menacingBg');
    const menacingSymbol = 'ゴ';
    const numberOfSymbols = 15;

    for (let i = 0; i < numberOfSymbols; i++) {
        const symbol = document.createElement('div');
        symbol.textContent = menacingSymbol;
        symbol.style.position = 'absolute';
        symbol.style.color = '#EB008B';
        symbol.style.fontSize = `${Math.random() * 60 + 40}px`;
        symbol.style.opacity = '0.1';
        symbol.style.left = `${Math.random() * 100}%`;
        symbol.style.top = `${Math.random() * 100}%`;
        symbol.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        symbol.style.animationDelay = `${Math.random() * 5}s`;
        menacingBg.appendChild(symbol);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.1;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

function initMenuItemAnimations() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const standCry = this.querySelector('.stand-cry');
            if (standCry) {
                standCry.style.animation = 'none';
                setTimeout(() => {
                    standCry.style.animation = 'standCryPulse 0.5s ease-out';
                }, 10);
            }
        });
    });

    const standCryAnimation = document.createElement('style');
    standCryAnimation.textContent = `
        @keyframes standCryPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); color: #FFD700; }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(standCryAnimation);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
    });
}

function initColorShiftEffect() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    const colorPalettes = [
        { border: '#EB008B', glow: 'rgba(235, 0, 139, 0.5)' },
        { border: '#D71820', glow: 'rgba(215, 24, 32, 0.5)' },
        { border: '#FFD700', glow: 'rgba(255, 215, 0, 0.5)' },
        { border: '#F797D0', glow: 'rgba(247, 151, 208, 0.5)' }
    ];

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
            this.style.borderColor = randomPalette.border;
            this.style.boxShadow = `0 10px 40px ${randomPalette.glow}`;
        });

        item.addEventListener('mouseleave', function() {
            this.style.borderColor = '#EB008B';
            this.style.boxShadow = 'none';
        });
    });
}

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
