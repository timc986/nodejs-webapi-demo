import { User } from './entities/User';
import "reflect-metadata";
import { createConnection } from "typeorm";
// import { Tedis } from "tedis";
// import logger from '../src/shared/Logger';
export async function intializeDB(): Promise<void> {
    await createConnection({
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "masterpw",
        "database": "NodejsTest",
        "synchronize": true,
        "logging": false,
        "migrationsTableName": "custom_migration_table",
        "entities": [
            __dirname + '/entities/*.ts'
        ]
    });
}