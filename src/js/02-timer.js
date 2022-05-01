import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// 
const button = document.querySelector('button[data-start]');
const spanValue = document.querySelectorAll('.value');

let newDate = null;
let intervalId = 0;
button.disabled = true;

button.addEventListener('click', startTimer);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        newDate = selectedDates[0].getTime();
        
        if(newDate < Date.now()){
            window.alert("Please choose a date in the future")
        }
        button.disabled = false;
        countTime(newDate, Date.now(), convertMs);
    },
};

flatpickr('#datetime-picker', options);

function countTime(convertFn,currentTime){
    const diferendInTime = convertFn(newDate - currentTime);
    const timeValues = Object.value(diferendInTime);

    if(diferendInTime.second > 0){
        spanValue.forEach((value, index)=>{
            value.textContent = addLeadingZero(timeValues[index]);
        });    
    } else {
        spanValue.forEach(value =>(value.textContent = '00'));
        clearInterval(intervalId);
    }
}

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

function startTimer(){
    button.disabled = true;
    intervalId = setInterval(()=>{
        countTime(newDate, Date.now(), convertMs)
    },1000)
}

function addLeadingZero(value){
    return String(value).padStart(2, '0')
};

