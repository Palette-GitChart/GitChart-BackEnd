import express from 'express';
const route = express.Router();
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';
import cheerio from 'cheerio';

function getAll(user){
    return new Promise((resolve, reject) => {
        const montharray = [];
        let yearcount = 0;
        let monthcount = 0;
        let weekcount = 0;
        let daycount = 0;
        let mdate = dayjs().date();
        let mday = dayjs().day();
        getHTML(user) 
            .then((html) => {
                if(html === false) resolve(false);
                const $ = cheerio.load(html.data);
                $(`rect.ContributionCalendar-day`)
                    .each(function(){
                        const count = $(this).attr("data-count");
                        const date = $(this).attr("data-date");
                        if(count){
                            yearcount += Number(count);
                        }
                        if(mdate >= 0 && date == `${dayjs(dayjs().format()).add(-mdate, "days").format("YYYY-MM-DD")}`){
                            montharray.unshift(Number(count));
                            monthcount += Number(count);
                            mdate--;
                        }
                        if(mday >= 0 && date == `${dayjs(dayjs().format()).add(-mday, "days").format("YYYY-MM-DD")}`){
                            weekcount += Number(count);
                            mday--; 
                        }
                        if(date == `${dayjs().format('YYYY-MM-DD')}`){
                            daycount += Number(count);
                        }
                })
                resolve({yearcount: yearcount, montharray: montharray, monthcount: monthcount, weekcount: weekcount, daycount: daycount});
            })

    })
}

route.get("/:user", async function(req, res){
    const all = await getAll(req.params.user);

    if(all === false) res.status(400).send("No matching users");

    res.json(all);
})

export default route;