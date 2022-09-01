const janeiro = new Mes('Janeiro');
janeiro.adicionarLancamento(new Lancamento('salario', 'receita', 3500));
janeiro.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1000));
// janeiro.adicionarLancamento(new Lancamento('conta de agua', 'despesa', 200));
// janeiro.adicionarLancamento(new Lancamento('conta de luz', 'despesa', 100));
// janeiro.adicionarLancamento(new Lancamento('Internet', 'despesa', 100));
// janeiro.adicionarLancamento(new Lancamento('Transporte', 'despesa', 300));
// janeiro.adicionarLancamento(new Lancamento('Lazer', 'despesa', 300));
// janeiro.adicionarLancamento(new Lancamento('Alimentacao', 'despesa', 500));
// janeiro.adicionarLancamento(new Lancamento('Condominio', 'despesa', 450));
// janeiro.adicionarLancamento(new Lancamento('Famarcia', 'despesa', 120));

const fevereiro = new Mes('Fevereiro');
fevereiro.adicionarLancamento(new Lancamento('salario', 'receita', 3000));
fevereiro.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1200));
// fevereiro.adicionarLancamento(new Lancamento('conta de agua', 'despesa', 250));
// fevereiro.adicionarLancamento(new Lancamento('conta de luz', 'despesa', 100));
// fevereiro.adicionarLancamento(new Lancamento('Internet', 'despesa', 100));
// fevereiro.adicionarLancamento(new Lancamento('Transporte', 'despesa', 500));
// fevereiro.adicionarLancamento(new Lancamento('Lazer', 'despesa', 100));
// fevereiro.adicionarLancamento(new Lancamento('Alimentacao', 'despesa', 620));
// fevereiro.adicionarLancamento(new Lancamento('Condominio', 'despesa', 460));
// fevereiro.adicionarLancamento(new Lancamento('Famarcia', 'despesa', 120));

const marco = new Mes('Marco');
marco.adicionarLancamento(new Lancamento('salario', 'receita', 4000));
marco.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1200));
// marco.adicionarLancamento(new Lancamento('conta de agua', 'despesa', 200));
// marco.adicionarLancamento(new Lancamento('conta de luz', 'despesa', 100));
// marco.adicionarLancamento(new Lancamento('Internet', 'despesa', 200));
// marco.adicionarLancamento(new Lancamento('Transporte', 'despesa', 500));
// marco.adicionarLancamento(new Lancamento('Lazer', 'despesa', 300));
// marco.adicionarLancamento(new Lancamento('Alimentacao', 'despesa', 1000));
// marco.adicionarLancamento(new Lancamento('Condominio', 'despesa', 600));
// marco.adicionarLancamento(new Lancamento('Famarcia', 'despesa', 250));

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
  // condicao alternativa para o if acima
  /*
  if (text !== '' && text !== null && text !== undefined) {
    element.innerText = text;
  }
  */
  parent.appendChild(element);
}

function renderizar() {
  const app = document.getElementById('app');

  if (app.firstChild) {
    app.firstChild.remove();
  }

  const painel = document.createElement('div');
  for (const mes of ano.meses) {
    console.log(mes.nome);
    addElement(painel, 'h3', mes.nome);

    for (const lancamento of mes.lancamentos) {
      const detalhesLancamento =
        lancamento.tipo + ' ' + lancamento.categoria + ' ' + lancamento.valor;
      addElement(painel, 'p', detalhesLancamento);
    }
    addElement(painel, 'h4', mes.totalizador.saldo);
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
