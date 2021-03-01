import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
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
}