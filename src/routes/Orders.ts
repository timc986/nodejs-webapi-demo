import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { getConnection } from "typeorm";
import { Order } from "../entities/Order";
import { paramMissingError } from '../shared/Constants';
import { User } from 'src/entities/User';

const router = Router();

// http://localhost:3000/api/orders/all

router.get('/all', async (req: Request, res: Response) => {
    try {
        const orders = await getConnection()
            .getRepository(Order)
            .createQueryBuilder("order")
            .innerJoinAndSelect("order.createdByUser", "createdByUser")
            .getMany();
        if (orders.length < 1) {
            res.status(404);
            res.end();
            return;
        }
        return res.status(StatusCodes.OK).json({ orders });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});

// http://localhost:3000/api/orders/1

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as ParamsDictionary;
        const order = await getConnection()
            .createQueryBuilder()
            .select("order")
            .from(Order, "order")
            .innerJoinAndSelect("order.createdByUser", "createdByUser")
            .where("order.id = :id", { id: id })
            .getOne();
        if (!order) {
            res.status(404);
            res.end();
            return;
        }
        return res.status(StatusCodes.OK).json({ order });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});


// http://localhost:3000/api/orders/add

router.post('/add', async (req: Request, res: Response) => {
    try {
        const order = req.body; // TODO: request validation
        if (!order || !order.orderCode || !order.name) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        const user = new User();
        user.id = 1;

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Order)
            .values([
                {
                    orderCode: order.orderCode,
                    name: order.name,
                    createdByUser: user
                }
            ])
            .execute();
        return res.status(StatusCodes.CREATED).end();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});


// http://localhost:3000/api/orders/update

router.put('/update', async (req: Request, res: Response) => {
    try {
        const order = req.body;
        if (!order || !order.id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        await getConnection()
            .createQueryBuilder()
            .update(Order)
            .set({
                orderCode: order.orderCode,
                name: order.name
            })
            .where("id = :id", { id: order.id }) // TODO: what if id doesn't exist, should throw error i think?
            .execute();
        return res.status(StatusCodes.OK).end();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});


// http://localhost:3000/api/orders/delete/2

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as ParamsDictionary;
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Order)
            .where("id = :id", { id: id }) // TODO: what if id doesn't exist, should throw error i think?
            .execute();
        return res.status(StatusCodes.OK).end();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});

export default router;