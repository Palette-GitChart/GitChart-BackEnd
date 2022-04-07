import express from 'express'
const route = express.Router();
import mysql from 'mysql'
import * as N from '../functions/novel.js';
import config from '../dbconfig.js';
import { getUser } from '../functions/account.js';

route.get('/:type', async(req, res) => {
    const { type } = req.params;

    if(!req.headers.authorization)
        res.status(401).send("unlogined1");

    let user = false;

    if(req.headers.authorization)
        user = await getUser(req.headers.authorization.substring(7));  
 
    if(user){
        const id = user.id;
        if(type === "like"){
            console.log("m1");
            const novel = await N.getUsersLikeNovel(id);
            res.json([...novel]);
        }
        else if(type === "my"){
            console.log("m2");
            const novel = await N.getUsersNovel(id);
            res.json([...novel]);
        }
        else if(type === "last_view"){
            console.log("m3");
            const db = mysql.createConnection(config);
                db.query(`Select novel from nview where user = ${user.id} order by rview desc`, async function(err, rows){
                    const novel = await N.getNovelListbyNovel(rows);
                    res.json([...novel]);
                })
            db.end();
        }
    }
    else{   
        res.status(401).send(false);
    }
    /*
    else if(type === "donation"){
        const novel = await getUsersDonatedNovel(user.id);
        res.json(novel);
    }*/
    /*
    else{
        const db = mysql.createConnection(config);
        db.query(`Select * from donation where author = ${user.id}`, function(err, rows){
            res.json(getArr(rows));
        })
    }*/
})

export default route;