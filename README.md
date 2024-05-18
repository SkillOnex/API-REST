Aqui está um README simples para o repositório:

---

# API REST - API de Dados de Alunos

Este repositório contém uma API desenvolvida para fins de aprendizado sobre APIs REST. Com esta API, é possível listar, criar, atualizar e deletar informações de alunos.

## Funcionalidades

- Gerar Tokens para uso restrito (PUT,DELETE)

- Listar alunos
- Criar um novo aluno
- Inserir Foto para o Aluno
- Atualizar informações de um aluno
- Deletar um aluno

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- MySQL (ou outro banco de dados relacional)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/SkillOnex/API-REST.git
   ```
2. Instale as dependências:
   ```bash
   cd API-REST
   npm install
   ```
3. Configure o banco de dados no arquivo `.env-config`.
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Uso

Após iniciar o servidor, você pode usar ferramentas como Postman ou cURL para interagir com a API nas seguintes rotas:

- `GET /alunos` - Listar todos os alunos
- `POST /alunos` - Criar um novo aluno
- `POST /fotos` - Inserir foto para Aluno
- `PUT /alunos/:id` - Atualizar um aluno existente
- `DELETE /alunos/:id` - Deletar um aluno

## Contribuição

Sinta-se à vontade para fazer um fork deste repositório e enviar pull requests. Sugestões e melhorias são bem-vindas!

## Licença

Este projeto está licenciado sob a MIT License.

---
