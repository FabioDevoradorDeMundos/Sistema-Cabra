const menu = document.querySelector('.openbtn');
const voltar = document.querySelector('.voltar');
const desenvolvedores = document.querySelector('.desenvolvedores');

//Controla a barra lateral
let aberto = false;
function abreMenu(e) {
if(aberto == false){
document.getElementById("mySidebar").style.width = "250px";
document.getElementById("main").style.marginLeft = "250px";
aberto = true;
} else if(aberto){
document.getElementById("mySidebar").style.width = "0";
document.getElementById("main").style.marginLeft= "0";
aberto = false;
}};

menu.addEventListener('click',abreMenu);
voltar.addEventListener('click', () => {location.assign('http://localhost:3000/')});
desenvolvedores.addEventListener('click', () => {location.assign('http://localhost:3000/desenvolvedores')});