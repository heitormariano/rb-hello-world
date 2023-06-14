const janeiro = new Mes('Janeiro');
janeiro.adicionarLancamento(new Lancamento('salario', 'receita', 3500));
janeiro.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1000));

const fevereiro = new Mes('Fevereiro');
fevereiro.adicionarLancamento(new Lancamento('salario', 'receita', 3000));
fevereiro.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1200));

const marco = new Mes('Marco');
marco.adicionarLancamento(new Lancamento('salario', 'receita', 4000));
marco.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1200));

const abril = new Mes('Abril');
abril.adicionarLancamento(new Lancamento('salario', 'receita', 4500));
abril.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1300));

const ano = new Ano();
ano.adicionarMes(janeiro);
ano.adicionarMes(fevereiro);
ano.adicionarMes(marco);
ano.adicionarMes(abril);
ano.calcularSaldo();

function addElement(parent, elementType, text) {
  const element = document.createElement(elementType);
  if (text) {
    element.innerText = text;
  }

  parent.appendChild(element);
}

function renderizar() {
  const app = document.getElementById('app');

  if (app.firstChild) {
    app.firstChild.remove();
  }

  const painel = document.createElement('div');
  for (const mes of ano.meses) {
    addElement(painel, 'h3', mes.nome);
    for (const lancamento of mes.lancamentos) {
      const detalhesLancamento = `${lancamento.tipo} ${lancamento.categoria} ${lancamento.valor}`;
      addElement(painel, 'p', detalhesLancamento);
    }
    addElement(painel, 'h4', `Saldo: ${mes.totalizador.saldo}`);
    addElement(painel, 'hr');
  }
  app.appendChild(painel);
}

renderizar();

function fnAdicionarLancamento() {
  const mes = document.getElementById('mes');
  const categoria = document.getElementById('categoria');
  const tipo = document.getElementById('tipo');
  const valor = document.getElementById('valor');

  const lancamento = new Lancamento(categoria.value, tipo.value, parseFloat(valor.value));
  ano.adicionarLancamento(mes.value, lancamento);

  ano.calcularSaldo();
  renderizar();

  // redefinindo inputs
  mes.value = '';
  categoria.value = '';
  tipo.value = '';
  valor.value = '';
}

const btnAdicionar = document.getElementById('btnAdicionarLancamento');
btnAdicionar.addEventListener('click', fnAdicionarLancamento);
