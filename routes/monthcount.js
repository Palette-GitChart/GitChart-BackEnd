import express from 'express';
const route = express.Router();
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';
import cheerio from 'cheerio';

function getMonthCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                if(html === false) resolve(false);
                const $ = cheerio.load(html.data);
                let monthcount = 0;
                let day = dayjs().date();
                for(let i = 0; i < day; i++){
                    $(`rect[data-date="${dayjs(dayjs().format()).add(-i, "d").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                        .each(function(){
                            monthcount += Number($(this).attr("data-count"))
                        })
                        .catch(resolve(false))
                }
                resolve(monthcount);
            })
    })
}

route.get("/:user/monthcount", async function(req, res){
    const monthCount = await getMonthCount(req.params.user);

    if(monthCount === false) res.status(400).send("No matching users");
    
    res.json(monthCount);
})

export default route;
