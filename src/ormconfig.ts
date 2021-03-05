import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

if (!process.env.TYPEORM_DATABASE) {
    const result2 = dotenv.config({
        path: `./env/development.env`, // default to use development
    });

    if (result2.error) {
        throw result2.error;
    }
}

const connectionOptions: ConnectionOptions = {
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
        __dirname + '/entities/*{.ts,.js}'
    ],
    "migrations": [
        __dirname + '/migrations/*{.ts,.js}'
    ],
    "subscribers": [
        __dirname + '/subscribers/*{.ts,.js}'
    ],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscribers"
    }
};

console.log('__dirname :', __dirname);
console.log('connectionOptions :', connectionOptions);

export = connectionOptions;