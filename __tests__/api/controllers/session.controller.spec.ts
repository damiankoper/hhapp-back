import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';
import App from '../../../src/app';
import User from '../../../src/entity/User';

describe('Session controller', () => {
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
    userData.password = await bcrypt.hash(userData.password, 10);
  });

  beforeEach(async () => {
    for (const user of await User.find()) {
      await user.remove();
    }
  });

  afterAll(async () => {
    await app.destroy();
  });

  it('should not create session and return 400 without all data provided', async () => {
    await request(express)
      .post('/session')
      .send({ username: 'notExistingUser' })
      .expect(400);
  });

  it('should not create session and return 401 when user does not exist', async () => {
    await request(express)
      .post('/session')
      .send({ username: 'notExistingUser', password: 'lolpassword' })
      .expect(401);
  });

  it('should not create session for existing user with wrong password', async () => {
    await User.create(userData).save();
    await request(express)
      .post('/session')
      .send({
        password: 'wrongpassword',
        username: userData.username,
      })
      .expect(401);
  });

  it('should create session for existing user', async () => {
    const user = await User.create(userData).save();
    const response = await request(express)
      .post('/session')
      .send({
        password: userData.passwordNotHashed,
        username: userData.username,
      })
      .expect(201);
    expect(response.text.length).toBeGreaterThan(50);
    expect((jwt.decode(response.text) as any).user).toEqual(user.id);
  });

  it('should return 401 without token', async () => {
    await request(express)
      .get('/users')
      .expect(401);
  });

  it('should return 401 with not valid token', async () => {
    await request(express)
      .get('/users')
      .set('Authorization', 'Bearer shittoken123')
      .expect(401);

    await request(express)
      .get('/users')
      .set('Authorization', 'Tigerer shittoken123')
      .expect(401);
  });

  it('should return 200 with valid token', async () => {
    await User.create(userData).save();
    const response = await request(express)
      .post('/session')
      .send({
        password: userData.passwordNotHashed,
        username: userData.username,
      })
      .expect(201);

    await request(express)
      .get('/users')
      .set('Authorization', 'Bearer ' + response.text)
      .expect(200);
  });
});
