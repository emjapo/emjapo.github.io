const poppinsIntro = document.querySelectorAll('#poppins-intro path');

for(let i = 0; i < poppinsIntro.length; i++){
    console.log(`Letter ${i} is ${poppinsIntro[i].getTotalLength()}`);
}