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
    boughtById: 0,
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
  function doCreateItem() {
    shoppingItemData.boughtForId = shoppingItemDataSetup.user.id;
    shoppingItemData.shopId = shoppingItemDataSetup.shop.id;
    shoppingItemData.categoryId = shoppingItemDataSetup.category.id;
    shoppingItemData.boughtById = shoppingItemDataSetup.user.id;
  }

  it('should get shoppingItems', async () => {
    const response = await request(express)
      .get('/shoppingItems')
      .expect(200);
    expect(response.body).toHaveLength(0);
  });
  it('should find an item', async () => {
    doCreateItem();
    let response = await request(express)
      .post('/shoppingItems/')
      .send(shoppingItemData)
      .expect(201);
    expect(response.body.name).toEqual(shoppingItemData.name);
    response = await request(express)
      .get('/shoppingItems/' + response.body.id)
      .expect(200);
    expect(response.body.name).toEqual(shoppingItemData.name);
  });
  it('should find and fail when shoppingItem does not exist', async () => {
    await request(express)
      .get('/shoppingItems/100')
      .expect(404);
  });
  it('should create shoppingItem', async () => {
    doCreateItem();
    const response = await request(express)
      .post('/shoppingItems/')
      .send(shoppingItemData)
      .expect(201);
    expect(response.body.price).toEqual(shoppingItemData.price);
    expect(response.body.shop.id).toEqual(shoppingItemData.shopId);
    expect(response.body.id).toBeGreaterThan(0);
    expect(await ShoppingItem.findOne(response.body.id)).not.toBeUndefined();
  });
  it('should update primitive value of ShoppingItem', async () => {
    doCreateItem();
    let response = await request(express)
      .post('/shoppingItems')
      .send(shoppingItemData)
      .expect(201);
    expect(response.body.name).toEqual(shoppingItemData.name);
    response = await request(express)
      .get('/shoppingItems/' + response.body.id)
      .expect(200);
    const newPrice = 20.0;
    shoppingItemData.price = newPrice;
    response = await request(express)
      .put('/shoppingItems/' + response.body.id)
      .send(shoppingItemData)
      .expect(200);
    expect(response.body.price).toEqual(newPrice);
  });
  it('should update relation of ShoppingItem', async () => {
    doCreateItem();
    let response = await request(express)
      .post('/shoppingItems')
      .send(shoppingItemData)
      .expect(201);
    expect(response.body.name).toEqual(shoppingItemData.name);
    response = await request(express)
      .get('/shoppingItems/' + response.body.id)
      .expect(200);
    shoppingItemData.shopId = shoppingItemDataSetup.shopForUpdate.id;
    response = await request(express)
      .put('/shoppingItems/' + response.body.id)
      .send(shoppingItemData)
      .expect(200);
    expect(response.body.shop.id).toEqual(shoppingItemData.shopId);
  });
  it('should delete an item', async () => {
    doCreateItem();
    let response = await request(express)
      .post('/shoppingItems')
      .send(shoppingItemData)
      .expect(201);
    response = await request(express)
      .delete('/shoppingItems/' + response.body.id)
      .expect(200);
    expect(response.body.price).toEqual(shoppingItemData.price);
    const itemAfterDeletion = await ShoppingItem.findOne(response.body.id);
    expect(itemAfterDeletion).toBeUndefined();
  });
  it('should fail if update not existing item', async () => {
    doCreateItem();
    await request(express)
      .put('/shoppingItems/100')
      .send(shoppingItemData)
      .expect(404);
  });
  it('should fail if delete not existing item', async () => {
    await request(express)
      .delete('/shoppingItems/100')
      .expect(404);
  });
  it('should fail if store item without relation', async () => {
    shoppingItemData.boughtForId = shoppingItemDataSetup.user.id;
    shoppingItemData.shopId = shoppingItemDataSetup.shop.id;
    shoppingItemData.categoryId = shoppingItemDataSetup.category.id;
    await request(express)
      .post('/shoppingItems/')
      .send(shoppingItemData)
      .expect(400);
  });
  it('should fail if update item with not exising relation', async () => {
    doCreateItem();
    let response = await request(express)
      .post('/shoppingItems')
      .send(shoppingItemData)
      .expect(201);
    expect(response.body.name).toEqual(shoppingItemData.name);
    response = await request(express)
      .get('/shoppingItems/' + response.body.id)
      .expect(200);
    shoppingItemData.boughtForId = 1000;
    shoppingItemData.shopId = 1000;
    shoppingItemData.categoryId = 1000;
    shoppingItemData.boughtById = 1000;
    response = await request(express)
      .put('/shoppingItems/' + response.body.id)
      .send(shoppingItemData)
      .expect(404);
  });
});
