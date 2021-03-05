import "reflect-metadata";
import { createConnection } from "typeorm";
import connectionOptions from "./ormconfig";
import logger from './shared/Logger';

export async function dbInit(): Promise<void> {

    await createConnection(connectionOptions);
    logger.info('Database connected');
}