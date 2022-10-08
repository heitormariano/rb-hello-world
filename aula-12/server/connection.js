const mysql = require('mysql2');

class Connection {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Mysql@123',
      database: 'financas_pessoais',
    });
  }

  executeQuery(statement, values, callback) {
    this.connection.query(statement, values, callback);
  }
}

module.exports = Connection;
