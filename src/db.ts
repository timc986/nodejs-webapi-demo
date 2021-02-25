import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
// import { Tedis } from "tedis";
import logger from '../src/shared/Logger';

export async function intializeDB(): Promise<void> {
    var connectionOptions: ConnectionOptions = {
        "type": "postgres",
        "host": process.env.TYPEORM_HOST,
        "port": 5432,
        "username": process.env.TYPEORM_USERNAME,
        "password": process.env.TYPEORM_PASSWORD,
        "database": process.env.TYPEORM_DATABASE,
        "synchronize": true,
        "logging": false,
        "migrationsTableName": process.env.TYPEORM_MIGRATIONSTABLENAME,
        "entities": [
            __dirname + '/entities/*.ts'
        ]
    };

    console.log(connectionOptions);

    await createConnection(connectionOptions);
    logger.info('Database connected');
}