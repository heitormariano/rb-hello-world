class Tela {
  constructor() {
    this.ano = this.definirLancamentosAno();
  }

  definirLancamentosAno() {
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

    return ano;
  }

  formatarDinheiro(valor) {
    return new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(valor);
  }

  adicionarLancamentoForm() {
    const mes = document.getElementById('mes');
    const categoria = document.getElementById('categoria');
    const tipo = document.getElementById('tipo');
    const valor = document.getElementById('valor');

    const lancamento = new Lancamento(categoria.value, tipo.value, parseFloat(valor.value));
    this.ano.adicionarLancamento(mes.value, lancamento);

    this.ano.calcularSaldo();
    this.renderizar();

    // redefinindo inputs
    mes.value = this.ano.meses[0].nome;
    tipo.value = 'despesa';
    categoria.value = '';
    valor.value = '';
  }

  renderizar() {
    // remocao de div app (retira a div para depois recriar elemento)
    document.getElementById('app').remove();

    // criacao de div app e definicao de titulo
    const app = new Div('app');
    const tituloPrincipal = new H4('Finanças Pessoais');
    app.adicionarElementoFilho(tituloPrincipal.elemento);

    // criacao de form e seus elementos
    const form = new Div('form-lancamento');
    const mesSelect = new Select('mes');
    for (const mes of this.ano.meses) {
      mesSelect.adicionarOption(mes.nome);
    }
    const tipoSelect = new Select('tipo');
    tipoSelect.adicionarOption('receita');
    tipoSelect.adicionarOption('despesa');

    const categoriaInputText = new Input('text', 'categoria', 'categoria');
    const valorInputNumber = new Input('number', 'valor', 'valor');

    // adicionar lancamento ao pressionar tecla Enter (evento definido para o input valor)
    valorInputNumber.elemento.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        this.adicionarLancamentoForm();
      }
    });

    const btnAdicionar = new Button('btnAdicionarLancamento', 'Adicionar Lancamento');
    btnAdicionar.adicionarEventListener('click', () => {
      this.adicionarLancamentoForm();
    });

    form.adicionarElementoFilho(mesSelect.elemento);
    form.adicionarElementoFilho(tipoSelect.elemento);
    form.adicionarElementoFilho(categoriaInputText.elemento);
    form.adicionarElementoFilho(valorInputNumber.elemento);
    form.adicionarElementoFilho(btnAdicionar.elemento);

    // adicionando form a div app
    app.adicionarElementoFilho(form.elemento);

    // construcao do grafico
    const grafico = new Grafico();
    for (const mes of this.ano.meses) {
      grafico.adicionarColuna(mes.totalizador.saldo, mes.nome);
    }

    // adicionando o grafico a div app
    app.adicionarElementoFilho(grafico.elemento);

    // criacao de tabela de lancamentos
    for (const mes of this.ano.meses) {
      const tituloMes = new H4(mes.nome);
      app.adicionarElementoFilho(tituloMes.elemento);

      const tabelaLancamentos = new Tabela('tabela-lancamentos');
      tabelaLancamentos.adicionarLinha('th', ['Categoria', 'Valor']);

      for (const lancamento of mes.lancamentos) {
        tabelaLancamentos.adicionarLinha('td', [
          lancamento.categoria,
          this.formatarDinheiro(lancamento.getValor()),
        ]);
      }

      tabelaLancamentos.adicionarLinha(
        'td',
        ['Juros', this.formatarDinheiro(mes.totalizador.juros)],
        'destaque-juros'
      );

      tabelaLancamentos.adicionarLinha(
        'td',
        ['Rendimentos', this.formatarDinheiro(mes.totalizador.rendimentos)],
        'destaque-rendimentos'
      );

      tabelaLancamentos.adicionarLinha(
        'td',
        ['Saldo', this.formatarDinheiro(mes.totalizador.saldo)],
        'destaque-saldo'
      );

      // adicionando tabela preenchida a div app
      app.adicionarElementoFilho(tabelaLancamentos.elemento);
    }
    // destructuring assignment
    const [body] = document.getElementsByTagName('body');
    body.appendChild(app.elemento);

    // Obtendo element via indice (metodo getElementsByTagName retorna um array)
    // const body = document.getElementsByTagName('body')[0];
    // body.appendChild(app.elemento);
  }
}
