class Select {
  constructor(id) {
    this.elemento = document.createElement('select');
    this.elemento.id = id;
  }

  adicionarOption(valor) {
    const option = document.createElement('option');
    option.text = valor;
    this.elemento.appendChild(option);
  }
}
