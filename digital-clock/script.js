const digiHour = document.getElementById("digiHour");
const digiMinute = document.getElementById("digiMinute");
const digiSecond = document.getElementById("digiSecond");
const timeStatus = document.getElementById("timeStatus");
const audio1 = document.getElementById("audio1");

(function displayTime() {
  let time = new Date();
  let hour = time.getHours();
  let amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || hour;
  hour = hour < 10 ? `0${hour}` : hour;
  digiHour.innerHTML = hour;

  timeStatus.innerHTML = amPm;
  let minute = time.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  digiMinute.innerHTML = minute;
  // if (minute >= 29) {
  //   audio1.play();
  // }
  let second = time.getSeconds();
  second = second < 10 ? `0${second}` : second;
  digiSecond.innerHTML = second;

  //! Method 1
  // setInterval(() => {
  //   displayTime();
  // }, 1000);

  //! method 2

  requestAnimationFrame(displayTime);
})();
