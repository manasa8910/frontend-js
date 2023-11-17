const orderButton = document.getElementById("orderButton");
const heading = document.getElementById("heading");
const foodCards = document.getElementById("foodCards");
const result = document.getElementById("result");
const foodImage = document.getElementById("foodImage");
const orderIdNum = document.getElementById("orderId");
const orderIDValueElement = document.getElementById("orderIdValue");
const okey = document.getElementById("okey");
const loader = document.getElementById("loader");

const getRandomTime = () => {
  return Math.floor(Math.random() * 5000) + 2000;
}; // random time between 2 to 7 second

const getRandomOrderId = () => {
  return Math.floor(Math.random() * 1000) + 100;
}; // random orderID between 100 to 1099

orderButton.addEventListener("click", async () => {
  const checkBoxes = document.getElementsByName("foodItem");
  const selectedItems = [];

  checkBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedItems.push(checkbox.value);
    }
  });
  // console.log(selectedItems);

  if (selectedItems.length === 0) {
    alert("Please select atleast one item...");
    return;
  }

  orderButton.disabled = true;
  result.style.display = "none";

  // !----- loader
  foodCards.style.display = "none";
  orderButton.style.display = "none";
  loader.style.display = "flex";
  heading.textContent = "Processing...";

  // this function again give promise
  // const promise = await getPromiseForOrder(selectedItems);

  // console.log(promise);
  try {
    const promise = await getPromiseForOrder(selectedItems);
    const orderId = getRandomOrderId();
    loader.style.display = "none";
    result.style.display = "block";
    orderIDValueElement.textContent = orderId;
    heading.textContent = "Your Food";

    // for showing match images from selected items
    const foodToshow =
      selectedItems[Math.floor(Math.random() * selectedItems.length)];

    // console.log(foodToshow);

    switch (foodToshow) {
      case "Burger":
        foodImage.src = "./assets/burgersa.jpeg";
        break;
      case "slaw burger":
        foodImage.src = "./assets/slaw burger.jpg";
        break;
      case "steamed cheeseburger":
        foodImage.src = "./assets/steamed cheeseburger.jpg";
        break;
      case "chimichurri burger":
        foodImage.src = "./assets/chimichurri burger.jpg";
        break;
      default:
        foodImage.src = "./assets/pizza.avif";
    }

    // foodImage.style.display = "block";
    orderButton.disabled = false;
  } catch (error) {
    console.log(error);
    heading.textContent = `Sorry, can't fulfil your order...`;
    loader.style.display = "none";
  }

  // promise.then(() => {

  // });
});

const getPromiseForOrder = (selectedItems) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(selectedItems);
      // reject();
    }, getRandomTime());
  });
  return promise;
};

okey.addEventListener("click", () => {
  foodCards.style.display = "flex";
  result.style.display = "none";
  heading.textContent = "Select Your favorite Food";
  orderButton.style.display = "block";
});
