const db = require('../models/ticket.js');
module.exports = function(app){
    app.get('/api/users', function(req, res){
        console.log('hit')
        db.find({})
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
        db.create(req.body)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.json(err);
        })
    })
}