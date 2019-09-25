import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Shop from './Shop';
import ShoppingCategory from './ShoppingCategory';
import User from './User';

@Entity()
export default class ShoppingItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column({ type: 'float' })
  public price!: number;

  @Column({ type: 'float' })
  public quantity!: number;

  @Column({ type: 'float' })
  public unitDiscount!: number;

  @Column({ type: 'date' })
  public date!: Date;

  @Column({ type: 'boolean' })
  public shared!: boolean;

  @ManyToOne(type => User, user => user.shoppingItemsBoughtBy, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public boughtBy!: User;

  @ManyToOne(type => User, user => user.shoppingItemsBoughtFor, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public boughtFor!: User;

  @ManyToOne(type => Shop, shop => shop.shoppingItems, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public shop!: Shop;

  @ManyToOne(
    type => ShoppingCategory,
    shoppingCategory => shoppingCategory.shoppingItems,
    { nullable: false, onDelete: 'CASCADE' }
  )
  public category!: ShoppingCategory;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
