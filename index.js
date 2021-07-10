require("dotenv").config();
const express = require('express');

const apiRouter = require('./apiRouter').router;
const server = express();
// express-parser
server.use(express.json());

// POUR PERMETTRE DE PASSER OUTRE LE CROSS ORIGIN*****************************
server.use((req, res, next) => {
    // supprime le header x-poxered-by (important en prod)
    res.removeHeader('x-powered-by');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
  });

server.use("/api/", apiRouter);



// listen
server.listen(process.env.PORT || 3000, () => {
    console.log('Server ready on : ' + process.env.PORT || 3000);
});