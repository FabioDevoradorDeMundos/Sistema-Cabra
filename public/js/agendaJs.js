//Pega os dias agendados do Servidor
var agendados = [];
fetch('/diasAgendados')
.then(res => res.json())
.then(dias => { 
for(let index =0;index<dias.length;index++){
  var atual = dias[index].calendario
  agendados.push(atual)
} 

//Elementos da tela
const matInp = document.querySelector('.mat');
const senhaInp = document.querySelector('.senha');
const menu = document.querySelector('.openbtn');
const janela = document.querySelector('.janela');
const hora1 = document.querySelector('.hora1');
const hora2 = document.querySelector('.hora2');
const desenvolvedores = document.querySelector('.desenvolvedores');
const sendBtn = document.querySelector('.enviar');
const deslogar = document.querySelector('.deslogar')
const ajuda = document.querySelector('.ajuda');
const imagem = document.querySelector('.imagem');
const alunoImg = document.querySelector('.alnimg');
const alnInfoNome = document.querySelector('.alninfo1');
const alnInfoMat = document.querySelector('.alninfo2');
const obsInput = document.querySelector('.txtar');
const deleta = document.querySelector('.deleta');
let cancel = document.querySelector('.cancel');
let cancelando = false;

//Variáveis
let matutino = false;
let vespertino = false;
let aberto = false;
let doisClicks = false;
let imgCaminho = "4.png"
let obs = ""


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

///Seleciona os botões de horário
function escolheHora1(e){
  if(matutino){
    vespertino = false;
    hora1.src = ('imgs/bttnverdemat.png');
    hora2.src = ('imgs/bttncinzaves.png');
    if(doisClicks){
      hora1.src = ('imgs/bttncinzamat.png');
       matutino = false;
       doisClicks = false;
    }
  }}

  function escolheHora2(e){
    if(vespertino){
      matutino = false;
      hora1.src = ('imgs/bttncinzamat.png');
      hora2.src = ('imgs/bttnverdeves.png');
      
    }
    if(doisClicks){
      hora2.src = ('imgs/bttncinzaves.png');
       vespertino = false;
       doisClicks = false;
    }
  }


//Eventos
menu.addEventListener('click',abreMenu);
hora1.addEventListener('click',() => {if(matutino){doisClicks = true};  matutino = true; escolheHora1()});
hora2.addEventListener('click', () => {if(vespertino){doisClicks = true} vespertino = true; escolheHora2()});
desenvolvedores.addEventListener('click', () => {location.assign('http://localhost:3000/desenvolvedores');});
deslogar.addEventListener('click', () => {location.assign('http://localhost:3000/login');});
ajuda.addEventListener('click', () => {location.assign('http://localhost:3000/ajuda')});
sendBtn.addEventListener('click',enviaData);
imagem.addEventListener('click', () => {location.assign('http://localhost:3000/alterarImagem')});
deleta.addEventListener('click', deletar)
cancel.addEventListener('click', cancelarAgenda)

//Botões de cancelar agendamento
function adicionaEvento(){
  if(cancelando){
    cancel.removeEventListener('click', cancelarAgenda)
    cancel.addEventListener('click',selecionaCancelado);
  } else if(cancelando == false){
    cancel.addEventListener('click',cancelarAgenda);
    location.assign('http://localhost:3000/agenda')
  }
}

//Variáveis do calendário
let display = document.querySelector(".display");
let days = document.querySelector(".days");
let previous = document.querySelector(".left");
let next = document.querySelector(".right");
let selected = document.querySelector(".selected");

let date = new Date();

let year = date.getFullYear();
let month = date.getMonth();

let dataSelecionada = document.getElementsByClassName("selected-date");
let horaSelecionada = "";
var matric = "";

let apaga = false;


let cancelamento = {
    diaSelecionado: "",
    matricula:""
  }

//Cria o calendário
function displayCalendar() {
 const firstDay = new Date(year, month, 1);

  const lastDay = new Date(year, month + 1, 0);

  const firstDayIndex = firstDay.getDay(); //4

  const numberOfDays = lastDay.getDate(); //31
 

  let formattedDate = date.toLocaleString("pt-BR", {
    year: "numeric",
    month: "numeric"
  });

  display.innerHTML = `${formattedDate}`;


  for (let x = 1; x <= firstDayIndex; x++) {
    const div = document.createElement("div");
    div.innerHTML += "";
    days.appendChild(div);
  }

  for (i = 1; i <= numberOfDays; i++) {
    let div = document.createElement("div");
    let currentDate = new Date(year, month, i);

    div.dataset.date = currentDate.toLocaleDateString();

    //Marca os dias agendados
    div.innerHTML += i;
    days.appendChild(div);
    for (let z = 0; z < agendados.length; z++) {
      if( div.dataset.date == agendados[z]){
      div.classList.add("marcado");
    }}
    //Marca o dia atual
    if (
      currentDate.getFullYear() === new Date().getFullYear() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getDate() === new Date().getDate()
    ) {
      div.classList.add("current-date");

    }
    //Marca os dias que já passaram
    if (
      currentDate.getMonth() < new Date().getMonth() ||
      currentDate.getFullYear() < new Date().getFullYear() ||
      currentDate.getFullYear() <= new Date().getFullYear() &&
      currentDate.getMonth() <= new Date().getMonth() &&
      currentDate.getDate() <= new Date().getDate()
    ) {
      div.classList.add("atraso");  
    }
    //Desmarca os dias que já passaram
    if(div.classList == 'marcado atraso'){
      div.classList = 'atraso'
    }
    //Apaga todos os dias que não estão marcados quando o botão de cancelar é sselecionado
    if(apaga){
      div.classList.add("atraso");  
      apaga= false;
    }

    
  }

  }

// Chama a função para mostrar o calendário
displayCalendar()

//Volta o mês ao clicar na seta
previous.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";

  if (month < 0) {
    month = 11;
    year = year - 1;
  }

  month = month - 1;

  date.setMonth(month);

  displayCalendar();
  displaySelected();
});

//Avança o Mês ao clicar na seta
next.addEventListener("click", () => {
  days.innerHTML = "";
  selected.innerHTML = "";

  if (month > 11) {
    month = 0;
    year = year + 1;
  }

  month = month + 1;
  date.setMonth(month);

  displayCalendar();
  displaySelected();
});

//Relacionados ao cancelamento dos dias já marcados
  const marcados = document.querySelectorAll('.marcados')
function cancelarAgenda(){
  

    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);

    const firstDayIndex = firstDay.getDay(); //4

    const numberOfDays = lastDay.getDate(); //31
    const listaFilho = document.querySelector('.days').childNodes;
    
    const diasMarcados = document.querySelector('.marcado');


  for(let i=0;i<numberOfDays;i++){
    if(listaFilho[i].classList != "marcado" && listaFilho[i].classList != "atraso"){
      listaFilho[i].classList.add("atraso");
    } 
  }
    cancel.innerText = "Cancelar Selecionado";
    deleta.hidden = false;
    cancel.innerText= "Parar de Cancelar";
    cancelando = true;
    adicionaEvento()
  

  }
//Pede ao servidor que exclua o dia selecionado do banco de dados
function deletar(){
  cancelamento.diaSelecionado = dataMarcada.data
  apaga = true;
  location.assign('//localhost:3000/agenda');
  fetch('/cancela', {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body:JSON.stringify(cancelamento)
    });

}

function selecionaCancelado(){
    cancelando = false;
    deleta.hidden = true;
    cancel.innerText = "Cancelar Agendamento";
    adicionaEvento()
}

//Mostra as informações do usuário -> foto, link e matrícula
function displayInfo (){
  fetch('/api/agendaInfo')
.then(res => res.json())
.then(info => {
  alnInfoNome.innerHTML = info[0].nome_aluno;
  alnInfoMat.innerHTML = info[0].matricula;
  alunoImg.src =  info[0].foto_link;
   dataMarcada.matricula = info[0].matricula;
    cancelamento.matricula = info[0].matricula;

   if(info[0].foto_link == "null"){
    alunoImg.src = "/imgs/imgsUsuario/1.png"
   }
})};
displayInfo()

var dataMarcada = {
  data:"",
  horario:"",
  matricula:matric,
  observacao:""
};



let ultimo = "";
let selectedDate = "";
//Marca as cores dos dias no calendário
function displaySelected() {
  const dayElements = document.querySelectorAll(".days div");
  dayElements.forEach((day) => {
    day.addEventListener("click", (e) => {
     selectedDate = e.target.dataset.date;
     console.log(selectedDate)
     if(e.target.classList != 'atraso'){
       if(ultimo != ""){
         ultimo.style.backgroundColor = 'white';
         ultimo.style.color = 'black'
       } if (new Date().getDate() == ultimo.innerHTML){
         ultimo.style.backgroundColor = '#5caf43';
         ultimo.style.color = 'white'
       }
       day.style.backgroundColor = '#5657b3';
       day.style.color = 'white'
       if(ultimo.classList == 'marcado'){
       ultimo.style.backgroundColor = 'rgb(204, 54, 34)';
       ultimo.style.color = 'white'
     }
     if(ultimo.classList == 'atraso'){
      ultimo.style.backgroundColor = 'white';
       ultimo.style.color = '#b8b8b8'
     }
     if(ultimo.classList == 'marcado current-date atraso'){
      ultimo.style.backgroundColor = 'rgb(221, 192, 27)';
       ultimo.style.color = 'white';
     }
    
        ultimo = day;
        dataMarcada.data = e.target.dataset.date;
        console.log(ultimo.classList)
     }; 
   
   })})};


displaySelected();



function enviaData(){
  obs = obsInput.value;

console.log(dataMarcada.data)
  dataMarcada.observacao = obs;
  if(matutino){
    horaSelecionada = "08:00h - 11:00h"
  } else if(vespertino){
    horaSelecionada = "14:00h - 17:00h"
  }


  dataMarcada.horario = horaSelecionada
  
  if(dataSelecionada != "" && horaSelecionada != ""){
   //Envia as informações do agendamento para o servidor
    fetch('/data', {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body:JSON.stringify(dataMarcada)
    });
    alert("Agendamento concluído!")
    location.assign('//localhost:3000/agenda')
  } else {
    alert("Selecione dia e hora")
  }

}

})

