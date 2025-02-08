import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");

const timerEl = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      userSelectedDate = selectedDates[0];

      if(userSelectedDate <= new Date()){
       iziToast.error({
          title: "Помилка",
          message: "Please choose a date in the future",
          position: "topRight",
       });
       startBtn.disabled = true;
      } else {
        startBtn.disabled = false;
      }
    },
};

flatpickr(input, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
  

  function addLeadingZero(value){
    return String(value).padStart(2, "0");
  }

  function updateTimerDisplay(ms){
    const time = convertMs(ms);
    timerEl.days.textContent = addLeadingZero(time.days);
    timerEl.hours.textContent = addLeadingZero(time.hours);
    timerEl.minutes.textContent = addLeadingZero(time.minutes);
    timerEl.seconds.textContent = addLeadingZero(time.seconds);
  }


  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    input.disabled = true;

  timerId = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0);
      input.disabled = false;
      return;
    }

    updateTimerDisplay(timeLeft);
  }, 1000);
  })
