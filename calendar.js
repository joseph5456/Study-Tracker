let nav = 0;
let clicked = null;
let expandedNav = 0;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Expanded calendar elements
const expandCalendarBtn = document.getElementById('expandCalendarBtn');
const expandedCalendarModal = document.getElementById('expandedCalendarModal');
const expandedCalendarBackdrop = document.getElementById('expandedCalendarBackdrop');
const closeExpandedCalendarBtn = document.getElementById('closeExpandedCalendarBtn');
const expandedCalendar = document.getElementById('expandedCalendar');

function openModal(date){
    clicked = date;
    const eventForDay  = events.find(e => e.date == clicked);

    if (eventForDay){
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}


function load(){
    const dt = new Date();
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
`${dt.toLocaleDateString('en-us', { month: 'long'})} ${year}`;

    calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++)
    {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay  = events.find(e => e.date === dayString);
            if (i - paddingDays === day && nav === 0){
                daySquare.id = 'currentDay';
            }
            if (eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            daySquare.addEventListener('click', () => openModal(dayString));
        }else{
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}   

function closeModal(){
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value  = '';
    clicked = null; 
    load();
    // Also reload expanded calendar if it's open
    if (expandedCalendarModal.style.display === 'block') {
        loadExpandedCalendar();
    }
}

function saveEvent(){
    if ( eventTitleInput.value){
        eventTitleInput.classList.remove('error');
        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else{
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent(){
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events))
    closeModal();
}

// Expanded calendar functions
function loadExpandedCalendar(){
    const dt = new Date();
    if (expandedNav !== 0) {
        dt.setMonth(new Date().getMonth() + expandedNav);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('expandedMonthDisplay').innerText = 
`${dt.toLocaleDateString('en-us', { month: 'long'})} ${year}`;

    expandedCalendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++)
    {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay  = events.find(e => e.date === dayString);
            if (i - paddingDays === day && expandedNav === 0){
                daySquare.id = 'currentDay';
            }
            if (eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            daySquare.addEventListener('click', () => openModal(dayString));
        }else{
            daySquare.classList.add('padding');
        }

        expandedCalendar.appendChild(daySquare);
    }
}

function openExpandedCalendar(){
    expandedNav = nav; // Sync with regular calendar
    expandedCalendarModal.style.display = 'block';
    expandedCalendarBackdrop.style.display = 'block';
    loadExpandedCalendar();
}

function closeExpandedCalendar(){
    expandedCalendarModal.style.display = 'none';
    expandedCalendarBackdrop.style.display = 'none';
    expandedNav = 0;
}

function initButtons() {
    document.getElementById(`nextButton`).addEventListener('click',() => {
        nav++;
        load();
    })
    document.getElementById(`backButton`).addEventListener('click',() => {
        nav--;
        load();
    })
    document.getElementById('saveButton').addEventListener('click',saveEvent);
    document.getElementById('cancelButton').addEventListener('click',closeModal);

    document.getElementById('deleteButton').addEventListener('click',deleteEvent);
    document.getElementById('closeButton').addEventListener('click',closeModal);

    // Expanded calendar buttons
    expandCalendarBtn.addEventListener('click', openExpandedCalendar);
    closeExpandedCalendarBtn.addEventListener('click', closeExpandedCalendar);
    expandedCalendarBackdrop.addEventListener('click', closeExpandedCalendar);

    document.getElementById('expandedNextButton').addEventListener('click', () => {
        expandedNav++;
        loadExpandedCalendar();
    });
    
    document.getElementById('expandedBackButton').addEventListener('click', () => {
        expandedNav--;
        loadExpandedCalendar();
    });
}

initButtons();
load();
