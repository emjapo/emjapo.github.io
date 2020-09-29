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

