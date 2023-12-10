const express = require ('express');
const routesCliente = express.Router();
const controllerCliente = require ('../controllers/controllerCliente');

routesCliente.post('/adicionarCliente', controllerCliente.adicionarCliente);
routesCliente.get('/todosClientes', controllerCliente.buscarClientes);
routesCliente.put('/alterarCliente/:idCliente', controllerCliente.alterarCliente);
routesCliente.delete('/excluirCliente/:idCliente',controllerCliente.excluirCliente);

module.exports = routesCliente;