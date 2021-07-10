const mysql = require("mysql");
require("dotenv").config();

module.exports = class ConnectDb {

    static _instance = null;
    connect = null;
    
    constructor(dbName, dbUser, dbPassword, dbHost, dbPort, mysql) {
        // params :
      this.dbName = dbName;
      this.dbUser = dbUser;
      this.dbPassword = dbPassword;
      this.dbHost = dbHost;
      this.dbPort = dbPort;
      //injection mysql :
      this.mysql = mysql;
    }

    /**
     * Return ever same instance of ConnectDb
     * @returns {ConnectDb}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new ConnectDb(
                process.env.DBNAME,
                process.env.DBUSER,
                process.env.DBPASSWORD,
                process.env.DBHOST,
                process.env.DBPORT,
                mysql
            );
        }
        return this._instance;
    }

    /**
     * Create mysql Connection
     * @returns {mysqlConnection}
     */
    connection() {
        if (this.connect === null) {
            this.connect = this.mysql.createConnection({
                host: this.dbHost,
                port: this.dbPort,
                user: this.dbUser,
                password: this.dbPassword,
                database: this.dbName
            });
        }
        return this.connect;
    }

    /**
     * Connection on database
     * @throws error of connect
     */
    connected() {       
            this.connection().connect(function (err) {
                if (err) {
                    console.error('Erreur de connexion');
                    throw err;
                }
                console.log("Connected on database !");
            });      
    }

    /**
     * Make query and close the connection
     * @param {String} queryString 
     * @param {CallableFunction} func
     * @throws error in query 
     */
    makeQuery(queryString, func) {
        this.connection().query(queryString, (error, results, fields) => {
            if (error) throw error;
            func(results, fields);
        });
        this.connection().end();
        this.connect = null;
    }

    /**
     * Make prepare query and close the connection
     * @param {String} queryString 
     * @param {Array<String>} arrArguments 
     * @param {CallableFunction} func 
     * @throws error in query
     */
    makeQueryPrepare(queryString, arrArguments, func) {
       this.connection().query(queryString, arrArguments , (error, results, fields) => {
            if (error) throw error;
            func(results, fields);
       });
       this.connection().end();
       this.connect = null;
   }
}