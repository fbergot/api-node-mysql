const ConnectDb = require("../class/ConnectDb");

module.exports = {

    getAll: function (req, res) {
        // connection database
        try {
            const db = ConnectDb.getInstance();
            db.connected();
            db.makeQuery("SELECT * FROM users", (results, fields) => {
                return res.status(200).json(results);
            });

        } catch (err) {           
            console.error('Erreur : ' + err);
            return res.status(500).json({Error : 'Une erreur est survenue'});
        }
    }
}