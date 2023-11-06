const keyDisplay = document.getElementById("keyDisplay");
const keyCodeDisplay = document.getElementById("keyCodeDisplay");
const keyHistoryDisplay = document.getElementById("keyHistoryDisplay");

const maxKeyHistoryLength = 8;
const keyHistory = [];

document.addEventListener("keydown", (event) => {
  keyCodeDisplay.style.display = "block";
  // Play a sound on keypress
  playKeyPressSound();

  keyDisplay.innerHTML = `You pressed : <span id="pressed-key">${event.key}</span>`;
  keyCodeDisplay.innerHTML = `<span id="keyCodeText">keycode :</span><span> ${event.keyCode}</span>`;

  // Store key history
  keyHistory.push(event.key);
  if (keyHistory.length > maxKeyHistoryLength) {
    keyHistory.shift(); // Remove the oldest entry when it exceeds the maximum length
  }
  updateKeyHistoryDisplay();

  event.preventDefault(); // Prevent default browser actions for certain key combinations
});

function updateKeyHistoryDisplay() {
  // Display key history
  keyHistoryDisplay.innerHTML = "Key History : " + keyHistory.join(", ");
  keyHistoryDisplay.style.display = "block";
}

function playKeyPressSound() {
  const audio = new Audio("click-button.mp3");
  audio.play();
}
