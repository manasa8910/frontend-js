const createLi = (emoji, isSearchText = false, searchKey) => {
  const emojiDiv = document.createElement("div");
  emojiDiv.classList.add("emoji");
  emojiDiv.innerText = emoji.emoji;

  const aliasesDiv = document.createElement("div");
  aliasesDiv.classList.add("aliases");
  aliasesDiv.innerText = emoji.aliases.join(", ");

  aliasesDiv.innerText = aliasesDiv.innerText.replaceAll("_", " ");

  //! highlighted text in aliasesDiv
  if (isSearchText) {
    const regex = new RegExp(searchKey, "gi");
    let text = aliasesDiv.innerText;
    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, "");
    const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
    aliasesDiv.innerHTML = newText;
  }

  const descriptionDiv = document.createElement("div");

  descriptionDiv.classList.add("description");
  descriptionDiv.innerText = emoji.description;

  //! highlighted text in descriptionDiv
  if (isSearchText) {
    const regex = new RegExp(searchKey, "gi");
    let text = descriptionDiv.innerText;
    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, "");
    const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
    descriptionDiv.innerHTML = newText;
  }

  const li = document.createElement("li");
  li.append(emojiDiv, aliasesDiv, descriptionDiv);

  return li;
};

const emojiUl = document.getElementById("emoijUl");

const renderEmojiUl = (emojiArray, highlight, searchKey) => {
  emojiUl.innerHTML = "";
  // console.log("RenderEmojiUl");
  emojiArray.forEach((emoji) => {
    const li = createLi(emoji, highlight, searchKey);

    emojiUl.append(li);
  });
};

renderEmojiUl(emojiList);

//! Search bar
const emojiSearchBox = document.getElementById("emojiSearchBox");
emojiSearchBox.addEventListener("keyup", (e) => {
  const searchKey = e.target.value.toLowerCase();
  // console.log(searchKey);
  const filteredEmojiList = emojiList.filter(
    (emoji) =>
      emoji.description.toLowerCase().includes(searchKey) ||
      emoji.aliases.toString().toLowerCase().includes(searchKey)
  );

  const highlight = true;
  renderEmojiUl(filteredEmojiList, highlight, searchKey);
});
