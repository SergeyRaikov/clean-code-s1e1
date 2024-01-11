var taskInput = document.querySelector('.new-task-input');
var addButton = document.querySelector('.button__add-item');
var incompleteTaskHolder = document.querySelector('#incomplete-tasks');
var completedTasksHolder = document.querySelector('#completed-tasks');

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');
  listItem.classList.add('incomplete-tasks__item');

  var checkBox = document.createElement('input'); //checkbx
  checkBox.type = 'checkbox';
  checkBox.classList.add('chek-item');

  var label = document.createElement('label'); //label
  label.classList.add('task', 'visible');

  var editInput = document.createElement('input'); //text
  editInput.type = 'text';
  editInput.classList.add('task-input', 'hidden');

  var editButton = document.createElement('button'); //edit button
  editButton.classList.add('button', 'button__edit-item');

  var deleteButton = document.createElement('button'); //delete button
  deleteButton.classList.add('button', 'button__delete-item');
  var deleteButtonImg = document.createElement('img'); //delete button image
  deleteButtonImg.classList.add('delet-icon');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'delete icon';
  label.innerText = taskString;
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.

  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('.task-input');
  var label = listItem.querySelector('.task');
  var editBtn = listItem.querySelector('.button__edit-item');
  var containsClass = listItem.classList.contains('edit-mode');
  listItem.classList.remove('edit-mode');

  if (containsClass) {
    label.classList.remove('hidden');
    label.classList.add('visible');
    label.innerText = editInput.value;
    editInput.classList.remove('visible');
    editInput.classList.add('hidden');
    editBtn.innerText = 'Edit';
    listItem.classList.toggle('edit-mode');
  } else {
    label.classList.remove('visible');
    label.classList.add('hidden');
    editInput.classList.remove('hidden');
    editInput.value = label.innerText;
    editInput.classList.add('visible', 'new-task-input');
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener('click', addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector('.chek-item');
  var editButton = taskListItem.querySelectorAll('.button__edit-item');
  var deleteButton = taskListItem.querySelector('.button__delete-item');

  editButton.forEach((element) => {
    element.addEventListener('click', editTask);
  });
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
