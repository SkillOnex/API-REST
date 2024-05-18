import Sequelize, { Model } from "sequelize"; // Importa o Sequelize e a classe Model do Sequelize
import bcryptjs from 'bcryptjs'; // Importa a biblioteca bcryptjs para hashing de senhas

// Define a classe User que estende a classe Model do Sequelize
export default class User extends Model {
    
    // Método estático para inicializar o modelo User com os atributos e as configurações fornecidas
    static init(sequelize) {
        super.init({
            // Definição do atributo nome
            nome: {
                type: Sequelize.STRING, // Tipo STRING do Sequelize
                defaultValue: '', // Valor padrão vazio
                validate: {
                    len: {
                        args: [3, 30], // Define a validação de comprimento (entre 3 e 30 caracteres)
                        msg: 'Campo nome deve conter entre 3 e 30 caracteres', // Mensagem de erro
                    },
                },
            },
            // Definição do atributo email
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'E-mail já existe' // Mensagem de erro para email duplicado
                },
                validate: {
                    isEmail: {
                        msg: 'Email inválido' // Mensagem de erro para email inválido
                    },
                },
            },
            // Definição do atributo password_hash (hash da senha)
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            // Definição do atributo virtual password (senha em texto plano)
            password: {
                type: Sequelize.VIRTUAL, // Tipo VIRTUAL, não armazenado no banco de dados
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50], // Define a validação de comprimento (entre 6 e 50 caracteres)
                        msg: 'Campo senha deve conter entre 6 e 50 caracteres', // Mensagem de erro
                    },
                },
            },
        }, {
            sequelize, // Passa o objeto sequelize para configurar a conexão com o banco de dados
        });

        // Adiciona um hook (gancho) que será executado antes de salvar um usuário
        this.addHook('beforeSave', async user => {
            if (user.password) { // Se a senha foi fornecida
                user.password_hash = await bcryptjs.hash(user.password, 8); // Gera o hash da senha e armazena em password_hash
            }
        });

        return this; // Retorna a classe User para o Sequelize usar como modelo
    }

    // Método para verificar se a senha fornecida é válida comparando com o hash armazenado
    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
}
