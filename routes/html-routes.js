// Require path so we can find the index.html file
const path = require('path');

// module.exports exports this function so it can be required by another file (in this case, server.js)
// Must pass in app because it contains the Express application
module.exports = function(app) {
    // If no matching route is found default to index.html
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.get('/gittix', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/gitTix.html'));
    });
    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    });
    app.get('/recovery', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/forgot.html'));
    });
    app.get('/update', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/update.html'));
    });

};