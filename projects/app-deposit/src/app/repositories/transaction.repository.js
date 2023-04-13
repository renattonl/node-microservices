const mysql = require('mysql2');

const con = mysql.createConnection({
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE_TRANSACTION,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT
})

const transactionRepository = {
    addTransaction: async (amount, accountId) => {
        const sql = `INSERT INTO transaction(amount, type, creationdate, accountid) VALUES(${amount}, 'deposit', NOW(), ${accountId});`
        const response = await new Promise((resolve, reject) =>{
            con.query(sql, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
        });
        if(response.insertId > 0)
            return { status: 'sucess', message: '1 record inserted type deposit, ID: ' + response.insertId, id: response.insertId}       
        else 
            return { status: 'failure', message: 'Registration failed', id: 0}    
    }
}

module.exports = transactionRepository;