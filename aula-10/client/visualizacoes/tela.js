class Tela {
  constructor() {
    this.init();
  }

  async init() {
    // recuperar lancamentos do servidor
    const response = await fetch('http://localhost:3000/api/lancamentos');
    const lancamentos = await response.json();

    const ano = new Ano();
    ano.adicionarMes(new Mes('janeiro'));
    ano.adicionarMes(new Mes('fevereiro'));
    ano.adicionarMes(new Mes('marco'));
    ano.adicionarMes(new Mes('abril'));

    for (const lancamento of lancamentos) {
      ano.adicionarLancamento(
        lancamento.mes,
        new Lancamento(lancamento.categoria, lancamento.tipo, parseFloat(lancamento.valor))
      );
    }

    ano.calcularSaldo();
    this.ano = ano;
    this.renderizar();
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

    const url = 'http://localhost:3000/api/lancamentos';
    const lancamentoSalvar = {
      mes: mes.value,
      categoria: categoria.value,
      tipo: tipo.value,
      valor: parseFloat(valor.value),
    };
    fetch(url, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lancamentoSalvar),
    });

    this.ano.calcularSaldo();
    this.renderizar();

    // redefinindo inputs
    mes.value = this.ano.meses[0].nome;
    tipo.value = 'receita';
    categoria.value = '';
    valor.value = '';
  }

  renderizar() {
    // remocao de div app (retira a div para depois recriar elemento)
    document.getElementById('app').remove();

    // criacao de div app e definicao de titulo
    const app = new Div('app');
    const tituloPrincipal = new H4('Financas Pessoais');
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
