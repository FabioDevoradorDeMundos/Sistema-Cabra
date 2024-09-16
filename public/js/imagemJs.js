const menu = document.querySelector('.openbtn');
const voltar = document.querySelector('.voltar');
const desenvolvedores = document.querySelector('.desenvolvedores');
const ajuda = document.querySelector('.ajuda');
const btn = document.querySelector('.btreg')
//imagens
const imgArr = document.querySelectorAll('.userimg');
//Mensagem de aviso
const dev = document.querySelector('.dev');

//Variáveis
let imgEscolhida = "";
let selecionada = "";
let enviou = false;
let aberto = false;
let pasta = "/imgs/imgsUsuario/";
let caminho = {caminho:""};

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
  console.log(imgArr)

  function clicaFoto(e){
    imgArr.forEach((element) => element.addEventListener('click', () => {
      //Coloca borda preta em todas as fotos
      for(let i = 0; i<imgArr.length;i++){
        if(imgArr[i].style.borderColor != 'black'){
          imgArr[i].style.borderColor = 'black'
     }
  }
      //Seleciona a foto e destaca a borda quando há um click
      selecionada = element.id;
       element.style.borderColor = '#e6534a';
    
    }))
  }
//Chama a função para pintar as bordas e ouvir os clicks nas fotos
  clicaFoto()

  function escolheFoto(){
    if(selecionada != ""){
    enviou = true;
    imgEscolhida = selecionada;
    console.log(imgEscolhida)
    dev.innerHTML = 'Imagem alterada!'
    //Pinta as bordas de preto novamente 
    for(let i = 0; i<imgArr.length;i++){
        if(imgArr[i].style.borderColor != 'black'){
          imgArr[i].style.borderColor = 'black'

        }}
        //Envia a foto para o Servidor e redireciona a página
        caminho.caminho = pasta + imgEscolhida 
        location.assign('http://localhost:3000/agenda')
        fetch('/alterarImagem', {
        method:"POST",
        headers:{
          "Content-type": "application/json"
        },
        body:JSON.stringify(caminho)
      });
  }}

btn.addEventListener('click', escolheFoto)
menu.addEventListener('click',abreMenu);
voltar.addEventListener('click', () => {location.assign('http://localhost:3000/agenda')});
desenvolvedores.addEventListener('click', () => {location.assign('http://localhost:3000/desenvolvedores')});
ajuda.addEventListener('click', () => {location.assign('http://localhost:3000/ajuda')})