// Importa o módulo dotenv para carregar variáveis de ambiente de um arquivo .env
import dotenv from 'dotenv';
dotenv.config();
import {resolve} from 'path';

// Importa o framework Express para lidar com as rotas da aplicação
import express from 'express';

// Importa as rotas definidas no arquivo homeRoutes.js
import homeRoutes from './src/routes/homeRoutes';

// Importa as rotas definidas no arquivo homeRoutes.js
import userRoutes from './src/routes/userRoutes';

// Importa as rotas definidas no arquivo homeRoutes.js
import tokenRoutes from './src/routes/tokenRoutes';

// Importa as rotas definidas no arquivo homeRoutes.js
import alunoRoutes from './src/routes/alunoRoutes';

// Importa as rotas definidas no arquivo homeRoutes.js
import fotoRoutes from './src/routes/fotoRoutes';

// Importa o arquivo que inicializa a conexão com o banco de dados
import './src/database'

// Classe principal da aplicação
class App {
    constructor() {
        // Inicializa o servidor Express
        this.app = express();
        // Configuração dos middlewares
        this.middlewares();
        // Configuração das rotas
        this.routes();
    }

    // Configuração dos middlewares
    middlewares() {
        // Middleware para fazer o parsing do corpo das requisições com Content-Type application/x-www-form-urlencoded
        this.app.use(express.urlencoded({ extended: true }));
        // Middleware para fazer o parsing do corpo das requisições com Content-Type application/json
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'uploads')));
    }

    // Configuração das rotas
    routes() {
        // Define as rotas definidas no arquivo homeRoutes.js para a rota raiz '/'
        this.app.use('/', homeRoutes);
        this.app.use('/users/', userRoutes);
        this.app.use('/tokens/', tokenRoutes);
        this.app.use('/alunos/', alunoRoutes);
        this.app.use('/fotos/', fotoRoutes);
    }
}

// Exporta uma instância da classe App, pronta para ser utilizada como servidor Express
export default new App().app;
