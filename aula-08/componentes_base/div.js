class Div {
  constructor(id, nomeClasse) {
    this.elemento = document.createElement('div');
    this.elemento.id = id;

    if (nomeClasse) {
      this.elemento.className = nomeClasse;
    }
  }

  adicionarElementoFilho(filho) {
    this.elemento.appendChild(filho);
  }
}
