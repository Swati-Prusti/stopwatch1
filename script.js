let timer;
let isRunning = false;
let elapsedTime = 0; // in ms
let startTime;

const display = document.getElementById("time-display");
const lapsContainer = document.getElementById("laps");

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapsContainer.innerHTML = "";
});

document.getElementById("lapBtn").addEventListener("click", () => {
    if (isRunning) {
        const li = document.createElement("li");
        li.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(li);
    }
});
