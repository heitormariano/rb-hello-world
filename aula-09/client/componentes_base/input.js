class Input {
  constructor(tipo, id, placeholder) {
    this.elemento = document.createElement('input');
    this.elemento.type = tipo;
    this.elemento.id = id;
    this.elemento.placeholder = placeholder;
  }
}
