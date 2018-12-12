const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var nodeMailer = require('nodemailer');
// Set the port to 3000 OR let the process set the port (if deployed to Heroku)
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));


app.post('/sendRecover', function(req, res){
    console.log(`post works`);
 
    var transporter = nodeMailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,  //true for 465 port, false for other ports
      auth: {
        user: 'gittixcontact@dishantak.com',
        pass: 'Gdishanta$7'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    var mailOptions = {
      from: '"gitTix Manager" <gittixcontact@dishantak.com>', // sender address
      to: 'contactgittix@gmail.com', // list of receivers
      subject: 'gittix - Password Recovery ', // Subject line
      text: `Password Recovery`, // plain text body
      html: `

        <h1> gitTix - Password Recovery</h1>
        <h2> If you did not request this this email, please diregard</h2>
        <a href="https://gittix.herokuapp.com/update"> Click Here to update your password on gitTix</a>
      
      ` // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send(`Nah, that's not happening :  <a href="/recover">Try again? </a>`);
      } else {
        res.send(`Email Sent :  <a href="/">Go Home? </a>`);
      }
    })
  
  

});






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