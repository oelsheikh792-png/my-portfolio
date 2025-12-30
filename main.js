document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.profile-card');

    // Smooth entrance for social links
    const links = document.querySelectorAll('.social-link');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(10px)';

        setTimeout(() => {
            link.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
    });

    // Tilt effect for the card (subtle)
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;

        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset tilt on mouse out
    document.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        card.style.transition = 'all 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    // Typewriter Effect
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const words = JSON.parse(typewriter.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex % words.length];

            if (isDeleting) {
                typewriter.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriter.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1500);
    }
});
