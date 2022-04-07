import express from 'express'
const app = express();
import config from '../dbconfig.js';
import { getUser } from '../functions/account.js';
import mysql from 'mysql';

app.get('/', async(req, res) => {

    if(!req.headers.authorization)
        res.status(401).send("unlogined1");

    let user = false;

    if(req.headers.authorization)
        user = await getUser(req.headers.authorization.substring(7)); 
    
    if(!user.id)
        res.status(401).send("unlogined");

    const db = mysql.createConnection(config);
        db.query(`Select id,title from novel where author = ${user.id}`, function(err, rows){
            res.send([...rows]);
        })
    db.end();
    
})

export default app;