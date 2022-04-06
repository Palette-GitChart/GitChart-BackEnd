import express from 'express';
const route = express.Router();
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';
import cheerio from 'cheerio';

function getMonthArray(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                let montharray = [];
                let day = dayjs().date();
                for(let i = 0; i < day; i++){
                    $(`rect[data-date="${dayjs(dayjs().format()).add(-i, "d").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                        .each(function(){
                            montharray.unshift(Number($(this).attr("data-count")))
                    })
                }
                resolve(montharray);
            })
    })
}

route.get("/:user/montharray", async function(req, res){
    const monthArray = await getMonthArray(req.params.user);
    res.json(monthArray);
})

export default route;