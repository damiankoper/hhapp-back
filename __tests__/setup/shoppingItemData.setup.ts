import User from '../../src/entity/User';
import Shop from '../../src/entity/Shop';
import ShoppingCategory from '../../src/entity/ShoppingCategory';

export default class ShoppingItemDataSetup {
  public user!: User;
  public shop!: Shop;
  public shopForUpdate!: Shop;
  public category!: ShoppingCategory;
  private readonly userData = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    password: 'lolpassword',
    passwordNotHashed: 'lolpassword',
    username: 'existingUser',
  };
  private readonly shopData = {
    color: '#ffffff',
    name: 'Fresh',
  };
  private readonly shopDataForUpdate = {
    color: '#efefef',
    name: 'Aldi',
  };
  private readonly categoryData = {
    color: '#eeeeee',
    name: 'Chemia',
    sharedByDefault: false,
  };
  public async create() {
    this.user = await User.create(this.userData).save();
    this.shop = await Shop.create(this.shopData).save();
    this.shopForUpdate = await Shop.create(this.shopDataForUpdate).save();
    this.category = await ShoppingCategory.create(this.categoryData).save();
  }
  public async destroy() {
    for (const shop of await Shop.find()) {
      await shop.remove();
    }
    for (const shopForUpdate of await Shop.find()) {
      await shopForUpdate.remove();
    }
    for (const category of await ShoppingCategory.find()) {
      await category.remove();
    }
    for (const user of await User.find()) {
      await user.remove();
    }
  }
}
