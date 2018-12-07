const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const db = require('./models');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

  // set a variable for making http requests.
let request;



describe('getAge', function(){
  expect(getAge('2018', '11', '28', '09', '34', '56')).to.equal(2);
});
describe('getAge', function(){
  expect(getAge('2018', '11', '30', '09', '34', '56')).to.equal(0);
});
// future date
describe('getAge', function(){
  expect(getAge('2022', '12', '28', '09', '34', '56')).to.equal(NaN);
});
describe('getAge', function(){
  expect(getAge('2018', '09')).to.equal(error);
});
describe('getAge', function(){
  expect(getAge(2018, 11)).to.equal(error);
});


describe('sortByAge', function(){
expect(sortByAge());
});




describe('GET /api/examples', function () {

  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('Should display the newest item first unless resolved', function (done) {
    db.User.bulkCreate([
      // need at least 6
      { username: 'Sally', dateCreated: ('2018', '3', '15', '9', '33', '43'), resolved: true, _id: "6"},
      { username: 'Lane', dateCreated: ('2017', '3', '15', '9', '33', '43'), resolved: false, _id: "5"},
      { username: 'Sean', dateCreated: ('2016', '3', '15', '9', '33', '43'), resolved: true, _id: "4"},
      { username: 'Marcus', dateCreated: ('2015', '3', '15', '9', '33', '43'), resolved: false, _id: "3"},
      { username: 'Matt', dateCreated: ('2014', '3', '15', '9', '33', '43'), resolved: true, _id: "2"},
      { username: 'Dishanta', dateCreated: ('2013', '3', '15', '9', '33', '43'), resolved: false, _id: "1"},
      { username: 'Lin', dateCreated: ('2012', '3', '15', '9', '33', '43'), resolved: false, _id: "0"}
    ]);




    expect(db[0])
          .to.be.an('object')
          .that.includes({ username: 'Sally' });

          expect(db[1])
          .to.be.an('object')
          .that.includes({ username: 'Sean' });

          expect(db[-1])
          .to.be.an('object')
          .that.includes({ username: 'Matt' });


});
});
