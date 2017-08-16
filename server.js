// import EXPRESS as express
var express = require('express')

// create instance of express defined as "app"
var app = express()

// import REQUEST library
var request = require('request')

// create a handler for static web pages.  Note that this either sends a RESPONSE or returns NEXT.
app.use(express.static('./public'))

// GET request to send index.html when browser points to '/' endpoint.
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})

// GET handler to request API from NASA server with selected dates.  It includes callback function.
app.get('/asteroids', function(req, res){
    console.log(req.query)

    request('https://api.nasa.gov/neo/rest/v1/feed?start_date='+req.query.begin_date+'&end_date='+req.query.end_date+'&api_key=CyVHllQ3d29H7WoD5eWXGS27qWkx6y0ANT6QeHjb', function(err, data, body){

    console.log(body)
    res.send(body)
    })
})

app.listen(8000)
