import User from "../models/User";

class UserController {
    
    // Método para criar um novo usuário
    async store(req, res){
        try {
            // Cria um novo User no banco de dados utilizando os dados do corpo da requisição
            const novoUser  = await User.create(req.body);

            const {id , nome , email} = novoUser
            
            // Retorna os dados do novo User como resposta JSON
            return res.json({id , nome , email});
        } catch (e) {
            // Se houver erros durante a criação do usuário, retorna um status 400 com os detalhes do erro
            return res.status(400).json({
               erros : e.errors.map((err) => err.message)
            });
        }
        
    }

    // Método para listar todos os usuários
    async index(req,res){
        try {
           
            // Busca todos os usuários no banco de dados
            const users = await User.findAll({attributes: ['id', 'nome', 'email']});
            // Retorna os usuários encontrados como resposta JSON
            return res.json(users);
        } catch (e) {
            // Se houver erros durante a busca dos usuários, retorna os detalhes do erro
            return res.json(e);
        }
    }

    // Método para exibir detalhes de um usuário específico
    async show(req,res){
        try {
           
            // Busca um usuário pelo ID fornecido na requisição
            const user = await User.findByPk(req.params.id);
            const {id , nome , email} = user;
            // Retorna os dados do usuário encontrado como resposta JSON
            return res.json({id,nome,email});

        } catch (e) {
            // Se houver erros durante a busca do usuário, retorna os detalhes do erro
            return res.json(e);
        }
    }

    // Método para atualizar dados de um usuário
    async update(req,res){
        try {
            
            
            // Busca o usuário pelo ID fornecido na requisição
            const user = await User.findByPk(req.userID);

            // Se o usuário não existir, retorna um erro
            if(!user){
                return res.status(400).json({
                    errors: ['User Not Exist.'],
                });
            }

            // Atualiza os dados do usuário com os dados fornecidos no corpo da requisição
            const novosDados = await user.update(req.body);

            const {id , nome , email} = novosDados;
            // Retorna os novos dados do usuário como resposta JSON
            return res.json({id , nome , email});

        } catch (e) {
            // Se houver erros durante a atualização do usuário, retorna os detalhes do erro
            return res.status(400).json({
                erros : e.errors.map((err) => err.message)
             });
        }
    }

    // Método para excluir um usuário
    async delete(req,res){
        try {
           
            
            // Busca o usuário pelo ID fornecido na requisição
            const user = await User.findByPk(req.userID);

            // Se o usuário não existir, retorna um erro
            if(!user){
                return res.status(400).json({
                    errors: ['User Not Exist.'],
                });
            }

            // Exclui o usuário do banco de dados
            await user.destroy();
            // Retorna os dados do usuário excluído como resposta JSON
            return res.json(null);

        } catch (e) {
            // Se houver erros durante a exclusão do usuário, retorna os detalhes do erro
            return res.status(400).json({
                erros : e.errors.map((err) => err.message)
             });
        }
    }
    
}

// Exporta uma instância da classe UserController para ser utilizada em outras partes do código
export default new UserController();
