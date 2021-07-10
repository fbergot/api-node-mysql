const ConnectDb = require("../class/ConnectDb");
const Verif = require('../class/Verif');

module.exports = {

    postOne: function (req, res) {
        // check data
        if (req.body.name && req.body.age && req.body.email) {
            if (Verif.emailVerif(req.body.email)) {
                 try {
                   console.log(req.body);
                   const db = ConnectDb.getInstance();
                   db.connected();
                   db.makeQueryPrepare("INSERT INTO users SET name=? , age=? , email=?", [req.body.name , req.body.age, req.body.email], (results, fields) => {
                   return res.status(201).json({ insertId: results.insertId });

                   });
                 } catch (err) {
                        console.error("Erreur : " + err);
                        return res.status(500).json({ Error: "Une erreur est survenue" });
                 }
            } else {
                return res
                  .status(400)
                  .json({ Error: "Il semble que l'email ne soit pas valide"});
            }
        } else {
            return res.status(400).json({ Error: "Il manque des informations dansd le body de la requête ou elles sont incorrects"});            
        }

       
        
    }
};