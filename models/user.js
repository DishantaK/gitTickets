const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: "You must include a username"
  },
  password: {
    type: String,
    required: "You must include a password"
  },
  tickets: [{}]
});

// This creates our model from the above schema, using Mongoose's model method
var User = mongoose.model('User', UserSchema);

// Export the Inventory model
module.exports = User;
