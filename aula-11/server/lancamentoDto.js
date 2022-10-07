class LancamentoDto {
  constructor(idLancamento, mes, categoria, tipo, valor) {
    this.idLancamento = idLancamento;
    this.mes = mes;
    if (categoria === '') {
      throw new Error('Lancamento Invalido: A categoria e informacao obrigatoria');
    }

    if (tipo !== 'receita' && tipo !== 'despesa') {
      throw new Error('Lancamento Invalido: O tipo deve ser receita ou despesa');
    }

    if (valor <= 0) {
      throw new Error('Lancamento Invalido: O valor deve ser maior do que zero');
    }
    this.categoria = categoria;
    this.tipo = tipo;
    this.valor = valor;
  }
}

module.exports = LancamentoDto;
