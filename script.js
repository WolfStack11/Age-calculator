// INPUTS
const day = document.querySelector ('#day');
const month = document.querySelector ('#month');
const year = document.querySelector ('#year');

// OUTPUTS
const yearDisplay = document.querySelector ('#YY');
const monthDisplay = document.querySelector ('#MM');
const dayDisplay = document.querySelector ('#DD');

const submitButton = document.querySelector ('.submit_btn');
const labels = document.getElementsByTagName("label");

//ERRORS
const error = document.querySelectorAll (".error");

// DATES
const date = new Date();
let currentYear = date.getFullYear();
let currentMonth = 1 + date.getMonth();
let currentDay = date.getDate();

const typeOfError = [
    "",
    "This field is required",
    "Must be a valid month",
    "Must be a valid year",
    "Must be a valid day",
    "Must be a valid date"
];

const errorState = (numberOfError, typeOfDate, typeOfError, color) => {
    error[numberOfError].innerHTML = typeOfError;
    labels[numberOfError].style.color = color;
    typeOfDate.style.borderColor = color;
}

const isYearLeap = (day, month, year) => {
    month = month - 1;
    fullDate = new Date(year, month, day);
    if(day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear()) {
        return true;
    } else {
        return false;
    }
}

const getAge = () => {
    let newYear = Math.abs(currentYear - year.value);

    let newMonth = 0;
    if(currentMonth >= month.value) {
        newMonth = currentMonth - month.value;
    }else {
        newYear --;
        newMonth = 12 + currentMonth - month.value;
    }

    let newDay = 0;
    if(currentDay >= day.value) {
        newDay = currentDay - day.value;
    }else {
        if(isYearLeap(day.value, month.value, year.value)) {
            newDay = 30 + currentDay - day.value;
        } else {
            newDay = currentDay - day.value;
        }

        if(newMonth < 0) {
            newMonth = 11;
            newYear--;
        }

        if(newMonth < currentMonth) {
            newDay++;
        }
    }

    yearDisplay.innerHTML = newYear;
    monthDisplay.innerHTML = newMonth;
    dayDisplay.innerHTML = newDay;
}


const isDayCorrect = () => {
    if(day.value == "") {
        errorState(0, day, typeOfError[1], "#ff5757");
        return false;
    } else if(day.value <= 0 || day.value > 31) {
        errorState(0, day, typeOfError[4], "#ff5757");
        return false;
    } else if(isYearLeap(day.value, month.value, year.value) == false) {
        errorState(0, day, typeOfError[5], "#ff5757");
        return false;
    } else {
        errorState(0, day, typeOfError[0], "");
        return true;
    }
}

const isMonthCorrect = () => {
    if(month.value == "") {
        errorState(1, month, typeOfError[1], "#ff5757");
        return false;
    } else if(month.value <= 0 || month.value > 12) {
        errorState(1, month, typeOfError[2], "#ff5757");
        return false;
    } else if(isYearLeap(day.value, month.value, year.value) == false) {
        errorState(1, month, typeOfError[0], "#ff5757");
        return false;
    } else {
        errorState(1, month, typeOfError[0], "");
        return true;
    }
}

const isYearCorrect = () => {
    if(year.value == "") {
        errorState(2, year, typeOfError[1], "#ff5757");
        return false;
    } else if(year.value > currentYear) {
        errorState(2, year, typeOfError[3], "#ff5757");
        return false;
    } else if(isYearLeap(day.value, month.value, year.value) == false) {
        errorState(2, year, typeOfError[0], "#ff5757");
        return false;
    } else if(year.value == currentYear && month.value > currentMonth) {
        errorState(1, month, typeOfError[3], "#ff5757");
        return false;
    } else if(year.value == currentYear && month.value == currentMonth && day.value > currentDay) {
        errorState(0, day, typeOfError[2], "#ff5757");
    } else {
        errorState(2, year, typeOfError[0], "");
        return true;
    }
}

submitButton.addEventListener("click", () => {
    event.preventDefault();
    isDayCorrect();
    isMonthCorrect();
    isYearCorrect();
    if(isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
        getAge();
    }
})

window.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        event.preventDefault();
        isDayCorrect();
        isMonthCorrect();
        isYearCorrect();
        if(isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
            getAge();
        }
    }
});
