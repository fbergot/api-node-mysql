const express = require("express");

// for routes :
const allControl = require('./routes/allControl');
const deleteControl = require("./routes/deleteControl");
const oneControl = require('./routes/oneControl');
const postControl = require('./routes/postControl');
const putControl = require("./routes/putControl");


// routage
exports.router = (function (router) {
    // express-Router
    const apiRouter = router();
    // ---routes--- :
    // get
    apiRouter.route("/all").get(allControl.getAll);
    apiRouter.route("/one/:id").get(oneControl.getOne);
    // post
    apiRouter.route("/add").post(postControl.postOne);
    // delete
    apiRouter.route("/del/:id").delete(deleteControl.deleteOne);
    // put
    apiRouter.route("/put/:id").put(putControl.putOne);

    return apiRouter;
})(express.Router);