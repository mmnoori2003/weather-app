const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../partials'))

app.get('', (req, res) => {
    res.render('index', {
        name: "Andrew",
        title: "Weather"

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        note: "help goes here",
        name: "Andrew",
        title: "Help"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Andrew",
        title: "About Me"
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.json({
                    error
                })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.json({
                        error
                    })
                }

                res.json({
                    forecast: forecastData,
                    location
                })
            })
        })
    }
    else {
        res.json({
            error: "You must provide an address"
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("running on port 3000")
})