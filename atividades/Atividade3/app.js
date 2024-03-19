const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conexao = mysql.createConnection({
  host: "localhost",
  user: "aluno",
  password: "y",
  database: "aulaw3",
});

conexao.connect((err) => {
  if (err) {
    console.error("Erro de coneção mysql: " + err.message);
  } else {
    console.error("Conectado");
  }
});

//------------------------------------------------------------------//
//                              Categorias                          //
//------------------------------------------------------------------//
app.get("/api/categorias", (req, res) => {
  const sql = "SELECT * FROM Categorias";
  conexao.query(sql, (erro, results) => {
    if (erro) {
      console.error("Erro ao buscar registros" + erro.message);
      res.status(500).json({ error: "Erro ao busar registros" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/api/insere/categorias", (req, res) => {
  const { nome, descricao } = req.body;

  const sql = "INSERT INTO Categorias (nome, descricao) VALUES (?, ?)";
  conexao.query(sql, [nome, descricao], (erro, results) => {
    if (erro) {
      console.error("Erro ao inserir registro: " + erro.message);
      res.status(500).json({ error: "Erro ao inseir registro" });
    } else {
      console.log("Registro inserido com sucesso!");
      res.status(201).json({ message: "Registro inserido com sucesso" });
    }
  });
});

app.delete("/api/delete/categorias/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Categorias WHERE id = ?";
  conexao.query(sql, [id], (erro, results) => {
    if (erro) {
      console.error("Erro ao excluir registro: " + erro.message);
      res.status(500).json({ error: "Erro ao excluir registro" });
    } else {
      if (results.affectedRows > 0) {
        console.log("Registro excluido com sucesso!");
        res.status(200).json({ message: "Registro excluido com sucesso" });
      } else {
        console.log("Registro não encontrado.");
        res.status(404).json({ message: "Registro não encontrado" });
      }
    }
  });
});

app.put("/api/atualiza/categorias/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  const sql = "UPDATE Categorias SET nome= ?, descricao=? Where id = ?";
  conexao.query(sql, [nome, descricao, id], (erro, results) => {
    if (erro) {
      console.error("Erro ao atualizar registro: " + erro.message);
      res.status(500).json({ error: "Erro ao atualizar o registro" });
    } else {
      console.log("Registro atualizado com sucesso!");
      res.status(200).json({ message: "Registro atualizado com sucesso" });
    }
  });
});

//---------------------------------------------------------------------//

//------------------------------------------------------------------//
//                              clientes                            //
//------------------------------------------------------------------//

app.get("/api/clientes", (req, res) => {
  const sql = "SELECT * FROM Clientes";
  conexao.query(sql, (erro, results) => {
    if (erro) {
      console.error("Erro localizar registro do cliente" + erro.message);
      res.status(500).json({ erro: "Erro ao localizar registro do cliente" });
    } else {
      console.log("Cliente localizado com sucesso!");
      res.status(200).json(results);
    }
  });
});

app.post("/api/insere/clientes", (req, res) => {
  const { nome, email, endereco, telefone } = req.body;

  const sql =
    "INSERT INTO Clientes (nome,email,endereco,telefone) VALUES (?,?,?,?)";
  conexao.query(sql, [nome, email, endereco, telefone], (erro, results) => {
    if (erro) {
      console.error("Erro ao inserir cliente" + erro.message);
      res.status(500).json({ erro: "Erro ao inserir cliente" });
    } else {
      console.log("Cliente inserido com sucesso");
      res.status(200).json({ message: "Cliente inserido com sucesso" });
    }
  });
});

app.put("/api/atualiza/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, endereco, telefone } = req.body;

  const sql =
    "UPDATE Clientes SET nome= ?, email= ?, endereco= ?, telefone= ? WHERE id= ?";
  conexao.query(sql, [nome, email, endereco, telefone, id], (erro, results) => {
    if (erro) {
      console.error("Erro ao atualizar o registro do cliente" + erro.message);
      res
        .status(500)
        .json({ error: "Erro ao atualizar o registro do cliente" });
    } else {
      console.log(sql);
      res.status(200).json({ message: "Cliente atualizado com sucesso" });
    }
  });
});

app.delete("/api/delete/clientes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Clientes WHERE id = ?";
  conexao.query(sql, [id], (erro, results) => {
    if (erro) {
      console.error("Erro ao excluir cliente" + erro.message);
      res.status(500).json({ error: "Erro ao excluir cliente" });
    } else {
      if (results.affectedRows > 0) {
        console.log("Registro excluido com sucesso!");
        res.status(200).json({ message: "Registro excluido com sucesso" });
      } else {
        console.log("Cliente não encontrado");
        res.status(404).json({ message: "Cliente não encontrado" });
      }
    }
  });
});

//------------------------------------------------------------------//
//                              Produtos                            //
//------------------------------------------------------------------//

app.get("/api/produtos", (req, res) => {
  const sql = "SELECT * FROM Produtos";

  conexao.query(sql, (erro, results) => {
    if (erro) {
      console.error("Erro ao buscar produto" + erro.message);
      res.status(500).json({ error: "Erro ao buscar produto" });
    } else {
      console.log(sql);
      res.status(200).json(results);
    }
  });
});

app.get("/api/produtos/:nome", (req, res) => {
  const { nome } = req.body
  const sql = "SELECT * FROM Produtos WHERE nome=?";

  conexao.query(sql, (erro, results) => {
    if (erro) {
      console.error("Erro ao buscar produto" + erro.message);
      res.status(500).json({ error: "Erro ao buscar produto" });
    } else {
      console.log(sql);
      res.status(200).json(results);
    }
  });
});


app.post("/api/insere/produtos", (req, res) => {
  const { nome, descricao, preco, id_categoria, disponivel } = req.body;
  const sql =
    "INSERT INTO Produtos (nome,descricao,preco,id_categoria,disponivel) VALUES (?,?,?,?,?)";
  conexao.query(
    sql,
    [nome, descricao, preco, id_categoria, disponivel],
    (erro, results) => {
      if (erro) {
        console.error("Erro ao inserir o produto" + erro.message);
        res.status(500).json({ error: "Erro ao inserir o produto" });
      } else {
        console.log("Produto inserido com sucesso");
        res.status(201).json({ message: "Produto inserido com sucesso" });
      }
    },
  );
});

app.delete("/api/delete/produtos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Produtos where id=?";
  conexao.query(sql, [id], (erro, results) => {
    if (erro) {
      console.error("Erro ao deletar produto" + erro.message);
      res.status(500).json({ error: "Erro ao deletar produto" });
    } else {
      if (results.affectedRows > 0) {
        console.log("Produto deletado com sucesso");
        res.status(200).json({ message: "Produto deletado com sucesso" });
      } else {
        console.log("Produto não encontrado");
        res.status(404).json({ message: "Produto não encontrado" });
      }
    }
  });
});

app.put("/api/altera/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, id_categoria, disponivel } = req.body;

  const sql =
    "UPDATE produtos SET nome = ?, descricao = ?,preco = ?, id_categoria= ?, disponivel = ? WHERE id=?";
  conexao.query(
    sql,
    [nome, descricao, preco, id_categoria, disponivel,id],
    (erro, results) => {
      if (erro) {
        console.error("Erro ao alterar o Produto");
        res.status(500).json({ error: "Erro ao atualizar o produto" });
      } else {
        console.log(sql);
        res.status(200).json({ message: "Produto alterado com sucesso" });
      }
    },
  );
});

//------------------------------------------------------------------//

//------------------------------------------------------------------//
//                           Pedidos                                //
//------------------------------------------------------------------//

app.get("/api/pedidos", (req,res) =>{
  const sql = "SELECT * FROM pedidos";

  conexao.query(sql, (erro,results) =>{
    if(erro) {
      console.error("Erro ao localizar o pedido" + erro.message)
      res.status(500).json({ error: "Erro ao localizar o pedido"})
    }else{
      console.log(sql);
      res.status(200).json(results);
    }
  })
});

app.post("/api/realizapedidos",(req,res) =>{
  const sql = "INSERT INTO pedido (id_pedido, id_produto,quantidade,preco_unitario) VALUES (?,?,?,?)";
  conexao.query(sql,[],(erro,results) =>{
    if(erro) {
      console.error("Erro ao realizar o pedido" + erro.message);
      res.status(500).json({ error: "Erro ao realizar o pedido"});
    } else{
      console.log("Pedido realizado com sucesso");
      res.status(201).json({ message: "Produto realizado com sucesso"});
    }
  });
});

app.put("/api/alterapedido/:id",(req,res) =>{
  const { id } = req.params;
  const { id_produto,quantidade,preco,preco_unitario } = req.body;

  const sql = "UPDATE pedidos SET id_produto = ?, quantidade = ?, preco = ?, preco_unitario = ? where id=?";
  conexao.sql(sql,[],(erro,results) => {
      if(erro){
        console.error("Erro ao alterar pedido" + erro.message)
        res.status(500).json({ error: "Erro ao alterar pedido" });
      }else{
        console.log(sql);
        res.status(200).json({message: "Pedido alterado com sucesso"});
      }
  });
});

app.delete("/api/deletapedido/:id",(req,res) =>{
  const { id } = req.params;
  
  const sql = "DELETE FROM pedidos WHERE id=?"
  conexao.query(sql,[id],(erro,results) =>{
    if(erro) {
      console.error("Erro ao deletar pedido" + erro.message);
      res.status(500).json({ error: "Erro ao deletar pedido"});
    } else{
      if (results.affectedRows > 0){
        console.log("Pedido deletado com sucesso");
        res.status(200).json({ message: "Pedido deletado com sucesso"})
      } else{
        console.log("Pedido nao localizado");
        res.status(404).json({ message: "Pedido nao encontrado"})
      }
    }
  });
});






//------------------------------------------------------------------//
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
