import * as request from 'supertest';
import App from '../../../dist/app';

describe('Users controller', () => {
  let app: any;
  let express: any;
  beforeAll(async done => {
    app = new App({
      logging: ['info'],
      port: 0,
    });
    express = await app.run();
    done();
  });

  afterAll(async done => {
    await app.destroy();
    done();
  });

  it('should get users', async done => {
    await request(express)
      .get('/users')
      .expect(200);
    done();
  });
});
