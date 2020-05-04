var db = require("../models");

// get route for posts page
// get route for login page
// sign up route
// log out route
// call models to create user, create posts, delete posts, update posts

module.exports = function(app){

    app.get("/posts", (req, res)=>{
        db.Posts.findAll().then(data=>{
            res.json(data);
        })
    }).then(data=>{
        res.json(data)
    }


});