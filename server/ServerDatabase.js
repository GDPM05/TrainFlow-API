
const mysql = require("mysql2");

class ServerDatabase {

    constructor(host, port, user, password, database){
        try{
            this.pool = mysql.createPool({
                host: host,
                user: user,
                password: password,
                database: database,
                port: port,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
    
            this.pool.promise();
            
            console.log("Connection established");
        }catch(e){
            console.log("There was an error while trying to connect to the database");
        }
    }


    async query(sql, params = []){
        const [rows] = await this.pool.promise().query(sql, params);

        return rows;
    }

    async insert (sql, params = []){
        const [result] = await this.pool.promise().query(sql, params);
        return result;
    }

    close(){
        this.pool.end()
        console.log("Database connection closed.");
    }
}

module.exports = ServerDatabase;