import { Router } from 'express';
import UserRouter from './Users';

const router = Router();

router.use('/users', UserRouter); // route for api and controller

export default router;