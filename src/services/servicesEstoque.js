const db = require ('../db');

module.exports = {
    adicionarLivro: (nomeLivro, categoriaLivro, anoLivro, precoLivro, qtdLivro) => {
        return new Promise ((aceito, rejeitado) => {
            db.query ('INSERT INTO livraria_db.estoquelivros_db (nomeLivro, categoriaLivro, anoLivro, precoLivro, qtdLivro) VALUES (?, ?, ?, ?, ?)', 
            [nomeLivro, categoriaLivro, anoLivro, precoLivro, qtdLivro], (error, results) =>  {
                if (error) { rejeitado(error); return; }
                aceito(results.insertidLivro);
            });
        });
    },

    buscarLivros: () => {
        return new Promise ((aceito, rejeitado) => {
            db.query('SELECT * FROM livraria_db.estoquelivros_db', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito (results);
            });
        });
    },

    alterarLivro: (idLivro, nomeLivro, categoriaLivro, anoLivro, precoLivro, qtdLivro) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('UPDATE livraria_db.estoquelivros_db SET nomeLivro = ?, categoriaLivro = ?, anoLivro = ?, precoLivro = ?, qtdLivro = ? WHERE idLivro = ?', 
            [nomeLivro, categoriaLivro, anoLivro, precoLivro, qtdLivro, idLivro], (error,results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
                }
            );
        });
    },

    excluirLivro: (idLivro) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('DELETE FROM livraria_db.estoquelivros_db WHERE idLivro = ?', [idLivro], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    } 
    
}