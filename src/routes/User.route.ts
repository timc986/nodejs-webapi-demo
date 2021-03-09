import { UserController } from '../controllers/User.controller';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { paramMissingError } from '../shared/Constants';
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

router.put('/update', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (!user || !user.id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                email: user.email
            })
            .where("id = :id", { id: user.id }) // TODO: what if id doesn't exist, should throw error i think?
            .execute();
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
        const { id } = req.params as ParamsDictionary;
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(User)
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