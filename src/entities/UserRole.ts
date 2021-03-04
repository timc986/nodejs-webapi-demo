import { User } from '../entities/User';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;

    @OneToMany(
        type => User,
        user => user.userRole
    )
    users: User[];
}