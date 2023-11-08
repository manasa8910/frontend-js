const inputArea = document.getElementById("inputArea");
const totalCharsSpan = document.getElementById("totalChars");
const remainingCharsSpan = document.getElementById("remainingChars");
inputArea.addEventListener("keyup", (e) => {
  const userInput = e.target.value;

  const maxLength = e.target.maxLength; //maxLength Attribute extract from html

  const totalChars = userInput.length;
  const reamainingChars = maxLength - totalChars;

  totalCharsSpan.innerText = " " + totalChars;

  remainingCharsSpan.innerText = " " + reamainingChars;
});
