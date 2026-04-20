let userName = prompt("Enter your name: ");
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
    }, 1000)
}

function pauseTimer() {
    clearInterval (timerInterval);
    timerInterval = null;
}

function resetTimer () {
    totalSeconds = 1500;
    clearInterval (timerInterval)
    timerInterval = null;
    totalSeconds = 1500;
    document.querySelector(".timer").textContent = "25:00"; 
}

let tasks = [];
function addTasks() {
    let userInput = document.querySelector(".input-task").value;
    if (userInput === "") {
        return;
    }
    tasks.push({text: userInput, done: false})
    document.querySelector(".input-task").value = ""
    displayTasks();
}

function displayTasks() {
    document.querySelector("#task-list").innerHTML = "";
    tasks.forEach(function(task, index) {
        let taskDiv = document.createElement("div");
        taskDiv.innerHTML = "<input type = 'checkbox'>" + "<span>" + task.text + "</span>" + "<button onclick = 'deleteTasks("+ index +")'>🗑</button>" ;
        taskDiv.className = "task-item"
        document.querySelector("#task-list").appendChild(taskDiv)
    });
}
function deleteTasks(index) {
    tasks.splice(index,1)
    displayTasks();
}

