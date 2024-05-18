import Sequelize, { Model } from "sequelize"; // Importa o Sequelize e a classe Model do Sequelize

// Define a classe Aluno que estende a classe Model do Sequelize
export default class Aluno extends Model {
    
    // Método estático para inicializar o modelo Aluno com os atributos e as configurações fornecidas
    static init(sequelize) {
        super.init({
            // Definição do atributo nome
            nome: {
                type: Sequelize.STRING, // Tipo STRING do Sequelize
                defaultValue: '', // Valor padrão vazio
                validate: {
                    len: {
                        args: [3, 100], // Define a validação de comprimento (entre 3 e 100 caracteres)
                        msg: 'Nome precisa estar entre 3 e 100 caracteres' // Mensagem de erro
                    },
                },
            },
            // Definição do atributo sobrenome
            sobrenome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 100],
                        msg: 'Sobrenome precisa estar entre 3 e 100 caracteres'
                    },
                },
            },
            // Definição do atributo email
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: ["Email tem que ser único"] // Mensagem de erro para email duplicado
                },
                validate: {
                    isEmail: {
                        msg: 'Email precisa ser válido' // Mensagem de erro para email inválido
                    },
                },
            },
            // Definição do atributo idade
            idade: {
                type: Sequelize.INTEGER,
                defaultValue: '',
                validate: {
                    isInt: {
                        msg: 'Idade precisa ser um número válido' // Mensagem de erro para idade inválida
                    },
                },
            },
            // Definição do atributo peso
            peso: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Peso precisa ser um valor válido' // Mensagem de erro para peso inválido
                    },
                },
            },
            // Definição do atributo altura
            altura: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Altura precisa ser um valor válido' // Mensagem de erro para altura inválida
                    },
                },
            },
        }, {
            sequelize, // Passa o objeto sequelize para configurar a conexão com o banco de dados
        });
        return this; // Retorna a classe Aluno para o Sequelize usar como modelo
    }

    // Método estático para definir associações com outros modelos
    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'aluno_id' }); // Define uma associação hasMany com o modelo Foto
    }
}
