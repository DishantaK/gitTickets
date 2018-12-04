const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const dbTicket = require('./models/ticket.js');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

  // set a variable for making http requests.
let request;


describe('GET /api/examples', function () {
  
  // clear the test db 
  beforeEach(function () {
    request = chai.request(server);
  });

  it('should find all examples', function (done) {
    //add some content to the now empty db
    dbTicket.create({ issueName: 'this is a new issue',comments: 'this is the text for the new issue' })
    .then(function (data) {
      console.log(data)
      //hit the POST('/api/users') endpoint
      request.get('/api/users').end(function (err, res) {
        console.log("RES", res)
        console.log("ERR", err)
        //Save the response
        let responseStatus = res.status;
        let responseBody = res.body;


        //Write test expectations
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(1);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({ issueName: 'this is a new issue', comments: 'this is the text for the new issue' });
          
        done();
      })
      .catch(function(err){
        console.log(err);
        done()
      });
    });
  });
});

describe('POST/api/issues', function() {
  beforeEach(function () {
    request = chai.request(server);
  });

  it('should POST the modal contents', function (done) {
    //add some content to the now empty db
    // db.create({ issueName: 'this is a new issue',comments: 'this is the text for the new issue' })
    // .send(data)
    // .then(function (data) {
    //   console.log(data)
     const reqBody = {
      issueName: 'this is a new issue',comments: 'this is the text for the new issue'};
      //hit the POST('/api/users') endpoint
      request.post('/api/users')
      .send(reqBody)
      .end(function (err, res) {
        console.log("RES", res)
        console.log("ERR", err)
        //Save the response
        let responseStatus = res.status;
        let responseBody = res.body;


        //Write test expectations
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.includes(reqBody);
          
        done();
      })
      .catch(function(err){
        console.log(err);
        done()
      });
    });
  });

  

