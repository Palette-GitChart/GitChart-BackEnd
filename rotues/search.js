import express from 'express';
import mysql from 'mysql';
const route = express.Router();
import * as N from '../functions/novel.js';
import config from '../dbconfig.js';

route.get('/:type/:order/:page/:keyword', async(req, res) =>{
    const {type, order, page} = req.params;
    const keyword = decodeURI(req.params.keyword);
    if(type == "keyword"){
        const db = mysql.createConnection(config);
            db.query(`Select * from novel where title like "%${keyword}%"${order === "date" ? " order by since desc" : ""}`, async function(err, rows){
                const arr = await N.getA(rows, order, page);
                res.json(arr)
            })
        db.end();
    }
    else{
        const db = mysql.createConnection(config);
            db.query(`Select * from novel where ${type} like "%${keyword}%"${order === "date" ? " order by since desc" : ""}`, async function(err, rows){
                const arr = await N.getA(rows, order, page);
                res.json(arr)
            })
        db.end();
    }
})

export default route;
