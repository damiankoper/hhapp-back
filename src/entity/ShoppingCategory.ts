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

@Entity()
export default class ShoppingCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column({ type: 'boolean' })
  public sharedByDefault!: boolean;

  @OneToMany(type => ShoppingItem, shoppingItem => shoppingItem.category)
  public shoppingItems!: ShoppingItem[];

  @Column({ length: 7, default: '#ffffff' })
  public color!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
