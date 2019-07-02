import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe(`All tests for signup endpoint`, () => {
  describe(`POST api/v1/auth/signup`, () => {
    it(`It should return status: 201 for successful signup`, done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ikeshegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal(
            'Success: User created successfully'
          );
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should return 400 status for undefined Firstname', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'shegshjgjhkgjhjh@gmail.com',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Firstname field is required');
          done();
        });
    });
    it('should return 400 status for unstringed First Name', done => {
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
          expect(res.body.message).to.equal('Firstname must be an alphabet');
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
          expect(res.body.message).to.equal('Firstname field cannot be empty');
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
          expect(res.body.message).to.equal('Firstname accepts only alphabets');
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
          expect(res.body.message).to.equal('Lastname field is required');
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
          expect(res.body.message).to.equal('Lastname must be a string');
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
          expect(res.body.message).to.equal('Lastname field cannot be empty');
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
          expect(res.body.message).to.equal('Lastname accepts only alphabets');
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
          expect(res.body.message).to.equal('Email field is required');
          done();
        });
    });
    it('should return 400 status for an unstringed Email', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: ['ikeshelbjkjkbngs@gmail.com'],
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: 'shegsjhbejk'
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('Email should be a string');
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
          expect(res.body.message).to.equal('Email cannot be empty.');
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
          expect(res.body.message).to.equal('Password field is required');
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
          expect(res.body.message).to.equal('Password field cannot be empty');
          done();
        });
    });
    it('should return 400 status for an unstringed Password', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'fgsdfgikeshegs@gmail.com',
          firstname: 'Ikechukwu',
          lastname: 'Okoro',
          password: ['shegsjhbejk']
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Password should be a string');
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
          expect(res.body.message).to.equal('Password cannot be a space');
          done();
        });
    });
  });
});
