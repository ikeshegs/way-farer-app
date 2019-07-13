"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

var expect = _chai["default"].expect;
describe("All tests for signup endpoint", function () {
  describe("POST api/v1/auth/signup", function () {
    it('It should return status 201 for a successful signup', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'zzzzzzz@gmail.com',
        first_name: 'Ikechukwu',
        last_name: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body.data).to.have.property('user_id');
        expect(res.body.data).to.have.property('is_admin');
        expect(res.body.data).to.have.property('token');
        done();
      });
    });
    it('should return 400 status for undefined Firstname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'shegshjjh@ghjs.com',
        last_name: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Firstname field is required');
        done();
      });
    });
    it('should return 400 status for unstringed Firstname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikesheg@gmail.com',
        first_name: ['Ikechukwu'],
        last_name: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Firstname must be an alphabet');
        done();
      });
    });
    it('should return 400 status for empty Firstname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikesheglkjhgs@gmail.com',
        first_name: '',
        last_name: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Firstname field cannot be empty');
        done();
      });
    });
    it('should return 400 status for invalid Firstname character', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikelggjkhhjshegs@gmail.com',
        first_name: 'Ikec#ukwu',
        last_name: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Firstname accepts only alphabets');
        done();
      });
    }); // LastName Tests

    it('should return 400 status for undefined Lastname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikeshkhjhegs@gmail.com',
        first_name: 'Ikechukwu',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Lastname field is required');
        done();
      });
    });
    it('should return 400 status for unstringed Lastname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikeghjkjbjkshegs@gmail.com',
        first_name: 'Ikechukwu',
        last_name: ['Okoro'],
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Lastname must be a string');
        done();
      });
    });
    it('should return 400 status for empty Lastname', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikeskvjhjhegs@gmail.com',
        first_name: 'Ikechukwu',
        last_name: '',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Lastname field cannot be empty');
        done();
      });
    });
    it('should return 400 status for invalid Lastname character', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikekvhvhjshegs@gmail.com',
        first_name: 'Ikechukwu',
        last_name: 'Oko00ro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Lastname accepts only alphabets');
        done();
      });
    }); // Email Tests

    it('should return 400 status for an undefined Email', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        first_name: 'Ikechukwu',
        last_name: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Email field is required');
        done();
      });
    });
    it('should return 400 status for empty Email Field', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: '',
        first_name: 'Ikechukwu',
        last_name: 'Okoro',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Email cannot be empty.');
        done();
      });
    }); // Password Tests

    it('should return 400 status for undefined Password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'ikesjhjhskjdgghegs@gmail.com',
        first_name: 'Ikechukwu',
        last_name: 'Okoro'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password field is required');
        done();
      });
    });
    it('should return 400 status for empty Password Field', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'fgsdfikeshegs@gmail.com',
        first_name: 'Ikechukwu',
        last_name: 'Okoro',
        password: ''
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password field cannot be empty');
        done();
      });
    });
    it('should return 400 status for White space Password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
        email: 'fgsfgsdfgikeshegs@gmail.com',
        first_name: 'Ikechukwu',
        last_name: 'Okoro',
        password: ' '
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password cannot be a space');
        done();
      });
    });
  });
});
describe("All tests for signin endpoint", function () {
  describe("POST api/v1/auth/signin", function () {
    it('should return status 200 for a successful login', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshjjhegs@gmail.com',
        password: 'shegsjhbejk'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property('user_id');
        expect(res.body.data).to.have.property('is_admin');
        expect(res.body.data).to.have.property('token');
        done();
      });
    });
    it('should return 400 status for an undefined Email', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        password: 'bhbjvjhbhbvy'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Email field cannot be empty');
        done();
      });
    });
    it('should return 400 status for an unstringed Email', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: ['ikeshegs@gmail.com'],
        password: 'bhjbhjvbfhjb'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Email should be a string');
        done();
      });
    });
    it('should return 400 status for empty Email Field', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: '',
        password: 'jhbvhjbvhjfbv'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Email field cannot be empty.');
        done();
      });
    });
    it('should return 400 status for non existing Email', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'charlesodili@gmail.com',
        password: 'hsihjvnfkjvnd'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('No user in the database');
        done();
      });
    });
    it('should return 400 status for failed authentication', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshjjhegs@gmail.com',
        password: 'hsihjvnfkjvnd'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid Credentials');
        done();
      });
    });
    it('should return 400 status for Undefined Password Login', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshjjhegs@gmail.com'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password field cannot be empty');
        done();
      });
    });
    it('should return 400 status for empty Password Field', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshjjhegs@gmail.com',
        password: ''
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password field cannot be empty');
        done();
      });
    });
    it('should return 400 status for using space as a Password', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshjjhegs@gmail.com',
        password: ' '
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password cannot be a space');
        done();
      });
    });
    it('should return 400 status for wrong Password length', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
        email: 'ikeshjjhegs@gmail.com',
        password: 'hdhjb'
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Password should be 8 to 30 characters long');
        done();
      });
    });
  });
}); // describe(`All tests for get users endpoint`, () => {
//   describe(`GET api/v1/users`, () => {
//     let userToken;
//     before(done => {
//       chai
//         .request(app)
//         .post('/api/v1/auth/signin')
//         .send({
//           email: 'ikeshegs@test.com',
//           password: 'C00ljoe.'
//         })
//         .end((err, res) => {
//           const { token } = res.body.data;
//           userToken = token;
//           done(err);
//         });
//     });
//     it('The GET request should return status 200 for admin successfully viewing users', done => {
//       chai
//         .request(app)
//         .get('/api/v1/users')
//         .set('Authorization', `Bearer ${userToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.data[0]).to.have.property('user_id');
//           expect(res.body.data[0]).to.have.property('email');
//           expect(res.body.data[0]).to.have.property('first_name');
//           expect(res.body.data[0]).to.have.property('last_name');
//           expect(res.body.data[0]).to.have.property('password');
//           expect(res.body.data[0]).to.have.property('is_admin');
//           done();
//         });
//     });
//   });
//   describe(`GET api/v1/users`, () => {
//     let userToken;
//     before(done => {
//       chai
//         .request(app)
//         .post('/api/v1/auth/signin')
//         .send({
//           email: 'rachael@test.com',
//           password: 'rachyfran.'
//         })
//         .end((err, res) => {
//           const { token } = res.body.data;
//           userToken = token;
//           done(err);
//         });
//     });
//     it('The GET request should return status 401 for user cannot view other users', done => {
//       chai
//         .request(app)
//         .get('/api/v1/users')
//         .set('Authorization', `Bearer ${userToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(401);
//           expect(res.body.error).to.equal('Unauthorized');
//           done();
//         });
//     });
//   });
//   describe(`GET api/v1/users`, () => {
//     let userToken;
//     before(done => {
//       chai
//         .request(app)
//         .post('/api/v1/auth/signin')
//         .send({
//           email: 'frankEd@gmail.com',
//           password: 'EdohoFraNK'
//         })
//         .end((err, res) => {
//           done(err);
//         });
//     });
//     it('The GET request should return status 403 for Forbidden access', done => {
//       chai
//         .request(app)
//         .get('/api/v1/users')
//         .set('Authorization', `Bearer ${userToken}`)
//         .end((err, res) => {
//           expect(res).to.have.status(403);
//           expect(res.body.error).to.equal('Forbidden');
//           done();
//         });
//     });
//   });
// });