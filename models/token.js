// Using the Schema constructor, create a new TokenSchema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    accessToken: {
        type: String,
      }
});

var Token = mongoose.model('Token', TokenSchema);


module.exports = Token