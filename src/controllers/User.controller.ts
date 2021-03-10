import { User } from './../entities/User';
import { UserService } from '../services/User.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { body, ValidationChain } from 'express-validator';
export class UserController {

    // business logic

    private userService: UserService = new UserService();

    public async getAllUsers(): Promise<User[]> {
        const users = await this.userService.getAllUsers();
        return users;
    }

    public async getUser(req: Request, res: Response): Promise<User | undefined> {
        const { id } = req.params as ParamsDictionary;
        const user = await this.userService.getUser(id);
        return user;
    }

    public async addUser(req: Request, res: Response): Promise<void> {
        const user = req.body;
        let userRoleId = 1; // set default value
        if (user.userRoleId) {
            userRoleId = user.userRoleId;
        }
        await this.userService.addUser(user, userRoleId);
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const user = req.body;
        const existingUser = await this.userService.getUser(user.id);
        if(!existingUser){
            throw new Error('user not found');
        }

        await this.userService.updateUser(user); // TODO: only update the fields that exist in the request
    }

    public validate(method: string): ValidationChain[] {
        switch (method) {
            case 'addUser': {
                return [
                    body('firstName', 'firstName is required').trim().not().isEmpty(),
                    body('lastName', 'lastName is required').trim().not().isEmpty(),
                    body('age', 'a valid age is required').trim().isInt({ min: 1 }),
                    body('email', 'a valid email address is required').isEmail(),
                    body('userRoleId', 'Invalid userRoleId').optional().trim().isInt({ min: 1 })
                ]
            }
            case 'updateUser': {
                return [
                    body('id', 'user id is required').trim().isInt({ min: 1 }),
                    body('firstName', 'firstName is required').optional().trim().not().isEmpty(),
                    body('lastName', 'lastName is required').optional().trim().not().isEmpty(),
                    body('age', 'a valid age is required').optional().trim().isInt({ min: 1 }),
                    body('email', 'a valid email address is required').optional().isEmail()
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