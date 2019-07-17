// Load Dependencies
const path = require('path')
const fetch = require('node-fetch')
const express = require('express')
const hbs = require('hbs')
const latestupdates = require('./utils/latestupdates')

// Initialize Express
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT ? process.env.PORT : 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Router for loading the page
app.get('/page', (req, res) => {
    latestupdates((error, allresults = {}) => {
        if (error) {
            return res.send({ error })
        }
        res.send(allresults)
    })
})

// Router for index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Real-Time Wikipedia Updates Monitor',
        name: 'Patrick Jobin'
    })
})

// 404 page error handling router
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})


// Monitoring port number for debugging purposes
app.listen( port, () => {
    console.log('Server is up on port ' + port)
})
