import Sequelize, { Model } from "sequelize"; // Importa o Sequelize e a classe Model do Sequelize
import appConfig from "../config/appConfig"; // Importa as configurações do aplicativo

// Define a classe Foto que estende a classe Model do Sequelize
export default class Foto extends Model {
    
    // Método estático para inicializar o modelo Foto com os atributos e as configurações fornecidas
    static init(sequelize) {
        super.init({
            // Definição do atributo originalname
            originalname: {
                type: Sequelize.STRING, // Tipo STRING do Sequelize
                defaultValue: '', // Valor padrão vazio
                validate: {
                    notEmpty: {
                        msg: 'Campo não pode ficar vazio' // Mensagem de erro se o campo estiver vazio
                    },
                },
            },
            // Definição do atributo filename
            filename: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'Campo não pode ficar vazio' // Mensagem de erro se o campo estiver vazio
                    },
                },
            },
            // Definição do atributo virtual url
            url: {
                type: Sequelize.VIRTUAL, // Tipo VIRTUAL, não armazenado no banco de dados
                get() {
                    return `${appConfig.url}/images/${this.getDataValue('filename')}`; // Gera a URL completa da imagem
                }
            }
        }, {
            sequelize, // Passa o objeto sequelize para configurar a conexão com o banco de dados
            tableName: 'fotos', // Define o nome da tabela
        });
        return this; // Retorna a classe Foto para o Sequelize usar como modelo
    }

    // Método estático para definir associações com outros modelos
    static associate(models) {
        this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' }); // Define uma associação belongsTo com o modelo Aluno
    }
}
