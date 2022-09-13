import express from 'express';
const route = express.Router();
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';
import cheerio from 'cheerio';

function getWeekArray(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
        .then((html) => {
            if(html === false) resolve(false);
            const $ = cheerio.load(html.data);
            let weekarray = [];
            let day = dayjs().day();
            for(let i = 0; i <= day; i++){
                $(`rect[data-date="${dayjs(dayjs().format()).add(-i, "d").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                    .each(function(){
                        weekarray.unshift(Number($(this).attr("data-count")))
                    })
            }
            resolve(weekarray);
        })
        .catch(e => resolve(false))
    })
}

route.get("/:user/weekarray", async function(req, res){
    const weekarray = await getWeekArray(req.params.user);

    if(weekarray === false) res.status(400).send("No matching users");
    
    res.json(weekarray);
})

export default route;