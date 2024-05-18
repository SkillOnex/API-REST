import Aluno from "../models/aluno"; // Importa o modelo Aluno
import Foto from "../models/Foto"; // Importa o modelo Foto

class AlunoController {

    // Método para listar todos os alunos com suas fotos associadas
    async index(req, res) {
        const alunos = await Aluno.findAll({
            attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], // Atributos do aluno a serem retornados
            order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // Ordenação dos alunos e fotos por ID em ordem decrescente
            include: {
                model: Foto, // Inclui as fotos associadas
                attributes: ['url', 'filename'], // Atributos da foto a serem retornados
            }
        });
        // Retorna os dados dos alunos como resposta JSON
        res.json(alunos);
    }

    // Método para criar um novo aluno
    async store(req, res) {
        try {
            const aluno = await Aluno.create(req.body); // Cria um novo aluno com os dados do corpo da requisição
            res.json(aluno); // Retorna o aluno criado como resposta JSON
        } catch (e) {
            // Em caso de erro, retorna uma resposta com status 400 e os erros
            return res.status(400).json({
                erros: e.errors.map(err => err.message), // Mapeia os erros para uma lista de mensagens
            });
        }
    }

    // Método para exibir os detalhes de um aluno específico
    async show(req, res) {
        try {
            const { id } = req.params; // Obtém o ID dos parâmetros da requisição

            if (!id) {
                return res.status(400).json({
                    erros: ['Falta ID'], // Verifica se o ID foi fornecido
                });
            }

            const aluno = await Aluno.findByPk(id, {
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'], // Atributos do aluno a serem retornados
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // Ordenação dos alunos e fotos por ID em ordem decrescente
                include: {
                    model: Foto, // Inclui as fotos associadas
                    attributes: ['url', 'filename'], // Atributos da foto a serem retornados
                }
            });

            if (!aluno) {
                return res.status(400).json({
                    erros: ['Aluno não existe'], // Verifica se o aluno existe
                });
            }

            return res.json(aluno); // Retorna os dados do aluno como resposta JSON

        } catch (e) {
            // Em caso de erro, retorna uma resposta com status 400 e os erros
            return res.status(400).json({
                erros: e.errors.map(err => err.message), // Mapeia os erros para uma lista de mensagens
            });
        }
    }

    // Método para atualizar os dados de um aluno existente
    async update(req, res) {
        try {
            const { id } = req.params; // Obtém o ID dos parâmetros da requisição

            if (!id) {
                return res.status(400).json({
                    erros: ['Falta ID'], // Verifica se o ID foi fornecido
                });
            }

            const aluno = await Aluno.findByPk(id); // Busca o aluno pelo ID

            if (!aluno) {
                return res.status(400).json({
                    erros: ['Aluno não existe'], // Verifica se o aluno existe
                });
            }

            const alunoAtualizado = await aluno.update(req.body); // Atualiza o aluno com os dados do corpo da requisição

            return res.json(alunoAtualizado); // Retorna o aluno atualizado como resposta JSON

        } catch (e) {
            // Em caso de erro, retorna uma resposta com status 400 e os erros
            return res.status(400).json({
                erros: e.errors.map(err => err.message), // Mapeia os erros para uma lista de mensagens
            });
        }
    }

    // Método para deletar um aluno
    async delete(req, res) {
        try {
            const { id } = req.params; // Obtém o ID dos parâmetros da requisição

            if (!id) {
                return res.status(400).json({
                    erros: ['Falta ID'], // Verifica se o ID foi fornecido
                });
            }

            const aluno = await Aluno.findByPk(id); // Busca o aluno pelo ID

            if (!aluno) {
                return res.status(400).json({
                    erros: ['Aluno não existe'], // Verifica se o aluno existe
                });
            }

            await aluno.destroy(); // Deleta o aluno
            return res.json({
                Apagado: "True" // Retorna uma confirmação de exclusão
            });

        } catch (e) {
            // Em caso de erro, retorna uma resposta com status 400 e os erros
            return res.status(400).json({
                erros: e.errors.map(err => err.message), // Mapeia os erros para uma lista de mensagens
            });
        }
    }
}

// Exporta uma instância da classe AlunoController para ser utilizada em outras partes do código
export default new AlunoController();
