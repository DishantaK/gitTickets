const request = require('superagent')
const dbTicket = require('../models/ticket.js');
const dbToken = require('../models/token.js')



module.exports = function(app){
    app.get('/api/users', function(req, res){
        console.log('hit')
        dbTicket.find({})
        .then(function(dbUsers){
            console.log(dbUsers)
            res.json(dbUsers);
        })
        .catch(function(err){
            console.log(err);
            res.json(err)
        })
    })
    app.post('/api/users', function(req, res){
        dbTicket.create(req.body)
        .then(function(data){

            res.json(data);
        })
    })
   
    

const dbUser = require('../models/user.js');

// Routes for User Login

console.log('route loaded')
    // GET request: Route for retrieving user from the database.
    app.get('/api/user', function (req, res) { //Works
        console.log('--------retrieving---------');
        dbUser.findOne({username: req.body.username, password: req.body.password})
            .then(function (dbUser) { 
                // if(dbUser.length > 0){
                res.send({success: true})
                console.log(dbUser)
            //     res.redirect('/gittix');
            // } else{
            //     res.send('Incorrect Username or Password')
            // }

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

    app.put("/api/user", function(req, res) {
        // Update takes in two arguments, an object describing the properties we want to update,
        // and another "where" object describing the todos we want to update
        dbUser.update({
          password: req.body.password,
        }, {
          where: {
            id: req.body.id
          }
        })
          .then(function(dbTodo) {
            res.json(dbTodo);
          });
    
      });

    // GET request: returns user to login page
    app.get('/logout', function (request, response) {
        request.logout();
        response.redirect('/login');
    });

    app.get('/user/signin/callback', function(req, res, next){
        const {query} = req;
        const {code} = query;

        if(!code){
            return res.send({
                success: false,
                message: 'Error: Not Successful'
            });
        }
        request
        .post('https://github.com/login/oauth/access_token')
        .send({ 
        client_id: 'e65135e5a281077fec97',
        client_secret: '68e34c43178054e42b1867ee1257b37d13c85892',
        code: code
        })
        .set('Accept', 'application/json')
        .then(function(result) {
           const data = result.body.access_token;
           console.log(data)
           dbToken.create({
            accessToken: data,
})
        });
        res.redirect('/gittix');
    })

    app.get('/token', function(req, res){
        dbToken.findOne().sort({_id:-1}).limit(1)
        .then(function(token){
            let access = token.accessToken
            res.send(access)
        })
    })

    app.get('/user', function(req, res){
        dbToken.findOne().sort({_id:-1}).limit(1)
        .then(function(token){
            let access = token.accessToken
            request
       .get(`https://api.github.com/user?access_token=${access}`)
       .set('Authorization', 'token' + access)
       .then(function(result) {
        res.send(result.body)
       });
        })
    })
}
