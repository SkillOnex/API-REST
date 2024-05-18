import app from './app';

const port = 3001;

// Inicia o servidor Express, fazendo-o ouvir na porta especificada
app.listen(port, () => {
    console.log("Ouvindo na porta " + port);
});
