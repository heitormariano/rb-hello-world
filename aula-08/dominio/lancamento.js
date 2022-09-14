class Lancamento {
  constructor(categoria, tipo, valor) {
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

  getValor() {
    return this.tipo === 'despesa' ? this.valor * -1 : this.valor;
  }
}
