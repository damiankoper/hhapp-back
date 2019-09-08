import * as request from 'supertest';
import App from '../../../src/app';
import ShoppingItem from '../../../src/entity/ShoppingItem';
import ShoppingItemDataSetup from '../../setup/shoppingItemData.setup';
jest.mock('../../../src/api/middlewares/session.middleware');

describe('ShoppingItems controller', () => {
  let app: any;
  let express: any;
  const shoppingItemDataSetup = new ShoppingItemDataSetup();
  const shoppingItemData = {
    boughtForId: 0,
    categoryId: 0,
    date: '2019-09-03 18:00:00',
    name: 'Chleb',
    price: 2.0,
    quantity: 1.0,
    shared: false,
    shopId: 0,
    unitDiscount: 0.5,
  };
  beforeAll(async () => {
    app = new App({
      logging: ['info'],
      port: 0,
    });
    express = await app.run();
  });

  beforeEach(async () => {
    for (const shoppingItem of await ShoppingItem.find()) {
      await shoppingItem.remove();
    }
    await shoppingItemDataSetup.destroy();
    await shoppingItemDataSetup.create();
  });

  afterAll(async () => {
    await app.destroy();
  });

  it('should create shoppingItem', async () => {
    shoppingItemData.boughtForId = shoppingItemDataSetup.user.id;
    shoppingItemData.shopId = shoppingItemDataSetup.shop.id;
    shoppingItemData.categoryId = shoppingItemDataSetup.category.id;
    const response = await request(express)
      .post('/users/' + shoppingItemDataSetup.user.id + '/shoppingItems')
      .send(shoppingItemData)
      .expect(201);
    expect(response.body.name).toEqual(shoppingItemData.name);
    expect(response.body.price).toEqual(shoppingItemData.price);
    expect(response.body.id).toBeGreaterThan(0);
  });
  it('should find shoppingItems for user', async () => {
    shoppingItemData.boughtForId = shoppingItemDataSetup.user.id;
    shoppingItemData.shopId = shoppingItemDataSetup.shop.id;
    shoppingItemData.categoryId = shoppingItemDataSetup.category.id;
    let response = await request(express)
      .get('/users/' + shoppingItemDataSetup.user.id + '/shoppingItems')
      .expect(200);
    expect(response.body).toHaveLength(0);
    response = await request(express)
      .post('/users/' + shoppingItemDataSetup.user.id + '/shoppingItems')
      .send(shoppingItemData)
      .expect(201);
    response = await request(express)
      .get('/users/' + shoppingItemDataSetup.user.id + '/shoppingItems')
      .expect(200);
    expect(response.body).toHaveLength(1);
  });
});
