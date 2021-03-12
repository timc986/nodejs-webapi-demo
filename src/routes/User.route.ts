import { UserController } from '../controllers/User.controller';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

const router = Router();

const userController: UserController = new UserController();

// http://localhost:3000/api/users/all

router.get('/all', async (req: Request, res: Response) => {
    try {
        const users = await userController.getAllUsers();
        if (users.length < 1) {
            res.status(404);
            res.end();
            return;
        }
        return res.status(StatusCodes.OK).json({ users });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});

// http://localhost:3000/api/users/1

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userController.getUser(req, res);
        if (!user) {
            res.status(404);
            res.end();
            return;
        }
        return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});


// http://localhost:3000/api/users/add

router.post('/add',
    userController.validate('addUser'),
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }

            await userController.addUser(req, res);
            return res.status(StatusCodes.CREATED).end();
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: error.message,
            });
        }
    });


// http://localhost:3000/api/users/update

router.put('/update',
    userController.validate('updateUser'),
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
            }
            // const user = req.body;
            // if (!user || !user.id) {
            //     return res.status(StatusCodes.BAD_REQUEST).json({
            //         error: paramMissingError,
            //     });
            // }
            await userController.updateUser(req, res);
            return res.status(StatusCodes.OK).end();
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: error.message,
            });
        }
    });


// http://localhost:3000/api/users/delete/2

router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        await userController.deleteUser(req, res);
        return res.status(StatusCodes.OK).end();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: error.message,
        });
    }
});

export default router;