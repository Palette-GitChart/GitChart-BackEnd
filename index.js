import express from'express';
const app = express();
import cors from'cors';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
import dayjs from 'dayjs';
dayjs.locale('ko');
app.use(cors());

import mainRouter from './rotues/main.js';
import novelRouter from './rotues/novel.js';
import roundRouter from './rotues/round.js';
import freeRouter from './rotues/free.js';
import plusRouter from './rotues/plus.js';
import loginRouter from './rotues/login.js';
import signupRouter from './rotues/signup.js';
import searchRouter from './rotues/search.js';
import top100Router from './rotues/top100.js';
import mybookRouter from './rotues/mybook.js';
import headerRouter from './rotues/header.js';
import plus_agreeRouter from './rotues/plus_agree.js';
import users_novelRouter from './rotues/users_novel.js';
import certification from './rotues/certifications.js';

app.use('/main', mainRouter);
app.use('/round', roundRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/search', searchRouter);
app.use('/top100', top100Router);
app.use('/mybook', mybookRouter);
app.use('/novel', novelRouter);
app.use('/header', headerRouter);
app.use('/plus_agree', plus_agreeRouter);
app.use('/users_novel', users_novelRouter);
app.use('/plus', plusRouter);
app.use('/free', freeRouter);
app.use('/certification', certification);
app.get('/test', function(req, res) {
    const today = dayjs(dayjs().format()).add(-5, "minutes")
    res.send(req);
})

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
}, 600000);
