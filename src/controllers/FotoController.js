import multer from "multer"; // Importa o pacote multer para lidar com uploads de arquivos
import multerConfig from "../config/multer"; // Importa a configuração do multer
import Foto from '../models/Foto'; // Importa o modelo Foto

// Configura o multer para usar a configuração definida e lidar com um único arquivo
const upload = multer(multerConfig).single('arquivo');

class FotoController {

    // Método para armazenar uma nova foto
    async store(req, res) {
        // Executa o upload do arquivo
        return upload(req, res, async (err) => {
            if (err) {
                // Se houver um erro no upload, retorna uma resposta com status 400 e o código do erro
                return res.status(400).json({
                    errors: [err.code],
                });
            }
            try {
                const { originalname, filename } = req.file; // Extrai o nome original e o nome do arquivo salvo
                const foto = await Foto.create({ originalname, filename }); // Cria um novo registro de foto no banco de dados
                return res.json(foto); // Retorna a foto criada como resposta JSON
            } catch (e) {
                // Em caso de erro, retorna uma resposta com status 400 e uma mensagem de erro
                return res.status(400).json({
                    errors: ['Aluno não existe'],
                });
            }
        });
    }
}

// Exporta uma instância da classe FotoController para ser utilizada em outras partes do código
export default new FotoController();
