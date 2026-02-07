// Storing time as seconds
const startingMinutes = 25;
// Converts seconds into minutes
let time = startingMinutes*60;
// Sets interval as null
let interval = null;

// Countdown display element
const countdownEl = document.getElementById('countdown');
// Button display element
const startBtn = document.getElementById('start-btn');

const pauseBtn = document.getElementById('pause-btn');

function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    // Gets remaining seconds after minutes are removed
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Updates the UI
    countdownEl.innerHTML = minutes = '${minutes}: ${seconds}';

    // Stops the interval when the timer reaches 0. If not,
    // decreases the time by one second.
    if (time <= 0) {
        clearInterval(interval);
    } else {
        time--;
    }
}
startBtn.addEventListener('click', () => {
    if(!interval) {
        // Runs the countdown function
        updateCountdown();
        // Call the updateCountdown function every 1 second
        interval = setInterval(updateCountdown, 1000);
    }
});

pauseBtn.addEventListener('click', () => {
    // If the timer is running, it is paused
    if(interval) {
        clearInterval(interval);
        interval = null;
    // If it is not running, it is resumed
    } else {
        interval = setInterval(updateCountdown, 1000);
    }
});
