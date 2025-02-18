
const express = require('express');
const ServerConfig = require("./ServerConfig.js");
const Database = require("./ServerDatabase.js");

class Server {

    constructor(){
        this.config = new ServerConfig();
        const db = new Database(this.config.database_host,
                                this.config.database_port, 
                                this.config.database_user,
                                this.config.database_pass,
                                this.config.database_db
                                );

        this.app = express();
        this.port = 3000;

        this.app.use(express.json());

        this.setupRoutes();

        this.startServer();
    }


    setupRoutes(){
        this.app.get('/', (req, res) => {
            res.send('First touch with the TrainFlow API.');
        })
    }

    startServer(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        })
    }

}

const server = new Server();