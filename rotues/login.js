import express from 'express'
import config from '../dbconfig.js'
import mysql from 'mysql'
const route = express.Router();

route.post('/', async(req, res) => {
    const {email, password} = req.body
    console.log(email, password);
    const db = mysql.createConnection(config);
        db.query(`Select * from user where email = "${email}" and password = "${password}"`, function(err, rows){
            if(err)
                res.status(500).send("error");
            else if(rows[0]){
                res.json(jwt.sign({email: email, password: password, type: "uolib"}, "apple"))     
            }
            else
                res.status(401).send("unregisted account")
        })
    db.end();
})

export default route;