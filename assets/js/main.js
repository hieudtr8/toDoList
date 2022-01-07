let listTask = [];

let showTasks = "";

if (localStorage.getItem("listTask") !== null) listTask = JSON.parse(localStorage.listTask);

storedTasks = JSON.parse(localStorage.listTask);
storedTasks.forEach(showListTask);
document.getElementById("list_tasks").innerHTML = showTasks
showTasks = "";

function addTask () {
    let task = document.getElementById("input").value;
    if (task == '')
        alert("Please input task name before adding")
    else {
        var taskObj = {};

        if (localStorage.getItem("listTask") === null || listTask.length == 0) {
            id = 0;
        } else {
            id = parseInt(listTask[listTask.length - 1].id) + 1
        }
        taskObj['id'] = id
        taskObj['name'] = task
        taskObj['status'] = false
        listTask.push(taskObj);
        if (localStorage.getItem("listTask") === null) {
            localStorage.setItem("listTask", JSON.stringify(listTask));
        } else {
            storedTasks.push(taskObj);
            localStorage.setItem("listTask", JSON.stringify(storedTasks));
        }
        document.getElementById('input').value = null
    }
    storedTasks = JSON.parse(localStorage.listTask);
    storedTasks.forEach(showListTask);
    document.getElementById("list_tasks").innerHTML = showTasks
    showTasks = "";
}

function removeTask (id) {
    var i = 0;
    while (i < storedTasks.length) {
        if (storedTasks[i].id === id) {
            storedTasks.splice(i, 1);
        } else {
            ++i;
        }
    }
    localStorage.setItem("listTask", JSON.stringify(storedTasks));
    storedTasks.forEach(showListTask);
    document.getElementById("list_tasks").innerHTML = showTasks
    showTasks = ""
}
function checkTask (id) {
    Li = document.getElementById(id);
    Li.classList.toggle("selected")
}
function showListTask (task) {
    showTasks += " <li class='task'  id='" + task.id + "'> <input type='checkbox' value='" + task.id + "' onclick='checkTask(" + task.id + ")' >  <span class='task-name'>"
        + task.name + "</span> <span class='close' onclick='removeTask(" + task.id + ")'>x</span> </li>";
};

function updateLocalStorage () {
    localStorage.setItem("listTask", JSON.stringify(storedTasks));
}
function getLocalStorage () {

}

// var checkedboxs = document.querySelectorAll('input[type=checkbox]:checked')
// console.log(checkedboxs
// var list = document.querySelector('input[type=checkbox]');
// list.addEventListener('click', function(ev) {
//     if (ev.target.tagName === 'LI') {
//       ev.target.classList.toggle('checked');
//       console.log(ev);
//     }
//   }, false);
