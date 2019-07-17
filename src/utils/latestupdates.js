// This code pulls the latest wikipedia updates
///////////////////////////////////////////////////////

// Load dependencies
const fetch = require('node-fetch')
const request = require('request')

// Define constants
const newUrl = 'https://www.mediawiki.org/w/api.php?action=query&list=recentchanges&format=json&rctype=new|edit|categorize|log&rctoponly=true&rclimit=3000'
const pullPageUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages|categories|info|pageprops&format=json&exintro=&pageids='


const pullPage = async (url) => {
    return await fetch(url).then(res => res.json()).then(body => body);
}


// Pull latest results from Wikipedia
const latestupdates = async (callback) => {

  // Find latest updates and append them to the pullPageUrl
  var response = await fetch(newUrl)
  .then(res => res.json())
  .then((body) => body.query.recentchanges)
  .then(x => splitPageIds(x, 50).map(y => pullPageUrl + y))
    
  var i;
  for (i = 0; i < response.length; i++) { 
      response[i] = await fetch(response[i].trim().toString()).then(res => res.json());
      response.map(x => x.query)
  }
  let response2 = response.map(x => x.query.pages).reduce((a, b) => a = {...a, ...b })

  callback( Object.keys(response2).map(key => response2[key]) )

}

// Wikipedia has limitations on how many page IDs can be loaded at once
// Split the request into multiple calls
splitPageIds = (pageIdArray = [], blockSize = 50) => {
    urlPageVars = [];
    while (pageIdArray.length > 0) {
        tmpArray = pageIdArray.splice(0 , blockSize)
        urlPageVars.push( tmpArray.reduce((acc = '', { pageid = '' }) => acc + "|" + pageid ) )
        urlPageVars = urlPageVars.map((x) => x.substring(x.indexOf('|') != -1 ? x.indexOf('|') + 1 : s.length))
    }
   return urlPageVars
}

module.exports = latestupdates
