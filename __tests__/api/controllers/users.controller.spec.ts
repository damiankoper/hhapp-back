import * as request from 'supertest';
import App from '../../../src/app';
import User from '../../../src/entity/User';
jest.mock('../../../src/api/middlewares/session.middleware');

function doExpectCreate(response: request.Response, user: any) {
  expect(response.body.firstName).toEqual(user.firstName);
  expect(response.body.lastName).toEqual(user.lastName);
  expect(response.body.password).toBeUndefined();
  expect(response.body.id).toBeGreaterThan(0);
}

describe('Users controller', () => {
  let app: any;
  let express: any;
  const userData = {
    firstName: 'test',
    lastName: 'test',
    password: 'lolpassword',
    passwordNotHashed: 'lolpassword',
    username: 'existingUser',
  };
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

  it('should create user', async () => {
    let response = await request(express)
      .post('/users')
      .send(userData)
      .expect(201);
    doExpectCreate(response, userData);
    response = await request(express)
      .get('/users/' + response.body.id)
      .expect(200);
    doExpectCreate(response, userData);
  });

  it('should update user', async () => {
    const user = await User.create(userData).save();
    const userUpdated = {
      firstName: 'XDu',
      lastName: 'XDu',
    };
    let response = await request(express)
      .put('/users/' + user.id)
      .send(userUpdated)
      .expect(200);
    expect(response.body.firstName).toEqual(userUpdated.firstName);
    expect(response.body.lastName).toEqual(userUpdated.lastName);
    response = await request(express)
      .get('/users/' + user.id)
      .expect(200);
  });
  it('should delete user', async () => {
    const user = await User.create(userData).save();
    const response = await request(express)
      .delete('/users/' + user.id)
      .expect(200);
    expect(response.body.firstName).toEqual(user.firstName);
    expect(response.body.lastName).toEqual(user.lastName);
    const userAfterDeletion = await User.findOne(user.id);
    expect(userAfterDeletion).toBeUndefined();
  });
});
