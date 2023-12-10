const db = require ('../db');

module.exports = {
    adicionarCliente: (nomeCliente, dataNascimento, emailCliente, totalPedidos) => {
        return new Promise ((aceito, rejeitado) => {
            db.query ('INSERT INTO livraria_db.clientes_db (nomeCliente, dataNascimento, emailCliente, totalPedidos) VALUES (?, ?, ?, ?)', 
            [nomeCliente, dataNascimento, emailCliente, totalPedidos], (error, results) =>  {
                if (error) { rejeitado(error); return; }
                aceito(results.insertid);
            });
        });
    },

    buscarClientes: () => {
        return new Promise ((aceito, rejeitado) => {
            db.query('SELECT * FROM livraria_db.clientes_db', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito (results);
            });
        });
    },

    alterarCliente: (nomeCliente,dataNascimento, emailCliente, idCliente) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('UPDATE livraria_db.clientes_db SET nomeCliente = ?, dataNascimento = ?, emailCliente = ? WHERE idCliente = ?', 
            [nomeCliente,dataNascimento, emailCliente, idCliente], (error,results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
                }
            );
        });
    },

    excluirCliente: (idCliente) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('DELETE FROM livraria_db.clientes_db WHERE idCliente = ?', [idCliente], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    } 
}