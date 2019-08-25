import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
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

  @Column({ length: 7 })
  public color!: string;

  @OneToMany(type => ShoppingItem, shoppingItem => shoppingItem.boughtBy)
  public shoppingItemsBoughtBy!: ShoppingItem[];

  @OneToMany(type => ShoppingItem, shoppingItem => shoppingItem.boughtFor)
  public shoppingItemsBoughtFor!: ShoppingItem[];

  @OneToMany(type => ShoppingList, shoppingList => shoppingList.assigned, { nullable: true })
  public shoppingList!: ShoppingList[];

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
