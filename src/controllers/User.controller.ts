import { User } from './../entities/User';
import { UserService } from '../services/User.service';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
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
}