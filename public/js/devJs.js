const menu = document.querySelector('.openbtn');
const voltar = document.querySelector('.voltar');
const desenvolvedores = document.querySelector('.desenvolvedores');
const ajuda = document.querySelector('.ajuda');

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

voltar.addEventListener('click', () => {location.assign('http://localhost:3000/agenda')});
desenvolvedores.addEventListener('click', () => {location.assign('http://localhost:3000/desenvolvedores')});
menu.addEventListener('click',abreMenu);
ajuda.addEventListener('click', () => {location.assign('http://localhost:3000/ajuda')});
