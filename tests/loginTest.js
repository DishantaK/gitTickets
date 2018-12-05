const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const dbUser = require('./models/user.js');
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe('newUser', function() {
  expect(function(){
      newUser('al', 'carrot', 'carrot')
  }).to.throw('Username cannot be less than 4 characters')
  expect(function(){
    newUser('albert', 'carrot1', 'carrot2')
}).to.throw('Passwords do not match')
expect(function(){
    newUser('albert', '#$%&', '#$%&')
}).to.throw('Cannot use special symbols')
})


describe('GET /api/user', function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return dbUser.sequelize.sync({ force: true });
  });

  it('should find all users', function(done) {
    // Add some examples to the db to test with
    dbUser.User.bulkCreate([
      { username: 'Sean', password: 'test' },
      { username: 'Dishanta', password: 'sample' },
      { username: 'Tisha', password: 'newPass' },
      { username: 'Marcus', password: 'password' },
      { username: 'Matt', password: 'samplePass'}
    ]).then(function() {
      // Request the route that returns all examples
      request.get('/api/user').end(function(err, res) {
        let responseStatus = res.status;
        let responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(5);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({ username: 'Sean', password: 'test' });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ username: 'Dishanta', password: 'sample' });

        expect(responseBody[2])
        .to.be.an('object')
        .that.includes({ username: 'Tisha', password: 'newPass' });

        expect(responseBody[3])
        .to.be.an('object')
        .that.includes({ username: 'Marcus', password: 'password' });

        expect(responseBody[4])
        .to.be.an('object')
        .that.includes({ username: 'Matt', password: 'samplePass' });
        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});

describe('POST /api/user', function() {
    beforeEach(function() {
      request = chai.request(server);
      return dbUser.sequelize.sync({ force: true });
    });
  
    it('should save an example', function(done) {
      var reqBody = {
        username: 'testUser',
        password: 'testPass'
      };
  
      // POST the request body to the server
      request
        .post('/api/user')
        .send(reqBody)
        .end(function(err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;
  
          // Run assertions on the response
  
          expect(err).to.be.null;
  
          expect(responseStatus).to.equal(200);
  
          expect(responseBody)
            .to.be.an('object')
            .that.includes(reqBody);
  
          // The `done` function is used to end any asynchronous tests
          done();
        });
    });
  });