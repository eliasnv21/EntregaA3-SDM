const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"admin",
    database:"livraria_db", 
    charset : 'utf8mb4',
})

db.connect((error) => {
    if (error) throw error;
    console.log("Conectado ao Banco de Dados!");
});

module.exports = db;
