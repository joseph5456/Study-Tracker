let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load(){
    const dt = new Date();

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    console.log(day, month, year);

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // days in Month is how many days per month

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    // saves number in regular string format 
    console.log(dateString);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    //number of days before month starts 
    console.log(paddingDays);

    document.getElementById('monthDisplay').innerText = 
`${dt.toLocaleDateString('en-us', { month: 'long'})} ${year}`;

    for(let i = 1; i < paddingDays + daysInMonth; i++)
    {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener('click', () => console.log('click'));
        }else{
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}   

function initButtons() {
    document.getElementById(`nextButton`).addEventListener('click',() => {
        nav++;

    })
}

initButtons();
load();
