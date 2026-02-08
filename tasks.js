const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.querySelector('.tasks ul');

// Function to show/hide placeholder
function updatePlaceholder() {
    let placeholder = taskList.querySelector('.placeholder');
    if (taskList.children.length === 0) {
        if (!placeholder) {
            placeholder = document.createElement('li');
            placeholder.className = 'placeholder';
            placeholder.textContent = 'Place tasks here';
            placeholder.style.color = '#999';
            placeholder.style.fontStyle = 'italic';
            taskList.appendChild(placeholder);
        }
    } else {
        if (placeholder) {
            placeholder.remove();
        }
    }
}

const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(task => {
    const li = document.createElement('li');
    li.style.cursor = 'pointer';
    
    // Create checkmark (hidden by default)
    const checkmark = document.createElement('span');
    checkmark.textContent = '✓';
    checkmark.style.color = 'grey';
    checkmark.style.marginRight = '10px';
    checkmark.style.cursor = 'pointer';
    checkmark.style.display = 'inline'; // Hidden by default
    
    li.appendChild(checkmark);
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);
    // Show checkmark on hover
    li.addEventListener('mouseenter', () => {
        checkmark.style.display = 'inline';
        li.style.textDecoration = 'line-through';
        li.style.color = 'green';
    });
    
    // On hover out: keep checkmark visible, remove hover text styles
    li.addEventListener('mouseleave', () => {
        li.style.textDecoration = 'none';
        li.style.color = '';
    });
    
    // Click functionality on entire task
    li.addEventListener('click', () => {
        checkmark.style.color = 'green';
        setTimeout(() => {
            li.remove();
            updatePlaceholder(); // Show placeholder if no tasks left
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(t => t !== task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }, 200);
    });
});

// Show placeholder if no tasks
updatePlaceholder();

addTaskBtn.addEventListener('click', () => {
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'add-input';
    input.placeholder = 'Type task';
    
    // Insert above the list
    taskList.parentElement.insertBefore(input, taskList);
    input.focus();
    
    // Listen for Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const taskText = input.value;
            
            // Remove placeholder if it exists
            const placeholder = taskList.querySelector('.placeholder');
            if (placeholder) {
                placeholder.remove();
            }
            
            const li = document.createElement('li');
            li.style.cursor = 'pointer';

            //create checkmark
            const checkmark = document.createElement('span');
            checkmark.textContent = '✓';
            checkmark.style.color = 'grey';
            checkmark.style.marginRight = '10px';
            checkmark.style.cursor = 'pointer';

            li.appendChild(checkmark);
            li.appendChild(document.createTextNode(taskText));
            taskList.appendChild(li);

            // Show checkmark on hover
            li.addEventListener('mouseenter', () => {
                checkmark.style.display = 'inline';
                li.style.textDecoration = 'line-through';
                li.style.color = 'green';
            });
            
            // On hover out: keep checkmark visible, remove hover text styles
            li.addEventListener('mouseleave', () => {
                li.style.textDecoration = 'none';
                li.style.color = '';
            });

            // Click functionality on entire task
            li.addEventListener('click', () => {
                checkmark.style.color = 'green';
                // Remove after 1 second
                setTimeout(() => {
                    li.remove();
                    updatePlaceholder(); // Show placeholder if no tasks left
                    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                    tasks = tasks.filter(t => t !== taskText);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }, 200);
             });

            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            input.remove(); // Remove input field

        }
    });
    
    // Optional: remove input if user clicks away (blur)
    input.addEventListener('blur', () => {
        input.remove();
    });
});