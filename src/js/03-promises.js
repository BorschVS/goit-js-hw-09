import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.js';

const refs = {
  form: document.querySelector('.form'),
  delayField: document.querySelector('input[name="delay"]'),
  stepField: document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

let promiseCounter = 1;

refs.submitBtn.addEventListener('click', onSubmit);

// let amount = refs.form.elements['amount'].value;

function onSubmit(e) {
  e.preventDefault();
  promiseCounter = 1;

  let delay = Number(refs.delayField.value);
  const amount = Number(refs.amountField.value);
  const step = Number(refs.stepField.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(promiseCounter, delay)
      .then(promiseCounter, (delay += step))
      .catch(new Error('error in promise'));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    promiseCounter += 1;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notify.success(`Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notify.failure(`Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}
