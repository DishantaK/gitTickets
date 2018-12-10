// Using the Schema constructor, create a new TokenSchema object
const TokenSchema = new Schema({
    accessToken: {
        type: String,
      }
});

var Token = mongoose.model('Token', TokenSchema);


module.exports = Token
