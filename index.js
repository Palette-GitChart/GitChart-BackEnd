import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors());
import dayjs from 'dayjs';
dayjs.locale('ko');

import user from './routes/user.js';
import daycount from './routes/daycount.js';
import weekcount from './routes/weekcount.js';
import weekarray from './routes/weekarray.js';
import monthcount from './routes/monthcount.js';
import montharray from './routes/montharray.js';
import yearcount from './routes/yearcount.js';
import yeararray from './routes/yeararray.js';

app.use('/', user);
app.use('/', daycount);
app.use('/', weekcount);
app.use('/', weekarray);
app.use('/', monthcount);
app.use('/', montharray);
app.use('/', yearcount);
app.use('/', yeararray);

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});
//pm2-runtime index.js
//"preinstall": "npm install pm2 -g",