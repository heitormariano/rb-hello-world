const express = require('express');
const app = express();
app.use(express.json());
app.use('/', express.static('./client'));

const lancamentos = [
  { mes: 'janeiro', categoria: 'salario', tipo: 'receita', valor: 3500 },
  { mes: 'janeiro', categoria: 'aluguel', tipo: 'despesa', valor: 1000 },
  { mes: 'janeiro', categoria: 'conta de agua', tipo: 'despesa', valor: 200 },
  { mes: 'janeiro', categoria: 'conta de luz', tipo: 'despesa', valor: 100 },
  { mes: 'fevereiro', categoria: 'salario', tipo: 'receita', valor: 3000 },
  { mes: 'fevereiro', categoria: 'aluguel', tipo: 'despesa', valor: 1200 },
  { mes: 'fevereiro', categoria: 'conta de agua', tipo: 'despesa', valor: 250 },
  { mes: 'fevereiro', categoria: 'conta de luz', tipo: 'despesa', valor: 100 },
  { mes: 'marco', categoria: 'salario', tipo: 'receita', valor: 4000 },
  { mes: 'marco', categoria: 'aluguel', tipo: 'despesa', valor: 1200 },
  { mes: 'marco', categoria: 'conta de agua', tipo: 'despesa', valor: 200 },
  { mes: 'marco', categoria: 'conta de luz', tipo: 'despesa', valor: 100 },
  { mes: 'abril', categoria: 'salario', tipo: 'receita', valor: 4500 },
  { mes: 'abril', categoria: 'aluguel', tipo: 'despesa', valor: 1300 },
  { mes: 'abril', categoria: 'conta de agua', tipo: 'despesa', valor: 320 },
  { mes: 'abril', categoria: 'conta de luz', tipo: 'despesa', valor: 480 },
];

app.get('/api/lancamentos', function (req, res) {
  res.json(lancamentos);
});

app.post('/api/lancamentos', function (req, res) {
  const lancamento = req.body;
  console.log(lancamento);
  lancamentos.push(lancamento);
  res.end();
});

app.listen(3000);
