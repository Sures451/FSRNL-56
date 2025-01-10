let todos = [];

const form = document.querySelector('#form');
const list = document.querySelector('#list');

function uuid() {
  return Math.random().toString(36).substr(2, 9);
}

function refreshTodos() {
  list.innerHTML = '';

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const li = document.createElement('li');

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    // When the checkbox is clicked, toggle the completed status
    checkbox.addEventListener('click', function () {
      toggleCompleted(i);
    });

    // Text for the todo
    const text = document.createElement('span');
    text.textContent = todo.task;

    // Add 'completed' class if the todo is completed
    if (todo.completed) {
      li.classList.add('completed'); // Add the strike-through class
    }

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function () {
      deleteTodo(i);
    });

    // Move up button
    const moveUpButton = document.createElement('button');
    moveUpButton.textContent = '↑';
    moveUpButton.classList.add('moveUp');
    moveUpButton.addEventListener('click', function () {
      moveUp(i);
    });

    // Move down button
    const moveDownButton = document.createElement('button');
    moveDownButton.textContent = '↓';
    moveDownButton.classList.add('moveDown');
    moveDownButton.addEventListener('click', function () {
      moveDown(i);
    });

    // Append all elements to the list item
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);
    li.appendChild(moveUpButton);
    li.appendChild(moveDownButton);

    // Append the list item to the list
    list.appendChild(li);
  }
}

// Function to add a new todo
function addTodo(event) {
  event.preventDefault();
  const input = form.elements[0];
  const todoText = input.value.trim();

  if (todoText) {
    todos.push({
      id: uuid(),
      task: todoText,
      completed: false
    });
    input.value = ''; // Clear the input field
    refreshTodos(); // Re-render the list of todos
  }
}

// Function to toggle the completion state of a todo
function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;

  // Re-render the list of todos
  refreshTodos();
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1); // Remove the todo from the array
  refreshTodos(); // Re-render the list
}

// Function to move a todo up
function moveUp(index) {
  if (index > 0) {
    const temp = todos[index];
    todos[index] = todos[index - 1];
    todos[index - 1] = temp;
    refreshTodos(); // Re-render the list after swapping
  }
}

// Function to move a todo down
function moveDown(index) {
  if (index < todos.length - 1) {
    const temp = todos[index];
    todos[index] = todos[index + 1];
    todos[index + 1] = temp;
    refreshTodos(); // Re-render the list after swapping
  }
}

// Event listener for adding a new todo
form.addEventListener('submit', addTodo);

// Initial call to render todos
function init() {
  refreshTodos();
}

init();
