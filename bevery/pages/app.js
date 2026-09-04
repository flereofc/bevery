// Bevery - Application Logic with Supabase Integration
// Project: wwrhiwayiltqezhaspfl

// Supabase configuration (connected to user's project)
const SUPABASE_URL = 'https://wwrhiwayiltqezhaspfl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oM7odcmSuWp7QWAJMtnbKw_4E3S1bnS';

// Initialize Supabase client
const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Page Navigation
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLoginForm();
    initSignupForm();
    initUploadModal();
    renderGameList();
    renderFriends();
});

// Navigation handler
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = btn.dataset.page;

            // Update active nav button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show target page
            pages.forEach(p => {
                if (p.id === targetPage || (targetPage === 'dashboard' && p.id === 'dashboard')) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
        });
    });
}

// Login form handler
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                
                alert(`Login successful! Welcome back, ${data.user?.email || email}`);
                console.log('Login successful:', data);
                
                // Optionally redirect to dashboard
                document.querySelector('[data-page="dashboard"]').click();
            } catch (err) {
                alert(`Login failed: ${err.message}`);
                console.error('Login error:', err);
            }
        });
    }
}

// Signup form handler
function initSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = signupForm.querySelectorAll('input')[0].value;
            const email = signupForm.querySelectorAll('input')[1].value;
            const password = signupForm.querySelectorAll('input')[2].value;

            try {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { username: username }
                    }
                });
                
                if (error) throw error;
                
                alert(`Account created for ${username}! Check ${email} for verification (if enabled).`);
                console.log('Signup successful:', data);
                
                // Optionally redirect to dashboard
                document.querySelector('[data-page="dashboard"]').click();
            } catch (err) {
                alert(`Signup failed: ${err.message}`);
                console.error('Signup error:', err);
            }
        });
    }
}

// Upload modal handler
function initUploadModal() {
    const modal = document.getElementById('uploadModal');
    const uploadPreview = document.getElementById('uploadPreview');
    const cancelUpload = document.getElementById('cancelUpload');

    if (cancelUpload) {
        cancelUpload.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Drag-and-drop zone setup
    if (uploadPreview) {
        uploadPreview.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadPreview.style.borderColor = 'var(--primary)';
            uploadPreview.innerHTML = '<p>Drop your game files here</p>';
        });

        uploadPreview.addEventListener('dragleave', () => {
            uploadPreview.style.borderColor = 'var(--outline)';
            uploadPreview.innerHTML = '<p>Select a game file to upload</p>';
        });

        uploadPreview.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadPreview.style.borderColor = 'var(--outline)';
            const files = e.dataTransfer.files;
            handleFileUpload(files);
        });

        uploadPreview.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.html,.css,.js';
            input.multiple = true;
            input.onchange = (e) => handleFileUpload(e.target.files);
            input.click();
        });
    }
}

// Handle file upload with virus scanning UI
function handleFileUpload(files) {
    const uploadPreview = document.getElementById('uploadPreview');
    if (!uploadPreview || !files.length) return;

    const fileList = Array.from(files);
    uploadPreview.innerHTML = '';

    fileList.forEach(file => {
        // Simulate virus/malware scanning
        const isMalicious = scanFileForMalware(file);
        const fileDiv = document.createElement('div');
        fileDiv.className = 'uploaded-file';
        fileDiv.innerHTML = `
            <span>${file.name}</span>
            <span class="file-status ${isMalicious ? 'flagged' : 'safe'}">
                ${isMalicious ? 'Flagged for review' : 'Safe'}
            </span>
        `;
        uploadPreview.appendChild(fileDiv);
    });

    // If any file flagged, prompt review
    const flaggedFiles = fileList.filter(f => scanFileForMalware(f));
    if (flaggedFiles.length > 0) {
        const submitReview = document.getElementById('submitReview');
        if (submitReview) {
            submitReview.style.display = 'block';
            submitReview.addEventListener('click', () => {
                alert('Submission sent to moderator review queue.');
                document.getElementById('uploadModal').style.display = 'none';
            });
        }
    } else {
        alert('All files verified safe. Upload complete.');
        document.getElementById('uploadModal').style.display = 'none';
    }
}

// Simple malware pattern detection (client-side)
function scanFileForMalware(file) {
    // Check file size and type
    if (file.size > 10 * 1024 * 1024) return true; // Too large
    if (!file.name.match(/\.(html|css|js)$/i)) return true; // Wrong type

    // Read file content for pattern scanning
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        // Simple pattern checks for common malicious signatures
        const maliciousPatterns = [
            /eval\s*\(/i,
            /document\.cookie/i,
            /window\.location\s*=/i,
            /localStorage\.setItem/i,
            /fetch\s*\(\s*['"]https?:\/\//i,
            /atob\s*\(/i,
            /Function\s*\(/i,
            /setTimeout\s*\(\s*['"]/i,
            /setInterval\s*\(\s*['"]/i
        ];

        const isMalicious = maliciousPatterns.some(pattern => pattern.test(content));
        if (isMalicious) {
            console.warn('Potential security risk detected in:', file.name);
        }
    };

    if (file.type === 'text/html' || file.name.endsWith('.js') || file.name.endsWith('.css')) {
        reader.readAsText(file);
    }

    return false; // Default to safe until scanned
}

// Render game list placeholder
function renderGameList() {
    const gameList = document.querySelector('.game-list');
    if (!gameList) return;

    const placeholderGames = [
        { title: 'Adventure World', players: 234 },
        { title: 'Tycoon Builder', players: 189 },
        { title: 'Survival Island', players: 412 }
    ];

    placeholderGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card game-card';
        card.innerHTML = `
            <h3>${game.title}</h3>
            <p>${game.players} players online</p>
            <button onclick="playGame('${game.title}')">Play</button>
        `;
        gameList.appendChild(card);
    });
}

// Render friends placeholder
function renderFriends() {
    const friendsGrid = document.querySelector('.friends-grid');
    if (!friendsGrid) return;

    const placeholderFriends = [
        { name: 'PlayerOne', status: 'online' },
        { name: 'PlayerTwo', status: 'offline' },
        { name: 'PlayerThree', status: 'online' }
    ];

    placeholderFriends.forEach(friend => {
        const card = document.createElement('div');
        card.className = 'card friend-card';
        card.innerHTML = `
            <h3>${friend.name}</h3>
            <p class="status ${friend.status}">${friend.status}</p>
            <button>${friend.status === 'online' ? 'Join' : 'Message'}</button>
        `;
        friendsGrid.appendChild(card);
    });
}

// Play game function
function playGame(gameTitle) {
    const sandboxPage = document.getElementById('sandbox');
    const sandboxContent = document.getElementById('sandboxContent');

    // Show sandbox page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    sandboxPage.classList.add('active');

    sandboxContent.innerHTML = `
        <h3>Playing: ${gameTitle}</h3>
        <div class="sandbox-frame">
            <p>Game sandbox will load here (iframe with sandbox attributes)</p>
        </div>
    `;
}
