const emlInp = document.querySelector('.eml');
const emlConf = document.querySelector('.snh');
const menu = document.querySelector('.openbtn');
const janela = document.querySelector('.janela');
const desenvolvedores = document.querySelector('.desenvolvedores');
const sendBtn = document.querySelector('.btn');
const ajuda = document.querySelector('.ajuda')
const voltar = document.querySelector('.voltar');
const parag = document.querySelector('.parag');
const codInp = document.querySelector('.cod');
const sCTxt = document.querySelector('.sC'); 
const btCod = document.querySelector('.btcod');

let mudaInp = false;
let mat = ""
let dados = {
  email:""
}

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

function enviaEmail(){
  if(emlInp.value == emlConf.value && emlInp.value != ""){
    mat = emlInp.value
    dados.email = emlInp.value
    parag.innerHTML = "Um email foi enviado contendo informações sobre como recuperar a sua senha.";
    //Envia as informações para que o servidor enderece o código
    fetch('/recuperarSenha', {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body:JSON.stringify(dados)
    });
    //Revela o Input para colocar o código
    codInp.hidden = false;
    btCod.hidden = false;
    sendBtn.remove()
    btCod.style.marginTop = "3.7%"
    } else {
    parag.innerHTML = (emlInp.value != emlConf.value) ? "Os E-mails não são idênticos." : "Insira a sua matrícula.";
  }
  }
  let alterado = false;
function verificaCod () {
  //Primeira chamada -> pede os novos dados do usuário
  if(!mudaInp){
//pede o código do backend
fetch('/codVerifSnh')
      .then(resposta => resposta.json())
      .then(codigo => { if(codigo == codInp.value){
        parag.innerHTML = "Insira seus novos dados.";
        emlInp.value = "";
        emlConf.value = "";
        codInp.value = "";
        emlInp.placeholder = "Insira seu novo login";
        emlConf.placeholder = "Insira sua nova senha";
        codInp.placeholder = "Confirme a senha";
        if(emlConf.value == emlInp.value) { "Seus dados foram alterados com sucesso."; mudaInp = true} else{parag.innerHTML = "As senhas não são identicas."}
      }
  })} else{
    //Segunda chamada -> Envia os dados do usuário para o servidor
       parag.innerHTML = "Seus dados foram alterados com sucesso.";
       alterado = true;
       let novoDado = {
         login: emlInp.value,
         senha: emlConf.value,
         matricula:mat
        }
        emlInp.value = "";
        emlConf.value = "";
        codInp.value = "";
       
       fetch('/mudaSenha', {
         method:"POST",
         headers:{
           "Content-type": "application/json"
          },
          body:JSON.stringify(novoDado)
        });
        emlInp.hidden = true;
         emlConf.hidden = true;
         codInp.hidden = true;
        


  }
}

btCod.addEventListener('click', () => {
 if(!alterado) {
  verificaCod()
} else {
  btCod.innerHTML = 'Voltar'
  location.assign('http://localhost:3000/login')
}

})
menu.addEventListener('click',abreMenu);
desenvolvedores.addEventListener('click', () => {location.assign('http://localhost:3000/desenvolvedores');})
ajuda.addEventListener('click', () => {location.assign('http://localhost:3000/ajuda')})
sendBtn.addEventListener('click', enviaEmail)
voltar.addEventListener('click', () => {location.assign('http://localhost:3000/login')});