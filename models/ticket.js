const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const TicketSchema = new Schema({
  issueName: {
    type: String,
    unique: true,
    required: "You must include an item name"
  },
  comments: {
    type: String,
  },
  user: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: String,
  },

  priority: {
    type: String,
  },

});
// ^ everything set to a string until next meeting 
// This creates our model from the above schema, using Mongoose's model method
var Tickets = mongoose.model('Ticket', TicketSchema);

// Export the Inventory model
module.exports = Tickets;
