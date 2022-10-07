const express = require('express');

class HttpServer {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/', express.static('./client'));
  }

  // estudar o uso de parametros e o body das requisicoes
  register(method, url, callback) {
    this.app[method](url, callback);
  }

  listen(port) {
    this.app.listen(port);
  }
}

module.exports = HttpServer;
