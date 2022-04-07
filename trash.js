/*
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결됨.');
    }).catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
*/
/*
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});*/

//git add . && git commit -m "a" &&  git push heroku master && heroku ps:scale web=1 && heroku open
//const vapidKeys = webpush.generateVAPIDKeys();

/*
function getUsersComment(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.query(`Select * from comment where user = ${id}`, function(err, rows){
            resolve(rows)
        })
        db.end();    
    })
}

function getUserDonatedNovel(){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select id from donation where user = ${id}`, function(err, rows){
                const arr = getArr(rows);
                resolve(arr);
            })
        db.end();
    })
}

app.get('/user/:id', async(req, res) => {
    const id = req.params.id;
    const user = await getUserToId(id);
    const comment = await getUsersComment(id);
    const novel = await getUsersNovel(id);
    const like = await getUsersLikeNovel(id);
    const donation = await getUserDonatedNovel(id);
    res.json({user: user, comment: comment, novel: novel, like: like, donation: donation});
})*/

/*
function getUsersProfilePath(id){
    return new Promise((resolve, reject) => {

    })
}*/

/*
function getReaders(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config); 
            db.query(`Select * from readers where id = ${id}`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

function getReadersComment(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config); 
            db.query(`Select * from readers where id = ${id}`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}*/

/*
function getIsAlarm(){

}*/
/*
app.get('/setting/:id', function(req, res){
    const db = mysql.createConnection(config);
        db.query(`Select * from user where id = ${req.params.id}`, function(err, rows){
            res.json(rows);
        })
    db.end();    
})*/

/*
function readedAlarmUpdate(type, id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Update alarm set type="${type}" and id=${user.id}`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

app.get('/alarm/:type', async(req, res) =>{
    var type = req.params.type;
    con
    if(!req.headers.authorization)
        res.status(401).send("unlogined");    st user = await getUser(req.headers.cookie.uolib_token);
    if(!user)
        res.status(401).send("unlogined");
    if(!type){
        type = "comment"
    }
    const db = mysql.createConnection(config);
        db.query(`Select * from alarm where type="${type}" and id=${user.id}`, function(err, rows){
            if(rows){
                readedAlarmUpdate(type);
                res.json(rows);
            }
        })
    db.end();
})*/

/*
function getCoin(email){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Select coin from user where email = "${email}"`, function(err, rows){
                resolve(rows[0]);
            })
        db.end();
    })
}

function insertDonation(body){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Insert into donation (novel, author, donater, coin) values (${body.novel}, ${body.author}, ${body.donater}, ${body.coin})`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

function discountCoin(id, coin){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Update user set coin = coin - ${coin} where id = ${id}`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

app.p   if(!req.headers.authorization)
        res.status(401).send("unlogined");ost
('/donation', jsonParser, async(req, res) 
let user = false;
if(req.headers.cookie.uolib_oken){=>   nst user = await getUser(req.headers.cookie.uolib_token);
    if(!user)
        res.status(401
            ).send("unlogined");

    const coin = await getCoin(user.email);

    if(!(coin >= req.body.coin)){
        res.status(402).send("coin less");
    }
    else{
        const discount = await discountCoin();
        const insert = await insertDonation();
        console(discount, insert);
        if(discount && insert){
            res.json(true);
        }
    }
})*/
/*
app.pos   if(!req.headers.authorization)
        res.status(401).send("unlogined");t('
/readers', jsonParser, async(req, res) => 
let user = false;
if(req.headers.cookie.uolib_oken)  nst user = await getUser(req.headers.cookie.uolib_token);
    if(!user)
        res.status(401
            ).send("unlogined");
    const body = req.body;
    const db = mysql.createConnection(config);
        db.query(`Insert into readers (author, type, text) values (${user.id}, ${body.type}, ${body.text})`)
    db.end();
})*/
/*
app.delete('/user/:id', async(req, res) =>{
    if(!req.headers.authorization)
        res.status(401).send("unlogined");
        if
        let user = false;(req.headers.cookie.uolib_token){
    const user = await getUsr(req.headers.cookie.uolib_tok   if(!user)
        res.status(401).send("unlogined");
    res.
    json(user);
})

function changeUserName(id, name){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query(`Update set user = "${name}" where email=${id}`, function(err, rows){
                resolve(rows);
            })
        db.end();  
    })
}

/*
function changeNovelAuthor({id}){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.end();
    })
} 

function changeCommentName(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
        db.end();
    })
}*/
/*
app.patch('/user/name', async(req, res) => {
    if(!req.headers.authorization)
    res.status(401).send("unlogined");
   
   if(req
    let user = false;.headers.cookie.uolib_tokn){ const user = await getUser(req.headers.cookie.uolib_token);
    if(!user    s.status(401).send("unlogined");
    const name = awa
    it changeUserName(user.id, req.body.name);
    res.json(name);
})*/


/*
app.patch(
    if(!req.headers.authorization)
        res.status(401).send("unlogined");
        let user = false;
        if(req.headers.cookie.uolib_token)    '/user/profile', upload.single('img'), async(req, res) => {
    cons     = await getUser(req.headers.cookie.uolib_token);
   
    if(!user)
        res.status(401).send("unlogined");
    const path = await getUsersProfilePath(user.id);
    fs.rmFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data); // 파일 데이터 정보
    });
    const image = req.file;
    const db = mysql.createConnection(config);
        db.query(`Update user set image = ${image.path} where id = ${user.id}`, function(err, rows){
            if(err){
                res.err(500).send("error");
            }
            else{
                res.json(true);
            }
        })
    db.end();
})
/*
app.patch('/user/alarm', function(req, res){

})*/

/*
const getLength = (rows) => {
    return new Promise((resolve, reject) => {
        const length = rows.filter(i => i.text.length < 3000);
        if(length === [])
            resolve(true)
        else 
            resolve(false)
    })
}

function getIsUsersNovel(user, novel){
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


app.get(
    if(!req.headers.authorization)
        res.status(401).send("unlogined");
        let user = false;
        if(req.headers.cookie.uolib_token)    '/plus_agree/:id', async(req, res) => {
    cons     = await getUser(req.headers.cookie.uolib_token);
   
    if(!user)
        res.status(401).send("unlogined");
    const id = req.params.id;
    const isUsersNovel = getIsUsersNovel(user, id);
    if(isUsersNovel){
        const round = await getRound(id);
        const length = await getLength(round);
        res.json({round: round.length, length: length});
    }
    else{
        res.status(401).send("its not users novel");
    }
})*/

/*
const fileStorage = multer.diskStorage({ // 저장 방식
    destination: (req,file,cb)=>{ // 저장되는 곳 지정 
        cb(null, 'image');
    },
    filename: (req,file,cb)=>{ // 저장되는 이름 지정 
        cb(null, file.filename);
    }
});

const fileFilter = (req,file,cb) => { // 확장자 필터링 
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true); // 해당 mimetype만 받겠다는 의미 
    }
    else{ // 다른 mimetype은 저장되지 않음 
        cb(null,false);
    }
};
multer({storage :fileStorage, fileFilter:fileFilter}).single('image')*/
/*
const upload = multer({
    dest: "/image"
})*/

/*
app.get('/readers/view/:id', async(req, res) => {
    const id = req.params.id;
    const readers = await getReaders(id);
    const comment = await getReadersComment(id);
    res.json({readers: readers, comment: comment});
})


app.post('/readers/comment', async(req, res) => {
    const {id, round, text} = req.body;
    con
    if(!req.headers.authorization)
        res.status(401).send("unlogined");    st user = await getUser(req.headers.cookie.uolib_token);
    if(!user)
        res.status(401).send("unlogined");
    const db = mysql.createConnection(config);
        db.query(`Insert into rview (id, round, user, text, ndate) values (${id}, ${round}, ${user.id}, ${text}, ${moment().format("YYYY-MM-DD hh:dd")})`)
    db.end();
})

function getReadersView(id){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config); 
        db.query(`Select count(*) from rview where id = ${id}`, function(err, rows){
            resolve(rows[0][Object.keys(rows[0])[0]]);
        })
        db.end();
    })
}

app.get('/readers/:type/:page', async(req, res) =>{
    const {type, page} = req.params
    const db = mysql.createConnection(config);
        db.query(`Select id, title, author from readers where type = "${type}"`, async function(err, rows){
            var r = [];
            rows.map(i => {
                r.push({...i, view: getReadersView(i.id)})
            })
            const slice = await sliceList(page, r);
            res.json(slice);
        })
    db.end();
})*/
/*

function userCoinRanking(){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query("Select * from user order by coin limit 30", function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

function userDonationRanking(){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query("SELECT name,coin(count) AS count FROM pos.donation GROUP BY name limit 30", function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

function userEmoticonRanking(){
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection(config);
            db.query("Select name,emoticon from user", function(err, rows){
                if(rows){
                    var arr = [];
                    rows.map(i => {
                        arr.push({...i, emoticon: JSON.parse(i.emoticon).length })
                    })
                    arr.sort(function (a, b) {
                        if (a.emoticon > b.emoticon) {
                          return 1;
                        }
                        if (a.emoticon < b.emoticon) {
                          return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });
                    resolve(arr);
                }
            })
        db.end();
    })
}

app.get('/ranking', async(req, res) =>{
    const coin = await userCoinRanking();
    const donation = await userDonationRanking();
    const emoticon = await userEmoticonRanking();
    res.json([coin, donation, emoticon]);
})
*/

/*
 */

   /*
    var mp, lp;
    var p;6/

    if(req.params.page){
        p = Number(req.params.page);
    }
    else{
        p = 1;
    }
    
    if(p === 1){
        lp = max-24;
        mp = max;
    }
    else{
        lp = max - ((p-1)*25)-25;
        mp = max - ((p-1)*25);
        lp += 1;
    }*/

/*
function getLength(){
    return new Promise((resolve, reject) => {
    const db = mysql.createConnection(config);
        db.query(`Select count(*) from where id = ${id}`, function(err, rows){
            resolve(HTmLtoDom(res.content).length);
        })
    db.end();
    })
}

function getView({id}){
    return new Promise((resolve, reject) => {
    const db = mysql.createConnection(config);
        db.query(`Select count(*) from where id = ${id}`, function(err, rows){

        })
    db.end();
    })
}

function getLike({id}){
    return new Promise((resolve, reject) => {
    const db = mysql.createConnection(config);
        db.query(`Select count(*) from where id = ${id} and like = 1`, function(err, rows){

        })
    db.end();
    })
}*/

/*
function getEmoticon(id){
    return new Promise((reject, resolve) => {
        const db = mysql.createConnection(config);
            db.query(`Select name,coin from emoticon where id = ${id}`, function(err, rows){
                resolve(rows[0]);
            })
        db.end();
    })
}

app.get('/emoticon/:id', async(req, res) => {
    const db = mysql.createConnection(config);
    db.query(`Select * from emoticon`, function(err, rows){
        var length = 0;
        fs.readdir(`./emoticon/${req.params.id}`, (err, files) => {
            length = files.length;
        });
        resolve({...rows, length: length});
    })
    db.end();
})

app.get('emoticon/:id/:index', async(req, res) => {
    fs.readFile(`./emoticon/${req.params.id}/${req.params.index}`, function(err, data){
        res.writeHead(200);
        if(err)
            res.json(err);
        res.write(data);
        res.end();    
    });
})

app.p   if(!req.headers.authorization)
        res.status(401).send("unlogined");ost
('/emoticon/:id', async(req, res) => {
   
   if(req
    let user = false;.headers.cookie.uolib_tokn){ const user = await getUser(req.headers.cookie.uolib_token);
    if(!user    s.status(401).send("unlogined");
    const coin = awa
    it getCoin(user.id);
})

function getEmoticonList(){
    return new Promise((reject, resolve) => {
        const db = mysql.createConnection(config);
            db.query(`Select * from emoticon`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}

function getEmoticonHave(){
    return new Promise((reject, resolve) => {
        const db = mysql.createConnection(config);
            db.query(`Select from user`, function(err, rows){
                resolve(rows);
            })
        db.end();
    })
}
//
app.get('/shop/emoticon', async(req, res) => {
    const list = await getEmoticonList();
    const ranking = await sort(function (a, b) {
        if (getEmoticonHave(a.id) > getEmoticonHave(b.id)) {
          return 1;
        }
        if (getEmoticonHave(a.id) < getEmoticonHave(b.id)) {
          return -1;
        }
        return 0;
    });
    const recent = await sort(function (a, b) {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
    });
    res
})
*/

//
// 기타 express 코드
/*
const upload = multer({
    dest: 'image/', 
    limits: { fileSize: 5 * 1024 * 1024 },
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'image/');
      },
      filename: function (req, file, cb) {
        cb(null, path.extname(file.originalname));
      }
    }),
});*/

/*
app.post('/coin', jsonParser, async(req, res)=>{
    const db = mysql.createConnection(config);
        db.query(`Update user set coin = coin + ${req.body.coin} where email = "${req.body.email}"`)
    db.end();
})*/