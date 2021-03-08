import { getConnection } from "typeorm";
import { User } from "../entities/User";

export class UserService {

    // data access service

    public async getAllUsers(): Promise<User[]> {
        const users = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.userRole", "userRole")
            .getMany();

        return users;
    }

    public async getUser(id: string): Promise<User | undefined> {
        const user = await getConnection()
            .createQueryBuilder()
            .select("user")
            .from(User, "user")
            .innerJoinAndSelect("user.userRole", "userRole")
            .where("user.id = :id", { id: id })
            .getOne();

        return user;
    }
}