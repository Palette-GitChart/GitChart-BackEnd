import express from 'express';
import mysql from 'mysql';
const route = express.Router();
import  { getUser } from '../functions/account.js'
import * as N from '../functions/novel.js';
import config from '../dbconfig.js';

route.post('/', async(req, res) => {
    const { novel, title, text, authorsword } = req.body;
    const episode = await N.getEpisode(novel);
        
    if(!req.headers.authorization)
        res.status(401).send("unlogined");
    let user = false;

    user = await getUser(req.headers.authorization.substring(7));

    if(!user)
        res.status(401).send("unlogined");
    const isUsersNovel = await N.getIsUsersNovel(user.id, novel);
    if(isUsersNovel){
        const db = mysql.createConnection(config);
            db.query(`Insert into round (novel, title, text, authorsword, episode) values (${novel}, "${title}", "${text}", "${authorsword}", ${episode})`, function(err, rows){
                if(rows){
                    res.json(rows);
                }
            })
        db.end();
    }
    else{
        res.status(400).send("Its not users novel");
    }
})

route.get('/:id', async(req, res) => {
    const id = req.params.id;

    let user = false;

    if(req.headers.authorization)    
        user = await getUser(req.headers.authorization.substring(7));

    const contents = await N.getContents(id);
    let isViewed = false;
    let isLikedNovel = false;
    let lr = false;

    if(!contents)
        res.status(400).send("unknown round id");

    if(user){
        isViewed = await N.getIsViewedRound(id, user.id);
        console.log(isViewed);
        if(isViewed){
            if(isViewed.islike)
                lr = true;
        }
        isLikedNovel = await N.getIsLikedNovel(id, user.id);
        if(!isViewed){
            const insert = await N.insertView(id, contents.novel, user.id);
            console.log(insert);
        }
    }

    const comment = await N.getNovelComment(id);
    const round = await N.getRoundList(id);

    if(!user.plus && round.plus){
        res.status(402).send("please join plus membership")
    }

    res.json({...contents, isLikedRound: lr, isLikedNovel: isLikedNovel, round: [...round], comment: [...comment]});
})

route.post('/like/:id', async(req, res) => {
    
    const { id } = req.params;
    
    if(!req.headers.authorization)
        res.status(401).send("unlogined");

    let user = false;
    if(req.headers.authorization)
        user = await getUser(req.headers.authorization.substring(7));

    if(!user)
        res.status(401).send("unlogined");

    const isliked = await N.getIsViewedRound(id, user.id);

    let like;

    if(isliked.islike){
        like = 0;
    }
    else{
        like = 1;
    }

    const db = mysql.createConnection(config);
        db.query(`Update nview set islike = ${like} where id = ${id} and user = ${user.id}`, function(err, rows){
            res.json(like);
        })
    db.end();
})

export default route;