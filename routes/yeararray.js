import express from 'express';
const route = express.Router();
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';
import cheerio from 'cheerio';

function getYearArray(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                if(html === false) resolve(false);
                const $ = cheerio.load(html.data);
                const yeararray = [];
                $(`rect.ContributionCalendar-day`)
                    .each(function(){
                        if($(this).attr("data-count"))
                            yeararray.push(Number($(this).attr("data-count")))
                    })
                resolve(yeararray);
            })
    })
}

route.get("/:user/yeararray", async function(req, res){
    const yearArray = await getYearArray(req.params.user);
    
    if(yearArray === false) res.status(400).send("No matching users");

    res.json(yearArray);
})

export default route;