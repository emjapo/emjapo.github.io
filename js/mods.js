//Movement Animation to happen
const card = document.querySelector(".card:nth-of-type(1)");
const container = document.querySelector("section:nth-of-type(1)");
//Items
const title = document.querySelector(".title:nth-of-type(1)");
const mod = document.querySelector(".mod img:nth-of-type(1)");
const description = document.querySelector(".info h3:nth-of-type(1)");
const download = document.querySelector(".download:nth-of-type(1)");

//Moving Animation Event
container.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Animate In
container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    //Popout
    title.style.transform = "translateZ(150px)";
    mod.style.transform = "translateZ(200px)";
    description.style.transform = "translateZ(125px)";
    download.style.transform = "translateZ(100px)";
});
//Animate Out
container.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Popback
    title.style.transform = "translateZ(0px)";
    mod.style.transform = "translateZ(0px) rotateZ(0deg)";
    description.style.transform = "translateZ(0px)";
    download.style.transform = "translateZ(0px)";
});

//Movement Animation to happen
const card2 = document.querySelectorAll(".card")[1];
const container2 = document.querySelectorAll("section")[1];
//Items
const title2 = document.querySelectorAll(".title")[1];
const mod2 = document.querySelectorAll(".mod img")[1];
const description2 = document.querySelectorAll(".info h3")[1];
const download2 = document.querySelectorAll(".download")[1];

//Moving Animation Event
container2.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card2.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Animate In
container2.addEventListener("mouseenter", (e) => {
    card2.style.transition = "none";
    //Popout
    title2.style.transform = "translateZ(150px)";
    mod2.style.transform = "translateZ(200px)";
    description2.style.transform = "translateZ(125px)";
    download2.style.transform = "translateZ(100px)";
});
//Animate Out
container2.addEventListener("mouseleave", (e) => {
    card2.style.transition = "all 0.5s ease";
    card2.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Popback
    title2.style.transform = "translateZ(0px)";
    mod2.style.transform = "translateZ(0px) rotateZ(0deg)";
    description2.style.transform = "translateZ(0px)";
    download2.style.transform = "translateZ(0px)";
});

//Movement Animation to happen
const card3 = document.querySelectorAll(".card")[2];
const container3 = document.querySelectorAll("section")[2];
//Items
const title3 = document.querySelectorAll(".title")[2];
const mod3 = document.querySelectorAll(".mod img")[2];
const description3 = document.querySelectorAll(".info h3")[2];
const download3 = document.querySelectorAll(".download")[2];

//Moving Animation Event
container3.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card3.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Animate In
container3.addEventListener("mouseenter", (e) => {
    card3.style.transition = "none";
    //Popout
    title3.style.transform = "translateZ(150px)";
    mod3.style.transform = "translateZ(200px)";
    description3.style.transform = "translateZ(125px)";
    download3.style.transform = "translateZ(100px)";
});
//Animate Out
container3.addEventListener("mouseleave", (e) => {
    card3.style.transition = "all 0.5s ease";
    card3.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Popback
    title3.style.transform = "translateZ(0px)";
    mod3.style.transform = "translateZ(0px) rotateZ(0deg)";
    description3.style.transform = "translateZ(0px)";
    download3.style.transform = "translateZ(0px)";
});

