const express = require("express");
const cors = require("cors");
const bodyParser = require ('body-parser'); 
const index = express();
const routesCliente = require ('./routes/routesCliente');
const routesEstoque = require ('./routes/routesEstoque');
const db = require ('./db');

index.use(express.json());
index.use(cors());
index.use(bodyParser.urlencoded({extended: false}))
index.use(routesCliente);
index.use(routesEstoque);

index.listen(4000, ()=> {
    console.log("Servidor rodando!")
});

// GERENCIAMENTO DE PEDIDOS
index.post('/novoPedido', async (req, res) => {
    const idCliente = req.body.idCliente;
    const idLivro = req.body.idLivro;
    const qtdPedido = req.body.qtdPedido;
    const totalPedido = req.body.totalPedido;
    const dataPedido = req.body.dataPedido;
  
  
  
  db.query('INSERT INTO livraria_db.pedidos_db (idCliente, idLivro, qtdPedido, totalPedido, dataPedido) VALUES (?, ?, ?, ?, ?)', 
  [idCliente, idLivro, qtdPedido, totalPedido, dataPedido], (error, results) => {
    if (error) {
      console.error('Erro ao adicionar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    const pedidoId = results.insertidPedido;


    db.query('UPDATE livraria_db.estoquelivros_db SET qtdLivro = qtdLivro - ? WHERE idLivro = ?',
    [qtdPedido, idLivro],
      (errorUpdateEstoque, updateEstoque) => {
        if (errorUpdateEstoque) {
          console.error('Erro ao atualizar estoque:', errorUpdateEstoque);
          res.status(500).json({ error: 'Erro interno do servidor' });
          return;
        }

        if (updateEstoque.affectedRows === 0) {
          res.status(404).json({ error: 'Produto não encontrado no estoque.' });
          return;
        }

     
        db.query('UPDATE livraria_db.clientes_db SET totalPedidos = totalPedidos + 1 WHERE idCliente = ?',
        [idCliente],
          (errorUpdateCliente, updateCliente) => {
            if (errorUpdateCliente) {
              console.error('Erro ao atualizar compras do cliente:', errorUpdateCliente);
              res.status(500).json({ error: 'Erro interno do servidor' });
              return;
            }

            if (updateCliente.affectedRows === 0) {
              res.status(404).json({ error: 'Cliente não encontrado.' });
              return;
            }

            console.log('Pedido, estoque e compras do cliente atualizados com sucesso');
            res.status(201).json({ message: 'Pedido realizado com sucesso' });
          }
        );   
      }
    );
  });
});

// GERAÇÃO DE RELATÓRIOS ESTATÍSTICOS
index.get('/relatorios/maisVendidos', (req, res) => {
    const query = `
      SELECT idLivro, COUNT(idLivro) AS totalVendas
      FROM livraria_db.pedidos_db
      GROUP BY idLivro
      ORDER BY totalVendas DESC
      LIMIT 5;`;
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao gerar relatório de produtos mais vendidos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
  
      res.json(results);
    });
  });

  index.get('/relatorios/produtoCliente/:idCliente', (req, res) => {
    const idCliente = req.params.idCliente;
  
    const query = `
    SELECT estoquelivros_db.nomeLivro AS nome_produto, COUNT(*) AS total_compras FROM pedidos_db AS pedido 
    JOIN estoquelivros_db ON pedido.idLivro = estoquelivros_db.idLivro WHERE pedido.idCliente = ?
    GROUP BY estoquelivros_db.nomeLivro ORDER BY total_compras DESC;`;

  db.query(query, [idCliente], (error, results) => {
    if (error) {
      console.error('Erro ao gerar relatório de produto por cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    res.json(results);
  });
});

  index.get('/relatorios/mediaCliente/:idCliente', (req, res) => {
    const idCliente = req.params.idCliente;
  
    const query = `SELECT AVG(totalPedido) AS consumo_medio FROM livraria_db.pedidos_db WHERE idCliente = ?;`;
  
    db.query(query, [idCliente], (error, results) => {
      if (error) {
        console.error('Erro ao gerar relatório de consumo médio do cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
  
      res.json(results);
    });
  });
  
  index.get('/relatorios/baixoEstoque', (req, res) => {
    const query = `SELECT * FROM livraria_db.estoquelivros_db WHERE qtdLivro < 20 ORDER BY qtdLivro ASC LIMIT 5;`;
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao gerar relatório de produto com baixo estoque:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
      }
  
      res.json(results);
    });
  });