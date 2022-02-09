const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const log = console.log;
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

function getHTML(user){
    user = encodeURI(user);
    try {
        return axios.get(`https://github.com/users/${user}/contributions`);
    }catch(err){
        console.log(err);
    }
}

function getYearCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                var yearcount = 0;
                $(`rect.ContributionCalendar-day`)
                    .each(function(){
                        if($(this).attr("data-count"))
                            yearcount += Number($(this).attr("data-count"))
                })
                resolve(yearcount);
                /*
                const yearcount = $('body > div > div:nth-child(1) > h2.f4 text-normal mb-2').text();
                resolve(yearcount.replaceAll(" ", "").replaceAll(/\n/g, "").replaceAll("contributionsinthelastyear", ""));*/
            }
        )
    })
}

function getDayCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                var daycount = 0;
                $(`rect[data-date="${moment().format('YYYY-MM-DD')}"].ContributionCalendar-day`)
                    .each(function(){
                        daycount += Number($(this).attr("data-count"))
                })
                resolve(daycount);
            }
        )
    })
}

function getWeekCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                var weekcount = 0;
                for(var i = 0; i <= moment().day(); i++){
                    $(`rect[data-date="${moment(moment().format()).add(-i, "days").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                        .each(function(){
                            console.log(i, moment(moment().format()).add(-i, "days").format("YYYY-MM-DD"), Number($(this).attr("data-count")));
                            weekcount += Number($(this).attr("data-count"))
                    })
                }
                resolve(weekcount);
            }
        )
    })
}

function getYearArray(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                const yeararray = [];
                $(`rect.ContributionCalendar-day`)
                    .each(function(){
                        if($(this).attr("data-count"))
                            yeararray.push(Number($(this).attr("data-count")))
                        else
                            yeararray.push(0);
                })
                resolve(yeararray);
            }
        )
    })
    
}

app.get('/:user/yearcount', async(req, res) => {
    const data = await getYearCount(req.params.user); 
    res.json(data);
})

app.get('/:user/daycount', async(req, res) => {
    const data = await getDayCount(req.params.user);
    res.json(data);
})

app.get('/:user/weekcount', async(req, res) => {
    const data = await getWeekCount(req.params.user);
    res.json(data);
})

app.get('/:user/yeararray', async(req, res) => {
    const data = await getYearArray(req.params.user);
    res.json(data);
})

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});