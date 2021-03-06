import { UserRole } from './UserRole';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Order } from "./Order";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    age: number;
    @Column()
    email: string;
    @Column({ type: 'timestamp without time zone' })
    createdOn: Date;
    // @Column()
    // lastLoginOn: Date;
    // @Column()
    // lastUpdateOn: Date;

    @OneToMany(
        type => Order,
        order => order.createdByUser
    )
    orders: Order[];
    @ManyToOne(
        type => UserRole,
        userRole => userRole.users
    )
    userRole: UserRole;
}