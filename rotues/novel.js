import express from 'express'
import mysql from 'mysql'
const route = express.Router();
import { getUser } from '../functions/account.js'
import * as N from '../functions/novel.js';
import config from '../dbconfig.js';

route.post('/', async(req, res) =>{ 

    if(!req.headers.authorization)
        res.status(401).send("unlogined");
    let user = false;

    user = await getUser(req.headers.authorization.substring(7));

    if(!user)
        res.status(401).send("unlogined");
    const {title, explane, days, tag, image} = req.body;
    const db = mysql.createConnection(config);
        db.query(`Insert into novel (title, author, explane, days, tag, since${image ? ", image" : ""}) values ("${title}", ${user.id}, "${explane}", "${days}", "${tag}", "${dayjs().format("YYYY-MM-DD hh:mm")}"${image ? `, "${image}"` : ""})`, function(err, rows){
            if(err){
                res.status(500).send("error");
            }
            else{
                res.json(true);
            }
        })
    db.end();
})

route.route('/:id')
    .get(async(req, res) => {
        const id = req.params.id;
        const round = await N.getRoundList(id);
        const comments = await N.getNovelComment(id);
        const view = await N.getView(id);
        const like = await N.getLike(id);
        const novel = await N.getNovel(id);
        const authorsName = await N.getAuthorsNamebyId(id);
        res.json({...novel, like: like, view: view, authorsName: authorsName, round: [...round], comments: [...comments]})
    })
    .delete(async(req, res) => {

        if(!req.headers.authorization)
            res.status(401).send("unlogined");

        let user = false;

        user = await getUser(req.headers.authorization.substring(7));

        if(!user)
            res.status(401).send("unlogined");

        const {id} = req.params;
        const db = mysql.createConnection(config);
        db.query(`Select id from novel where id = ${id} and author = ${user.id}`, async function(err, rows){
            if(!err){
                N.deleteAllRound(id)
                N.deleteAllView(id)
                N.deleteAllLike(id)
                res.json(true);
            }
        })
        db.end();
    })

route.post('/like/:id', async(req, res) => {
    if(!req.headers.authorization)
        res.status(401).send("unlogined");

    let user = false;
    if(req.headers.authorization)
        user = await getUser(req.headers.authorization.substring(7));

    if(!user)
        res.status(401).send("unlogined");

    const {id} = req.params;

    const liked = N.getIsLikedNovel(id, user.id);

    if(liked){
        const db = mysql.createConnection(config);
            db.query(`Delete from liked where novel = ${id} and user = ${user.id}`, function(err, rows){
                if(err){
                    res.status(500).send("error");
                }
                else{
                    res.json(false);
                }
            })
        db.end();
    }
    else{
        const db = mysql.createConnection(config);
            db.query(`Inesert into liked (novel, user) values (${id}, ${user.id})`, function(err, rows){
                if(err){
                    res.status(500).send("error");
                }
                else{
                    res.json(true);
                }
            })
        db.end();
    }
})

route.post('/comment/:id', async(req, res) => {
    if(!req.headers.authorization)
        res.status(401).send("unlogined1");

    let user = false;

    if(req.headers.authorization)
        user = await getUser(req.headers.authorization.substring(7));  

    const {comment} = req.body;
    const db = mysql.createConnection(config);
        db.query(`Update nview set comment = "${comment}" and cdate = "${dayjs().format("YYYY-MM-DD hh:mm")}" where user = ${user.id} and id=${req.params.id}`, function(err, rows){
            if(err){
                res.status(500).send("error");
            }  
            res.json(rows);
        })
    db.end();
})

export default route;