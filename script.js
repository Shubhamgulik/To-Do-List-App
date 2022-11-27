var tasks = [];
const input = document.querySelector(".add-task");
const taskList = document.getElementById("list");
const taskCounter = document.getElementById("total-tasks");
const notify = document.getElementById("snack-bar");

console.log("working..")
console.log(notify);

function fetchToDos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            tasks = data.slice(0,10);
            renderList();
        })
        .catch(function (error){
            showNotification(error);
        })
}

function addToDOM(task){
    let listElement = document.createElement('li');
    let newHtml = ``;
    newHtml += `<input type="checkbox" id="${task.id}" ${task.completed ? "checked" : ""} class="custom-checkbox">`;
    newHtml += `<label for="${task.id}">${task.title}</label>`;
    newHtml += `<img src="images/84-842915_delete-icon-png-red.png" class="delete" data-id="${task.id}" />`;
    listElement.innerHTML = newHtml;
    taskList.append(listElement);
    return;
}

function renderList(){
    taskList.innerHTML = '';
    for(let singleTask of tasks){
       addToDOM(singleTask);
    }
    // for(let singleTask of tasks){
    //     if(!singleTask.completed) addToDOM(singleTask);
    // }
    taskCounter.innerHTML = `Total tasks: ${tasks.length}`
    return;
}

function toggleTask(taskId){
        for(let task of tasks){
            if(task.id === Number(taskId)){
                task.completed = !task.completed;
                renderList();
                
                return;
            }
        }
        showNotification("Could not toggled task");
        return;
}

function deleteTask(taskId){
    var newTasks = tasks.filter((task) => task.id !== Number(taskId));
    tasks = newTasks;
    renderList();
    console.log(tasks.length);
    taskCounter.innerHTML = `Total tasks: ${tasks.length}`
    return;
}

function addTask(task){
    if(!task){
        showNotification("Task Cannot be added")
    }
    tasks.push(task);
    showNotification("Task added");
    renderList();
    console.log(tasks.length);
    taskCounter.innerHTML = `Total tasks: ${tasks.length}`
    return;
}

function showNotification(msg){
    notify.innerHTML = msg;
    notify.classList.add("show");
    setTimeout(function(){
        notify.classList.remove("show");
        notify.classList.add("blank");
    },2000);
    // alert(msg);
}


function getTask(e){
    if(e.key === 'Enter'){
        const userInput = e.target.value;
        input.value = "";

        if(!userInput){
            showNotification("Task Empty..");
            return;
        }

        const task = {
            title : userInput,
            id: Date.now(),
            completed: false,
        }

        addTask(task);
        
    }
}


function allEvents(e){
    const target = e.target;
    console.log(target);
   
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        showNotification("Task deleted");
    }else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        showNotification("Toggled successfully")
    }
 
 
  
}

function initiallizeApp(){
    fetchToDos();
    input.addEventListener("keyup",getTask);
    document.addEventListener("click",allEvents);
}

initiallizeApp();