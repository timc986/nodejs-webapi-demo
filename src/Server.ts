import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseRouter from './routes';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api', BaseRouter);

// app.get('/', (req, res) => res.send('Hello World!')); // test only, replace above app.use('/api', BaseRouter);

export default app;


/// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message, err);
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: err.message,
    });
 });