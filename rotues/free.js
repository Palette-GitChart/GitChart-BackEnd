import express from 'express';
import mysql from 'mysql';
const route = express.Router();
import * as N from '../functions/novel.js';
import config from '../dbconfig.js';

route.get('/:type/:order/:page', async(req, res) =>{
        const { type, order, page} = req.params;
        const typeQ = await N.typeQuery(type);
        const orderQ = await N.orderQuery(order);
        const db = mysql.createConnection(config);
        db.query(`Select * from novel where plus = 0 and ${typeQ}${orderQ}`, async function(err, rows){
            const list = N.sliceList(page, rows);
            let r = [];
            if(typeof(list) == Array)
                r = await N.getANovel(list);
            let count = 0;
            if(typeof(rows) == Array)
                count = rows.length;
            res.json({max: Math.ceil((count/15)), count: count, list: r})
        })
        db.end();
    })
route.get('/:type/:order/:page/:tag', async(req, res) =>{
        const { type, order, page, tag} = req.params;
        const typeQ = await N.typeQuery(type);
        const orderQ = await N.orderQuery(order);
        const tagQ = `tag like "%${tag}%"`;
        const db = mysql.createConnection(config);
        db.query(`Select * from novel where plus = 0 and ${typeQ !== "" ? `${typeQ} and ` : ""}${tagQ}${orderQ}`, async function(err, rows){
            const list = N.sliceList(page, rows);
            let r = [];
            if(typeof(list) == Array)
                r = await N.getANovel(list);
            let count = 0;
            if(typeof(rows) == Array)
                count = rows.length;
            res.json({max: Math.ceil((count/15)), count: count, list: r})
        })
        db.end();
    })

export default route;
/*
app.get('/free/:type/:order/:page', async(req, res) =>{
    const params = req.params;
    const {type, order, page} = params;
    const typeQ = await typeQuery(type);
    const orderQ = await orderQuery(order);
    const db = mysql.createConnection(config);
    db.query(`Select * from novel where plus = 0 ${typeQ ? `and ${typeQ} ` : ""}${orderQ}`, async function(err, rows){
        const list = sliceList(page, rows);
        const r = await getANovel(list);
        res.json({max: Math.ceil((rows.length/15)), count: rows.length, list: r})
    })
    db.end();
})
*/