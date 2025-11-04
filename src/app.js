const express = require('express');
const path = require('path');
const cors = require('cors');
const indexRouter = require('./routes/index.js');
const apiRouter = require('./routes/api.js');

const app = express()
app.set('views', path.join(__dirname, 'views')); // Diretorio das views
app.set('view engine', 'ejs'); // Motor de views EJS

app.use(express.json()); // Middleware para JSON
app.use(express.urlencoded({ extended: true })) // Middleware para dados
app.use(cors()); // Habilita CORS para facilitar testes no Thunder Client

app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estaticos

app.use('/', indexRouter);
app.use('/api', apiRouter); // Rotas de API

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
