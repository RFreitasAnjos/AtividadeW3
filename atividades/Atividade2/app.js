const express = require("express");
const { engine } = require("express-handlebars");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.port || 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// --------------------------------------------------------------------//

app.use("/bulma", express.static("./node_modules/bulma"));

// --------------------------------------------------------------------//

// Configurando conexão
const conexao = mysql.createConnection({
  host: "localhost",
  user: "aluno",
  password: "ifpecjbg",
  database: "aula3w3",
});

// --------------------------------------------------------------------//

// Realização a conexão
conexao.connect((err) => {
  if (err) {
    console.error("Erro de coneção mysql: " + err.message);
  } else {
    console.error("Conectado");
  }
});

// --------------------------------------------------------------------//

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --------------------------------------------------------------------//

// --------------------------------------------------------------------//
// page inicial
app.get("/", (req, res) => {
  res.render("home");
});
// --------------------------------------------------------------------//

// --------------------------------------------------------------------//
// pagina exito
app.get("/exito", (req, res) => {
  let sql = "SELECT * FROM usuario";
  conexao.query(sql, (erro, retorno) => {
    if (erro) throw erro;
    res.render("exito", { usuario: retorno });
  });
});
// --------------------------------------------------------------------//

// --------------------------------------------------------------------//
// Query postando email e senha
app.post("/api/usuarios", (req, res) => {
  const { email, senha } = req.body;

  const sql = "insert into usuario (email,senha) values (?, ?)";
  conexao.query(sql, [email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao inserir registro: " + err.message);
      res.status(500).json({ error: "erro ao inserir registro" });
    } else {
      console.log("Registro inserido com sucesso!");
      res.redirect("/exito");
    }
  });
});
// --------------------------------------------------------------------//

// --------------------------------------------------------------------//
// Consulta o banco de dados
app.get("/api/usuarios", (req, res) => {
  const sql = "select * from usuario";
  conexao.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar registro: " + err.message);
      res.status(500).json({ error: "Erro ao buscar registros" });
    } else {
      res.status(200).json(results);
    }
  });
});

// --------------------------------------------------------------------//

// --------------------------------------------------------------------//
// Rota para lidar com o método PUT para atualizar um usuário
app.put("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { email, senha } = req.body;

  //Atualizar os dados na tabela 'usuario' no banco de dados usando uma query

  const sql = "UPDATE usuario set email = ?, senha = ? WHERE id = ?";
  conexao.query(sql, [email, senha, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar registro: " + err.message);
      res.status(500).json({ error: "Erro ao atualizar registro" });
    } else {
      console.log("Registro atualizado com sucesso!");
      res.status(200).json({ message: "Registro atualizado com sucesso" });
    }
  });
});

// --------------------------------------------------------------------//

// --------------------------------------------------------------------//
app.delete("/api/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuario WHERE id = ?";
  conexao.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir registro: " + err.message);
    } else {
      if (result.affectedRows > 0) {
        console.log("Registro Excluido com sucesso!");
        //res.status(200).json({ message: "Registro excluido com sucesso " });
        res.redirect("/exito");
      } else {
        console.log("Registro não encontrado.");
        res.status(400).json({ message: "Registro não encontrado" });
      }
    }
  });
});
// --------------------------------------------------------------------//

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
