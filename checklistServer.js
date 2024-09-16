
let mysql = require('mysql');

var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "cabra"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    secure:false,
    auth:{
    user:"SistemaCabraPlacido@gmail.com",
    pass:"qril zrem nttr qjyq"
    },
    tls:{
        rejectUnauthorized:false
    },
    
})


async function run(txt,subj,para){
    const mailSent = await transporter.sendMail({
        text : txt,
        subject: subj,
        from: 'Sistema Cabra <SistemaCabraPlácido@gmail.com>',
        to:  para
        });
        console.log("Email enviado")
}



const express = require('express');
const port = 3000; 

let nomeAln = "";
let matAln = "";
let fotoAln = "";
var usuario = 0;
var senhaUser = "";
var loginUser = "";
var matCad = "";
var codigoCad = Math.round(Math.random() * 5000);
var codigoSnh = Math.round(Math.random() * 5000);

const app = express();
app.set('views', 'viewsCheck');
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))


token = false;

//rotas para as telas
app.get('/', (req, res) => {
    res.render('telaLoginCheck', {title: "Login"}) 
    
})

app.get('/login', (req, res) => {
    token = false;
    res.render('telaLoginCheck', {title: "Express"})
    
})
app.get('/esqueci', (req, res) => {
    res.render('telaSenhaCheck', {title: "Esqueci a senha"})
    
})

app.get('/desenvolvedores', (req,res) => {
    if(token){
        res.render('desenvolvedoresCheck.ejs', {title:"desenvolvedores"})
    } else{
        res.render('desenvolvedorescheckOff', {title:"desenvolvedores"})
    }
})
app.get('/checklist', (req, res) => {
    res.render('telaChecklist', {title: "Checklist"})
    
})

//dados do frontend
app.post('/token', (req,res) => {
    //console.log(req.body);
    if(req.body.token == 'logado'){
        token = true;
        usuario =  req.body.index;
        senhaUser = req.body.senhaUser;
        loginUser = req.body.loginUser;
        //console.log(req.body)
    }
})
app.post('/recuperarSenha', (req,res) => {
    let msg = "Seu código de verificação é: " + codigoSnh;
    let subj = "Seu código é " + codigoSnh;
    let para =  req.body.email + "@estudante.sed.sc.gov.br"
    run(msg,subj,para)
    }
)

app.post('/mudaSenha', (req,res) => {
    var sql = `UPDATE cadastro SET login = '${req.body.login}', senha = '${req.body.senha}' where(matricula = '${req.body.matricula}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Cadastro Alterado");
        })});

app.post('/enviaRelatorio', (req,res) => {
    console.log(req.body)
    var sql = `INSERT INTO acesso (num_acesso, login, matri_data_hora_inicio, matri_data_hora_fim) VALUES (null,'${req.body.nome}','${req.body.mdhi}','${req.body.mdhf}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Acesso Registrado");
        })});

app.post('/checklist', (req,res) => {
    let t1 = req.body.tarefa1; 
    let t2 = req.body.tarefa2;
    let t3 = req.body.tarefa3;
    let t4 = req.body.tarefa4;
    let t5 = req.body.tarefa5;
    var sql = `INSERT INTO checklist (cod_checklist, tarefa1, tarefa2, tarefa3, tarefa4, tarefa5, descricao, matricula) VALUES (${null},'${t1}','${t2}','${t3}','${t4}','${t5}','${req.body.descricao}','${req.body.matricula}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Relatório Inserido");
    })});
        

        //configurar cadastro com verificaçaõ de email
app.post('/enviaCod', (req,res) => {
    
    let msg = "Seu código de verificação é: " + codigoCad;
    let subj = "Seu código é " + codigoCad;
    let para =  req.body.matricula + "@estudante.sed.sc.gov.br"
    run(msg,subj,para)
})

//dados para o frontend
app.get('/api/cadastro', (req,res) => {
        con.query("SELECT * FROM cadastro", function (err, result, fields) {
          if (err) throw err;
        res.json(result);
        });
      });
app.get('/api/agendaInfo', (req,res) => {
    con.query(`SELECT nome_aluno, matricula, nome_aluno,foto_link from cadastro where(senha='${senhaUser}' && login='${loginUser}')`, function (err, result, fields) {
        if (err) throw err;
        res.json(result);

      });
});
app.get('/codVerifSnh', (req,res) => {
        res.json(codigoSnh);
      });


app.listen(port, () => 
console.log('Servidor iniciado em https://localhost' + port + '/')
);