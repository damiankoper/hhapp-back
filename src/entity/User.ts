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
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column({ unique: true })
  public username!: string;

  @Column({ length: 100, select: false })
  public password!: string;

  @Column({ length: 7, default: '#ffffff' })
  public color!: string;

  @OneToMany(type => ShoppingItem, shoppingItem => shoppingItem.boughtBy)
  public shoppingItemsBoughtBy!: ShoppingItem[];

  @OneToMany(type => ShoppingItem, shoppingItem => shoppingItem.boughtFor)
  public shoppingItemsBoughtFor!: ShoppingItem[];

  @OneToMany(type => ShoppingList, shoppingList => shoppingList.assigned)
  public shoppingLists!: ShoppingList[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
