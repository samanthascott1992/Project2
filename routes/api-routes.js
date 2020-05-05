var db = require("../models");

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
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/login");
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    // log out route

    app.get("/api/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
};
// call models to create user, create posts, delete posts, update posts
