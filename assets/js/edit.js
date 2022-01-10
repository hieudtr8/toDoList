// GET URL ID
const base_url = window.location.href;
let url = new URL(base_url);
let id = url.searchParams.get("id")
let currentTask = {};
const originURL = window.location.origin + "/toDoList"
document.getElementById('back-to-main').href = originURL
// Get current task by id
for (var i = 0; i < listTask.length; i++) {
    if (listTask[i].id == id) {
        currentTask = listTask[i];
    }
}
loadValue();
function saveEdit () {
    inputName = document.getElementById("task-name").value;
    inputStatus = document.getElementById("task-status").value;
    for (var i = 0; i < listTask.length; i++) {
        if (listTask[i].id == id) {
            listTask[i].name = inputName;
            listTask[i].status = inputStatus;
        }
    }
    updateLocalStorage();
    alert("Update successfully!")
}

function loadValue () {
    document.getElementById("task-name").value = currentTask.name;
    document.getElementById("task-status").value = currentTask.status;
}