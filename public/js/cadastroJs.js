//Elementos da tela
const menu = document.querySelector('.openbtn');
const voltar = document.querySelector('.voltar');
const desenvolvedores = document.querySelector('.desenvolvedores');
const ajuda = document.querySelector('.ajuda');
const matricula = document.querySelector('.mat');
const nome = document.querySelector('.nome');
const turma = document.querySelector('.turma');
const turno = document.querySelector('.turno');
const login = document.querySelector('.login');
const senha = document.querySelector('.senha');
const confSenha = document.querySelector('.confSenha');
const btn = document.querySelector('.btreg');
const btnCod = document.querySelector('.btcod');
const snhBtn = document.querySelector('.snhBtn');
const inpEscondido = document.querySelector('.hid');
const txtEscondido = document.querySelector('.hidTxt');
const camposTxt = document.querySelector('.camposTxt');
const hidBtn = document.querySelector('.hidBtn');

//Variáveis
let confirmou = false;
let enviou = false;
let aberto = false;
let completo = false;
//Info do aluno
let aluno = {
  matricula: matricula.value,
  nome: nome.value,
  turma: turma.value,
  turno: turno.value,
  senha: confSenha.value,
  senha: senha.value,
  login:login.value,
}

//Permite que o usuário veja a senha ao marcar a checkBox
function mostraSenha(){
if (senha.type === "password") {
senha.type = "text";
confSenha.type = "text";
} else {
senha.type = "password";
confSenha.type = "password";
}
}

//Controla a barra lateral
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

//Pede o código do servidor e compara com o código inserido pelo usuário
function verificaCod(){
 fetch('/codVerif')
  .then(resposta => resposta.json())
  .then(codigo => { if(codigo == inpEscondido.value){
    confirmou = true;
    camposTxt.style.color = 'black';
    camposTxt.innerHTML = "Conta cadastrada";
    camposTxt.hidden = false;
    hidBtn.hidden = false
    //Envia as informações do usuário para que seja cadastrado ao Banco de Dados
  fetch('/cadastrar', {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body:JSON.stringify(aluno)
    });
  }
  })};

function registra(e) {
  if(!confirmou){
    //Checa se todos os campos foram preenchidos
    if(matricula.value != "" && nome.value != "" && turma.value != "" && turno.value != "" && senha.value != "" && confSenha.value != "" && login.value != ""){completo = true} 
    else { camposTxt.innerHTML = "Preencha todos os campos.";camposTxt.hidden = false}
    //Checa se as senhas são identicas
      if(senha.value != confSenha.value){camposTxt.innerHTML = "As senhas não são identicas"; camposTxt.hidden = false}else if(senha.value == confSenha.value) {
      if(completo){
        let emailFormula = matricula.value + "@estudante.sed.sc.gov.br";
        
        //Prepara as informações do usuário
        aluno = {
      matricula: matricula.value,
      nome: nome.value,
      turma: turma.value,
      turno: turno.value,
      senha: confSenha.value,
      senha: senha.value,
      login:login.value,
      email: emailFormula
        };
        console.log(aluno)
        enviou = true;
        inpEscondido.hidden = false;
        txtEscondido.hidden = false;
        btnCod.hidden = false;
        btn.hidden = true;

      //Pede para o servidor endereçar um Email contendo o código ao usuário
      fetch('/enviaCod', {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body:JSON.stringify(aluno)
    });
      }} completo = false;
  }
}

if(enviou == false){btn.addEventListener('click', registra);}
btnCod.addEventListener('click', verificaCod);
voltar.addEventListener('click', () => {location.assign('http://localhost:3000/login')});
hidBtn.addEventListener('click', () => {location.assign('http://localhost:3000/login')});
desenvolvedores.addEventListener('click', () => {location.assign('http://localhost:3000/desenvolvedores')});
menu.addEventListener('click',abreMenu);
ajuda.addEventListener('click', () => {location.assign('http://localhost:3000/ajuda')});
snhBtn.addEventListener('click', mostraSenha);
if(!enviou){document.addEventListener('keydown', (e) => {if(e.keyCode == 13){registra()}});} else
if(enviou){document.addEventListener('keydown', (e) => {if(e.keyCode == 13){verificaCod()}});}