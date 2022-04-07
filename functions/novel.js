import config from '../dbconfig.js';
import mysql from 'mysql';
import dayjs from 'dayjs';
dayjs.locale('ko');

export function getRoundView(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select islike from nview where id = ${id}`, async function(err, rows){
                let like = 0;
                await rows.map(i => {
                    if(i.islike)
                        like +=1 ;
                })
                resolve({view: rows.length, like: like});
            })
        db.end();
    })
}

export function getRoundCommetCount(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select count(*) rcomment where id = ${id}`, function(err, rows){
                const row = rows[0];
                resolve(Object.values(row)[0])
            })
        db.end();
    })
}

export async function getArr(rows) {
    return Promise.all(rows.map(async(i) => {
        const row = await getNovel(i.id);
        return(row);
    }))
}

export async function getNovelList(rows) {
    return Promise.all(rows.map(async(i) => {
        const row = await getNovel(i.novel);
        return(row);
    }))
}

export function getUsersLikeNovel(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select novel from liked where user = ${id}`, async function(err, rows){
                const arr = await getNovelList(rows);
                resolve(arr);
            })
        db.end();
    })
}


export function getNovelListbyId(rows){
    return Promise.all(rows.map(async(i) => {
        const row = await getNovel(i.id);
        return(row);
    }))
}

export function getNovelListbyNovel(rows){
    return Promise.all(rows.map(async(i) => {
        const row = await getNovel(i.novel);
        return(row);
    }))
}

export async function getUsersNovel(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from novel where author = ${id}`, async function(err, rows){
                const arr = await getNovelListbyId(rows);
                resolve(arr);
            })
        db.end();
    })
}

export function getRoundCount(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select count(*) from round where novel = ${id} and notice = 0`, function(err, rows){
                if(rows){
                    const row = rows[0];
                    console.log("round_count : " + Object.values(row)[0]);
                    resolve(Object.values(row)[0]);
                }
                else
                    resolve(0);
            })
        db.end();
    })
}

export async function getANovel({lists}){
    if(typeof(lists) === Array){
        return Promise.all(lists.map(async(i) => {
            const view = await getView(i.id);
            const like = await getLike(i.id);
            const round = await getRoundCount(i.id);
            const authorsName = await getName(i.author);
            return({...i, view: view, like: like, authorsName: authorsName, round: round, tag: [...i.tag.split(",")]});
        }))
    }
    else{
        return([]);
    }
}

export function getA(rows, order, page){
    return new Promise(async(resolve, reject) => {

        const list = sliceList(page, [...rows]);

        const arr = await [...getANovel(list)];

        if(order === "view"){
            arr.sort(function (a, b) {
                if (a.view > b.view) {
                  return 1;
                }
                if (a.view < b.view) {
                  return -1;
                }
                return 0;
            });
        }
        else if(order === "like"){
            arr.sort(function (a, b) {
                if (a.like > b.like) {
                  return 1;
                }
                if (a.like < b.like) {
                  return -1;
                }
                return 0;
            });
        }
        console.log("arr : " + arr);
        resolve({max: Math.ceil(arr.length/30), count: rows.length, list: arr});
    })
}
/*
export function getARoundList(list, user){
    return Promise.all(list.map(async (i) => {
        const view = await getIsViewedRound(id, user);
        const like = await getRoundLike(id);
        const comment = await getRoundCommetCount(id);
        arr.push({...i, view: view, like: like, comment: [...comment]})
    }))
}
*/
export function getRound(list){
    return Promise.all(list.map(async (i) => {
        const view = await getRoundView(i.id);
        const comments = await getRoundCommetCount(i.id);
        return({...i, view: view.view, like: view.like, comments: comments });
    }))
}

export function getRoundList(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select id,title,episode,rdate,notice from round where novel = ${id}`, function(err, rows){
                //const arr = await getRound(rows);
                resolve(rows);
            })
        db.end();
    })
}

export function getAuthorsNamebyId(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select author from novel where id = ${id}`, async function(err, rows){
                const name = await getName(rows[0].author);
                resolve(name);
            })
        db.end();
    })    
}

export function getIsUsersNovel(user, novel){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from novel where id = ${novel} and author = ${user}`, function(err, rows){
                if(rows[0]){
                    resolve(true);
                }
                else resolve(false);
            })
        db.end();
    })
}

export function insertNovel() {
    const db = mysql.createConnection(config);
        db.query(`Insert into novel (name, author, )`)
    db.end();
}

export function InsertView(){
    const db = mysql.createConnection(config);
    db.end();
}

export function getNovelComment(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from rcomment where novel = ${id}`, async function(err, rows){
                const arr = [];
                await rows.map(async(i) => {
                    const name = await getName(i.user);
                    i.push({...i, name: name});
                })
                resolve(arr);
            })
        db.end();
    })
}

export function getView(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select count(*) from nview where novel = ${id}`, function(err, rows){
                if(rows){
                    const row = rows[0];
                    console.log("view : " + Object.values(row)[0]);
                    resolve(Object.values(row)[0])
                }
                else
                    resolve(0);
            })
        db.end();
    })
}

export function getLike(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select count(*) from nview where novel = ${id} and islike = 1`, function(err, rows){
                if(rows){
                    const row = rows[0];
                    console.log("like : " + Object.values(row)[0]);
                    resolve(Object.values(row)[0])
                }
                else  
                    resolve(0);
            })
        db.end();
    })
}

export function getNovel(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from novel where id = ${id}`, async function(err, rows){
                if(rows){
                    const row = rows[0];
                    console.log(row);
                    const name = await getName(row.author);
                    resolve({...row, authorsName: name, tag: row.tag.split(",")});
                }
                else{
                    resolve();
                }
            })
        db.end();
    })
}

export async function typeQuery(type){
    return new Promise((resolve, reject) => {
        if(type == "all"){
            resolve("");
        }
        if(type == "monopoly"){
            resolve("monopoly = 1")
        }
        else if(type == "new"){
            resolve("");
        }
        else if(type == "complete"){
            resolve("complete = 1")
        }
    })
}

export async function orderQuery(order){
    return new Promise((resolve, reject) => {
        if(order == "date"){
            resolve("order by recent desc")
        }
        else if(order === "view"){
            resolve("order by view desc")
        }
        else if(order === "like"){
            resolve("order by like desc")
        }
    })
}

export async function sliceList(page, list){
    return new Promise((resolve, reject) => {
        const p = Number(page);
        if(typeof(list) !== Array){
            resolve([]);
        }
        else if(p === 1){
            resolve([...list].slice(0, 14))
        }   
        else{
            resolve([...list].slice((p-1)*15, ((p-1)*15)+14));
        }
    })
}   

export function getEpisode(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select max(episode) as max from round where novel=${id}`, function(err, rows){
                if(rows === [])
                    resolve(1);
                else{
                    resolve(rows[0].max + 1);
                }
            })
        db.end();
    })
}

export function getIsLikedNovel(novel, user){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from liked where novel = ${novel} and user = ${user}`, function(err, rows){
                if(rows.length)
                    resolve(true);
                else
                    resolve(false);
            })
        db.end();
    })
}

export function getIsViewedRound(id, user){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select user,islike from nview where id = ${id} and user = ${user}`, function(err, rows){
                if(rows.length)
                    resolve(rows[0]);
                else
                    resolve(false);
            })
        db.end();
    })
}

export function insertView(id, novel, user){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Insert into nview (id, novel, user) values (${id}, ${novel}, ${user})`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

export function getContents(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Select * from round where id = ${id}`, function(err, rows){
            if(rows.length === 1)
                resolve(rows[0]);
            else
                resolve(false);
        })
    db.end();
    })
}

//뷰어

export function getUserInfo(id){
    const db = mysql.createConnection(config);
        db.query(`Select * from user where id = ${id}`, function(err, rows){
            res.json(rows);
        })
    db.end();
}

export function deleteAllRound(id){
    const db = mysql.createConnection(config);
        db.query(`Delete from round where novel = ${id}`)
    db.end();
}

export function deleteAllView(id){
    const db = mysql.createConnection(config);
        db.query(`Delete from nview where novel = ${id}`)
    db.end();
}

export function deleteAllLike(id){
    const db = mysql.createConnection(config);
        db.query(`Delete from liked where novel = ${id}`)
    db.end();
}
