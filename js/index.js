const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector("nav > ul");
const links = document.querySelectorAll("nav > ul > li");
// const footerLinks = document.querySelectorAll("footer > ul > li");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
    // footerLinks.forEach(flink => {
    //     flink.classList.toggle("disappear");
    // });
});

//form validation
var divs = new Array();
divs[0] = "errName";
divs[1] = "errAge";
divs[2] = "errEmail";
divs[3] = "errIdea";
divs[4] = "errConfirm";
function validate() {
    var inputs = new Array();
    inputs[0] = document.getElementById('name').value;
    inputs[1] = document.getElementById('age').value;
    inputs[2] = document.getElementById('email').value;
    inputs[3] = document.getElementById('idea').value;
    inputs[4] = document.getElementById('permission').value;
    var errors = new Array();
    errors[0] = "<span style='color:red'>Please enter your first name!</span>";
    errors[1] = "<span style='color:red'>Please enter your last name!</span>";
    errors[2] = "<span style='color:red'>Please enter your email!</span>";
    errors[3] = "<span style='color:red'>Please enter your user id!</span>";
    errors[4] = "<span style='color:red'>Please enter your password!</span>";
    for (i in inputs) {
        var errMessage = errors[i];
        var div = divs[i];
        if (inputs[i] == "")
            document.getElementById(div).innerHTML = errMessage;
        else if (i == 0) {
            var letters = /^[A-Za-z]+$/;
            if (inputs[i].match(letters)) {
                document.getElementById(div).innerHTML = "OK!";
            }
            else {
                document.getElementById('errFirst').innerHTML = "<span style='color: red'>Enter a valid first name!</span>";
            }
        }
        else if (i == 1) {
            var letters = /^[0-9]+$/;
            if (inputs[i].match(letters)) {
                document.getElementById(div).innerHTML = "OK!";
            }
            else {
                document.getElementById('errLast').innerHTML = "<span style='color: red'>Enter a valid last name!</span>";
            }
        }
        else if (i == 2) {
            var atpos = inputs[i].indexOf("@");
            var dotpos = inputs[i].lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= inputs[i].length)
                document.getElementById('errEmail').innerHTML = "<span style='color: red'>Enter a valid email address!</span>";
            else
                document.getElementById(div).innerHTML = "OK!";
        }
        else if (i == 3) { //idea
            var numbers = /^[0-9]+$/;
            if (inputs[i].match(numbers)) {
                document.getElementById(div).innerHTML = "OK!";
            }
            else {
                document.getElementById('errUid').innerHTML = "<span style='color: red'>Enter a valid user id!</span>";
            }
        }
        else if (i == 4) { //confirm
            var first = document.getElementById('password').value;
            var second = document.getElementById('confirm').value;
            if (second != first)
                document.getElementById('errConfirm').innerHTML = "<span style='color: red'>Your passwords don't match!</span>";
            else
                document.getElementById(div).innerHTML = "OK!";
        }
        else
            document.getElementById(div).innerHTML = "OK!";
    }
}
function finalValidate() {
    var count = 0;
    for (i = 0; i < 5; i++) {
        var div = divs[i];
        if (document.getElementById(div).innerHTML == "OK!")
            count = count + 1;
    }
    if (count == 5)
        document.getElementById("errFinal").innerHTML = "All the data you entered is correct!!!";
}