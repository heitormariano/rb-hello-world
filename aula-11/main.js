const Connection = require('./server/connection');
const HttpServer = require('./server/httpServer');
const LancamentoController = require('./server/lancamentoController');
const LancamentoDao = require('./server/lancamentoDao');

const objConnection = new Connection();
const httpServer = new HttpServer();
const lancamentoDao = new LancamentoDao(objConnection);
const lancamentoController = new LancamentoController(httpServer, lancamentoDao);
httpServer.listen(3000);
