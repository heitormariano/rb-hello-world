const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use('/', express.static('./client'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@123',
  database: 'financas_pessoais',
});

app.get('/api/lancamentos', function (req, res) {
  connection.query('SELECT * FROM financas_pessoais.Lancamento', (erro, dados) => {
    if (erro) throw erro;
    res.json(dados);
  });
});

app.post('/api/lancamentos', function (req, res) {
  const lancamento = req.body;
  let sql = 'INSERT INTO financas_pessoais.Lancamento (mes, categoria, tipo, valor) VALUES ?';
  let values = [[lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor]];

  connection.query(sql, [values], function (erro) {
    if (erro) throw erro;
    res.end();
  });
});

app.listen(3000);
