import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { paramMissingError } from '../shared/Constants';

const router = Router();

// User data access service

// http://localhost:3000/api/users/all

router.get('/all', async (req: Request, res: Response) => {
    try {
        const users = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .getMany();
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
        const { id } = req.params as ParamsDictionary;
        const user = await getConnection()
            .createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.id = :id", { id: id })
            .getOne();
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

router.post('/add', async (req: Request, res: Response) => {
    try {
        const user = req.body; // TODO: request validation
        if (!user || !user.firstName || !user.lastName || !user.age) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: paramMissingError,
            });
        }

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    email: user.email,
                    createdOn: new Date().toUTCString()
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