import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { paramMissingError } from '../shared/constants';

const router = Router();

// User data access service

// http://localhost:3000/api/users/all

router.get('/all', async (req: Request, res: Response) => {
    const users = await getConnection()
        .getRepository(User)
        .createQueryBuilder("user")
        .getMany();
    return res.status(StatusCodes.OK).json({users});
});

// http://localhost:3000/api/users/1

router.get('/:id', async (req: Request, res: Response) => {
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
    return res.status(StatusCodes.OK).json({user});
});


/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const {
        user
    } = req.body;

    if (!user) {
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
                age: user.age
            }
        ])
        .execute();
    return res.status(StatusCodes.CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user && !user.id) {
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
            age: user.age
        })
        .where("id = :id", { id: user.id })
        .execute();
    return res.status(StatusCodes.OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id })
        .execute();
    return res.status(StatusCodes.OK).end();
});

export default router;