import { Router } from 'express';
import UserRouter from './Users';
import OrderRouter from './Orders';

const router = Router();

router.use('/users', UserRouter); // route for api and controller
router.use('/orders', OrderRouter);

export default router;