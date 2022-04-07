import express from 'express';
const route = express.Router();
import * as C from '../functions/certifications.js'
import { getInfo } from '../functions/account.js';

route.post('/request', async function(req, res){

    const email = req.body.email;

    const organize = await C.organize();
    console.log("organize : " + organize);

    console.log("si");
    const info = await getInfo(email);
    if(info){
        console.log(info);
        res.status(401).json("It was registed email");
    }

    console.log("sa");
    const already = await C.checkAlready(email);
    console.log("already : " + already);

     if(already){
        res.status(400).json(already);
    }

    const insert = await C.insert(email);
    if(insert)
        res.json(true);
    else
        res.status(500).json("error");
})

route.post('/check', async(req, res) => {
    const { email, number } = req.body;
    const organize = await C.organize();
    console.log(organize);
    console.log(req.body.email);
    const select = await C.select(email, number);
    if(select){
        const update = await C.update(email);
        if(update){
            res.json(true);
        }
        else{
            res.status(500).send("error");
        }
    }
    else{
        res.status(500).send("error");
    }
})

export default route;