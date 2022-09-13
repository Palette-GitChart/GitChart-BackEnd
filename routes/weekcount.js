import express from 'express';
const route = express.Router();
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';
import cheerio from 'cheerio';

function getWeekCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                if(html === false) resolve(false);
                const $ = cheerio.load(html.data);
                let weekcount = 0;
                let day = dayjs().day();
                for(let i = 0; i <= day; i++){
                    $(`rect[data-date="${dayjs(dayjs().format()).add(-i, "d").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                        .each(function(){
                            weekcount += Number($(this).attr("data-count"))
                        })
                }
                resolve(weekcount);
            })
        })
}

route.get("/:user/weekcount", async function(req, res){
    const weekCount = await getWeekCount(req.params.user);
    
    if(weekCount === false) res.status(400).send("No matching users");

    res.json(weekCount);
})

export default route;