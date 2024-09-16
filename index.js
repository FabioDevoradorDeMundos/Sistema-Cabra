//Conecta com BD
let mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cabra"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//Cria a estrutura para enviar Email
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: "SistemaCabraPlacido@gmail.com",
        pass: "qril zrem nttr qjyq"
    },
    tls: {
        rejectUnauthorized: false
    },

})


async function run(txt, subj, para) {
    const mailSent = await transporter.sendMail({
        text: txt,
        subject: subj,
        from: 'Sistema Cabra <SistemaCabraPlácido@gmail.com>',
        to: para
    });
    console.log("Email enviado")
}



const express = require('express');
const port = 3000;

//variáveis
var senhaUser = "";
var loginUser = "";
var codigoCad = Math.round(Math.random() * 5000);
var codigoSnh = Math.round(Math.random() * 5000);
var matAtual = ""

//Define as bases dos caminhos para o site
const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


token = false;

//rotas para as telas
app.get('/', (req, res) => {
    res.render('telaLogin', { title: "Login" })

})
app.get('/cadastro', (req, res) => {
    res.render('telaCadastro', { title: "Cadastro" })

})
app.get('/login', (req, res) => {
    token = false;
    res.render('telaLogin', { title: "Express" })

})
app.get('/esqueci', (req, res) => {
    res.render('telaSenha', { title: "Esqueci a senha" })
})
app.get('/agenda', (req, res) => {
    if (token) {
        res.render('telaAgenda.ejs', { title: "Agendamento" })
    } else {
        res.render('telaLogin', { title: "Express" })
    }
})
app.get('/desenvolvedores', (req, res) => {
    if (token) {
        res.render('desenvolvedores.ejs', { title: "desenvolvedores" })
    } else {
        res.render('desenvolvedoresDeslogado', { title: "desenvolvedores" })
    }
})
app.get('/ajuda', (req, res) => {
    if (token) {
        res.render('ajudaLogado.ejs', { title: "ajuda" })
    } else {
        res.render('telaAjuda.ejs', { title: "ajuda" })
    }
})
app.get('/alterarImagem', (req, res) => {
    if (token) {
        res.render('imagem.ejs', { title: "Alterar imagem" })
    } else {
        res.render('imagemOff.ejs', { title: "Alterar imagem" });
    }
})


//dados do frontend
app.post('/token', (req, res) => {
    if (req.body.token == 'logado') {
        token = true;
        usuario = req.body.index;
        senhaUser = req.body.senhaUser;
        loginUser = req.body.loginUser;
    }
})
app.post('/recuperarSenha', (req, res) => {
    let msg = "Seu código de verificação é: " + codigoSnh;
    let subj = "Seu código é " + codigoSnh;
    let para = req.body.email + "@estudante.sed.sc.gov.br"
    run(msg, subj, para)
}
)
app.post('/alterarImagem', (req, res) => {
    var sql = `UPDATE cadastro SET foto_link = "${req.body.caminho}" where(senha='${senhaUser}' AND login='${loginUser}');`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Cadastro Atualizado");
    });
}
)
app.post('/cancela', (req, res) => {
    var sql = `DELETE FROM agendamento where calendario = '${req.body.diaSelecionado}' AND matricula = '${matAtual}';`;
    con.query(sql, function (err, result) {
        if (err) throw err;

    })
});
app.post('/data', (req, res) => {
    let dia = req.body.data;
    let hora = req.body.horario;
    var sql = `INSERT INTO agendamento (cod_agendamento, calendario, turno, matricula, observacao) VALUES (${null},'${dia}','${hora}','${req.body.matricula}','${req.body.observacao}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Agendamento Inserido");
    });
    let msg = "Você fez um agendamento na biblioteca do Plácido para: " + dia + " das: " + hora;
    let subj = "Agendamento Concluído";
    let para = req.body.matricula + "@estudante.sed.sc.gov.br"
    run(msg, subj, para)
});
app.post('/cadastrar', (req, res) => {
    matCad = req.body.matricula;
    var sql = `INSERT INTO cadastro (matricula, nome_aluno, email_aluno, turma, turno, login, senha, foto_link) VALUES ('${req.body.matricula}','${req.body.nome}',
        '${req.body.email}','${req.body.turma}','${req.body.turno}','${req.body.login}','${req.body.senha}','${null}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Cadastro Inserido");

    })
});
app.post('/mudaSenha', (req, res) => {
    var sql = `UPDATE cadastro SET login = '${req.body.login}', senha = '${req.body.senha}' where(matricula = '${req.body.matricula}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Cadastro Atualizado");
    })
});
app.post('/checklist', (req, res) => {
    let t1 = req.body.tarefa1;
    let t2 = req.body.tarefa2;
    let t3 = req.body.tarefa3;
    let t4 = req.body.tarefa4;
    let t5 = req.body.tarefa5;
    var sql = `INSERT INTO checklist (cod_checklist, tarefa1, tarefa2, tarefa3, tarefa4, tarefa5, descricao, matricula) VALUES (${null},'${t1}','${t2}','${t3}','${t4}','${t5}','${req.body.descricao}','${req.body.matricula}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 Dado Inserido");
    })
});

//configurar cadastro com verificaçaõ de email
app.post('/enviaCod', (req, res) => {
    let msg = "Seu código de verificação é: " + codigoCad;
    let subj = "Seu código é " + codigoCad;
    let para = req.body.matricula + "@estudante.sed.sc.gov.br"
    run(msg, subj, para)
})

//dados para o frontend
app.get('/api/cadastro', (req, res) => {
    con.query("SELECT * FROM cadastro", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});
app.get('/api/agendaInfo', (req, res) => {
    con.query(`SELECT nome_aluno, matricula,foto_link from cadastro where(senha='${senhaUser}' && login='${loginUser}')`, function (err, result, fields) {
        if (err) throw err;
        matAtual = result[0].matricula
        res.json(result);

    });
});
app.get('/diasAgendados', (req, res) => {
    con.query(`SELECT calendario from agendamento`, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});
app.get('/codVerif', (req, res) => {
    res.json(codigoCad);
});
app.get('/codVerifSnh', (req, res) => {
    res.json(codigoSnh);
});


app.listen(port, () =>
    console.log('Servidor iniciado em https://localhost' + port + '/')
);