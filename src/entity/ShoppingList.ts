import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import ShoppingListItem from './ShoppingListItem';
import User from './User';
import Shop from './Shop';

@Entity()
export default class ShoppingList extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @OneToMany(type => ShoppingListItem, shoppingListItem => shoppingListItem.shoppingList)
    public items!: ShoppingListItem[];

    @ManyToOne(type => User, user => user.shoppingList, { nullable: true, onDelete: "CASCADE" })
    public assigned!: User;

    @ManyToOne(type => Shop, shop => shop.shoppingList, { nullable: true, onDelete: "CASCADE" })
    public shop!: Shop;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;
}