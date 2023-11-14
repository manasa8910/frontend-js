const timerTag = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapResult = document.getElementById("lapResult");

let intervalId;

//! array destructring and assign value
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
lapBtn.style.display = "none";
startBtn.addEventListener("click", () => {
  startBtn.toggleAttribute("disabled", true);
  stopBtn.classList.remove("opacity");
  stopBtn.removeAttribute("disabled");
  startBtn.classList.add("opacity");

  startBtn.style.display = "none";
  lapBtn.style.display = "initial";

  intervalId = setInterval(showTimeInFormate, 10);
});

function showTimeInFormate() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let milli = milliseconds;
  milli = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  let sec = seconds;
  sec = seconds < 10 ? `0${seconds}` : seconds;

  let mins = minutes;
  mins = minutes < 10 ? `0${minutes}` : minutes;

  let hr = hours;
  hr = hours < 10 ? `0${hours}` : hours;

  timerTag.innerHTML = `${hr}:${mins}:${sec}:${milli}`;
}

//! Stop Button
stopBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  startBtn.style.display = "initial";
  lapBtn.style.display = "none";

  startBtn.removeAttribute("disabled");
  startBtn.classList.remove("opacity");
  stopBtn.toggleAttribute("disabled", true);
  stopBtn.classList.add("opacity");
});

let [prevSec, prevMin, prevHr] = [0, 0, 0];

//! Reset All
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  lapResult.innerHTML = ``;
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  [prevSec, prevMin, prevHr] = [0, 0, 0];
  timerTag.innerHTML = `00:00:00:00`;
  stopBtn.removeAttribute("disabled");
  startBtn.removeAttribute("disabled");
  stopBtn.classList.remove("opacity");
  startBtn.classList.remove("opacity");
  lapBtn.style.display = "none";
  startBtn.style.display = "initial";
});

//! For Lap Button

let count = 0;
lapBtn.addEventListener("click", () => {
  document.getElementById("audio1").play();
  count++;
  count = count < 10 ? `0${count}` : count;

  prevSec = seconds - prevSec;
  prevSec = prevSec < 10 ? `0${prevSec}` : prevSec;

  let sec = seconds;
  sec = seconds < 10 ? `0${seconds}` : seconds;

  prevMin = minutes - prevMin;
  prevMin = prevMin < 10 ? `0${prevMin}` : prevMin;

  let mins = minutes;
  mins = minutes < 10 ? `0${minutes}` : minutes;

  prevHr = hours - prevHr;
  prevHr = prevHr < 10 ? `0${prevHr}` : prevHr;

  let hr = hours;
  hr = hours < 10 ? `0${hours}` : hours;

  const lapTime = `${hr}:${mins}:${sec}`;

  const lapDiff = `${prevHr}:${prevMin}:${prevSec}`;

  lapResult.innerHTML += `<div class="lapResult">
  <div class="count">${count}</div>
  <div class="lapTime">${lapTime}</div>
  <div class="lapDiff">+${lapDiff}</div>
  </div>`;
  prevSec = seconds;
  prevMin = minutes;
  prevHr = hours;
});
