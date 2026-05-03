let userName = localStorage.getItem("userName");
if (userName === null) {
    userName = prompt("Enter your name");
    localStorage.setItem("userName", userName);
}
function liveClock() {
    let now = new Date();
    let rawHours = now.getHours();
    let hours = String(rawHours).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");
    let ampm = ""
    if (rawHours < 12) {
        ampm = " AM"; 
    }else ampm =" PM";
    let timeString = hours + ":" + minutes + ":" + seconds + ampm;
    document.querySelector(".live-clock").textContent = timeString;
    let dynamicGreeting = "";
    if ( rawHours < 12) {
        dynamicGreeting = "Good Morning, ";   
    } else if (rawHours >= 12 && rawHours < 16) {
    dynamicGreeting = "Good Afternoon, "
    } else dynamicGreeting = "Good Evening, ";
    let greetingString = "☀️" + dynamicGreeting + userName
    document.querySelector(".dynamic-greeting").textContent = greetingString;
}  
setInterval(liveClock, 1000); 

let totalSeconds = 1500;
let timerInterval = null;
let savedSeconds = localStorage.getItem("totalSeconds");
if (savedSeconds !== null) {
    totalSeconds = Number(savedSeconds);
    let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    let seconds = String(totalSeconds % 60).padStart(2, "0");
    document.querySelector(".timer").textContent = minutes + ":" + seconds;
    
    let savedRunning = localStorage.getItem("timerRunning");
    if (savedRunning === "true") {
        startTimer();
    }
}
function startTimer() {
    if (timerInterval != null) {
        return;
    }
        timerInterval = setInterval(function() {
        totalSeconds = totalSeconds - 1;
        let minutes = String(Math.floor(totalSeconds/60)).padStart(2,"0");
        let seconds = String(totalSeconds % 60).padStart(2, "0");
        let timerString = minutes + ":" + seconds;
        document.querySelector(".timer").textContent = timerString
        localStorage.setItem("totalSeconds", totalSeconds);
        localStorage.setItem("timerRunning", "true");
    }, 1000)
}

function pauseTimer() {
    clearInterval (timerInterval);
    timerInterval = null;
    localStorage.setItem("timerRunning", "false");
}

function resetTimer () {
    totalSeconds = 1500;
    clearInterval (timerInterval)
    timerInterval = null;
    totalSeconds = 1500;
    document.querySelector(".timer").textContent = "25:00"; 
    localStorage.setItem("timerRunning", "false");
    localStorage.setItem("totalSeconds", 1500);
}

let tasks = [];
let savedTasks = localStorage.getItem("tasks");
if (savedTasks != null) {
    tasks = JSON.parse(savedTasks);
    displayTasks();
    updateProgress();
}
function addTasks() {
    let userInput = document.querySelector(".input-task").value;
    if (userInput === "") {
        return;
    }
    tasks.push({text: userInput, done: false})
    document.querySelector(".input-task").value = ""
    displayTasks();
    updateProgress();
    saveTasks();
}

function displayTasks() {
    document.querySelector("#task-list").innerHTML = "";
    tasks.forEach(function(task, index) {
        let taskDiv = document.createElement("div");
       let textStyle = task.done? "text-decoration:line-through" : ""; 
       let isChecked = task.done? "checked" : "";
        taskDiv.innerHTML = "<input type='checkbox' " + isChecked + " onclick='checkTasks(" + index + ")'>" +
         "<span style='" + textStyle + "'>" + task.text + "</span>" + "<button onclick='deleteTasks(" + index + ")'>🗑</button>";
        taskDiv.className = "task-item"
        document.querySelector("#task-list").appendChild(taskDiv);
    });
}
function deleteTasks(index) {
    tasks.splice(index,1)
    displayTasks();
    updateProgress();
    saveTasks();
}
function checkTasks(index) {
    tasks[index].done = !tasks[index].done
    displayTasks();
    updateProgress();
    saveTasks();
}
function updateProgress() {
    let doneTasks = tasks.filter(function(task) {
    return task.done === true;
    }).length
    if (tasks.length === 0) {
        return;
    }
    let progressPercentage = doneTasks/tasks.length * 100;
    document.querySelector(".progress-bar-fill").style.width = progressPercentage + "%";
    document.querySelector(".progress-text").textContent = doneTasks + " of " + tasks.length + " completed";
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
