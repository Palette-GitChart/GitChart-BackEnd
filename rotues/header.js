import express from 'express'
const app = express();
import { getUser } from '../functions/account.js';

app.get('/', async(req, res) => {
    let user = false;

    if(req.headers.authorization){
        user = await getUser(req.headers.authorization.substring(7));
        console.log(user.email);
    }

    console.log(user);
    if(user.email){
        res.send(user);
    }
    else{
        console.log("h3");
        res.send(false);
    }

})

export default app;