import * as request from 'supertest';
import App from '../../../src/app';
import Shop from '../../../src/entity/Shop';
jest.mock('../../../src/api/middlewares/session.middleware');

describe('Shops controller', () => {
  let app: any;
  let express: any;
  const shopData = {
    color: '#eeeeee',
    name: 'Aldi',
  };
  const shopUpdated = {
    name: 'Zabka',
  };
  beforeAll(async () => {
    app = new App({
      logging: ['info'],
      port: 0,
    });
    express = await app.run();
  });

  beforeEach(async () => {
    for (const shop of await Shop.find()) {
      await shop.remove();
    }
  });

  afterAll(async () => {
    await app.destroy();
  });
  it('should get shops', async () => {
    const response = await request(express)
      .get('/shops')
      .expect(200);
    expect(response.body).toHaveLength(0);
  });
  it('should fail finding if shop does not exist', async () => {
    await request(express)
      .get('/shops/100')
      .expect(404);
  });
  it('should create and find shop', async () => {
    let response = await request(express)
      .post('/shops')
      .send(shopData)
      .expect(201);
    expect(response.body.id).toBeGreaterThan(0);
    expect(response.body.name).toEqual(shopData.name);
    response = await request(express)
      .get('/shops/' + response.body.id)
      .expect(200);
    expect(response.body.id).toBeGreaterThan(0);
    expect(response.body.color).toEqual(shopData.color);
  });
  it('should delete shop', async () => {
    const shop = await Shop.create(shopData).save();
    const response = await request(express)
      .delete('/shops/' + shop.id)
      .expect(200);
    expect(response.body.name).toEqual(shop.name);
    const shopAfterDeletion = await Shop.findOne(shop.id);
    expect(shopAfterDeletion).toBeUndefined();
  });
  it('should fail deletion if user does not exist', async () => {
    await request(express)
      .delete('/shops/100')
      .expect(404);
  });
  it('should update shop', async () => {
    const shop = await Shop.create(shopData).save();
    let response = await request(express)
      .get('/shops/' + shop.id)
      .expect(200);
    response = await request(express)
      .put('/shops/' + shop.id)
      .send(shopUpdated)
      .expect(200);
    expect(response.body.name).toEqual(shopUpdated.name);
  });
  it('should fail updating if shop does not exist', async () => {
    await request(express)
      .put('/shops/1')
      .send(shopUpdated)
      .expect(404);
  });
});
