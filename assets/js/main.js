let listTask = [];

let showTasks = "";

const base_url_main = window.location.href;

// Show inistal list task
if (localStorage.getItem("listTask") !== null) {
    loadLocalStorage();
}

// Check status of each tasks if done
loadCheckedTasks();

function addTask () {
    let task = document.getElementById("input-task").value;
    if (task == '')
        alert("Please input task name before adding")
    else {
        let taskObj = {};
        if (localStorage.getItem("listTask") === null || listTask.length == 0) {
            id = 0;
        } else {
            listTask = JSON.parse(localStorage.listTask);
            let lastTask = listTask[listTask.length - 1]
            lastIndex = listTask.indexOf(lastTask);
            id = parseInt(lastIndex) + 1
            for (let i = 0; i < listTask.length; i++) {
                if (listTask[i].id == id) {
                    id++;
                }
            }
        }
        taskObj['id'] = id
        taskObj['name'] = task
        taskObj['status'] = false
        listTask.push(taskObj);
        if (localStorage.getItem("listTask") === null) {
            updateLocalStorage();
        } else {
            updateLocalStorage();
        }
        document.getElementById('input-task').value = null
        // window.location.reload();
    }
    loadLocalStorage();
    loadCheckedTasks();
}

function removeTask (id) {
    listTask = JSON.parse(localStorage.listTask);
    if (confirm("Do to really want to delete this task?")) {
        let i = 0;
        while (i < listTask.length) {
            if (listTask[i].id === id) {
                listTask.splice(i, 1);
            } else {
                ++i;
            }
        }
        updateLocalStorage();
    }
    loadLocalStorage();
    loadCheckedTasks();
    // window.location.reload();
}
function checkTask (id) {
    for (let i = 0; i < listTask.length; i++) {
        if (listTask[i].id === id) {
            listTask[i].status = !listTask[i].status
            if (listTask[i].status) {
                document.getElementById(id).checked = true;
                Li = document.getElementById(id).parentElement;
                Li.classList.add("selected")
            } else {
                Li = document.getElementById(id).parentElement;
                Li.classList.remove("selected")
                document.getElementById(id).checked = false;
            }
        }
    }
    updateLocalStorage();
    loadCheckedTasks();
}

function showListTask (task) {
    editURL = base_url_main + "edit.html" + "?id=" + task.id;
    showTasks += " <li class='task' draggable='true' id='" + task.id + "'> <input type='checkbox' id='" + task.id + "' value='" + task.id + "' onclick='checkTask(" + task.id + ")' >  <span class='task-name'>"
        + task.name + "</span> <a class='edit' href='" + editURL + "' > <i class='fas fa-edit' onclick='editTask(" + task.id + ")'></i> </a> </span> <i class='fas fa-trash-alt' onclick='removeTask(" + task.id + ")'></i> </li>";
};

// Drag & Drop 

const draggables = document.querySelectorAll('.task');
const ul = document.querySelector("#list_tasks");
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})
ul.addEventListener('dragover', e => {
    e.preventDefault;
    const afterElement = getDragAfterElement(ul, e.clientY);
    const dragging = document.querySelector('.dragging');
    let reOrderedList = [];
    if (afterElement == null) {
        ul.appendChild(dragging);
    } else {
        ul.insertBefore(dragging, afterElement);
    }
    let listTaskChange = document.getElementsByClassName('task');
    for (let i = 0; i < listTaskChange.length; i++) {
        id = parseInt(listTaskChange[i].getAttribute("id"));
        for (let j = 0; j < listTask.length; j++) {
            if (listTask[j].id == id) {
                changedName = listTask[j].name;
                changedStatus = listTask[j].status;
                reOrderedList.push({ id: id, name: changedName, status: changedStatus });
            }
        }
    }
    localStorage.setItem("listTask", JSON.stringify(reOrderedList));
})

function getDragAfterElement (ul, y) {
    const draggableElements = [...ul.querySelectorAll('.task:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
function moveInArray (array, from, to) {
    let item = array.splice(from, 1);
    array.splice(to, 0, item[0]);
}


function updateLocalStorage () {
    localStorage.setItem("listTask", JSON.stringify(listTask));
}
function loadLocalStorage () {
    listTask = JSON.parse(localStorage.listTask);
    listTask.forEach(showListTask);
    document.getElementById("list_tasks").innerHTML = showTasks
    showTasks = "";
}
//  checkbox = document.querySelector()
//  console.log(checkbox);
function loadCheckedTasks () {
    for (let i = 0; i < listTask.length; i++) {
        id = listTask[i].id
        if (listTask[i].id === id) {
            if (listTask[i].status) {
                Li = document.getElementById(id);
                input = Li.firstElementChild;
                input.checked = true;
                Li.classList.add("selected")
            } else {
                Li = document.getElementById(id);
                input = Li.firstElementChild;
                input.checked = false;
                Li.classList.remove("selected")
            }
        }
    }
}
