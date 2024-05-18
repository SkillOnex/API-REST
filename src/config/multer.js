import multer from "multer"; // Importa o pacote multer para lidar com uploads de arquivos
import { extname, resolve } from 'path'; // Importa funções para manipulação de caminhos de arquivos

// Função para gerar um número aleatório entre 10000 e 19999
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // Função de filtro para validar o tipo de arquivo
  fileFilter: (req, file, cb) => {
    // Verifica se o arquivo não é PNG nem JPEG
    if (file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
      // Retorna um erro do multer se o arquivo não for PNG ou JPEG
      return cb(new multer.MulterError('Arquivo precisa ser Png ou JPG.'));
    }
    // Se o arquivo for válido, chama o callback sem erro
    return cb(null, true);
  },

  // Configuração de armazenamento para o multer
  storage: multer.diskStorage({
    // Define o destino onde os arquivos serão armazenados
    destination: (req, file, cb) => {
      // Resolve o caminho para a pasta de uploads
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    // Define o nome do arquivo armazenado
    filename: (req, file, cb) => {
      // Cria um nome de arquivo único usando a data atual, um número aleatório e a extensão original
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
