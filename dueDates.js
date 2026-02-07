const addDueDateBtn = document.getElementById('add-due-date-btn');
const dueDateList = document.querySelector('.due-dates ul');

const savedDueDates = JSON.parse(localStorage.getItem('dueDates')) || [];
savedDueDates.forEach(dueDate => {
    const li = document.createElement('li');
    li.textContent = dueDate;
    dueDateList.appendChild(li);
});

addDueDateBtn.addEventListener('click', () => {
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type due date and press Enter...';
    
    // Insert above the list
    dueDateList.parentElement.insertBefore(input, dueDateList);
    input.focus();
    
    // Listen for Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const newDueDate = document.createElement('li');
            newDueDate.textContent = input.value;
            dueDateList.appendChild(newDueDate);

            let dueDates = JSON.parse(localStorage.getItem('dueDates')) || [];
            dueDates.push(input.value);
            localStorage.setItem('dueDates', JSON.stringify(dueDates));
            input.remove(); // Remove input field
        }
    });
    
    // Optional: remove input if user clicks away (blur)
    input.addEventListener('blur', () => {
        input.remove();
    });
});