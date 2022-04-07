import jwt from 'jsonwebtoken';
import axios from 'axios'; 
import config from '../dbconfig.js';
import mysql from 'mysql';

export function getInfo(email){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select id,name,email from user where email = "${email}"`, function(err, rows){
                if(err){
                    resolve(false)
                }
                else if(rows[0]){
                    resolve(rows[0])
                }
                else{
                    resolve(false)
                }
            })
        db.end();
    })
}

export function getName(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select name from user where id = ${id}`, function(err, rows){
                if(err)
                    resolve("")
                else if(rows)
                    resolve(rows[0].name)
                else
                    resolve("")
            })
        db.end();
    })
}

export async function registGoogleAccount(email, name){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Insert into user (email, name) values ("${email}", "${name}")`, function(err, rows){
                if(err)
                    resolve(false)
                else if(rows)
                    resolve(true)
                else
                    resolve(false)
            })
        db.end();
    })
}


export const getUser = async(token) => {
    return new Promise((resolve, reject) => {
        if(token){
            console.log("e : " + token[0]);
            if(token[0] == "e"){
                console.log("e");
                const db = mysql.createConnection(config);
                db.query(`Select id,name,email from user where email = "${jwt.verify(token, 'apple').email}"`, function(err, rows){
                    if(err){
                        resolve(false)
                    }
                    else if(rows[0]){
                        resolve(rows[0])
                    }
                    else{
                        resolve(false)
                    }
                })
                db.end();
            }
            else{
                console.log("u");
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`)
                    .then(async(res)=> {
                        const { email, name } = res.data;
                        console.log("email : " + email);
                        console.log("name : " + name);
                        if(email){
                            const info = await getInfo(email);
                            if(!info){
                                const regist = await registGoogleAccount(email, name);
                                console.log(regist);
                                const info2 = await getInfo(email);
                                resolve(info2);
                            }
                            resolve(info);
                        }
                        else{
                            console.log("f");
                            resolve(false);
                        }
                    })
                    .catch(err => {
                        console.log("f2");
                        resolve(false);
                    })
            }    
        }
        else{
            console.log("f3");
            resolve(false);
        }
    })
}