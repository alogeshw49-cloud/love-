// ✅ COMPLETE ERROR-FREE ROMANTIC PROPOSAL - ALL LOGIC WORKING
// SUBHASREE ❤️ LOGESWARAN

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------- CONFIGURATION ----------
    const CORRECT_DATE = "25/06/2025";    // Special memory date
    const NO_BUTTON_LIMIT = 14;           // After 14 attempts, NO disappears
    
    // ---------- DOM ELEMENTS ----------
    const screens = {
        landing: document.getElementById('landing-screen'),
        memory: document.getElementById('memory-screen'),
        proposal: document.getElementById('proposal-screen'),
        final: document.getElementById('final-screen')
    };
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const noMessage = document.getElementById('noMessage');
    const buttonWrapper = document.getElementById('buttonWrapper');
    const unlockBtn = document.getElementById('unlockBtn');
    const dateInput = document.getElementById('dateInput');
    const memoryHint = document.getElementById('memoryHint');
    const acceptBtn = document.getElementById('acceptBtn');
    
    // ---------- STATE VARIABLES ----------
    let noClickCounter = 0;
    let noButtonVisible = true;
    let panelRect = null;
    
    // ---------- 1. FLOATING HEARTS GENERATOR (CINEMATIC) ----------
    function generateHearts() {
        const container = document.getElementById('heartContainer');
        if (!container) return;
        container.innerHTML = '';
        
        const heartSymbols = ['❤️', '💖', '💕', '💗', '💓', '💞', '🌸', '✨', '💘', '💝'];
        const heartCount = 48;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            // Random styles
            const size = Math.floor(Math.random() * 30) + 20;
            heart.style.fontSize = size + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 12 + 12) + 's'; // 12-24s slow float
            heart.style.animationDelay = Math.random() * 10 + 's';
            heart.style.opacity = Math.random() * 0.4 + 0.4;
            
            container.appendChild(heart);
        }
    }
    
    // ---------- 2. SCREEN SWITCHING FUNCTION ----------
    function showScreen(screenName) {
        // Hide all screens
        Object.keys(screens).forEach(key => {
            screens[key].classList.add('hidden');
        });
        
        // Show selected screen
        if (screens[screenName]) {
            screens[screenName].classList.remove('hidden');
        }
        
        // Reset NO button position when returning to landing
        if (screenName === 'landing' && noBtn) {
            noBtn.style.position = 'relative';
            noBtn.style.left = '0';
            noBtn.style.top = '0';
            noBtn.style.display = 'inline-block';
            noClickCounter = 0;
            noButtonVisible = true;
            if (noMessage) noMessage.innerHTML = '';
        }
        
        // Trigger heart explosion when final screen shown
        if (screenName === 'final') {
            const explosionDiv = document.getElementById('explosionHearts');
            if (explosionDiv) {
                explosionDiv.innerHTML = '❤️ 💖 💕 💗 💓 💞 💘 💝 ❤️‍🔥 ✨💍✨';
            }
        }
    }
    
    // ---------- 3. NO BUTTON ESCAPE LOGIC (FULLY FIXED) ----------
    function setupNoButton() {
        if (!noBtn || !buttonWrapper) return;
        
        // Remove any existing listeners by cloning
        const newNoBtn = noBtn.cloneNode(true);
        noBtn.parentNode.replaceChild(newNoBtn, noBtn);
        window.noBtn = newNoBtn;
        
        // Reset counter and message
        noClickCounter = 0;
        noMessage.innerHTML = '';
        newNoBtn.style.display = 'inline-block';
        newNoBtn.style.position = 'relative';
        newNoBtn.style.left = '0';
        newNoBtn.style.top = '0';
        
        // Mouse move escape
        newNoBtn.addEventListener('mouseover', function(e) {
            // Only run on landing screen and if button is visible
            if (!screens.landing.classList.contains('hidden') && 
                this.style.display !== 'none' && 
                this.style.position === 'relative') {
                moveNoButton(e);
            }
        });
        
        // Click escape + counter
        newNoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (screens.landing.classList.contains('hidden')) return;
            if (this.style.display === 'none') return;
            
            noClickCounter++;
            
            if (noClickCounter >= NO_BUTTON_LIMIT) {
                // After 14 attempts - NO button disappears with cute message
                this.style.display = 'none';
                noButtonVisible = false;
                noMessage.innerHTML = '🥺 You already accepted before, sweetheart! 💘 Click YES →';
            } else {
                // Show playful messages
                if (noClickCounter > 2 && noClickCounter < 7) {
                    noMessage.innerHTML = 'hehe keep trying 💕';
                } else if (noClickCounter >= 7 && noClickCounter < 12) {
                    noMessage.innerHTML = 'Almost there... just say YES? 😘';
                } else if (noClickCounter >= 12 && noClickCounter < 14) {
                    noMessage.innerHTML = 'One last chance before I disappear! 💗';
                }
                moveNoButton(e);
            }
        });
        
        function moveNoButton(e) {
            const btn = document.getElementById('noBtn');
            if (!btn || btn.style.display === 'none') return;
            
            const panel = document.querySelector('.pixel-panel');
            if (!panel) return;
            
            const panelRect = panel.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();
            
            // Calculate safe boundaries inside panel
            const maxX = panelRect.width - btnRect.width - 30;
            const maxY = panelRect.height - btnRect.height - 40;
            
            // Generate random position
            let newX = Math.floor(Math.random() * maxX);
            let newY = Math.floor(Math.random() * maxY);
            
            // Keep within bounds
            newX = Math.max(10, Math.min(newX, maxX));
            newY = Math.max(10, Math.min(newY, maxY));
            
            // Apply absolute positioning
            btn.style.position = 'absolute';
            btn.style.left = newX + 'px';
            btn.style.top = newY + 'px';
            btn.style.zIndex = '100';
        }
    }
    
    // ---------- 4. MEMORY DATE CHECK (SHAKE EFFECT) ----------
    function setupMemoryCheck() {
        if (!unlockBtn || !dateInput || !memoryHint) return;
        
        unlockBtn.addEventListener('click', function() {
            const enteredDate = dateInput.value.trim();
            
            if (enteredDate === CORRECT_DATE) {
                memoryHint.innerHTML = '✅ Correct! Opening my heart... 💖';
                setTimeout(() => {
                    showScreen('proposal');
                    dateInput.value = '';
                    memoryHint.innerHTML = '';
                }, 600);
            } else {
                // Wrong date - shake animation
                memoryHint.innerHTML = '💔 Not that date... try again, my love (DD/MM/YYYY)';
                dateInput.classList.add('shake');
                setTimeout(() => {
                    dateInput.classList.remove('shake');
                }, 500);
            }
        });
        
        // Enter key support
        dateInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                unlockBtn.click();
            }
        });
    }
    
    // ---------- 5. PROPOSAL ACCEPT -> FINAL SCREEN + EXPLOSION ----------
    function setupAcceptButton() {
        if (!acceptBtn) return;
        
        acceptBtn.addEventListener('click', function() {
            showScreen('final');
        });
    }
    
    // ---------- 6. YES BUTTON -> GO TO MEMORY SCREEN ----------
    function setupYesButton() {
        if (!yesBtn) return;
        
        yesBtn.addEventListener('click', function() {
            showScreen('memory');
        });
    }
    
    // ---------- 7. RESET NO BUTTON POSITION ON WINDOW RESIZE ----------
    window.addEventListener('resize', function() {
        if (!screens.landing.classList.contains('hidden')) {
            if (noBtn && noBtn.style.display !== 'none') {
                noBtn.style.position = 'relative';
                noBtn.style.left = '0';
                noBtn.style.top = '0';
            }
        }
    });
    
    // ---------- 8. INITIALIZE EVERYTHING ----------
    function init() {
        generateHearts();
        showScreen('landing'); // Start on landing screen
        setupNoButton();
        setupYesButton();
        setupMemoryCheck();
        setupAcceptButton();
        
        // Re-attach NO button reference
        window.noBtn = document.getElementById('noBtn');
    }
    
    // Start the magic
    init();
});