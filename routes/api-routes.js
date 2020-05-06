var db = require("../models");
const keys = require("../keys.js")
const AWS = require("aws-sdk");

module.exports = function(app){

    app.get("/api/splash", function(req, res) {
        res.redirect("/");
    });

    // get route for posts page
    app.get("/api/posts", function(req, res){
        db.Post.findAll().then(function(response){
            res.json(response);
        });
    });
    // get route for login page
    app.get("/api/login", (req, res)=>{
        db.Post.findAll().then((data)=>{
            res.json(data);
        });
    });

    // sign up route
    app.post("/api/signup", function(req, res) {
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            hashedPassword: req.body.hashedPassword
        }).then(function() {
            res.redirect(307, "/login");
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    // create post route
    app.post("/api/post", function(req, res){
        db.Post.create(req.body).then(data=>{
            res.status(200)
        }).catch(err=>{
            res.status(415).json(err)
        })
    })

    // log out route

    app.get("/api/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    const s3 = new AWS.S3({
        accessKeyId: keys.s3key,
        secretAccessKey: keys.s3secret
    });

    app.post("/upload", async (req, res) => {
        if (!req.files) {
            return res.status(400).send("No file was uploaded.");
        }
    
        const uploadFile = req.files.upload;
    
        const params = {
            Body: uploadFile.data, // data from uploaded file
            Bucket: keys.s3bucket, // bucket name
            Key: `${Date.now()}-${uploadFile.name}` // file name to use for S3 bucket
        };
    
        s3.upload(params, (err, response) => {
            if (err) {throw err};
        
            console.log(`File uploaded successfully at ${response.Location}`);
            // terminating the req/res cycle by sending a JSON object with the uploaded
            // file path AND any date sent along with the upload... this is where you 
            // could write to your db if needed, now that you have the url path for the
            // newly uploaded file!
            res.json({ url: response.Location, data: req.body });
        });
    });
};
// call models to create user, create posts, delete posts, update posts
