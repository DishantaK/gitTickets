
const dbUser = require('../models/user.js');

// Routes for User Login
module.exports = function (app) {
console.log('route loaded')
    // GET request: Route for retrieving user from the database.
    app.get('/api/user', function (req, res) { //Works
        console.log('--------retrieving---------');
        dbUser.findOne({username: req.body.username, password: req.body.password})
            .then(function (dbUser) { 
                if(dbUser.length > 0){
                res.send({success: true})
                console.log(dbUser)
                res.redirect('/gittix');
            } else{
                res.send('Incorrect Username or Password')
            }

            })
            .catch(function (err) {
                console.log(err)
                res.json("User does not exist");
            });
    });

    // POST request: Add new user to database
    app.post('/api/user', async function (req, res) {
        let success;
        const newUsers = await dbUser.find({email: req.body.email, username: req.body.username})
        
        if(newUsers.length > 0){
            console.log('ythhthtth',newUsers)
            success = false;
            res.send({success})
        }else { 
            dbUser.create({ email: req.body.email, username: req.body.username, password: req.body.password})
        .then(function (dbUser) {
            success = true;
            console.log(dbUser);
            res.json({success,})
        })
        .catch(function (err) {
            res.json(err);
        });}
        console.log('------Adding to user in mongo');  
    });


    // GET request: returns user to login page
    app.get('/logout', function (request, response) {
        request.logout();
        response.redirect('/login');
    });



