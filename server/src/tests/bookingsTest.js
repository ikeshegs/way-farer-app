import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe('All tests for bookings endpoint', () => {
  describe('POST api/v1/bookings', () => {
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
          numberPlate: 'ab765jkt',
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
          bus_id: 3,
          origin: 'Aba',
          destination: 'Owerri',
          trip_date: '2019-07-29',
          fare: 5000.0
        })
        .end((err, res) => {
          done(err);
        });
    });

    it('It should return status 201 for a successful booking', done => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 1
        })
        .end((err, res) => {
          expect(res.body.data).to.have.property('booking_id');
          expect(res.body.data).to.have.property('bus_id');
          expect(res.body.data).to.have.property('trip_id');
          expect(res.body.data).to.have.property('bus_id');
          expect(res.body.data).to.have.property('trip_date');
          expect(res.body.data).to.have.property('seat_number');
          expect(res.body.data).to.have.property('first_name');
          expect(res.body.data).to.have.property('last_name');
          expect(res.body.data).to.have.property('email');
          done();
        });
    });
  });
});

describe('All tests for view bookings endpoint', () => {
  describe('POST api/v1/bookings', () => {
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
          numberPlate: 'ab765jkt',
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
          bus_id: 3,
          origin: 'Aba',
          destination: 'Owerri',
          trip_date: '2019-07-29',
          fare: 5000.0
        })
        .end((err, res) => {
          done(err);
        });
    });

    before(done => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 1
        })
        .end((err, res) => {
          done(err);
        });
    });

    it('It should return status 200 for a ADMIN successfully viewing all bookings', done => {
      chai
        .request(app)
        .get('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 1
        })
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('booking_id');
          expect(res.body.data[0]).to.have.property('bus_id');
          expect(res.body.data[0]).to.have.property('trip_id');
          expect(res.body.data[0]).to.have.property('bus_id');
          expect(res.body.data[0]).to.have.property('trip_date');
          expect(res.body.data[0]).to.have.property('seat_number');
          expect(res.body.data[0]).to.have.property('first_name');
          expect(res.body.data[0]).to.have.property('last_name');
          expect(res.body.data[0]).to.have.property('email');
          done();
        });
    });
  });
});

describe('All tests for deleting a booking endpoint', () => {
  describe('DELETE api/v1/bookings', () => {
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
          numberPlate: 'ab765jkt',
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
          bus_id: 3,
          origin: 'Aba',
          destination: 'Owerri',
          trip_date: '2019-07-29',
          fare: 5000.0
        })
        .end((err, res) => {
          done(err);
        });
    });

    before(done => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          trip_id: 1
        })
        .end((err, res) => {
          done(err);
        });
    });

    it('It should return status 200, when a user successfully deletes a booking', done => {
      chai
        .request(app)
        .delete('/api/v1/bookings/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property('message');
          expect(res.body.data.message).to.equal(
            'Booking deleted successfully'
          );
          done();
        });
    });
  });
});
