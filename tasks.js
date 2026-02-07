const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.querySelector('.tasks ul');

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
            const newTask = document.createElement('li');
            newTask.textContent = input.value;
            taskList.appendChild(newTask);
            input.remove(); // Remove input field
        }
    });
    
    // Optional: remove input if user clicks away (blur)
    input.addEventListener('blur', () => {
        input.remove();
    });
});