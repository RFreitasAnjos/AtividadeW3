const Sequelize = require("sequelize");

const config = require("../config/db.js");

const conexao = new Sequelize(config);

conexao
  .authenticate()
  .then(() => {
    console.log("Conexão ta rodando");
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados", error);
  });

conexao.sync().then(() =>{
    console.log('')
})

/*----------------------------------------------*/
const categoria = conexao.define("Categorias", {
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const produto = conexao.define("Produtos", {
  nome: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  id_categoria: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  disponivel: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

const clientes = conexao.define("Clientes", {
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  endereco: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});

const pedidos = conexao.define("Pedidos", {
  id_cliente: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  data_pedido: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const itensPedidos = conexao.define("ItensPedidos", {
  id_produtos: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_produtos: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  preco_unitario: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

/*----------------------------------------------------------*/
// Relacionamentos
produto.belongsTo(categoria)


/*----------------------------------------------------------*/
module.exports = {
  conexao,
  categoria,
  produto,
  clientes,
  pedidos,
  itensPedidos
};
