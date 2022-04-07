import express from 'express'
import mysql from 'mysql'
import config from '../dbconfig.js';
const route = express.Router();

function getBest(){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query('Select id,title,author,tag from novel', function(err, rows){
                let p = [];
                let f = [];
                rows.sort(function (a, b) {
                    if (getLike(a.id) > getLike(b.id)) {
                      return 1;
                    }
                    if (getLike(a.id) < getLike(b.id)) {
                      return -1;
                    }
                    return 0;
                });
                rows.map(i => {
                    if(i.p)
                        p.push(i);
                    else    
                        f.push(i);
                })
                p = p.slice(0, 5);
                f = f.slice(0, 5);
                let plus = [];
                let free = [];
                p.map(i => {
                    plus.push({...i, tag: [...i.tag.split(",")]});
                })
                f.map(i => {
                    free.push({...i, tag: [...i.tag.split(",")]});
                })
                resolve({plus: [...plus], free: [...free]})
            })
        db.end();
    })
}

route.get('/', async(req, res) => {
    const best = await getBest();
    res.json(best);
})

export default route;