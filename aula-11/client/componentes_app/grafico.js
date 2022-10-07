class Grafico {
  constructor() {
    this.elemento = document.createElement('div');
    this.elemento.className = 'grafico';
    this.cores = ['#d91e1e', '#21ae28', '#e0f905', '#ab0f7c', '#4021c9'];
  }

  adicionarColuna(valorAltura, descricao) {
    const colunaGrafico = document.createElement('div');
    colunaGrafico.className = 'grafico-coluna';

    const corColuna = this.obterCorColuna(valorAltura);
    const descricaoColuna = this.obterDescricaoColuna(descricao);

    colunaGrafico.appendChild(corColuna);
    colunaGrafico.appendChild(descricaoColuna);
    this.elemento.appendChild(colunaGrafico);
  }

  obterCorColuna(valorAltura) {
    const corColuna = document.createElement('div');
    corColuna.className = 'grafico-coluna-cor';
    corColuna.style.height = (valorAltura * 100) / 10000 + 'px';
    corColuna.style.background = this.cores.pop();
    return corColuna;
  }

  obterDescricaoColuna(descricao) {
    const descricaoColuna = document.createElement('div');
    descricaoColuna.className = 'grafico-coluna-texto';
    descricaoColuna.innerText = descricao;
    return descricaoColuna;
  }
}
