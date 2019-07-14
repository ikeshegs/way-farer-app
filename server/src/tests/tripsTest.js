import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe(`All tests for create trip endpoint`, () => {
  describe(`POST api/v1/trips`, () => {
    let userToken;

    before(done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshegs@test.com',
          password: 'C00ljoe.'
        })
        .end((err, res) => {
          const { token } = res.body.data;
          userToken = token;
          done(err);
        });
    });
    before(done => {
      chai
        .request(app)
        .post('/api/v1/bus')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          number_plate: 'ab765jkt',
          manufacturer: 'Toyota',
          model: 'Coastal',
          year: 2017,
          capacity: 30
        })
        .end((err, res) => {
          done(err);
        });
    });
    it('It should return status 201 for a successful trip created', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 1,
          origin: 'Ibadan',
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.have.property('bus_id');
          expect(res.body.data).to.have.property('trip_id');
          expect(res.body.data).to.have.property('origin');
          expect(res.body.data).to.have.property('destination');
          expect(res.body.data).to.have.property('fare');
          expect(res.body.data).to.have.property('trip_date');
          done();
        });
    });
    it('It should return status 400 for empty Bus ID value', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          origin: 'Ibadan',
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus ID is required');
          done();
        });
    });
    it('It should return status 400 for Bus ID TYPE !== Number', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 'hg',
          origin: 'Ibadan',
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus ID must be a Number');
          done();
        });
    });

    it('It should return status 400 for Bus Origin is required', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus Origin is required');
          done();
        });
    });
    it('It should return status 400 for Bus Origin cannot be empty', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          origin: '',
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus Origin cannot be empty');
          done();
        });
    });
    it('It should return status 400 for Bus Origin cannot be a space', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          origin: ' ',
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus Origin cannot be a space');
          done();
        });
    });
    it('It should return status 400 for Bus destination is undefined', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          origin: 'Ibadan',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus destination is required');
          done();
        });
    });
    it('It should return status 400 for Bus destination cannot be empty', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          origin: 'Ibadan',
          destination: '',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus destination cannot be empty');
          done();
        });
    });
    it('It should return status 400 for Bus destination cannot be a space', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          origin: 'Ibadan',
          destination: ' ',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Bus destination cannot be a space');
          done();
        });
    });
    it('It should return status 400 for Fare is required', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          origin: 'Ibadan',
          destination: 'Lagos',
          trip_date: '2019-07-29'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Fare is required');
          done();
        });
    });
    it('It should return status 400 for Fare is not equals to number', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          bus_id: 45,
          origin: 'Ibadan',
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: '1200.00'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Fare must be a Number');
          done();
        });
    });
  });

  // describe(`POST api/v1/trips`, () => {
  //   let userToken;
  //   before(done => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/signin')
  //       .send({
  //         email: 'rachael@test.com',
  //         password: 'rachyfran.'
  //       })
  //       .end((err, res) => {
  //         const { token } = res.body.data;
  //         userToken = token;
  //         done(err);
  //       });
  //   });
  //   it('It should return status 403 for Forbidden access', done => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/trips')
  //       .set('Authorization', `Bearer ${userToken}`)
  //       .send({
  //         bus_id: 1,
  //         origin: 'Ibadan',
  //         destination: 'Lagos',
  //         trip_date: '2019-07-29',
  //         fare: 1200.0
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(403);
  //         expect(res.body.error).to.equal('Forbidden');
  //         done();
  //       });
  //   });
  // });

  describe(`POST api/v1/trips`, () => {
    before(done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .send({
          email: 'rachael@test.com',
          password: 'rachyfran.'
        })
        .end((err, res) => {
          done(err);
        });
    });
    it('It should return status 401 for Unauthorized access', done => {
      chai
        .request(app)
        .post('/api/v1/trips')
        .send({
          bus_id: 45,
          origin: 'Ibadan',
          destination: 'Lagos',
          trip_date: '2019-07-29',
          fare: 1200.0
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });
});

describe(`All tests for get trip endpoint`, () => {
  describe(`GET api/v1/trips`, () => {
    let userToken;
    before(done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'ikeshegs@test.com',
          password: 'C00ljoe.'
        })
        .end((err, res) => {
          const { token } = res.body.data;
          userToken = token;
          done(err);
        });
    });
    it('The GET request should return status 200 for admin successfully viewing trip', done => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data[0]).to.have.property('bus_id');
          expect(res.body.data[0]).to.have.property('trip_id');
          expect(res.body.data[0]).to.have.property('origin');
          expect(res.body.data[0]).to.have.property('destination');
          expect(res.body.data[0]).to.have.property('fare');
          expect(res.body.data[0]).to.have.property('trip_date');
          done();
        });
    });
  });

  describe(`GET api/v1/trips`, () => {
    before(done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'rachael@test.com',
          password: 'rachyfran.'
        })
        .end((err, res) => {
          done(err);
        });
    });
    it('The GET request should return status 401 for Unauthorized access', done => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
  });

  describe(`GET api/v1/trips`, () => {
    let userToken;
    before(done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'rachael@test.com',
          password: 'rachyfran.'
        })
        .end((err, res) => {
          userToken = 'token';
          done(err);
        });
    });
    it('The GET request should return status 403 for Forbidden access', done => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.error).to.equal('Forbidden');
          done();
        });
    });
  });
});

describe('Test for cancelling trip', done => {
  let userToken;
  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'ikeshegs@test.com',
        password: 'C00ljoe.'
      })
      .end((err, res) => {
        const { token } = res.body.data;
        userToken = token;
        done(err);
      });
  });
  before(done => {
    chai
      .request(app)
      .post('/api/v1/bus')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        number_plate: 'ab765jkt',
        manufacturer: 'Toyota',
        model: 'Coastal',
        year: 2017,
        capacity: 30
      })
      .end((err, res) => {
        done(err);
      });
  });
  before(done => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        bus_id: 1,
        origin: 'Aba',
        destination: 'Arochukwu',
        trip_date: '2019-09-02',
        fare: 1500.0
      })
      .end((err, res) => {
        done(err);
      });
  });
  it('The GET request should return status 200 for admin successfully cancelling trip', done => {
    chai
      .request(app)
      .patch('/api/v1/trips/1')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Trip cancelled successfully');
        done();
      });
  });
});
