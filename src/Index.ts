// import './LoadEnv';
import app from './Server';
import logger from './shared/Logger';
import { intializeDB } from './db';

intializeDB();

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log('Server listening on:', 'http://localhost:' + port);
});