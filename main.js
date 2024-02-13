let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let arratOfTasks = [];

if (localStorage.getItem("tasks")) {
  arratOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDateFromLocalStorage();

add.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("date-id"));

    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStutsTaskWith(e.target.parentElement.getAttribute("date-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arratOfTasks.push(task);

  addElementToPageFrom(arratOfTasks);
  addDateToLocalStorage(arratOfTasks);
}

function addElementToPageFrom(arratOfTasks) {
  tasks.innerHTML = " ";
  arratOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("date-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasks.appendChild(div);
  });
}

function addDateToLocalStorage(arratOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arratOfTasks));
}

function getDateFromLocalStorage() {
  let date = window.localStorage.getItem("tasks");
  if (date) {
    let taskss = JSON.parse(date);
    addElementToPageFrom(taskss);
  }
}

function deleteTaskWith(taskId) {
  arratOfTasks = arratOfTasks.filter((task) => task.id != taskId);
  addDateToLocalStorage(arratOfTasks);
}

function toggleStutsTaskWith(taskId) {
  for (let i = 0; i < arratOfTasks.length; i++) {
    if (arratOfTasks[i].id == taskId) {
      arratOfTasks[i].completed == false? (arratOfTasks[i].completed = true): arratOfTasks[i].completed == false;
    }
  }
  addDateToLocalStorage(arratOfTasks);
}
