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