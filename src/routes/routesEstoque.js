const express = require ('express');
const routesEstoque = express.Router();
const controllerEstoque = require ('../controllers/controllerEstoque');

routesEstoque.post('/adicionarLivro', controllerEstoque.adicionarLivro);
routesEstoque.get('/todosLivros', controllerEstoque.buscarLivros);
routesEstoque.put('/alterarLivro/:idLivro', controllerEstoque.alterarLivro);
routesEstoque.delete('/excluirLivro/:idLivro',controllerEstoque.excluirLivro);

module.exports = routesEstoque;