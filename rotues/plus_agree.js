import express from 'express';
const app = express();
import config from '../dbconfig.js';
import * as N from '../functions/novel.js'

app.post('/:id', async(req, res) => {
    if(!req.headers.authorization)
        res.status(401).send("unlogined");

    let user = false;
    user = await getUser(req.headers.authorization.substring(7))

    if(!user)
        res.status(401).send("unlogined");

    const id = req.params.id;
    const isUsersNovel = N.getIsUsersNovel(user, id);
    if(isUsersNovel){
        const round = await N.getRound(id);
        const length = await N.getLength(round);
        if(round.length >= 15 && length){
            const db = mysql.createConnection(config);
                db.query(`Update novel set plus = 1 where id = ${id}`, function(err, rows){
                    res.send(true);
                })
            db.end();
        }
        else{
            res.send(false);
        }
    }
    else{
        res.status(401).send("its not users novel");
    }
})

export default app