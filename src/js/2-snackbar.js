import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

if (!form) {
  iziToast.error({
    title: "❌ Error",
    message: "Форма не знайдена!",
    position: "topRight",
  });
} else {
  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    
    const delay = Number(form.delay.value);

    if (isNaN(delay) || delay < 0) {
      iziToast.error({
        title: "❌ Error",
        message: "Некоректне значення затримки!",
        position: "topRight",
      });
      return;
    }


    const stateInput = form.querySelector("input[name='state']:checked");

    if (!stateInput) {
      iziToast.error({
        title: "❌ Error",
        message: "Оберіть стан (fulfilled або rejected)!",
        position: "topRight",
      });
      return;
    }


    const state = stateInput.value;

    
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        
        if (state === "fulfilled") {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    
    promise
      .then((delay) => {
        iziToast.success({
          title: "✅ Success",
          message: `Fulfilled promise in ${delay}ms`,
          position: "topRight",
        });
      })
     
      .catch((delay) => {
        iziToast.error({
          title: "❌ Error",
          message: `Rejected promise in ${delay}ms`,
          position: "topRight",
        });
      });

    form.reset();
  });
}
