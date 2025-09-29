// Elements
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const tryAgainText = document.getElementById('tryAgainText');
const mainSection = document.getElementById('mainSection');
const successSection = document.getElementById('successSection');
const gallerySection = document.getElementById('gallerySection');
const seeGalleryBtn = document.getElementById('seeGalleryBtn');
const galleryBtnMain = document.getElementById('galleryBtnMain');
const backToQuestionBtn = document.getElementById('backToQuestionBtn');
const backToQuestionBtnBottom = document.getElementById('backToQuestionBtnBottom');
const finalMessageText = document.getElementById('finalMessageText');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
const backgroundMusic = document.getElementById('backgroundMusic');

// Track if user has answered
let hasAnswered = false;

// Handle background music
let musicPlaying = false;
let autoplayAttempted = false;

function playBackgroundMusic() {
    if (!musicPlaying && backgroundMusic) {
        backgroundMusic.volume = 0.7; // Set volume to 70%
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            removePlayPrompt();
        }).catch((error) => {
            console.log('Autoplay prevented by browser');
            if (!autoplayAttempted) {
                showPlayPrompt();
            }
        });
        autoplayAttempted = true;
    }
}

function showPlayPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'playPrompt';
    prompt.innerHTML = '🎵 Click anywhere to start the music';
    prompt.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 23, 68, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-size: 1rem;
        z-index: 10000;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        animation: bounce 2s infinite;
        font-weight: 600;
    `;
    document.body.appendChild(prompt);
    
    // Add bounce animation
    if (!document.getElementById('bounceStyle')) {
        const style = document.createElement('style');
        style.id = 'bounceStyle';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
                40% { transform: translateX(-50%) translateY(-10px); }
                60% { transform: translateX(-50%) translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

function removePlayPrompt() {
    const prompt = document.getElementById('playPrompt');
    if (prompt) {
        prompt.style.animation = 'fadeOut 0.3s';
        setTimeout(() => prompt.remove(), 300);
    }
}

// Try to play immediately on page load
window.addEventListener('load', () => {
    playBackgroundMusic();
});

// Also try when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic();
});

// Fallback: play on ANY user interaction
const playOnInteraction = () => {
    playBackgroundMusic();
};

document.addEventListener('click', playOnInteraction);
document.addEventListener('touchstart', playOnInteraction);
document.addEventListener('keydown', playOnInteraction);
document.addEventListener('scroll', playOnInteraction);
document.addEventListener('mousemove', playOnInteraction, { once: true });

// Set canvas size
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Funny messages when user clicks "No"
const funnyMessages = [
    "Come on, you know you want to! 😊",
    "Wrong button! Try the other one 😉",
    "I know you didn't mean that... 🥺",
    "The YES button is looking so lonely... 💔",
    "Are you sure about that? 😢",
    "Pretty please? With a cherry on top? 🍒",
    "I'll wait here until you say yes... ⏰",
    "My heart can't take this! 💔",
    "Even the button is red, that's a sign! ❤️",
    "I promise to be better! Just give me a chance! 🙏",
    "Think about all our good times together... 🌟",
    "You're breaking my heart here! 😭",
    "I'll make it up to you, I promise! 💖"
];

let noClickCount = 0;

// Confetti particle class
class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = ['#ff1744', '#ff4569', '#9c27b0', '#ba68c8', '#ffd700', '#ff69b4', '#00ff00', '#00bfff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > confettiCanvas.height) {
            this.y = -10;
            this.x = Math.random() * confettiCanvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiParticles = [];
let animationId;

function createConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationId = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// Create party emojis
function createPartyEmojis() {
    const emojis = ['🎉', '🎊', '❤️', '💕', '💖', '✨', '🥳', '😍', '💝'];
    const emojiContainer = document.createElement('div');
    emojiContainer.style.position = 'fixed';
    emojiContainer.style.top = '0';
    emojiContainer.style.left = '0';
    emojiContainer.style.width = '100%';
    emojiContainer.style.height = '100%';
    emojiContainer.style.pointerEvents = 'none';
    emojiContainer.style.zIndex = '9998';
    document.body.appendChild(emojiContainer);

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'absolute';
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-50px';
            emoji.style.fontSize = Math.random() * 30 + 20 + 'px';
            emoji.style.animation = 'fall 3s linear forwards';
            emojiContainer.appendChild(emoji);

            setTimeout(() => emoji.remove(), 3000);
        }, i * 100);
    }

    setTimeout(() => emojiContainer.remove(), 4000);
}

// Add falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            top: 110%;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);

// Yes button click handler
yesButton.addEventListener('click', () => {
    hasAnswered = true;
    
    // Update final message in gallery
    finalMessageText.textContent = "Thank you for giving us another chance ❤️";
    backToQuestionBtnBottom.style.display = 'none';
    
    // Create confetti and party emojis
    createConfetti();
    animateConfetti();
    createPartyEmojis();

    // Play success sound (optional - browser will play if supported)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUajk77RgGwU7k9n0zHgrBSR1yPDajz8JElyx6OyrWRQKRp/h8r9sIQUrgs/y2Yk2CBlpu/DlnE4MDlGo5O+zYBoFOpPZ9M14KwUkdcjw2o4+CRJcr+jrq1kUCkaf4fK/bCEFK4LP8tmJNggZabvw5ZxODA5RqOTvs2AaBTqT2fTNeCsFJHXI8NqOPgkSXK/o66tZFApGn+Hyv2whBSuCz/LZiTYIGWm78OWcTgwOUajk77NgGgU6k9n0zXgrBSR1yPDajj4JElyu6OqqWBQKRp/h8r9sIAUsgs7y2Yk2CBlpu/DlnE4MDlGo5O+zYBoFOpPZ9M14KwUkdcjw2o4+CRJcr+jrq1kUCkaf4fK/bCEFK4LP8tmJNggZabvw5ZxODA5RqOTvs2AaBTqT2fTNeCsFJHXI8NqOPgkSXK7o6qpYFApGn+Hyv2wgBSyCzvLZiTYIGWm78OWcTgwOUajk77NgGgU6k9n0zXgrBSR1yPDajj4JElyw6OqqWBQKRp/h8r9sIAUsgs7y2Yk2CBlpu/DlnE4MDlGo5O+zYBoFOpPZ9M14KwUkdcjw2o4+CRJcr+jrq1kUCkaf4fK/bCEFK4LP8tmJNggZabvw5ZxODA5RqOTvs2AaBTqT2fTNeCsFJHXI8NqOPgkSXK/o66tZFApGn+Hyv2whBSuCzvLZiTYIGWm78OWcTgwOUajk77NgGgU6k9n0zXgrBSR1yPDajj4JElyu6OqqWBQKRp/h8r9sIAUsgs7y2Yk2CBlpu/DlnE4MDlGo5O+zYBoFOpPZ9M14KwUkdcjw2o4+CRJcr+jrq1kUCkaf4fK/bCEFK4LP8tmJNggZabvw5ZxODA5RqOTvs2AaBTqT2fTNeCsFJHXI8NqOPgkSXK/o66tZFApGn+Hyv2whBSuCzvLZiTYIGWm78OWcTgwOUajk77NgGgU6k9n0zXgrBSR1yPDajj4JElyu6OurWRQKRp/h8r9sIQUrgs/y2Ik2CBlpu/DlnE4MDlGo5O+zYBoFOpPZ9M14KwUkdcjw2o4+CRJcr+jrq1kUCkaf4fK/bCEFK4LP8tmJNggZabvw5ZxODA5RqOTvs2AaBTqT2fTNeCsFJHXI8NqOPgkSXK/o66tZFApGn+Hyv2whBSuCzvLZiTYIGWm78OWcTgwOUajk77NgGgU6k9n0zXgrBSR1yPDajj4JElyu6OurWRQKRp/h8r9sIQUrgs/y2Ik2CBhpu/DlnE4MDlGo5O+zYBsA==');
        audio.play();
    } catch (e) {
        console.log('Audio playback not supported');
    }

    // Show success section after a delay
    setTimeout(() => {
        mainSection.classList.add('hidden');
        gallerySection.classList.add('hidden');
        successSection.classList.remove('hidden');
        
        // Stop confetti after a while
        setTimeout(() => {
            stopConfetti();
        }, 6000);
    }, 2000);
});

// No button click handler
noButton.addEventListener('click', () => {
    noClickCount++;
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    tryAgainText.textContent = randomMessage;
    
    // Make the No button smaller and Yes button bigger with each click
    const noScale = Math.max(0.5, 1 - (noClickCount * 0.1));
    const yesScale = 1 + (noClickCount * 0.1);
    noButton.style.transform = `scale(${noScale})`;
    yesButton.style.transform = `scale(${yesScale})`;
    
    // Move the No button randomly on the screen on mobile
    if (noClickCount > 3 && window.innerWidth < 768) {
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        noButton.style.position = 'relative';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
    }

    // After 5 clicks, make the No button disappear temporarily
    if (noClickCount >= 5) {
        noButton.style.opacity = '0.5';
        noButton.disabled = true;
        tryAgainText.textContent = "Fine! I'll only give you one option then! 😤";
        
        setTimeout(() => {
            noButton.style.opacity = '1';
            noButton.disabled = false;
        }, 2000);
    }
});

// Gallery button click handler (from success screen)
seeGalleryBtn.addEventListener('click', () => {
    successSection.classList.add('hidden');
    gallerySection.classList.remove('hidden');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Gallery button click handler (from main screen)
galleryBtnMain.addEventListener('click', () => {
    mainSection.classList.add('hidden');
    gallerySection.classList.remove('hidden');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Back to question button handlers
backToQuestionBtn.addEventListener('click', () => {
    if (!hasAnswered) {
        gallerySection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

backToQuestionBtnBottom.addEventListener('click', () => {
    if (!hasAnswered) {
        gallerySection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Animate gallery items on scroll
const observerOptions = {
    threshold: 0.1,
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

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});
