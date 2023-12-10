const servicesCliente = require ('../services/servicesCliente');

module.exports = {
    adicionarCliente: async (req, res) => {
        let json = {error: '', result: {}};

        let nomeCliente = req.body.nomeCliente;
        let dataNascimento = req.body.dataNascimento;
        let emailCliente = req.body.emailCliente;
        let totalPedidos = req.body.totalPedidos;

        if (nomeCliente && dataNascimento && emailCliente && totalPedidos) {
            let clienteId = await servicesCliente.adicionarCliente(nomeCliente, dataNascimento, emailCliente, totalPedidos);
            json.result = {
                idCliente: clienteId,
                nomeCliente,
                dataNascimento,
                emailCliente,
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    buscarClientes: async (req, res) => {
        let json = {error: '', result: []};

        let clientes = await servicesCliente.buscarClientes();

        for (let i in clientes) {
            json.result.push({
                idCliente: clientes[i].idCliente,
                nomeCliente: clientes[i].nomeCliente,
                dataNascimento: clientes[i].dataNascimento,
                emailCliente: clientes[i].emailCliente,
            })
        }
        res.json(json);
    },

    alterarCliente: async (req, res) => {
        let json = {error: '', result: ""};

        let idCliente = req.params.idCliente;
        let nomeCliente = req.body.nomeCliente;
        let dataNascimento= req.body.dataNascimento;
        let emailCliente = req.body.emailCliente;

        if (nomeCliente && dataNascimento && emailCliente && idCliente) {
            await servicesCliente.alterarCliente(nomeCliente, dataNascimento, emailCliente, idCliente);
            json.result = {
                idCliente,
                nomeCliente,
                dataNascimento,
                emailCliente,
            }
        } else {
                json.error = 'Campos não enviados';
        }
    },

    excluirCliente: async (req, res) => {
        let json = {error: '', result: {}};

        await servicesCliente.excluirCliente(req.params.idCliente);

        res.json(json);
    }
}