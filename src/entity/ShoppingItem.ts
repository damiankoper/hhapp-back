import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import User from './User';
import Shop from './Shop';
import ShoppingCategory from './ShoppingCategory';

@Entity()
export default class ShoppingItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column({ type: "float" })
    public price!: number;

    @Column({ type: "float" })
    public quantity!: number;

    @Column({ type: "float" })
    public unitDiscount!: number;

    @Column({ type: "date" })
    public date!: Date;

    @Column({ type: "boolean" })
    public shared!: boolean;

    @ManyToOne(type => User, user => user.shoppingItemsBoughtBy, { onDelete: "CASCADE" })
    public boughtBy!: User;

    @ManyToOne(type => User, user => user.shoppingItemsBoughtFor, { onDelete: "CASCADE" })
    public boughtFor!: User;

    @ManyToOne(type => Shop, shop => shop.shoppingItems, { onDelete: "CASCADE" })
    public shop!: Shop;

    @ManyToOne(type => ShoppingCategory, shoppingCategory => shoppingCategory.shoppingItems, { onDelete: "CASCADE" })
    public category!: ShoppingCategory;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

}

