const inputTag = document.getElementById("input");
const containerTag = document.getElementById("container");
const paginationTag = document.getElementById("pagination");
const loader = document.getElementById("loader");

let timerId = null;
let currentPage = 1;
let totalResults = 0;
const API_KEY = "e94faa5f";
const BASE_URL = "https://www.omdbapi.com/";

async function fetchData(searchValue, pageNumber) {
  try {
    loader.style.display = "block";
    const response = await fetch(
      `${BASE_URL}?&apikey=${API_KEY}&s=${searchValue}&page=${pageNumber}`
    );

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
}

function displayMovies(movies) {
  // console.log(movies);

  loader.style.display = "none";
  if (!movies) {
    containerTag.innerHTML = ``;
    return;
  }

  containerTag.innerHTML = "";
  movies.forEach((movie) => {
    containerTag.innerHTML += `   <div class="card">
<div class="cardImage">
  <img
    src="${movie.Poster}"
    alt="Movie poster"
  />
</div>
<div class="text">
  <h3 id="title">${movie.Title}</h3>
  <p id="year">${movie.Year}</p>
</div>
</div>`;
    // const divTag = document.createElement("div");
    // const imageTag = document.createElement("img");
    // const h3Tag = document.createElement("h3");
    // h3Tag.textContent = movie.Title;
    // imageTag.setAttribute("src", movie.Poster);
    // imageTag.setAttribute("alt", movie.Type + " " + movie.Year);
    // divTag.appendChild(imageTag);
    // divTag.appendChild(h3Tag);

    // containerTag.appendChild(divTag);
  });
}

async function goToNextPage() {
  currentPage += 1;
  const data = await fetchData(inputTag.value, currentPage);
  displayMovies(data.Search);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  displayPagination();
}

async function goToPrevPage() {
  currentPage -= 1;
  const data = await fetchData(inputTag.value, currentPage);
  displayMovies(data.Search);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  displayPagination();
}

function displayPagination(totalPages) {
  paginationTag.innerHTML = "";
  // Pagination
  // if (!totalPages) {
  //   return;
  // }
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  const currentPageNumber = document.createElement("span");

  prevBtn.textContent = "Prev";
  prevBtn.classList.add("btn");
  nextBtn.classList.add("btn");

  nextBtn.textContent = "Next";

  currentPageNumber.textContent = currentPage;
  currentPageNumber.classList.add("spanNum");
  paginationTag.appendChild(prevBtn);
  if (1 !== currentPage) prevBtn.addEventListener("click", goToPrevPage);

  if (Math.ceil(totalResults / 10) !== currentPage) {
    nextBtn.addEventListener("click", goToNextPage);
  }

  paginationTag.appendChild(currentPageNumber);
  paginationTag.appendChild(nextBtn);
}

// debouncing effect
inputTag.addEventListener("input", function (e) {
  clearInterval(timerId);

  timerId = setTimeout(async () => {
    //! this function return promise

    data = await fetchData(e.target.value, currentPage);
    // console.log(data.response);
    // if (!data.response) {

    // }

    totalResults = data.totalResults;
    let totalPages = Math.ceil(totalResults / 10);

    const movies = data.Search;

    displayMovies(movies);
    // console.log(totalPages);
    displayPagination(totalPages);
  }, 800);
});

//! light dark mode

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
