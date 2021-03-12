import { OrderController } from './../controllers/Order.controller';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

const router = Router();

const orderController: OrderController = new OrderController;

// http://localhost:3000/api/orders/all

router.get('/all', async (req: Request, res: Response) => {
    try {
        const orders = await orderController.getAllOrders();
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
        const order = await orderController.getOrder(req, res);
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

router.post('/add',
    orderController.validate('addOrder'),
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }

            await orderController.addOrder(req, res);
            return res.status(StatusCodes.CREATED).end();
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: error.message,
            });
        }
    });


// http://localhost:3000/api/orders/update

router.put('/update',
    orderController.validate('updateOrder'),
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }

            await orderController.updateOrder(req, res);
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
        await orderController.deleteOrder(req, res);
        return res.status(StatusCodes.OK).end();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});

export default router;