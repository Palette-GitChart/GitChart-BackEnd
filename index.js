const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

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

function getYearCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                var yearcount = 0;
                $(`rect.ContributionCalendar-day`)
                    .each(function(){
                        if($(this).attr("data-count"))
                            yearcount += (Number($(this).attr("data-count")))
                })
                resolve(yearcount);
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
                            weekcount += Number($(this).attr("data-count"))
                    })
                }
                resolve(weekcount);
            }
        )
    })
}

function getWeekArray(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                var weekarray = [];
                for(var i = 0; i <= moment().day(); i++){
                    $(`rect[data-date="${moment(moment().format()).add(-i, "days").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                        .each(function(){
                            weekarray.unshift(Number($(this).attr("data-count")))
                    })
                }
                resolve(weekarray);
            }
        )
    })
}

function getMonthCount(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                var monthcount = 0;
                var day = moment().date();
                for(var i = 0; i < day; i++){
                    $(`rect[data-date="${moment(moment().format()).add(-i, "days").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                        .each(function(){
                            monthcount += Number($(this).attr("data-count"))
                    })
                }
                resolve(monthcount);
            }
        )
    })
}

function getMonthArray(user){
    return new Promise((resolve, reject) => {
        getHTML(user)
            .then((html) => {
                const $ = cheerio.load(html.data);
                var montharray = [];
                var day = moment().date();
                for(var i = 0; i < day; i++){
                    $(`rect[data-date="${moment(moment().format()).add(-i, "days").format("YYYY-MM-DD")}"].ContributionCalendar-day`)
                        .each(function(){
                            montharray.unshift(Number($(this).attr("data-count")))
                    })
                }
                resolve(montharray);
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
                })
                resolve(yeararray);
            }
        )
    })
    
}

function getUser(user){
    return new Promise((resolve, reject) => {
        const yeararray = [];
        const montharray = [];
        var yearcount;
        var monthcount;
        var daycount;
        var day = moment().date();
        var i = 0;
        getHTML(user) 
            .then((html) => {
                const $ = cheerio.load(html.data);
                $(`rect.ContributionCalendar-day`)
                    .each(function(){
                        if($(this).attr("data-count"))
                            yeararray.push(Number($(this).attr("data-count")));
                            yearcount += Number($(this).attr("data-count"));
                        if(i < day && $(this).attr("dat-count") == moment(moment().format()).add(-i, "days").format("YYYY-MM-DD")){
                            montharray.unshift(Number($(this).attr("data-count")));
                            monthcount += Number($(this).attr("data-count"));
                            i++;
                        }
                        if($(this).attr("data-count") == moment().format('YYYY-MM-DD')){
                            daycount += Number($(this).attr("data-count"));
                        }
                })
                resolve({yeararray: yeararray, yearcount: yearcount, montharray: montharray, monthcount: monthcount, daycount: daycount});
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

app.get('/:user/weekarray', async(req, res) => {
    const data = await getWeekArray(req.params.user);
    res.json(data);
})

app.get('/:user/monthcount', async(req, res) => {
    const data = await getMonthCount(req.params.user);
    res.json(data);
})

app.get('/:user/montharray', async(req, res) => {
    const data = await getMonthArray(req.params.user);
    res.json(data);
})

app.get('/:user/yeararray', async(req, res) => {
    const data = await getYearArray(req.params.user);
    res.json(data);
})

app.get('/:user', async(req, res) => {

})

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});