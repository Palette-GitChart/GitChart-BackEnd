import express from 'express';
const route = express.Router();
import cheerio from 'cheerio';
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';

function getDayCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
        .then((html) => {
            if(html === false) resolve(false);
            const $ = cheerio.load(html.data);
            let daycount = 0;
            $(`rect[data-date="${dayjs().format('YYYY-MM-DD')}"].ContributionCalendar-day`)
                .each(function(){
                    daycount += Number($(this).attr("data-count"))
                })
            resolve(daycount);
        })
    })
}

route.get("/:user/daycount", async function(req, res){
    const daycount = await getDayCount(req.params.user);
    
    if(daycount === false) res.status(400).send("No matching users");

    res.json(daycount);
})

export default route;