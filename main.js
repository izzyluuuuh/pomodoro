const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;
let totalSeconds; // Declare totalSeconds outside the appTimer function for global accessibility

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state) {
    state = false;
    totalSeconds = sessionAmount * 60; // Assign the value to the global totalSeconds variable

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`;

      if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
      }
    }

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
}

startBtn.addEventListener('click', appTimer); // Attach the appTimer function to the click event of startBtn

const pauseBtn = document.querySelector('.btn-pause');

const pauseTimer = () => {
  clearInterval(myInterval);
  state = true; // Update the state to allow the timer to be started again
}

pauseBtn.addEventListener('click', pauseTimer);

const resetBtn = document.querySelector('.btn-reset');

const resetTimer = () => {
  clearInterval(myInterval);
  state = true; // Update the state to allow the timer to be started again
  session.textContent = '25'; // Reset the session time to its initial value
  document.querySelector('.seconds').textContent = '00'; // Reset the seconds to 00
}

resetBtn.addEventListener('click', resetTimer);

// Task Manager Functionality
document.querySelector('.btn-add-task').addEventListener('click', function() {
  // Get the task input value
  let taskInput = document.querySelector('.task-manager input').value;

  // Create a new task item with a delete button
  let taskItem = document.createElement('li');
  taskItem.innerHTML = `
  <span>${taskInput}<br><br></span>
    <button class="btn-delete-task">Delete</button>`;

  // Add the task to the task list
  document.querySelector('.task-list').appendChild(taskItem);

  // Clear the task input field
  document.querySelector('.task-manager input').value = '';

  // Add event listener to delete button
  taskItem.querySelector('.btn-delete-task').addEventListener('click', function() {
    taskItem.remove(); // Remove the task item when the delete button is clicked
  });
});

// Function to play the audio after the timer ends
function playAudioAfterTimerEnds() {
  // Create an audio element
  let audio = document.createElement('audio');
  audio.src = 'mw.mp3'; // Replace 'mw.mp3' with the actual path to your audio file
  audio.autoplay = true;
  audio.loop = true;

  // Append the audio element to the audio container
  document.querySelector('.audio-container').appendChild(audio);
}

// Call the function after the 25 minutes timer ends
setTimeout(playAudioAfterTimerEnds, 25 * 60 * 1000); // Call the function after 25 minutes (25 * 60 * 1000 milliseconds)

// Function to play the audio
function playAudio() {
  let audio = document.querySelector('.audio-container audio');
  audio.play();
}

// Function to pause the audio
function pauseAudio() {
  let audio = document.querySelector('.audio-container audio');
  audio.pause();
}

// Function to reset the audio and play after the timer ends
function resetAndPlayAudioAfterTimerEnds() {
  let audio = document.querySelector('.audio-container audio');
  audio.currentTime = 0; // Reset the audio to the beginning
  audio.play(); // Play the audio
}

// Call the function after the 25 minutes timer ends
setTimeout(resetAndPlayAudioAfterTimerEnds, 25 * 60 * 1000); // Call the function after 25 minutes (25 * 60 * 1000 milliseconds)

// Event listener for the start button
document.querySelector('.start-button').addEventListener('click', resetAndPlayAudioAfterTimerEnds);

// Event listener for the pause button
document.querySelector('.pause-button').addEventListener('click', pauseAudio);

// Event listener for the reset button
document.querySelector('.reset-button').addEventListener('click', resetAndPlayAudioAfterTimerEnds);