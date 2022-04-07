import express from 'express';
import mysql from 'mysql';
const route = express.Router();
import { getLike } from '../functions/novel.js';
import config from '../dbconfig.js';

route.get('/:type', function(req, res){
    const type = req.params.type;
    const getQ = () => {
        if(type === "all" || !type){
            return "";
        }
        else if(type === "monopoly"){
            return " where monopoly = 1"       
        }
        else if(type === "new"){
            return " where date(since) >= date(subdate(now(), INTERVAL 180 DAY)) and date(since) <= date(now())"             
        }
        else if(type === "complete"){
            return " where complete = 1"
        }
        else{
            res.status(401).send("unkown type")
        }
    }
    const q = getQ();
    const db = mysql.createConnection(config);
        db.query(`Select id,title,plus,monopoly,complete,image from novel${q}`, function(err, rows){
            if(err)
                res.status(503).send(err);            
            else{
                let arr = [...rows];
                arr.sort(function (a, b) {
                    if (getLike(a.id) > getLike(b.id)) {
                      return 1;
                    }
                    if (getLike(a.id) < getLike(b.id)) {
                      return -1;
                    }
                    return 0;
                });
                arr.slice(0, 99)
                res.send(arr);
            }
        })
    db.end();
})

export default route;