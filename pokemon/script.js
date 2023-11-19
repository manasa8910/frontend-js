const loader = document.getElementById("loader");

const createPokemonCard = (pokemon) => {
  // console.log(pokemon);
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = ` <div class="card-inner">
  <div class="front">
    <p>#${pokemon.id}</p>
    <div class="image-conatiner">
      <img
        src="${pokemon.sprites.front_default}"
        alt="Pokemon Image"
      />
    </div>
    <h3>${pokemon.name}</h3>
    <h5>${pokemon.types[0].type.name}</h5>
  </div>

  <div class="back">
    <div class="image-conatiner">
      <img
        src="${pokemon.sprites.front_default}"
        alt="Pokemon Image"
      />
    </div>
    <h3>${pokemon.name}</h3>
    <p>Abilities : ${pokemon.abilities
      .map((ability) => ability.ability.name)
      .join(", ")}</p>
  </div>
</div>`;

  return card;
};

const fetchPokemonTypes = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const pokemonTypes = await response.json();
    const pokemonCategory = pokemonTypes.results.map(
      (category) => category.name
    );
    // console.log(pokemonCategory);
    return pokemonCategory;
    // console.log(pokemonTypes);
  } catch (err) {
    console.log(err);
    alert("Something went wrong, please try after some time");
  }
};

const renderPokemonTypes = async () => {
  // this function also return promise
  const pokemonCategoryList = await fetchPokemonTypes();
  const pokemonType = document.getElementById("pokemonType");

  pokemonCategoryList.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    pokemonType.append(option);
  });
};

renderPokemonTypes();

const fetchPokemonDetails = (id) => {
  loader.style.display = "block";
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
    response.json()
  );
};

const arrayOfPokemonDetailPromises = [];
for (let i = 1; i <= 250; i++) {
  const pokemonPromise = fetchPokemonDetails(i);
  arrayOfPokemonDetailPromises.push(pokemonPromise);
}
let pokemonList = [];

const pokemonContainer = document.getElementById("pokemonContainer");

// reduce time for fetching all api

Promise.all(arrayOfPokemonDetailPromises).then((pokemonDetails) => {
  //   console.log(pokemonDetails);

  pokemonList = pokemonDetails;
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("pokemonType")) {
    // console.log(pokemonList);

    const typeCategory = pokemonList.filter((pokemon) =>
      pokemon.types[0].type.name.includes(searchParams.get("pokemonType"))
    );
    // console.log(typeCategory);
    typeCategory.forEach((pokemon) => {
      const pokemonCard = createPokemonCard(pokemon);
      pokemonContainer.append(pokemonCard);
    });
    loader.style.display = "none";
    if (typeCategory.length === 0) {
      let pTag = document.createElement("p");
      pTag.innerText = "No Pokemnon Card of this type";
      pTag.style.color = "red";
      pTag.style.fontSize = "1.5rem";
      pokemonContainer.append(pTag);
    }
    return;
    // createPokemonCard(typeCategory);
  }
  loader.style.display = "none";
  pokemonList.forEach((pokemon) => {
    const pokemonCard = createPokemonCard(pokemon);
    pokemonContainer.append(pokemonCard);
  });
});

// reset button function

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  pokemonContainer.innerHTML = "";
  loader.style.display = "block";
  pokemonList.forEach((pokemon) => {
    const pokemonCard = createPokemonCard(pokemon);
    loader.style.display = "none";
    pokemonContainer.append(pokemonCard);
  });
});

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", (e) => {
  //   console.log(e.target.value);
  //   console.log(pokemonList);
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  pokemonContainer.innerHTML = "";
  filteredPokemonList.forEach((pokemon) => {
    const pokemonCard = createPokemonCard(pokemon);
    pokemonContainer.append(pokemonCard);
  });
  //   console.log(filteredPokemonList);
});

// console.log(window.location.search);
