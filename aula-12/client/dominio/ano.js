class Ano {
  constructor() {
    this.meses = [];
  }

  adicionarMes(mes) {
    this.meses.push(mes);
  }

  adicionarLancamento(nomeMes, lancamento) {
    if (!this.meses.some(mes => mes.nome === nomeMes)) {
      this.adicionarMes(new Mes(nomeMes));
    }

    for (const mes of this.meses) {
      if (mes.nome.toLowerCase() === nomeMes.toLowerCase()) {
        mes.adicionarLancamento(lancamento);
        break;
      }
    }
  }

  excluirLancamento(mes, lancamento) {
    const posicao = mes.lancamentos.indexOf(lancamento);
    mes.lancamentos.splice(posicao, 1);
  }

  calcularSaldo() {
    let saldoInicial = 0;
    for (const mes of this.meses) {
      mes.saldoInicial = saldoInicial;
      mes.calcularSaldo();
      saldoInicial = mes.totalizador.saldo;
    }
  }
}
