import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe(`All tests for signup endpoint`, () => {
  describe(`POST api/v1/auth/signup`, () => {
    it('It should return status 201 for a successful signup', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          id: 10,
          email: 'ikeshjjhegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: 'shegsjhbejk',
          is_admin: false
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.have.property('user_id');
          expect(res.body.data).to.have.property('is_admin');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
    it('should return 400 status for undefined Firstname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'shegshjjh@gmail.com',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Firstname field is required');
          done();
        });
    });
    it('should return 400 status for unstringed Firstname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikesheg@gmail.com',
          firstname: ['Ikechukwu'],
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Firstname must be an alphabet');
          done();
        });
    });
    it('should return 400 status for empty Firstname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikesheglkjhgs@gmail.com',
          firstname: '',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Firstname field cannot be empty');
          done();
        });
    });
    it('should return 400 status for invalid Firstname character', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikelggjkhhjshegs@gmail.com',
          firstname: 'Ikec#ukwu',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Firstname accepts only alphabets');
          done();
        });
    });

    // LastName Tests
    it('should return 400 status for undefined Lastname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikeshkhjhegs@gmail.com',
          firstname: 'Ikechukwu',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Lastname field is required');
          done();
        });
    });
    it('should return 400 status for unstringed Lastname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikeghjkjbjkshegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: ['Okoro'],
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Lastname must be a string');
          done();
        });
    });
    it('should return 400 status for empty Lastname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikeskvjhjhegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: '',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Lastname field cannot be empty');
          done();
        });
    });
    it('should return 400 status for invalid Lastname character', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikekvhvhjshegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: 'Oko00ro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Lastname accepts only alphabets');
          done();
        });
    });

    // Email Tests
    it('should return 400 status for an undefined Email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Email field is required');
          done();
        });
    });
    it('should return 400 status for empty Email Field', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: '',
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Email cannot be empty.');
          done();
        });
    });

    // Password Tests
    it('should return 400 status for undefined Password', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikesjhjhskjdgghegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: 'Okoro'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Password field is required');
          done();
        });
    });
    it('should return 400 status for empty Password Field', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'fgsdfikeshegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: ''
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Password field cannot be empty');
          done();
        });
    });
    it('should return 400 status for White space Password', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'fgsfgsdfgikeshegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: ' '
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Password cannot be a space');
          done();
        });
    });
  });
});

describe(`All tests for signin endpoint`, () => {
  describe(`POST api/v1/auth/signin`, () => {
    it('should return status 200 for a successful login', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshjjhegs@gmail.com',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('user_id');
          expect(res.body.data).to.have.property('is_admin');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });

    it('should return 400 status for an undefined Email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          password: 'bhbjvjhbhbvy'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Email field cannot be empty');
          done();
        });
    });
    it('should return 400 status for an unstringed Email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: ['ikeshegs@gmail.com'],
          password: 'bhjbhjvbfhjb'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Email should be a string');
          done();
        });
    });
    it('should return 400 status for empty Email Field', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: 'jhbvhjbvhjfbv'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Email field cannot be empty.');
          done();
        });
    });
    it('should return 400 status for non existing Email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'charlesodili@gmail.com',
          password: 'hsihjvnfkjvnd'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('No user in the database');
          done();
        });
    });
    it('should return 400 status for failed authentication', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshjjhegs@gmail.com',
          password: 'hsihjvnfkjvnd'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Authentication Failed');
          done();
        });
    });
    it('should return 400 status for Undefined Password Login', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshjjhegs@gmail.com'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Password field cannot be empty');
          done();
        });
    });
    it('should return 400 status for empty Password Field', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshjjhegs@gmail.com',
          password: ''
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Password field cannot be empty');
          done();
        });
    });
    it('should return 400 status for using space as a Password', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshjjhegs@gmail.com',
          password: ' '
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Password cannot be a space');
          done();
        });
    });
    it('should return 400 status for wrong Password length', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshjjhegs@gmail.com',
          password: 'hdhjb'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal(
            'Password should be 8 to 30 characters long'
          );
          done();
        });
    });
  });
});

describe(`All tests for get users endpoint`, () => {
  describe(`GET api/v1/users`, () => {
    let userToken;
    before(done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'kindness@gmail.com',
          password: 'ansemiosaro'
        })
        .end((err, res) => {
          const { token } = res.body.data;
          userToken = token;
          done(err);
        });
    });
    it('The GET request should return status 200 for admin successfully viewing users', done => {
      chai
        .request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('email');
          expect(res.body.data[0]).to.have.property('firstname');
          expect(res.body.data[0]).to.have.property('lastname');
          expect(res.body.data[0]).to.have.property('password');
          expect(res.body.data[0]).to.have.property('is_admin');
          done();
        });
    });
  });

  describe(`GET api/v1/users`, () => {
    let userToken;
    before(done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'frankEd@gmail.com',
          password: 'EdohoFraNK'
        })
        .end((err, res) => {
          const { token } = res.body.data;
          userToken = token;
          done(err);
        });
    });
    it('The GET request should return status 401 for user cannot view other users', done => {
      chai
        .request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe(`GET api/v1/users`, () => {
    let userToken;
    before(done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'frankEd@gmail.com',
          password: 'EdohoFraNK'
        })
        .end((err, res) => {
          userToken = 'token';
          done(err);
        });
    });
    it('The GET request should return status 403 for Forbidden access', done => {
      chai
        .request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.error).to.equal('Forbidden');
          done();
        });
    });
  });

  // describe(`GET api/v1/trips`, () => {
  //   let userToken;
  //   before(done => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/signin')
  //       .send({
  //         email: 'frankE@gmail.com',
  //         password: 'EdohoFraNK'
  //       })
  //       .end((err, res) => {
  //         userToken = 'token';
  //         done(err);
  //       });
  //   });
  //   it('The GET request should return status 403 for Forbidden access', done => {
  //     chai
  //       .request(app)
  //       .get('/api/v1/trips')
  //       .set('Authorization', `Bearer ${userToken}`)
  //       .send({
  //         busId: 45,
  //         origin: 'Ibadan',
  //         destination: 'Lagos',
  //         fare: 1200.0
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(403);
  //         expect(res.body.error).to.equal('Forbidden');
  //         done();
  //       });
  //   });
  // });
});
