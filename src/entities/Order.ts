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
    @Column({ type: 'timestamp without time zone' })
    createdOn: Date;    

    @ManyToOne(
        type => User,
        createdByUser => createdByUser.orders
    )
    createdByUser: User;
}