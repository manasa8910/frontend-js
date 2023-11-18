const joke = document.getElementById("joke");
const btn = document.getElementById("btn");

const apiKey = "iX+ZN6fYtlkLH80rQiWeNQ==E0B9yl0nraE3gCd9";

const options = {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

async function getJoke() {
  try {
    joke.innerText = "Updating...";
    btn.disabled = true;
    btn.innerText = "Loading...";
    const response = await fetch(apiURL, options);
    const data = await response.json();

    btn.disabled = false;
    btn.innerText = "Tell me a joke";
    // console.log(data);
    joke.innerText = data[0].joke;
  } catch (error) {
    joke.innerText = "An error occured, try again later";
    btn.disabled = false;
    btn.innerText = "Tell me a Joke";
    console.log(error);
  }
}

btn.addEventListener("click", getJoke);
