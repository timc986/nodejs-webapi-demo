import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
// import { Tedis } from "tedis";
import logger from './shared/Logger';

export async function dbInit(): Promise<void> {
    var connectionOptions: ConnectionOptions = {
        "type": "postgres",
        "host": process.env.TYPEORM_HOST,
        "port": Number(process.env.TYPEORM_PORT),
        "username": process.env.TYPEORM_USERNAME,
        "password": process.env.TYPEORM_PASSWORD,
        "database": process.env.TYPEORM_DATABASE,
        "synchronize": (process.env.TYPEORM_SYNCHRONIZE === 'true'),
        "logging": (process.env.TYPEORM_LOGGING === 'true'),
        "migrationsTableName": process.env.TYPEORM_MIGRATIONSTABLENAME,
        "entities": [
            __dirname + '/entities/*.ts'
        ],
        "migrations": [
            __dirname + '/migrations/*.ts'
        ]
    };

    await createConnection(connectionOptions);
    logger.info('Database connected');
}