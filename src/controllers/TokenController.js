import User from "../models/User"; // Importa o modelo User
import jwt from 'jsonwebtoken'; // Importa a biblioteca jsonwebtoken para manipulação de tokens JWT

class TokenController {

    // Método para criar um novo token JWT
    async store(req, res) {
        // Obtém email e password do corpo da requisição, com valores padrão vazios
        const { email = '', password = '' } = req.body;

        // Verifica se email e password foram fornecidos
        if (!email || !password) {
            return res.status(401).json({
                erros: ['Credenciais Inválidas'], // Retorna erro se as credenciais estiverem ausentes
            });
        }

        // Busca o usuário pelo email
        const user = await User.findOne({ where: { email } });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({
                erros: ['Usuário não existe'], // Retorna erro se o usuário não for encontrado
            });
        }

        // Verifica se a senha é válida
        if (!(await user.passwordIsValid(password))) {
            return res.status(401).json({
                erros: ['Senha Inválida'], // Retorna erro se a senha estiver incorreta
            });
        }

        // Extrai o ID do usuário
        const { id } = user;

        // Cria um token JWT assinado com o ID e email do usuário
        // eslint-disable-next-line no-undef
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            // eslint-disable-next-line no-undef
            expiresIn: process.env.TOKEN_EXPIRATION, // Define a duração do token
        });

        // Retorna o token como resposta JSON
        res.json({ token });
    }
}

// Exporta uma instância da classe TokenController para ser utilizada em outras partes do código
export default new TokenController();
