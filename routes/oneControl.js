const ConnectDb = require("../class/ConnectDb");

module.exports = {
    
    getOne: function (req, res) {
        // test
        if (Number.isNaN(Number(req.params.id))) {
            return res.status(400).json({ Error: "Paramètre de l'id invalide dans l'url" });
        }
        // connection database
        try {
            const db = ConnectDb.getInstance();
            db.connected();
            db.makeQueryPrepare("SELECT * FROM users WHERE id = ?", [req.params.id], function (results, fields) {
                console.log(results, fields);
                return res.status(200).json(results);
            });
            } catch (err) {
                console.error("Erreur : " + err);
                return res.status(500).json({ Error: "Une erreur est survenue" });
            }
    }
};
