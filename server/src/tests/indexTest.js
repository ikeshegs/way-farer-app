import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe(`Test for the Homepage`, () => {
  it(`It should test to see if homepage loads`, done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal(
          'Welcome to WayFarer app. A public bus transport booking app. 😀'
        );
        done();
      });
  });
});
