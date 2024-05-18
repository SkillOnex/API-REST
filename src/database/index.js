import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import Aluno from "../models/aluno";
import User from "../models/User";
import Foto from "../models/Foto";

const models = [Aluno,User,Foto];

// Cria uma nova conexão Sequelize usando as configurações do banco de dados
const connection = new Sequelize(databaseConfig);

// Inicializa cada modelo com a conexão Sequelize
models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
