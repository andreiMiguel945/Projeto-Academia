require("dotenv").config();

const db = require("./database.js");
const port = process.env.PORT || 3000;

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
      message: "API RODANDO COM SUCESSO",
    })
})

app.post("/login", async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ error: "Nome e senha são obrigatórios" });
  }

  try {
    const usuarioPorNome = await db.selectCustomerUsuarioByNome(nome);

    if (!usuarioPorNome) {
      return res.status(401).json({ field: "nome", error: "Nome inválido" });
    }

    const usuario = await db.selectCustomerUsuarioByNomeSenha(nome, senha);
    if (!usuario) {
      return res.status(401).json({ field: "senha", error: "Senha inválida" });
    }

    res.json({ message: "Login validado", usuario: { id: usuario.id, nome: usuario.nome } });
  } catch (error) {
    console.error("Erro em POST /login:", error);
    res.status(500).json({ error: "Erro ao validar login" });
  }
})


app.listen(port, () => {
  console.log(`RODANDO  NA PORTA ${port}`);
});