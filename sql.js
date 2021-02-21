const mysql = require('mysql');
 
class SQLParser {
    constructor() {
        this.isConnected = false;
        this.production = false;
    }

    get connInfo() {
        return {
            connectionLimit: "128",
            host: "localhost",  
            user: "root",  
            password: "",  
            database: "todolist"    
        };
    };

    connect() {
        this.conn = mysql.createPool(this.connInfo);
        this.conn.on('error', err => {
            console.warn(err);
            if (err.code !== 'PROTOCOL_CONNECTION_LOST') throw err;
            console.debug('Reconnecting. Lost MYSQL connection: ' + err.stack);
            setTimeout(this.connect, 10000);
        });
        console.debug("SQL connection established");
        this.isConnected = true;
    };

    end() {
        if (!this.isConnected) return;
        this.conn.end();
        this.isConnected = false;
    };

    async query(query, params, callback) {
        if (!this.production)
        console.debug({
            query: query.replace(/\s+/gi, ' ').trim(), // this is strictly for readability purposes,
            params,
        });

        let conn = await new Promise((resolve, reject) => {
            this.conn.getConnection((err, conn) => {
                if (err) reject(err);
                resolve(conn);
            });
        });

        let result = await new Promise((resolve, reject) => {
            conn.query(query, params, async(err, res) => {
                conn.release();
                if (err) reject(err);
                resolve(res);
            });
        });

        if (callback) callback(result);
        return result;
    };

    escape(val) {
        return mysql.escape(val);
    };
};  

module.exports = SQLParser;