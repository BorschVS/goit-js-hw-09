import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.js';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button'),
  clockface: document.querySelector('.timer'),

  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  mins: document.querySelector('.value[data-minutes]'),
  secs: document.querySelector('.value[data-seconds]'),
};

let selectedDate = 0;
refs.startBtn.disabled = true;

Notify.init({
  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currTime = selectedDates[0].getTime() - Date.now();
    if (currTime < 0) {
      refs.startBtn.disabled = true;

      Notify.failure('Please choose a date in the future');

      return;
    }
    selectedDate = selectedDates[0].getTime();
    refs.startBtn.disabled = false;
  },
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init();
  }

  init() {
    const startTime = this.convertMs(0);
    this.onTick(startTime);
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    refs.startBtn.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const diferenceTime = selectedDate - currentTime;
      if (diferenceTime < 0) {
        // alert('Please choose a date in the future');

        clearInterval(this.intervalId);
        return;
      }

      const time = this.convertMs(diferenceTime);
      this.onTick(time);
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({ onTick: updateClockFace });

// timer.init();

refs.startBtn.addEventListener('click', timer.start.bind(timer));
// refs.startBtn.addEventListener('click');

flatpickr(refs.input, options);

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}
