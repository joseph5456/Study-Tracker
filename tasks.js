const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.querySelector('.tasks ul');

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
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(t => t !== task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }, 200);
    });
});

addTaskBtn.addEventListener('click', () => {
    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type task and press Enter...';
    
    // Insert above the list
    taskList.parentElement.insertBefore(input, taskList);
    input.focus();
    
    // Listen for Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const taskText = input.value;
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