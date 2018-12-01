const db = require('../models');

// Routes for User Login
module.exports = function (app) {

    // GET request: Route for retrieving user from the database.
    app.get('/api/user', function (req, res) { //Works
        console.log('--------retrieving---------');
        db.user.findOne({ email: req.body.email, username: req.body.username, password: req.body.password, passwordConf: req.body.passwordConf })
        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err)
            .then(function (dbUser) {
                console.log(dbUser)
                res.redirect('/gitTix');
            })
            .catch(function (err) {
                console.log(err)
                res.json("User does not exist");
            });}
    });

    // POST request: Add new user to database
    app.post('/api/user', function (req, res) {
        console.log('------Adding to user in mongo');
        db.user.create({ email: req.body.email, username: req.body.username, password: req.body.password, passwordConf: req.body.passwordConf })
            .then(function (dbUser) {
                console.log();
                res.json(dbUser);
            })
            .catch(function (err) {
                res.json(err);
            });
    });


    // GET request: returns user to login page
    app.get('/logout', function (request, response) {
        request.logout();
        response.redirect('/');
    });
}