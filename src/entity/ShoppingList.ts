import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Shop from './Shop';
import ShoppingListItem from './ShoppingListItem';
import User from './User';

@Entity()
export default class ShoppingList extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(
    type => ShoppingListItem,
    shoppingListItem => shoppingListItem.shoppingList
  )
  public items!: ShoppingListItem[];

  @ManyToOne(type => User, user => user.shoppingLists, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  public assigned?: User;

  @ManyToOne(type => Shop, shop => shop.shoppingLists, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  public shop?: Shop;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
