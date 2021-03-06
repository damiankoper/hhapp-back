import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ShoppingList from './ShoppingList';

@Entity()
export default class ShoppingListItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column({ type: 'float' })
  public quantity!: number;

  @ManyToOne(type => ShoppingList, shoppingList => shoppingList.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public shoppingList!: ShoppingList;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
