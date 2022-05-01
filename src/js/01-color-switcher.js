const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body =  document.querySelector('body');

let timerId = null;

start.addEventListener("click", () => {
    start.disabled = true;
    timerId = setInterval(() => {
        body.style.background = getRandomHexColor();
    }, 1000);
});

stop.addEventListener("click", () => {
    start.disabled = false;
    clearInterval(timerId);
    ;
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
