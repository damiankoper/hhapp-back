import * as request from 'supertest';
import App from '../../../dist/app';

describe('Users controller', () => {
  let app: any;
  beforeAll(async done => {
    app = await new App({
      logging: ['info'],
      port: 0
    }).run();
    done();
  });

  afterAll(async () => {
    await app.destroy();
  });

  it('should get users', async () => {
    await request(app)
      .get('/users')
      .expect(200);
  });
});
