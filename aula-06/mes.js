class Mes {
  constructor(nome) {
    if (nome === '') throw new Error('Nome invalido. O nome e obrigatorio');
    this.nome = nome;
    this.saldoInicial = 0;
    this.totalizador = {
      saldo: 0,
      juros: 0,
      rendimentos: 0,
      receitas: 0,
      despesas: 0,
      distribuicaoPercentualDespesas: [],
    };
    this.lancamentos = [];
  }

  adicionarLancamento(lancamento) {
    this.lancamentos.push(lancamento);
  }

  calcularSaldo() {
    this.totalizador = {
      saldo: 0,
      juros: 0,
      rendimentos: 0,
      receitas: 0,
      despesas: 0,
      distribuicaoPercentualDespesas: [],
    };
    this.totalizador.saldo = this.saldoInicial;

    this.apurarReceitas();
    this.apurarDespesas();
    this.distribuirPercentualDespesas();
    this.apurarJuros();
    this.apurarRendimentos();
  }

  apurarReceitas() {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === 'receita') {
        this.totalizador.saldo += lancamento.valor;
        this.totalizador.receitas += lancamento.valor;
      }
    }
  }

  apurarDespesas() {
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === 'despesa') {
        this.totalizador.saldo -= lancamento.valor;
        this.totalizador.despesas += lancamento.valor;
      }
    }
  }

  distribuirPercentualDespesas() {
    const distribuicaoDespesas = [];
    for (const lancamento of this.lancamentos) {
      if (lancamento.tipo === 'despesa') {
        const percentual = arredondar((lancamento.valor / this.totalizador.despesas) * 100);
        distribuicaoDespesas.push({ categoria: lancamento.categoria, percentual });
      }
    }
    this.totalizador.distribuicaoPercentualDespesas = distribuicaoDespesas;
  }

  apurarJuros() {
    if (this.totalizador.saldo < 0) {
      this.totalizador.juros = this.calcularJuros(this.totalizador.saldo);
      this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.juros);
    }
  }

  calcularJuros(saldo) {
    const juros = arredondar(saldo * 0.1);
    return juros;
  }

  apurarRendimentos() {
    if (this.totalizador.saldo > 0) {
      this.totalizador.rendimentos = this.calcularRendimentos(this.totalizador.saldo);
      this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.rendimentos);
    }
  }

  calcularRendimentos(saldo) {
    const rendimentos = arredondar(saldo * 0.05);
    return rendimentos;
  }
}
