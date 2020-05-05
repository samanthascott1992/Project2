// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
const express = require("express");
const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const s3 = new AWS.S3({
    accessKeyId: keys.s3key,
    secretAccessKey: keys.s3secret
});

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// Add more here if we create more route files

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
