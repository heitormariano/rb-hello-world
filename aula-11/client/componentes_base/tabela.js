class Tabela {
  constructor(nomeClasse) {
    this.elemento = document.createElement('table');
    this.elemento.className = nomeClasse;
  }

  adicionarLinha(tipo, valores, nomeClasse, buttons) {
    const tr = document.createElement('tr');

    for (const valor of valores) {
      const td = document.createElement(tipo);
      td.innerText = valor;
      tr.appendChild(td);
    }

    if (nomeClasse) {
      tr.className = nomeClasse;
    }

    if (buttons) {
      for (const button of buttons) {
        const td = document.createElement(tipo);
        td.append(button.elemento);
        tr.appendChild(td);

        console.log(button);
        console.log(tr);
        console.log(tr);
      }
    }

    this.elemento.appendChild(tr);
  }
}
