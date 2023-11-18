const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formTag = document.querySelector("form");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("search-results");
const showMoreBtnElement = document.getElementById("show-more-btn");

showMoreBtnElement.style.display = "none";

let inputData = "";
let page = 1;

// div ele, add class to div , img ele , set src and alt, anchor tag, set href, set target, set textContent
async function fetchDataFromAPI() {
  const inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  const results = data.results;

  results.map((obj) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const imgTag = document.createElement("img");
    imgTag.src = obj.urls.small;
    imgTag.alt = obj.alt_description;
    const linkTag = document.createElement("a");
    linkTag.href = obj.links.html;
    linkTag.target = "_blank";
    linkTag.textContent = obj.alt_description;

    imageContainer.append(imgTag, linkTag);
    searchResults.append(imageContainer);
  });

  page++;
  if (page > 1) {
    showMoreBtnElement.style.display = "block";
  }
}

formTag.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  fetchDataFromAPI();
});

showMoreBtnElement.addEventListener("click", () => {
  fetchDataFromAPI();
});
