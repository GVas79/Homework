function show() {
var time = new Date();
var hour = time.getHours();
var minute = time.getMinutes();

var check;
if (hour == 0 & minute == 0) {
    check = "midnight";
}

if (hour > 0 & hour < 12 ) {
    check = "morning";
}

if (hour == 12 & minute == 0) {
    check = "noon";
}

if (hour > 12 & hour <=18) {
    check = "afternoon";
}

if (hour > 18 & hour < 0) {
    check = "evening"
}

var message = " My favourite part of the day is " + check;
alert(message);

}

