async function connect(){
    if(global.connection)
       return global.connection.connect();
    

    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    const res = await client.query("select now()");
    console.log(res.rows[0]);
    client.release();
    
    global.connection = pool;
    return pool.connect();
}

connect();

//Admin

async function selectCustomersUsuarios(){
  const client = await connect();
  try {
    const res = await client.query("SELECT * FROM usuarios");
    return res.rows;
  } finally {
    client.release();
  }
}

async function selectCustomerUsuarioByNomeSenha(nome, senha){
  const client = await connect();
  try {
    const res = await client.query(
      "SELECT * FROM usuarios WHERE nome = $1 AND senha = $2",
      [nome, senha]
    );
    return res.rows[0] || null;
  } finally {
    client.release();
  }
}

async function selectCustomerUsuarioByNome(nome) {
  const client = await connect();
  try {
    const res = await client.query(
      "SELECT * FROM usuarios WHERE nome = $1",
      [nome]
    );
    return res.rows[0] || null;
  } finally {
    client.release();
  }
}

//Alunos
async function selectCustomersAlunos(){
  const client = await connect();
  try {
    const res = await client.query(`
      SELECT a.*, m.nome AS nome_modalidade
      FROM alunos a
      LEFT JOIN modalidades m ON m.id_modalidade = a.id_modalidade
    `);
    return res.rows;
  } finally {
    client.release();
  }
}

async function selectCustomerAlunos(id){
  const client = await connect();
  try {
    const res = await client.query(
      `SELECT a.*, m.nome AS nome_modalidade
       FROM alunos a
       LEFT JOIN modalidades m ON m.id_modalidade = a.id_modalidade
       WHERE a.id = $1`,
      [id]
    );
    return res.rows[0] || null;
  } finally {
    client.release();
  } 
}
  
//Professores
async function selectCustomersProfessores(){
  const client = await connect();
  try {
    const res = await client.query("SELECT * FROM professores");
    return res.rows;
  } finally {
    client.release();
  }
}


async function selectCustomerProfessores(id) {
  const client = await connect();
  try {
    const res = await client.query(
      "SELECT * FROM professores WHERE id = $1",
      [id]
    );
    return res.rows[0] || null;
  } finally {
    client.release();
  }
}
  


module.exports = {
    selectCustomersUsuarios,
    selectCustomerUsuarioByNomeSenha,
    selectCustomerUsuarioByNome,
    selectCustomersAlunos,
    selectCustomerAlunos,
    selectCustomersProfessores,
    selectCustomerProfessores
}