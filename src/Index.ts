import './LoadEnv';
import app from './App';
import { dbInit } from './Db';
import logger from './shared/Logger';

dbInit();

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Server listening on: '+ 'http://localhost:' + port);
});