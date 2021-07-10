const ConnectDb = require("../class/ConnectDb");
const Verif = require("../class/Verif");
const Utilitary = require("../class/Utilitary");

module.exports = {

    putOne: function (req, res) {
        if (Number.isNaN(Number(req.params.id))) {
          return res.status(400).json({ Error: "Paramètre id de l'url invalide" });
        }
        // make string with (name = ?, age= ?)
        const [text, props] = Utilitary.makeStringForQueryPrepare(req.body);
        // make array_values (florian , 34)
        if (props != false) {
            var values = Utilitary.getValue(props, req.body);           
        }
        if (!text) {
            return res
                .status(400)
                .json(
                    {
                        Error: "Le body de la requête ne contient aucun champ acceptable pour la modification",
                        AcceptedFields : "name , age , email"
                    });
            
        }
        // if email verif...
        if (req.body.email) {
            if (!Verif.emailVerif(req.body.email)) {
                return res.status(400).json({ Error: "il semble que l'email ne soit pas valide" });
            }
        }

        try {
            const db = ConnectDb.getInstance();
            db.connected();
            db.makeQueryPrepare("UPDATE users SET " + text + " WHERE id=?", [...values, req.params.id], (results, fields) => {
                return res.status(202).json({ AffectedRows: results.affectedRows });
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ Error: 'Une erreur interne au serveur est survenue' });
        }
    }
}