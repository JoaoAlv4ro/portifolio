const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index.js');

const app = express()
app.set('views', path.join(__dirname, 'views')); // Diretorio das views
app.set('view engine', 'ejs'); // Motor de views EJS

app.use(express.json()); // Middleware para JSON
app.use(express.urlencoded({ extended: true })) // Middleware para dados

app.use(express.static(path.join(__dirname, 'public'))); // Arquivos estaticos

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
