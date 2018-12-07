const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set the port to 3000 OR let the process set the port (if deployed to Heroku)
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Connect to the Mongo DB using the inventorymaster database (will be created if it doesn't exist)
mongoose.connect('mongodb://gittixAdmin:G123456@ds121814.mlab.com:21814/heroku_dds4jlht', { useNewUrlParser: true });

// Routes
// API Routes (require from routes file and pass in Express app)
require('./routes/api-routes')(app);
// HTML Routes (require from routes file and pass in Express app)
require('./config/passport');
require('./models/user')
require('./routes/api-routes')(app)
require('./routes/html-routes')(app);
var dotenv = require('dotenv');

dotenv.config();

var url = process.env.MONGOLAB_URI;
// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});
//Use only for testing
// module.exports = app;