class LancamentoDao {
  constructor(objConnection) {
    this.objConnection = objConnection;
  }

  getLancamentos(callback) {
    this.objConnection.executeQuery('SELECT * FROM financas_pessoais.Lancamento', null, callback);
  }

  saveLancamentos(lancamento, callback) {
    let sql = 'INSERT INTO financas_pessoais.Lancamento (mes, categoria, tipo, valor) VALUES ?';
    let values = [[lancamento.mes, lancamento.categoria, lancamento.tipo, lancamento.valor]];

    this.objConnection.executeQuery(sql, [values], callback);
  }

  deleteLancamentos(idLancamento, callback) {
    let sql = 'DELETE FROM financas_pessoais.Lancamento WHERE id_lancamento = ?';
    let idLancamentoExcluir = idLancamento;

    this.objConnection.executeQuery(sql, [idLancamentoExcluir], callback);
  }
}

module.exports = LancamentoDao;
