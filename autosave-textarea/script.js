//! light dark mode

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

const textarea = document.getElementById("textarea");

if (localStorage.getItem("savedText")) {
  textarea.value = localStorage.getItem("savedText");
}

textarea.addEventListener("input", (e) => {
  //   console.log(e.target.value);
  const savedText = e.target.value;
  localStorage.setItem("savedText", savedText);

  document.getElementById("textarea").value = savedText;

  //   console.log(localStorage.getItem("savedText"));
});
