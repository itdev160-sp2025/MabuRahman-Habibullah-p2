var tasks = [];

function loadTasksFromLocalStorage() {
  var stored = localStorage.getItem('tasks');
  if (stored) {
    tasks = JSON.parse(stored);
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  var title = document.getElementById('task-title').value.trim();
  var date = document.getElementById('task-date').value;
  var time = document.getElementById('task-time').value;
  var desc = document.getElementById('task-desc').value.trim();

  if (title === '' || date === '') {
    alert('Please enter both task title and date.');
    return;
  }

  var task = {
    title: title,
    date: date,
    time: time,
    desc: desc,
    notified: false
  };

  tasks.push(task);
  saveTasksToLocalStorage();
  renderTasks();
  renderCalendar();
  clearForm();
}

function clearForm() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('task-time').value = '';
  document.getElementById('task-desc').value = '';
}

function renderTasks() {
  var list = document.getElementById('task-list');
  list.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML =
      "<strong>" + task.title + "</strong><br>" +
      "Date: " + task.date + (task.time ? " at " + task.time : "") + "<br>" +
      (task.desc ? "Note: " + task.desc + "<br>" : "") +
      "<button class='delete-btn' onclick='deleteTask(" + i + ")'>Delete</button>";

    list.appendChild(li);
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
    renderCalendar();
  }
}

function renderCalendar() {
  var calendar = document.getElementById('calendar');
  calendar.innerHTML = '';

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();

  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, month + 1, 0);
  var totalDays = lastDay.getDate();
  var startDay = firstDay.getDay();

  for (var i = 0; i < startDay; i++) {
    var empty = document.createElement('div');
    empty.className = 'calendar-day';
    empty.innerHTML = '';
    calendar.appendChild(empty);
  }

  for (var d = 1; d <= totalDays; d++) {
    var date = new Date(year, month, d);
    var formatted = date.toISOString().split('T')[0];
    var dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.innerText = d;

    var hasTask = false;
    var taskList = [];

    for (var t = 0; t < tasks.length; t++) {
      if (tasks[t].date === formatted) {
        hasTask = true;
        taskList.push(tasks[t]);
      }
    }

    if (hasTask) {
      dayDiv.classList.add('has-task');
      dayDiv.onclick = (function(taskListCopy) {
        return function() {
          var message = "Tasks for this day:\n";
          for (var k = 0; k < taskListCopy.length; k++) {
            message += "• " + taskListCopy[k].title +
                       (taskListCopy[k].time ? " at " + taskListCopy[k].time : "") +
                       (taskListCopy[k].desc ? "\n   - " + taskListCopy[k].desc : "") + "\n";
          }
          alert(message);
        };
      })(taskList);
    }

    calendar.appendChild(dayDiv);
  }
}

document.getElementById('add-task').addEventListener('click', addTask);

// Load and render on startup
loadTasksFromLocalStorage();
renderTasks();
renderCalendar();
