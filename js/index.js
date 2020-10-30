const poppinsIntro = document.querySelectorAll('#poppins-intro path');

for(let i = 0; i < poppinsIntro.length; i++){
    console.log(`Letter ${i} is ${poppinsIntro[i].getTotalLength()}`);
}

let mouseCursor = document.querySelector('.cursor');
let home = document.querySelector('.top');
let history = document.querySelector('.bottom');
let variety = document.querySelector('.right');
let inDepth = document.querySelector('.left');

window.addEventListener("mousemove", cursor);

function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
}

home.addEventListener('mouseover', () => {
    mouseCursor.classList.add("home");
});

history.addEventListener('mouseover', () => {
    mouseCursor.classList.add("history");
});

variety.addEventListener('mouseover', () => {
    mouseCursor.classList.add("variety");
});

inDepth.addEventListener('mouseover', () => {
    mouseCursor.classList.add("inDepth");
});

home.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove("home");
});

history.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove("history");
});

variety.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove("variety");
});

inDepth.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove("inDepth");
});