let timeLeft = 20;
    let timerId = null;
    let isPaused = true;
    let currentTheme = 'neutral';

    const body = document.body;
    const display = document.getElementById('time-left');
    const resetBtn = document.getElementById('reset-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status-text');
    const durationInput = document.getElementById('duration-input');

    function getMaxTime() {
        return parseInt(durationInput.value) || 20;
    }

    function toggleTheme() {
        if (currentTheme === 'neutral' || currentTheme === 'red') {
            body.classList.remove('theme-red');
            body.classList.add('theme-blue');
            currentTheme = 'blue';
            statusText.innerText = "Player 1 Turn";
        } else {
            body.classList.remove('theme-blue');
            body.classList.add('theme-red');
            currentTheme = 'red';
            statusText.innerText = "Player 2 Turn";
        }
    }

    function updateUI() {
        const maxTime = getMaxTime();
        display.innerText = timeLeft > 0 ? timeLeft : "OUT";
        const percentage = (timeLeft / maxTime) * 100;
        progressBar.style.width = percentage + "%";
    }

    function tick() {
        if (timeLeft > 0) {
            timeLeft--;
            updateUI();
        } else {
            stopClock();
            statusText.innerText = "Time Expired";
        }
    }

    function startClock() {
        if (timerId) clearInterval(timerId);
        isPaused = false;
        timerId = setInterval(tick, 1000);
        toggleBtn.innerText = "Stop";
        toggleBtn.className = "btn btn-secondary";
    }

    function stopClock() {
        clearInterval(timerId);
        timerId = null;
        isPaused = true;
        toggleBtn.innerText = "Resume";
        toggleBtn.className = "btn btn-resume";
    }

    resetBtn.addEventListener('click', () => {
        toggleTheme(); 
        timeLeft = getMaxTime();
        updateUI();
        startClock();
    });

    toggleBtn.addEventListener('click', () => {
        if (timeLeft <= 0) return;
        if (isPaused) startClock();
        else stopClock();
    });

    durationInput.addEventListener('input', () => {
        if (currentTheme === 'neutral' && isPaused) {
            timeLeft = getMaxTime();
            updateUI();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            resetBtn.click();
        }
        if (e.code === 'Escape') {
            toggleBtn.click();
        }
    });

    updateUI();