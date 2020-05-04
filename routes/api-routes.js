var db = require("../models");




module.exports = function(app){
    // get route for posts page
    app.get("/posts", (req, res)=>{
        db.Posts.findAll();
    }).then((err, res)=>{
        if (err) throw err;
        res.json(res);
    });
    // get route for login page

    app.get("/login", (req, res)=>{
        db.Posts.findAll();
    }).then((err, res)=>{
        if (err) throw err;
        res.json(res);
    });

    // sign up route
    app.post("/signup", function(req, res) {
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

    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
};
// call models to create user, create posts, delete posts, update posts
