import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseRouter from './routes';
import morgan from 'morgan';
import helmet from 'helmet';
import logger from './shared/Logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    logger.info('dev');
} else if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    logger.info('prod');
}

app.use('/api', BaseRouter);

// app.get('/', (req, res) => res.send('Hello World!')); // test only, replace above app.use('/api', BaseRouter);

/// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: err.message,
    });
});

export default app;