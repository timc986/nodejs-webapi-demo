import cookieParser from 'cookie-parser';
import express from 'express';
// import { StatusCodes } from 'http-status-codes';
// import BaseRouter from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Add APIs
// app.use('/api', BaseRouter);

app.get('/', (req, res) => res.send('Hello World!'));

// Export express instance
export default app;


/// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.log(err.message, err);
//     return res.status(StatusCodes.BAD_REQUEST).json({
//         error: err.message,
//     });
//  });