// Audio Player Logic
let currentAudio = null;

const musicCards = document.querySelectorAll('.music-card');

musicCards.forEach(card => {
    card.addEventListener('click', () => {
        const audioSrc = card.getAttribute('data-audio');
        
        // If the same card is clicked and it's playing, pause it
        if (currentAudio && currentAudio.src.includes(encodeURI(audioSrc))) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                card.classList.remove('playing');
                card.querySelector('.play-hint').textContent = 'Play';
                return;
            } else {
                currentAudio.play();
                card.classList.add('playing');
                card.querySelector('.play-hint').textContent = 'Playing...';
                return;
            }
        }

        // Stop current audio if playing
        if (currentAudio) {
            currentAudio.pause();
            document.querySelectorAll('.music-card').forEach(c => {
                c.classList.remove('playing');
                c.querySelector('.play-hint').textContent = 'Listen';
            });
        }

        // Play new audio
        currentAudio = new Audio(audioSrc);
        currentAudio.play();
        card.classList.add('playing');
        card.querySelector('.play-hint').textContent = 'Playing...';

        // Reset when finished
        currentAudio.onended = () => {
            card.classList.remove('playing');
            card.querySelector('.play-hint').textContent = 'Listen';
            currentAudio = null;
        };
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we don't need to observe it anymore
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // Reveal when 15% of the element is visible
});

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Subtle parallax for the hero video
window.addEventListener('scroll', () => {
    const video = document.querySelector('.hero-video-bg');
    let scrollPosition = window.pageYOffset;
    if (video) {
        video.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
});

// Typewriter effect for the Letter to 2126
const typewriterElement = document.getElementById('future-message');
if (typewriterElement) {
    const text = typewriterElement.textContent.trim();
    typewriterElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };

    // Trigger typewriter when section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
            observer.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('future-letter'));
}

// Log for confirmation
console.log("Gideon's Digital Legacy: Site logic initialized.");
