import mysql from 'mysql';

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'sua_base_de_dados'
});

connection.connect((err: any) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados MySQL estabelecida.');
});

function setupDatabase() {
  connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      sobrenome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL
    )
  `, (err: any) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
    } else {
      console.log('Tabela criada ou já existente.');
    }
  });

  return connection;
}

export default setupDatabase;
