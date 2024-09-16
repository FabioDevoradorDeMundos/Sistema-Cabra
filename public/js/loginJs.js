//Barra de navegação
const desenvolvedores = document.querySelector('.desenvolvedores');
const menu = document.querySelector('.openbtn');
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
  
  
  
  //inputs
  const matInp = document.querySelector('.mat');
  const senhaInp = document.querySelector('.snh')
  const snhBtn = document.querySelector('.snhBtn')
const regBtn = document.querySelector('.btreg');

//Info do usuário
let mat = "";
let senha = "";
var logado = {
  token:"deslogado",
   index:0,
   senhaUser:"",
   loginUser:""
};
console.log(logado)

function envia(e) {
  //Coleta as informações
   mat = matInp.value;
   senha = senhaInp.value;
   fetch('/api/cadastro')
.then(resposta => resposta.json())
.then(cadastro => {
  for(let i=0;i<cadastro.length;i++){
    //Verifica se a senha e o login batem com a info cadastrada no Banco de Dados
      if(mat == cadastro[i].login && senha == cadastro[i].senha){
        logado.token = "logado";
        logado.index = i;
        logado.senhaUser = senha;
        logado.loginUser = mat;

        //Garante o token de login do usuário
        fetch('/token', {
          method:"POST",
          headers:{
            "Content-type": "application/json"
          },
          body:JSON.stringify(logado)
        });


      location.assign('http://localhost:3000/agenda');
      } 
    } if(logado.token == "deslogado"){
        alert("Senha incorreta")
      
    }
} );
} 

function mostraSenha(){
  if (senhaInp.type === "password") {
    senhaInp.type = "text";
  } else {
    senhaInp.type = "password";
  }
}

menu.addEventListener('click',abreMenu);
regBtn.addEventListener('click', envia);
document.addEventListener('keydown', (e) => {if(e.keyCode == 13){envia()}});
desenvolvedores.addEventListener('click', () => {location.assign('http://localhost:3000/desenvolvedores');})
ajuda.addEventListener('click', () => {location.assign('http://localhost:3000/ajuda')});
snhBtn.addEventListener('click', mostraSenha);