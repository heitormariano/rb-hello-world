class Button {
  constructor(id, texto) {
    this.elemento = document.createElement('button');
    this.elemento.id = id;
    this.elemento.innerText = texto;
  }

  adicionarEventListener(evento, funcao) {
    this.elemento.addEventListener(evento, funcao);
  }
}
