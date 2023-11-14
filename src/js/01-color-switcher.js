const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let intervalId = null;
refs.btnStop.disabled = false;
let isActive = false;

refs.btnStart.addEventListener('click', changeBackgroundColor);
refs.btnStop.addEventListener('click', stopBackgroundColorPicker);

function changeBackgroundColor() {
  if (isActive) {
    return;
  }
  isActive = true;

  intervalId = setInterval(() => {
    refs.btnStop.disabled = false;
    refs.btnStart.disabled = true;

    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopBackgroundColorPicker() {
  isActive = false;
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
