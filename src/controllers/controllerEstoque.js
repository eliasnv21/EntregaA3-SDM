const servicesEstoque = require ('../services/servicesEstoque');

module.exports = {
    adicionarLivro: async (req, res) => {
        let json = {error: '', result: {}};

        let nomeLivro = req.body.nomeLivro;
        let categoriaLivro = req.body.categoriaLivro;
        let anoLivro = req.body.anoLivro;
        let precoLivro = req.body.precoLivro;
        let qtdLivro = req.body.qtdLivro;

        if (nomeLivro && categoriaLivro && anoLivro && precoLivro && qtdLivro) {
            let idLivro = await servicesEstoque.adicionarLivro(nomeLivro, categoriaLivro, anoLivro, precoLivro, qtdLivro);
            json.result = {
                id: idLivro,
                nomeLivro,
                categoriaLivro,
                anoLivro,
                precoLivro,
                qtdLivro,
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    buscarLivros: async (req, res) => {
        let json = {error: '', result: []};

        let livros = await servicesEstoque.buscarLivros();

        for (let i in livros) {
            json.result.push({
                idLivro: livros[i].idLivro,
                nomeLivro: livros[i].nomeLivro,
                categoriaLivro: livros[i].categoriaLivro,
                anoLivro: livros[i].anoLivro,
                precoLivro: livros[i].precoLivro,
                qtdLivro: livros[i].qtdLivro,
            })
        }
        res.json(json);
    },

    alterarLivro: async (req, res) => {
        let json = {error: '', result: ""};

        let idLivro = req.params.idLivro;
        let nomeLivro = req.body.nomeLivro;
        let categoriaLivro = req.body.categoriaLivro;
        let anoLivro = req.body.anoLivro;
        let precoLivro = req.body.precoLivro;
        let qtdLivro = req.body.qtdLivro;

        if (idLivro && nomeLivro && categoriaLivro && anoLivro && precoLivro && qtdLivro) {
            await servicesEstoque.alterarLivro(idLivro, nomeLivro, categoriaLivro, anoLivro, precoLivro, qtdLivro );
            json.result = {
                idLivro,
                nomeLivro,
                categoriaLivro,
                anoLivro,
                precoLivro,
                qtdLivro,
            }
        } else {
                json.error = 'Campos não enviados';
        }
    },

    excluirLivro: async (req, res) => {
        let json = {error: '', result: {}};

        await servicesEstoque.excluirLivro(req.params.idLivro);

        res.json(json);
    }
}