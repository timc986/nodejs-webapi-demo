import { User } from './../entities/User';
import { getConnection } from "typeorm";
import { Order } from "../entities/Order";

export class OrderService {

    public async getAllOrders(): Promise<Order[]> {
        const orders = await getConnection()
            .getRepository(Order)
            .createQueryBuilder("order")
            .innerJoinAndSelect("order.createdByUser", "createdByUser")
            .getMany();

        return orders;
    }

    public async getOrder(id: string): Promise<Order | undefined> {
        const order = await getConnection()
            .createQueryBuilder()
            .select("order")
            .from(Order, "order")
            .innerJoinAndSelect("order.createdByUser", "createdByUser")
            .where("order.id = :id", { id: id })
            .getOne();

        return order;
    }

    public async addOrder(order: Order): Promise<void> {
        const newUser = new User();
        newUser.id = 1; // TODO: get user id from jwt 

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Order)
            .values([
                {
                    orderCode: order.orderCode,
                    name: order.name,
                    createdByUser: newUser,
                    createdOn: new Date().toUTCString()
                }
            ])
            .execute();
    }

    public async updateOrder(order: Order): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .update(Order)
            .set({
                orderCode: order.orderCode,
                name: order.name
            })
            .where("id = :id", { id: order.id })
            .execute();
    }

    public async deleteOrder(id: string): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Order)
            .where("id = :id", { id: id })
            .execute();
    }
}