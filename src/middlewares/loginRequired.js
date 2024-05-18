import jwt from 'jsonwebtoken'; // Importa a biblioteca jsonwebtoken para manipulação de tokens JWT
import User from '../models/User'; // Importa o modelo User

// Middleware de autenticação para verificar o token JWT
export default async (req, res, next) => {
    const { authorization } = req.headers; // Obtém o cabeçalho de autorização da requisição

    // Verifica se o cabeçalho de autorização está presente
    if (!authorization) {
        return res.status(401).json({
            errors: ["Login required"], // Retorna erro se o cabeçalho de autorização estiver ausente
        });
    }

    const [, token] = authorization.split(' '); // Divide o cabeçalho para obter o token (ignora o esquema "Bearer")

    try {
        // Verifica e decodifica o token JWT
        // eslint-disable-next-line no-undef
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);

        const { id, email } = dados; // Extrai o ID e o email dos dados do token

        // Busca o usuário no banco de dados com o ID e o email do token
        const user = await User.findOne({
            where: { id, email },
        });

        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({
                errors: ["Usuario Invalido."], // Retorna erro se o usuário não for encontrado
            });
        }

        // Anexa o ID e o email do usuário à requisição
        req.userID = id;
        req.userEmail = email;

        return next(); // Chama o próximo middleware ou rota

    } catch (e) {
        // Em caso de erro na verificação do token, retorna uma resposta com status 401
        return res.status(401).json({
            errors: ["Token expirado ou invalido."], // Retorna erro se o token for inválido ou expirado
        });
    }
};
