const janeiro = new Mes('Janeiro');
janeiro.adicionarLancamento(new Lancamento('salario', 'receita', 3500));
janeiro.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1000));
janeiro.adicionarLancamento(new Lancamento('conta de agua', 'despesa', 200));
janeiro.adicionarLancamento(new Lancamento('conta de luz', 'despesa', 100));

const fevereiro = new Mes('Fevereiro');
fevereiro.adicionarLancamento(new Lancamento('salario', 'receita', 3000));
fevereiro.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1200));
fevereiro.adicionarLancamento(new Lancamento('conta de agua', 'despesa', 250));
fevereiro.adicionarLancamento(new Lancamento('conta de luz', 'despesa', 100));

const marco = new Mes('Marco');
marco.adicionarLancamento(new Lancamento('salario', 'receita', 4000));
marco.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1200));
marco.adicionarLancamento(new Lancamento('conta de agua', 'despesa', 200));
marco.adicionarLancamento(new Lancamento('conta de luz', 'despesa', 100));

const abril = new Mes('Abril');
abril.adicionarLancamento(new Lancamento('salario', 'receita', 4500));
abril.adicionarLancamento(new Lancamento('aluguel', 'despesa', 1300));
abril.adicionarLancamento(new Lancamento('conta de agua', 'despesa', 320));
abril.adicionarLancamento(new Lancamento('conta de luz', 'despesa', 480));

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
  painel.setAttribute('id', 'painel-lancamentos');

  const cores = ['#d91e1e', '#21ae28', '#e0f905', '#ab0f7c', '#4021c9'];
  const grafico = document.createElement('div');
  grafico.className = 'grafico';

  for (mes of ano.meses) {
    const colunaGrafico = document.createElement('div');
    colunaGrafico.className = 'grafico-coluna';

    const corColuna = document.createElement('div');
    corColuna.className = 'grafico-coluna-cor';
    corColuna.style.height = (mes.totalizador.saldo * 100) / 10000 + 'px';
    corColuna.style.background = cores.pop();

    const nomeMesColuna = document.createElement('div');
    nomeMesColuna.className = 'grafico-coluna-texto';
    nomeMesColuna.innerText = mes.nome;

    colunaGrafico.appendChild(corColuna);
    colunaGrafico.appendChild(nomeMesColuna);
    grafico.appendChild(colunaGrafico);
  }

  // adicionando o grafico construido ao painel
  painel.appendChild(grafico);

  for (const mes of ano.meses) {
    addElement(painel, 'h3', mes.nome);

    const tabelaLancamentos = document.createElement('table');
    tabelaLancamentos.className = 'tabela-lancamentos';

    // cabecalhos
    const linhaCabecalho = document.createElement('tr');
    addElement(linhaCabecalho, 'th', 'Categoria');
    addElement(linhaCabecalho, 'th', 'Valor');

    tabelaLancamentos.appendChild(linhaCabecalho);

    for (const lancamento of mes.lancamentos) {
      // Lancamentos de cada mes
      const linhaLancamento = document.createElement('tr');
      addElement(linhaLancamento, 'td', lancamento.categoria);
      addElement(linhaLancamento, 'td', formatarDinheiro(lancamento.valor));
      tabelaLancamentos.appendChild(linhaLancamento);
    }
    // Juros
    const linhaJuros = document.createElement('tr');
    linhaJuros.className = 'destaque-juros';
    addElement(linhaJuros, 'td', 'Juros');
    addElement(linhaJuros, 'td', formatarDinheiro(mes.totalizador.juros));
    tabelaLancamentos.appendChild(linhaJuros);

    // Rendimentos
    const linhaRendimentos = document.createElement('tr');
    linhaRendimentos.className = 'destaque-rendimentos';
    addElement(linhaRendimentos, 'td', 'Rendimentos');
    addElement(linhaRendimentos, 'td', formatarDinheiro(mes.totalizador.rendimentos));
    tabelaLancamentos.appendChild(linhaRendimentos);

    // Saldo ou total
    const linhaSaldo = document.createElement('tr');
    linhaSaldo.className = 'destaque-saldo';
    addElement(linhaSaldo, 'td', 'Saldo');
    addElement(linhaSaldo, 'td', formatarDinheiro(mes.totalizador.saldo));
    tabelaLancamentos.appendChild(linhaSaldo);

    // adicionando tabela preenchida ao painel
    painel.appendChild(tabelaLancamentos);
  }
  // adicionando o painel na div app
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
  mes.value = ano.meses[0].nome;
  tipo.value = 'despesa';
  categoria.value = '';
  valor.value = '';
}

const btnAdicionar = document.getElementById('btnAdicionarLancamento');
btnAdicionar.addEventListener('click', fnAdicionarLancamento);

const mesSelect = document.getElementById('mes');
for (mes of ano.meses) {
  const mesOption = document.createElement('option');
  mesOption.text = mes.nome;
  mesSelect.appendChild(mesOption);
}
