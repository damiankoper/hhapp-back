import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ShoppingItem from './ShoppingItem';
import ShoppingList from './ShoppingList';

@Entity()
export default class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column({ length: 7, default: '#ffffff' })
  public color!: string;

  @OneToMany(type => ShoppingItem, shoppingItem => shoppingItem.shop)
  public shoppingItems!: ShoppingItem[];

  @OneToMany(type => ShoppingList, shoppingList => shoppingList.shop)
  public shoppingLists!: ShoppingList[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
