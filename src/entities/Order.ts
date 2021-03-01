import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    orderCode: string;
    @Column()
    name: string;
    // @Column()
    // createdOn: Date;    

    @ManyToOne(
        type => User,
        createdByUser => createdByUser.orders
    )
    createdByUser: User;
}