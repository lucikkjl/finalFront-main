import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/config.js';

import UserModel from './user.js';
import CategoryModel from './category.js';
import ProductModel from './product.js';
import OrderModel from './order.js';
import OrderProductModel from './OrderProduct.js'; // Verifique a capitalização deste nome de arquivo!

// Obtém o ambiente atual (development ou production)
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env]; // Seleciona a configuração correta com base no ambiente

// Cria a instância do Sequelize usando as CONFIGURAÇÕES DO AMBIENTE (config)
const sequelize = new Sequelize(
  config.database, // <-- CORRIGIDO: Usar config.database
  config.username, // <-- CORRIGIDO: Usar config.username
  config.password, // <-- CORRIGIDO: Usar config.password
  {
    host: config.host, // <-- CORRIGIDO: Usar config.host
    dialect: config.dialect, // <-- CORRIGIDO: Usar config.dialect
    operatorsAliases: false,
    // Adiciona opções de dialeto, especialmente para SSL se o provedor de BD exigir
    // Isso é importante se o seu banco de dados hospedado exigir SSL (muitos serviços de nuvem exigem)
    dialectOptions: config.dialectOptions || {}
  }
);

try {
  await sequelize.authenticate();
  console.log('Conectado com o Banco de Dados.');
} catch (err) {
  console.error('Não foi possível conectar ao banco de dados:', err);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, DataTypes);
db.Category = CategoryModel(sequelize, DataTypes);
db.Product = ProductModel(sequelize, DataTypes);
db.Order = OrderModel(sequelize, DataTypes);
db.OrderProduct = OrderProductModel(sequelize, DataTypes);

// Relacionamentos das tabelas
// Percorre todos os modelos e chama a função associate se ela existir
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


try {
  await sequelize.sync({ force: false });
  console.log('Tabelas sincronizadas.');
} catch (err) {
  console.error('Erro ao sincronizar as tabelas:', err);
}

export default db;