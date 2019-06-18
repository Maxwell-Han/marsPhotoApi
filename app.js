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
app.post('/search', function (req, res) {
  let searchPage = req.body.page || 1
  let searchSol = req.body.sol
  let searchCam = req.body.cam
  let prevQuery = {
    page: searchPage,
    sol: searchSol,
    cam: searchCam
  }
  console.log(searchPage, searchSol, searchCam)
  let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${searchSol}&camera=${searchCam}&page=${searchPage}&api_key=DEMO_KEY`
  let hasResults = false
  let hasMoreResults = false
  let len = 0
  request(url, function(err, response, body){
     if(err){
       console.log('we have an error')
       console.log('error:', JSON.parse(err))
       res.send(err)
     }else{
       console.log('hello from the search page route using idx')
       let results = JSON.parse(body).photos //returns an array of objs
       console.log(typeof results, results)

       if(results.length == 25) hasMoreResults = true
       if(results.length > 1) hasResults = true
       console.log(prevQuery, 'has more results val: ', hasMoreResults)

       // let results = JSON.parse(body).items.map( arr => arr)
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
