const path = require("path");

// will need  route for homepage, all posts page, sign up page, login page, create posts page

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
    // If the user already has an account send them to the viewPosts page
        if (req.user) {
            res.redirect("/viewPosts");
        }
        res.sendFile(path.join(__dirname, "../public/viewPosts.html"));
    });

    app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/create");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/create", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/signup", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
    app.get("/posts", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/viewPosts.html"));
    });
};