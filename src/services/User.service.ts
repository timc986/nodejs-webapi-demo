import { UserRole } from "../entities/UserRole";
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

    public async addUser(user: User, userRoleId: number): Promise<void> {
        const newUserRole = new UserRole();
        newUserRole.id = userRoleId;

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
                    createdOn: new Date().toUTCString(),
                    userRole: newUserRole
                }
            ])
            .execute();
    }
}