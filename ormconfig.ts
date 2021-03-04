import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

// this config is only used for typeorm cli (for now)

dotenv.config({
    path: `env/development.env`, // default value
});

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
        "src/entities/**/*.ts"
    ],
    "migrations": [
        "src/migrations/**/*.ts"
    ],
    "subscribers": [
        "src/subscribers/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migrations",
        "subscribersDir": "src/subscribers"
    }
};

console.log('options :', connectionOptions);

export = connectionOptions;