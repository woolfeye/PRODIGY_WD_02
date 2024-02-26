let stopwatchInterval;
let startTime;
let isRunning = false;
let lapCounter = 1;

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - (lapCounter > 1 ? lapCounter - 1 : 0);
    stopwatchInterval = setInterval(updateDisplay, 10);
    document.getElementById('buttons').children[0].innerText = 'Pause';
    isRunning = true;
  } else {
    clearInterval(stopwatchInterval);
    document.getElementById('buttons').children[0].innerText = 'Resume';
    isRunning = false;
  }
}

function recordLap() {
  if (isRunning) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
    document.getElementById('laps').appendChild(lapItem);

    lapCounter++;
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('buttons').children[0].innerText = 'Start';
  document.getElementById('laps').innerHTML = '';
  isRunning = false;
  lapCounter = 1;
}

function updateDisplay() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('display').innerText = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);

  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');
  const millisecondsStr = millisecondsFormatted.toString().padStart(2, '0');

  return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
}
