import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
