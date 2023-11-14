const existingCards = [
  {
    firstName: "RAHUL",
    lastName: "SHARMA",
    country: "India",
    score: 81,
  },
  {
    firstName: "John",
    lastName: "doe",
    country: "france",
    score: 81,
  },
  {
    firstName: "Raj",
    lastName: "Singh",
    country: "India",
    score: 77,
  },
  {
    firstName: "Yum",
    lastName: "thar",
    country: "Uk",
    score: 79,
  },
];

const cardsContainer = document.getElementById("cardsContainer");

const onCtaContainerClick = (e) => {
  const btn = e.target;
  // console.log(btn);

  const buttonText = e.target.innerText;
  if (buttonText === "") {
    btn.parentElement.parentElement.parentElement.remove();
  } else if (buttonText === "+5") {
    let val = btn.parentElement.parentElement.children[2].innerText;
    btn.parentElement.parentElement.children[2].innerText = +val + 5;
  } else if (buttonText === "-5") {
    btn.parentElement.parentElement.children[2].innerText -= 5;
  }
  sortLeaderboard();
};

const getCurrDate = () => {
  let date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let time = date.toLocaleTimeString();
  return `${month} ${year} ${time}`;
};

const getCardContainer = (firstName, lastName, country, score) => {
  firstName = firstName.toLocaleUpperCase();
  lastName = lastName.toLocaleUpperCase();
  country = country.toLocaleUpperCase();

  const currDate = getCurrDate();

  const cardContents = `  <div>
  <p>${firstName} ${lastName}</p>
  <p class='date'>${currDate}</p>
</div>
<div class="country">${country}</div>
<div class="score">${score}</div>
<div class="cta-container">
  <button><img class="delete" src="./assets/delete1.png" alt="" /></button>
  <button class='button'>+5</button>
  <button class='button'>-5</button>
</div>`;
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = cardContents;
  return card;
};

const createCard = (firstName, lastName, country, score) => {
  const card = getCardContainer(firstName, lastName, country, score);

  card.children[3].addEventListener("click", onCtaContainerClick);
  return card;
};

const sortLeaderboard = () => {
  const cards = document.querySelectorAll(".card");
  const cardsArray = Array.from(cards);
  cardsArray.sort((card1, card2) => {
    const score1 = parseInt(card1.children[2].innerText);
    const score2 = parseInt(card2.children[2].innerText);
    if (score1 > score2) {
      return -1;
    } else if (score2 > score1) {
      return 1;
    } else {
      return 0;
    }
  });
  cardsArray.forEach((card) => {
    cardsContainer.append(card);
  });
};

//! ------------

(function () {
  existingCards.forEach((cardData) => {
    const card = getCardContainer(
      cardData.firstName,
      cardData.lastName,
      cardData.country,
      cardData.score
    );

    card.children[3].addEventListener("click", onCtaContainerClick);

    cardsContainer.append(card);
  });
  sortLeaderboard();
})();
// cads();
//! ------------

const addPlayerScoreForm = document.getElementById("addPlayerScoreForm");
addPlayerScoreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const errorMsg = document.getElementsByClassName("error-msg");
  errorMsg[0].style.display = "none";
  const firstName = e.target.children[0].value;
  const lastName = e.target.children[1].value;
  const country = e.target.children[2].value;
  const score = e.target.children[3].value;
  if (!firstName || !lastName || !country || !score) {
    errorMsg[0].style.display = "block";
    return;
  }
  const card = createCard(firstName, lastName, country, score);
  cardsContainer.appendChild(card);
  e.target.reset();
  sortLeaderboard();
});
