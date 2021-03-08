import { Router } from 'express';
import UserRouter from './User.route';
import OrderRouter from './Order.route';

const router = Router();

router.use('/users', UserRouter); // route for api and controller
router.use('/orders', OrderRouter);

export default router;