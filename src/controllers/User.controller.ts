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
        const user = req.body; //TODO: can use dto if neccessary
        let userRoleId = 1; // set default value
        if (user.userRoleId) {
            userRoleId = user.userRoleId;
        }
        await this.userService.addUser(user, userRoleId);
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const user = req.body;
        const existingUser = await this.userService.getUser(user.id);
        if (!existingUser) {
            throw new Error('user not found');
        }
        let existingUserRoleId = existingUser.userRole.id;

        if (user.firstName && (user.firstName !== existingUser.firstName)) {
            existingUser.firstName = user.firstName;
        }
        if (user.lastName && (user.lastName !== existingUser.lastName)) {
            existingUser.lastName = user.lastName;
        }
        if (user.age && (user.age != existingUser.age)) {
            existingUser.age = user.age;
        }
        if (user.email && (user.email !== existingUser.email)) {
            existingUser.email = user.email;
        }
        if (user.userRoleId && (user.userRoleId != existingUserRoleId)) {
            existingUserRoleId = user.userRoleId;
        }

        await this.userService.updateUser(existingUser, existingUserRoleId);
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params as ParamsDictionary;
        const existingUser = await this.userService.getUser(id);
        if (!existingUser) {
            throw new Error('user not found');
        }

        await this.userService.deleteUser(id);
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
                    body('email', 'a valid email address is required').optional().isEmail(),
                    body('userRoleId', 'Invalid userRoleId').optional().trim().isInt({ min: 1 })
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