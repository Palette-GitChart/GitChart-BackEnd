const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');
const cheerio = require('cheerio');
const dayjs = require('dayjs');
require('dayjs/locale/ko');
dayjs.locale('ko') ;

function getHTML(user){
    user = encodeURI(user);
    try {
        return axios.get(`https://github.com/users/${user}/contributions`, {            
            headers: {
                withCredentials: true,
                "Cookie": "tz=Asia%2FSeoul; logged_in=yes;"
            }
        });
    }catch(err){
        console.log(err);
    }
}

app.get('/:user/yearcount', function(req, res){
    getHTML(req.params.user)
        .then((html) => {
            const $ = cheerio.load(html.data);
            let yearcount = 0;
            $(`rect.ContributionCalendar-day`)
                .each(function(){
                    if($(this).attr("data-count"))
                        yearcount += (Number($(this).attr("data-count")))
            })
            res.json(yearcount);
        })
        .catch(err => {
            res.status(err.status).send(err)
        })
})

app.get('/:user/daycount', function(req, res){
    getHTML(req.params.user)
        .then((html) => {
            const $ = cheerio.load(html.data);
            let daycount = 0;
            $(`rect[data-date="${dayjs().format('YYYY-MM-DD')}"].ContributionCalendar-day`)
                .each(function(){
                    daycount += Number($(this).attr("data-count"))
            })
            res.json(daycount);
        })
        .catch(err => {
            res.status(err.status).send(err)
        })
})

app.get('/:user/weekcount', function(req, res){
    getHTML(req.params.user)
        .then((html) => {
            const $ = cheerio.load(html.data);
            let weekcount = 0;
            let day = dayjs().day();
            for(let i = 0; i <= day; i++){
                $(`rect[data-date="${dayjs(dayjs().format()).add(-i, "d").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                    .each(function(){
                        weekcount += Number($(this).attr("data-count"))
                })
            }
            res.json(weekcount);
        })
        .catch(err => {
            res.status(err.status).send(err)
        })
})

app.get('/:user/weekarray', function(req, res){
    getHTML(req.params.user)
        .then((html) => {
            const $ = cheerio.load(html.data);
            let weekarray = [];
            let day = dayjs().day();
            for(let i = 0; i <= day; i++){
                $(`rect[data-date="${dayjs(dayjs().format()).add(-i, "d").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                    .each(function(){
                        weekarray.unshift(Number($(this).attr("data-count")))
                })
            }
            res.json(weekarray);
        })
        .catch(err => {
            res.status(err.status).send(err)
        })
})

app.get('/:user/monthcount', function(req, res){
    getHTML(req.params.user)
        .then((html) => {
            const $ = cheerio.load(html.data);
            let monthcount = 0;
            let day = dayjs().date();
            for(let i = 0; i < day; i++){
                $(`rect[data-date="${dayjs(dayjs().format()).add(-i, "d").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                    .each(function(){
                        monthcount += Number($(this).attr("data-count"))
                })
            }
            res.json(monthcount);
        })
        .catch(err => {
            res.status(err.status).send(err)
        })
})

app.get('/:user/montharray', function(req, res){
    getHTML(req.params.user)
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
            res.json(montharray);
        }
    )
    .catch(err => {
        res.status(err.status).send(err)
    })
})

app.get('/:user/yeararray', function(req, res){
    getHTML(req.params.user)
        .then((html) => {
            const $ = cheerio.load(html.data);
            const yeararray = [];
            $(`rect.ContributionCalendar-day`)
                .each(function(){
                    if($(this).attr("data-count"))
                        yeararray.push(Number($(this).attr("data-count")))
            })
            res.json(yeararray);
        })
        .catch(err => {
            res.status(err.status).send(err)
        })
})

app.get('/:user', function(req, res){
    const montharray = [];
    let yearcount = 0;
    let monthcount = 0;
    let weekcount = 0;
    let daycount = 0;
    let mdate = dayjs().date();
    let mday = dayjs().day();
    getHTML(req.params.user) 
        .then((html) => {
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
            res.json({yearcount: yearcount, montharray: montharray, monthcount: monthcount, weekcount: weekcount, daycount: daycount});
        })
        .catch(err => {
            res.status(err.status).send(err)
        })
})


const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});
//pm2-runtime index.js
//"preinstall": "npm install pm2 -g",