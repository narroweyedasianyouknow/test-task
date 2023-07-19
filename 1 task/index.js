const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");
const timerState = {
  /** 
   * setInterval для ре-рендеринга контента
   * @type {null|number}
   */
  updater: null,
  /** 
   * setTimeout для очистки таймера
   * @type {null|number}
   */
  clearTime: null,
};

const createTimerAnimator = () => {
  const state = { second: 0, minute: 0, hour: 0 };
  /** Функция для очищения всех стейтов */
  function clearTimers() {
    if (timerState.clearTime) clearTimeout(timerState.clearTime);
    if (timerState.updater) clearInterval(timerState.updater);
    state.second = 0;
    state.minute = 0;
    state.hour = 0;
  }

  /** @param {number} value  */
  function toTwoDigit(value) {
    return value < 10 ? `0${value}` : String(value);
  }

  /** Функция для обновлении таймера */
  function reRenderer() {
    const digitHours = toTwoDigit(state.hour),
      digitMinutes = toTwoDigit(state.minute),
      digitSeconds = toTwoDigit(state.second);
    timerEl.innerHTML = digitHours + ":" + digitMinutes + ":" + digitSeconds;

    state.second++;

    if (state.second == 60) {
      state.minute++;
      state.second = 0;
    }
    if (state.minute == 60) {
      state.hour++;
      state.minute = 0;
    }
  }

  /** @param {number} seconds  */
  return (seconds) => {
    clearTimers();
    reRenderer();
    timerState.updater = setInterval(reRenderer, 1000);
    timerState.clearTime = setTimeout(() => {
      clearTimers();
    }, seconds * 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (e) => {
  /** @type {string} */
  const text = e.target.value;

  // Если контент не равен на цифру от 0 до 9, то заменяем его пустой строкой
  e.target.value = text.replace(/[^0-9]/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
