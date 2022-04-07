import express from 'express';
import mysql from 'mysql';
const route = express.Router();
import * as C from '../functions/certifications.js';
import config from '../dbconfig.js';

route.post('/', async(req, res) => {
    const organize = await C.organize();
    console.log(organize);

    const {email, password} = req.body;

    const already = await C.checkAlready(email);
    if(already)
        res.status(400).send("Its already registed email");

    const status = await C.checkStatus(email);

    if(status){
        const del = await C.remove(email);
        if(del){
            const name = email.split('@');
            const db = mysql.createConnection(config);
            db.query(`Insert into user (email, name, password) values ("${email}", "${name[0]}", "${password}")`, function(err, rows){
                if(err)
                    res.status(500).send("error2");
                else
                    res.send(true);
            })
            db.end();
        }
        else{
            res.status(500).send("error1")  
        }
    }
    else{
        res.status(403).send("please pass certification first")
    }
    
})  

export default route;