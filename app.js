const request = require('request')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views/'))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('index', {
    data: false,
    hasResults: null,
    hasMoreResults: false,
    prevQuery: false
  })
})

//GET Using start idx
app.post('/search', function (req, res, next) {
  let searchPage = req.body.page || 1
  let searchSol = req.body.sol
  let searchCam = req.body.cam
  let prevQuery = {
    page: searchPage,
    sol: searchSol,
    cam: searchCam
  }

  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${searchSol}&camera=${searchCam}&page=${searchPage}&api_key=DEMO_KEY`
  console.log(searchPage, searchSol, searchCam, url)
  let hasResults = false
  let hasMoreResults = false
  let len = 0
  request(url, function(err, response, body){
     if(err){
       console.log('we have an error')
       console.log('error:', JSON.parse(err))
       res.render('index', {
         data: null,
         prevQuery: true,
         hasResults: false,
         hasMoreResults: false,
         error: null
       })
     }else{
       let results = JSON.parse(body).photos || [] //returns an array of objs
       if(results.length == 25) hasMoreResults = true
       if(results.length > 1) hasResults = true
       console.log(prevQuery, 'hasResultsVal = ', hasResults, 'has more results val: ', hasMoreResults)

       res.render('index', {
         data: results,
         prevQuery,
         hasResults,
         hasMoreResults,
         error: null
       })
     }
   })
})


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Mars app listening on port 3000');
});
