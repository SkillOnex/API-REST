import Aluno from "../models/aluno";

class HomeController {
    
    async index(req, res){
        // Cria um novo aluno no banco de dados
        const novoAluno  = await Aluno.create({
            nome: 'Benva',
            sobrenome: 'Nudes',
            email:'49@gmail.com',
            idade:78,
            peso:13,
            altura:21.5
        });
        // Retorna os dados do novo aluno como resposta JSON
        res.json(novoAluno);
    }
}

// Exporta uma instância da classe HomeController para ser utilizada em outras partes do código
export default new HomeController();
