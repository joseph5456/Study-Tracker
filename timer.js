// Storing time as seconds
const startingMinutes = 25;
// Converts seconds into minutes
let time = startingMinutes*60;
// Sets interval as null
let interval = null;

// Countdown display element
const countdownEl = document.getElementById('countdown');
// Start button display element
const startBtn = document.getElementById('start-btn');
// Restart button element
const restartBtn = document.getElementById('restart-btn');
// Pause button element
const pauseBtn = document.getElementById('pause-btn');
// Short break button display element
const shortBreakBtn = document.getElementById('shortBreak-btn');
// Long break button display element
const longBreakBtn = document.getElementById('longBreak-btn');
// Costum time input display element
const customTimeInput = document.getElementById('custom-time');
// Custom time button element
const customTimeBtn = document.getElementById('custom-time-btn');
// Custom time input container element
const customTimeInputContainer = document.getElementById('custom-time-input-container');



function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // Gets remaining seconds after minutes are removed
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Updates the UI
    countdownEl.innerHTML = `${minutes}:${seconds}`;

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

restartBtn.addEventListener('click', () =>  {
    // Stops the countdown
    clearInterval(interval);
    // Resets the interval
    interval = null;
    // Resets minutes
    time = startingMinutes * 60;
    // Resets timer
    updateCountdown();
});

shortBreakBtn.addEventListener('click', () => {
    // Stops the timer
    clearInterval(interval);    
    // Resets the interval
    interval = null;
    // Sets the time to five minutes
    time = 5 * 60;
    // Calls updateCountdown function
    updateCountdown();
    // Starts the timer right away
    interval = setInterval(updateCountdown,1000);
});

longBreakBtn.addEventListener('click', () => {
    // Stop the timer
    clearInterval(interval);
    // Resets the interval
    interval = null;
    // Sets time to 15 minutes
    time = 15 * 60;
    // Calls updateCountdown function
    updateCountdown();
    // Starts the timer right away
    interval = setInterval(updateCountdown,1000);
});

customTimeBtn.addEventListener('click', () => {
    // Toggle the custom time input field
    if (customTimeInputContainer.style.display === 'none') {
        customTimeInputContainer.style.display = 'block';
        customTimeInput.focus();
    } else {
        customTimeInputContainer.style.display = 'none';
    }
});

customTimeInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        // Sets minutes at the number the user entered
        const minutes = parseInt(customTimeInput.value);
        // Alerts if no number or a negative number was entered
        if (isNaN(minutes || minutes <= 0)) {
            alert("Enter a valid number of minutes");
            return;
        }
        // Stops the timer
        clearInterval(interval);
        // Resets the timer
        interval = null;
        // Creates the new time in seconds
        time = minutes * 60;
        // Runs the updateCountdown function
        updateCountdown();
        // Clears the input element. 
        customTimeInput.value = '';
        // Hide the input field
        customTimeInputContainer.style.display = 'none';
    }
});
