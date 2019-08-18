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
    let response = await request(express)
      .get('/users')
      .expect(200);
    done();
    expect(response.body).toHaveLength(0);
  });
  it('should fail when user does not exist', async done => {
    await request(express)
      .get('/users/1')
      .expect(404);
    done();
  });
  it('should create and delete user', async done => {
    const user = {
      firstName: 'XD',
      lastName: 'XDD',
    };
    let response = await request(express)
      .post('/users')
      .send(user)
      .expect(201);
    expect(response.body.firstName).toEqual(user.firstName);
    expect(response.body.lastName).toEqual(user.lastName);
    //expect(response.body.id).toBeGreaterThan(0);
    response = await request(express)
      .get('/users')
      .expect(200);
    done();
  });
});
