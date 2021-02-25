import './LoadEnv';
import app from './Server';
import { intializeDB } from './db';
import logger from './shared/Logger';

intializeDB();

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Server listening on: '+ 'http://localhost:' + port);
});