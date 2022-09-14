class Tabela {
  constructor(nomeClasse) {
    this.elemento = document.createElement('table');
    this.elemento.className = nomeClasse;
  }

  adicionarLinha(tipo, valores, nomeClasse) {
    const tr = document.createElement('tr');

    for (const valor of valores) {
      const td = document.createElement(tipo);
      td.innerText = valor;
      tr.appendChild(td);
    }

    if (nomeClasse) {
      tr.className = nomeClasse;
    }

    this.elemento.appendChild(tr);
  }
}
