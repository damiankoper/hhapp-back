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
export default class Shop extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column({ length: 7 })
    public color!: string;

    @OneToMany(type => ShoppingItem, shoppingItem => shoppingItem.shop)
    public shoppingItems!: ShoppingItem[];

    @OneToMany(type => ShoppingList, shoppingList => shoppingList.shop)
    public shoppingList!: ShoppingList[];

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
}