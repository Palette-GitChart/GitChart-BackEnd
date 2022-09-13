import express from 'express';
const route = express.Router();
import dayjs from 'dayjs';
dayjs.locale('ko');
import getHTML from '../functions/getHTML.js';
import cheerio from 'cheerio';

function getYearCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                if(html === false) resolve(false);
                const $ = cheerio.load(html.data);
                let yearcount = 0;
                $(`rect.ContributionCalendar-day`)
                    .each(function(){
                        if($(this).attr("data-count"))
                            yearcount += (Number($(this).attr("data-count")))
                    })

                resolve(yearcount);
            })
    })
}   

route.get("/:user/yearcount", async function(req, res){
    const yearCount = await getYearCount(req.params.user);
        
    if(yearCount === false) res.status(400).send("No matching users");

    res.json(yearCount);
})

export default route;