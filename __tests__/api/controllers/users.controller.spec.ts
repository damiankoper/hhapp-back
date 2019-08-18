import * as request from 'supertest';
import App from '../../../dist/app';
import User from '../../../dist/entity/User';

jest.mock('../../../dist/api/middlewares/session.middleware.js');

describe('Users controller', () => {
  let app: any;
  let express: any;
  beforeAll(async () => {
    app = new App({
      logging: ['info'],
      port: 0,
    });
    express = await app.run();
  });

  beforeEach(async () => {
    for (const user of await User.find()) {
      await user.remove();
    }
  });

  afterAll(async () => {
    await app.destroy();
  });

  it('should get users', async () => {
    const response = await request(express)
      .get('/users')
      .expect(200);
    expect(response.body).toHaveLength(0);
  });
  it('should fail when user does not exist', async () => {
    await request(express)
      .get('/users/1')
      .expect(404);
  });

  it('should create and delete user', async () => {
    const user = {
      firstName: 'XD',
      lastName: 'XDD',
      password: 'XDD',
      username: 'XDD',
    };
    let response = await request(express)
      .post('/users')
      .send(user)
      .expect(201);
    expect(response.body.firstName).toEqual(user.firstName);
    expect(response.body.lastName).toEqual(user.lastName);
    expect(response.body.password).toBeUndefined();
    // expect(response.body.id).toBeGreaterThan(0);
    response = await request(express)
      .get('/users')
      .expect(200);
  });
});
