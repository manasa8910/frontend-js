const addNoteBtn = document.getElementById("addNoteBtn");

const inputValue = document.getElementById("textArea");
const inputColor = document.getElementById("colorPicker");

const createNoteCard = (inputValue, inputColor = "brown") => {
  const noteTitleSpan = document.createElement("span");
  noteTitleSpan.textContent = inputValue;
  noteTitleSpan.classList.add("noteTitleSpan");

  const closeButtonSpan = document.createElement("span");
  closeButtonSpan.classList.add("close-btn");
  closeButtonSpan.innerText = "❌";

  //Delete notes
  closeButtonSpan.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });

  const noteDiv = document.createElement("div");
  noteDiv.style.backgroundColor = inputColor;

  noteDiv.classList.add("note");

  noteDiv.append(noteTitleSpan);
  noteDiv.append(closeButtonSpan);

  return noteDiv;
};

addNoteBtn.addEventListener("click", () => {
  const notesContainer = document.getElementById("notesContainer");

  const noteCard = createNoteCard(inputValue.value, inputColor.value);
  if (inputValue.value === "") {
    return;
  }

  notesContainer.append(noteCard);

  inputValue.value = "";
});
