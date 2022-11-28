const toDoList = (function(){
        var tasks = [];
        const input = document.querySelector(".add-task");
        const taskList = document.getElementById("list");
        const taskCounter = document.getElementById("total-tasks");
        const notify = document.getElementById("snack-bar");

        // Fetch tasks from API 
        async function fetchToDos(){
            // fetch('https://jsonplaceholder.typicode.com/todos')
            //     .then(function (response){
            //         return response.json();
            //     })
            //     .then(function (data){
            //         tasks = data.slice(0,10);
            //         renderList();
            //     })
            //     .catch(function (error){
            //         showNotification(error);
            //     })
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                tasks = data.slice(0,10);
                renderList();
            } catch (error) {
                showNotification(error);
            }
        }
        // Add Tasks to DOM
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
        // Render All Tasks present
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
        // Toggle Task to Completed or Incomplete
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
        // Delete Task
        function deleteTask(taskId){
            var newTasks = tasks.filter((task) => task.id !== Number(taskId));
            tasks = newTasks;
            renderList();
            // console.log(tasks.length);
            taskCounter.innerHTML = `Total tasks: ${tasks.length}`
            return;
        }
        // Add Task 
        function addTask(task){
            if(!task){
                showNotification("Task Cannot be added");
                return;
            }
            // fetch('https://jsonplaceholder.typicode.com/todos',{
            //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //         headers: {
            //             'Content-Type': 'application/json'
            //             // 'Content-Type': 'application/x-www-form-urlencoded',
            //         },
            //         body: JSON.stringify(task)
            //     })
            //     .then(function (response){
            //         return response.json();
            //     })
            //     .then(function (data){
                
            //         tasks.push(task);
            //         showNotification("Task added");
            //         renderList();
            //         taskCounter.innerHTML = `Total tasks: ${tasks.length}`
            //         // renderList();
            //     })
            //     .catch(function (error){
            //         showNotification(error);
            //     })
            tasks.push(task);
            showNotification("Task added");
            renderList();
            taskCounter.innerHTML = `Total tasks: ${tasks.length}`
            return;
        }
        // Show Notification
        function showNotification(msg){
            notify.innerHTML = msg;
            notify.classList.add("show");
            setTimeout(function(){
                notify.classList.remove("show");
                notify.classList.add("blank");
            },1500);
            // alert(msg);
        }
        // Enter Key Event Listener
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
        // Event Deligation (All Event listeners on screen)
        function allEvents(e){
            const target = e.target;
            // console.log(target);
        
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
        // initiallizeApp();
        function initiallizeApp(){
            fetchToDos();
            input.addEventListener("keyup",getTask);
            document.addEventListener("click",allEvents);
        }
        return {
            initiallize: initiallizeApp,
        }
})();