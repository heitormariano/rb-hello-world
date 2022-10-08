class Tela {
  constructor(lancamentoService) {
    this.lancamentoService = lancamentoService;
    this.init();
  }

  async init() {
    const lancamentos = await this.lancamentoService.getLancamentos();
    this.ano = new Ano();
    for (const lancamento of lancamentos) {
      this.ano.adicionarLancamento(
        lancamento.mes,
        new Lancamento(
          lancamento.categoria,
          lancamento.tipo,
          lancamento.valor,
          lancamento.idLancamento
        )
      );
    }

    this.ano.calcularSaldo();
    this.renderizar();
  }

  formatarDinheiro(valor) {
    return new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(valor);
  }

  adicionarLancamentoForm() {
    const mes = this.mesSelect.obterValor();
    const categoria = this.categoriaInputText.obterValor();
    const tipo = this.tipoSelect.obterValor();
    const valor = this.valorInputNumber.obterValor();

    const lancamentoSalvar = {
      mes: mes,
      categoria: categoria,
      tipo: tipo,
      valor: valor,
    };

    // tambem funciona definir os valores do objeto desta forma
    // const lancamentoSalvar = { mes, categoria, tipo, valor,};

    this.lancamentoService.saveLancamentos(lancamentoSalvar);
    this.init();
  }

  excluirLancamentoTabela(mes, lancamento) {
    this.lancamentoService.deleteLancamentos(lancamento.idLancamento);
    this.ano.excluirLancamento(mes, lancamento);
    this.ano.calcularSaldo();
    this.renderizar();
  }

  renderizar() {
    // remocao de div app (retira a div para depois recriar elemento)
    document.getElementById('app').remove();

    // criacao de div app e definicao de titulo
    const app = new Div('app');
    const tituloPrincipal = new H4('Financas Pessoais');
    app.adicionarElementoFilho(tituloPrincipal.elemento);

    const form = this.criarForm();
    app.adicionarElementoFilho(form.elemento);

    const grafico = this.criarGrafico();
    app.adicionarElementoFilho(grafico.elemento);

    for (const mes of this.ano.meses) {
      const tituloMes = new H4(mes.nome);
      app.adicionarElementoFilho(tituloMes.elemento);

      const tabelaLancamentos = this.criarTabelaLancamentos(mes);
      app.adicionarElementoFilho(tabelaLancamentos.elemento);
    }
    const [body] = document.getElementsByTagName('body');
    body.appendChild(app.elemento);
  }

  criarForm() {
    const form = new Div('form-lancamento');

    this.mesSelect = new Select('mes');
    for (const mes of this.ano.meses) {
      this.mesSelect.adicionarOption(mes.nome);
    }

    this.tipoSelect = new Select('tipo');
    this.tipoSelect.adicionarOption('receita');
    this.tipoSelect.adicionarOption('despesa');

    this.categoriaInputText = new Input('text', 'categoria', 'categoria');
    this.valorInputNumber = new Input('number', 'valor', 'valor');

    // adicionar lancamento ao pressionar tecla Enter (evento definido para o input valor)
    this.valorInputNumber.elemento.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        this.adicionarLancamentoForm();
      }
    });

    const btnAdicionar = new Button('btnAdicionarLancamento', 'Adicionar Lancamento');
    btnAdicionar.adicionarEventListener('click', () => {
      this.adicionarLancamentoForm();
    });

    form.adicionarElementoFilho(this.mesSelect.elemento);
    form.adicionarElementoFilho(this.tipoSelect.elemento);
    form.adicionarElementoFilho(this.categoriaInputText.elemento);
    form.adicionarElementoFilho(this.valorInputNumber.elemento);
    form.adicionarElementoFilho(btnAdicionar.elemento);

    return form;
  }

  criarGrafico() {
    const grafico = new Grafico();
    for (const mes of this.ano.meses) {
      grafico.adicionarColuna(mes.totalizador.saldo, mes.nome);
    }

    return grafico;
  }

  criarTabelaLancamentos(mes) {
    const tabelaLancamentos = new Tabela('tabela-lancamentos');
    tabelaLancamentos.adicionarLinha('th', ['Id', 'Categoria', 'Valor', 'Acoes']);

    for (const lancamento of mes.lancamentos) {
      const btnExcluir = new Button('excluir-lancamento', 'Excluir');
      btnExcluir.adicionarEventListener('click', () => {
        this.excluirLancamentoTabela(mes, lancamento);
      });
      tabelaLancamentos.adicionarLinha(
        'td',
        [
          lancamento.idLancamento,
          lancamento.categoria,
          this.formatarDinheiro(lancamento.getValor()),
        ],
        null,
        [btnExcluir]
      );
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

    return tabelaLancamentos;
  }
}
