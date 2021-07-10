const ConnectDb = require("../class/ConnectDb");

module.exports = {
    deleteOne: function (req, res) {
        // test
        if (Number.isNaN(Number(req.params.id))) {
            return res.status(400).json({ Error: "Paramètre id de l'url invalide" });
        }
        // connection database
        try {
          const db = ConnectDb.getInstance();
          db.connected();
          db.makeQueryPrepare(
            "DELETE FROM users where id=?",
            [req.params.id],
            (results, fields) => {
              return res.status(200).json({ Message: results.affectedRows + " affected rows" });
            }
          );
        } catch (err) {
            console.error("Erreur : " + err);
            return res.status(500).json({ Error: "Une erreur est survenue" });
        }
    }
}