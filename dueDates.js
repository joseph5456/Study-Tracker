const addDueDateBtn = document.getElementById('add-due-date-btn');
const dueDateList = document.querySelector('.due-dates ul');

// Function to show/hide placeholder
function updateDueDatePlaceholder() {
    let placeholder = dueDateList.querySelector('.placeholder');
    if (dueDateList.children.length === 0) {
        if (!placeholder) {
            placeholder = document.createElement('li');
            placeholder.className = 'placeholder';
            placeholder.textContent = 'Add due dates';
            placeholder.style.color = '#999';
            placeholder.style.fontStyle = 'italic';
            dueDateList.appendChild(placeholder);
        }
    } else {
        if (placeholder) {
            placeholder.remove();
        }
    }
}

const savedDueDates = JSON.parse(localStorage.getItem('dueDates')) || [];
savedDueDates.forEach(dueDate => {
    const li = document.createElement('li');
    li.textContent = dueDate;
    li.style.position = 'relative';
    li.style.cursor = 'pointer'; // Pointer for entire item

    // Trash icon (hidden by default)
    const trash = document.createElement('span');
    trash.textContent = '🗑️';
    trash.style.display = 'none';
    trash.style.marginLeft = '10px';
    trash.style.color = 'red';
    trash.title = 'Delete due date';

    li.appendChild(trash);
    dueDateList.appendChild(li);

    li.addEventListener('mouseenter', () => {
        trash.style.display = 'inline';
        li.style.textDecoration = 'line-through';
        li.style.color = 'red';
    });
    li.addEventListener('mouseleave', () => {
        trash.style.display = 'none';
        li.style.textDecoration = 'none';
        li.style.color = '';
    });
    li.addEventListener('click', () => {
        li.remove();
        updateDueDatePlaceholder(); // Show placeholder if no due dates left
        let dueDates = JSON.parse(localStorage.getItem('dueDates')) || [];
        dueDates = dueDates.filter(d => d !== dueDate);
        localStorage.setItem('dueDates', JSON.stringify(dueDates));
    });
});

// Show placeholder if no due dates
updateDueDatePlaceholder();

addDueDateBtn.addEventListener('click', () => {
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'add-input';
    input.placeholder = 'Type due date';

    // Insert above the list
    dueDateList.parentElement.insertBefore(input, dueDateList);
    input.focus();

    // Listen for Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const newDueDate = document.createElement('li');
            newDueDate.textContent = input.value;
            newDueDate.style.position = 'relative';
            newDueDate.style.cursor = 'pointer'; // Pointer for entire item

            // Remove placeholder if it exists
            const placeholder = dueDateList.querySelector('.placeholder');
            if (placeholder) {
                placeholder.remove();
            }

            // Trash icon (hidden by default)
            const trash = document.createElement('span');
            trash.textContent = '🗑️';
            trash.style.display = 'none';
            trash.style.marginLeft = '10px';
            trash.style.color = 'red';
            trash.title = 'Delete due date';

            newDueDate.appendChild(trash);
            dueDateList.appendChild(newDueDate);

            newDueDate.addEventListener('mouseenter', () => {
                trash.style.display = 'inline';
                newDueDate.style.textDecoration = 'line-through';
                newDueDate.style.color = 'red';
            });
            newDueDate.addEventListener('mouseleave', () => {
                trash.style.display = 'none';
                newDueDate.style.textDecoration = 'none';
                newDueDate.style.color = '';
            });
            newDueDate.addEventListener('click', () => {
                newDueDate.remove();
                updateDueDatePlaceholder(); // Show placeholder if no due dates left
                let dueDates = JSON.parse(localStorage.getItem('dueDates')) || [];
                dueDates = dueDates.filter(d => d !== input.value);
                localStorage.setItem('dueDates', JSON.stringify(dueDates));
            });

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