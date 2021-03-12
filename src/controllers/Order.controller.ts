import { OrderService } from './../services/Order.service';
import { Order } from "../entities/Order";
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body, ValidationChain } from 'express-validator';

export class OrderController {

    private orderService: OrderService = new OrderService();

    public async getAllOrders(): Promise<Order[]> {
        const orders = await this.orderService.getAllOrders();
        return orders;
    }

    public async getOrder(req: Request, res: Response): Promise<Order | undefined> {
        const { id } = req.params as ParamsDictionary;
        const order = await this.orderService.getOrder(id);
        return order;
    }

    public async addOrder(req: Request, res: Response): Promise<void> {
        const order = req.body;
        await this.orderService.addOrder(order);
    }

    public async updateOrder(req: Request, res: Response): Promise<void> {
        const order = req.body;
        const existingOrder = await this.orderService.getOrder(order.id);
        if (!existingOrder) {
            throw new Error('order not found');
        }

        if (order.orderCode && (order.orderCode !== existingOrder.orderCode)) {
            existingOrder.orderCode = order.orderCode;
        }
        if (order.name && (order.name !== existingOrder.name)) {
            existingOrder.name = order.name;
        }

        await this.orderService.updateOrder(existingOrder);
    }

    public async deleteOrder(req: Request, res: Response): Promise<void> {
        const { id } = req.params as ParamsDictionary;
        const existingOrder = await this.orderService.getOrder(id);
        if (!existingOrder) {
            throw new Error('order not found');
        }

        await this.orderService.deleteOrder(id);
    }

    public validate(method: string): ValidationChain[] {
        switch (method) {
            case 'addOrder': {
                return [
                    body('orderCode', 'orderCode is required').trim().not().isEmpty(),
                    body('name', 'name is required').trim().not().isEmpty()
                ]
            }
            case 'updateOrder': {
                return [
                    body('id', 'order id is required').trim().isInt({ min: 1 }),
                    body('orderCode', 'orderCode is required').optional().trim().not().isEmpty(),
                    body('name', 'name is required').optional().trim().not().isEmpty()
                ]
            }
            default: {
                return [
                    body('conrtollerMethodName', 'method name not found in controller').exists()
                ]
            }
        }
    }
}