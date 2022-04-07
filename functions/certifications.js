import nodemailer from 'nodemailer'
import config from '../dbconfig.js'
import mysql from 'mysql'
import dayjs from 'dayjs'
dayjs.locale('ko');

let transport = nodemailer.createTransport({
    service: 'gmail', 
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "sangwoonking@gmail.com",
        pass: "jlzertdkcnnhnkrn",
    }
});

export function checkStatus(email){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select status from certification where email = "${email}"`, function(err, rows){
                if(rows !== []){
                    if(typeof(rows) == Array){
                        console.log("status: " + rows[0].status);
                        resolve(rows[0].status);
                    }
                    else
                        resolve(false);
                }
                else{
                    resolve(false);
                }
            })
        db.end();
    })
}

export function remove(email){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Delete from certification where email = "${email}"`, function(err, rows){
            if(err)
                resolve(false);
            else if(rows)
                resolve(true);
            else
                resolve(false);
        })
        db.end();
    })
}

export function organize(){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config); 
            const t = dayjs(dayjs().format()).add(-5, "m");
            const time = dayjs(t).format("YYYY-MM-DD hh:mm");
            db.query(`Delete from certification where TO_CHAR(rtime, "YYYY-MM-DD hh:mm") < "${time}";`, function(err, rows){
                if(err)
                    resolve(false);
                else
                    resolve(true);
            })
        db.end();
    })
}

export function insert(email){
    return new Promise((resolve, reject) => {
        const rand = Math.floor(Math.random() * (9999 - 1000) + 1000);

        let mailOptions = {
            from: "sangwoonking@naver.com", // 보내는 메일의 주소
            to: email, // 수신할 이메일
            subject: "[유라이브] 회원가입 인증 번호", // 메일 제목
            html: `<h1>${rand}</h1>` // 메일 내용
        };

        const today = dayjs(dayjs().format()).add(-5, "m")
        const db = mysql.createConnection(config);
            db.query(`Insert into certification (email, number, rtime) values ("${email}", ${rand}, "${dayjs(today).format("YYYY-MM-DD hh:mm")}")`, function(err, rows){
                if(err){
                    resolve(false);
                }
                else{
                    transport.sendMail(mailOptions, function(error, info){
                        transport.close();
                    })
                    resolve(true);
                }
            })
        db.end();
    })
}

export function checkAlready(email){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from user where email = "${email}"`, async function(err, rows){
                if(rows[0]){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            })
        db.end();
    })
}

export function select(email, number){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Select * from certification where email = "${email}" and number = ${number}`, function(err, rows){
            if(err)
                resolve(false)
            if(rows[0]){
                resolve(true);
            }
            else{
                resolve(false);
            }
        })
        db.end();
    })
}

export function update(email){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Update certification set status = 1 where email = "${email}"`, function(err, rows){
                if(err){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            })
        db.end();
    })
}
