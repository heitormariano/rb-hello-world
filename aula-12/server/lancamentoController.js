const LancamentoDto = require('./lancamentoDto');

class LancamentoController {
  constructor(httpServer, lancamentoDao) {
    // analisar o uso de callbacks (melhorar a passagem do terceiro argumento)
    httpServer.register('get', '/api/lancamentos', function (req, res) {
      lancamentoDao.getLancamentos((erro, dados) => {
        if (erro) throw erro;
        const lancamentos = [];
        for (const lancamentoBanco of dados) {
          lancamentos.push(
            new LancamentoDto(
              lancamentoBanco.id_lancamento,
              lancamentoBanco.mes,
              lancamentoBanco.categoria,
              lancamentoBanco.tipo,
              parseFloat(lancamentoBanco.valor)
            )
          );
        }
        res.json(lancamentos);
      });
    });

    // analisar o uso de callbacks
    httpServer.register('post', '/api/lancamentos', function (req, res) {
      const lancamento = req.body;
      lancamentoDao.saveLancamentos(lancamento, function (erro) {
        if (erro) throw erro;
        res.end();
      });
    });

    // Metodo/funcionalidade testada via Postman também
    // metodo DELETE. URL exemplo: http://localhost:3000/api/lancamentos/21
    httpServer.register('delete', '/api/lancamentos/:idLancamento', function (req, res) {
      const idLancamento = req.params.idLancamento;
      lancamentoDao.deleteLancamentos(idLancamento, function (erro) {
        if (erro) throw erro;
        res.end();
      });
    });
  }
}

module.exports = LancamentoController;
