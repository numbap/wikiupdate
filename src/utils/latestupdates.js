const fetch = require('node-fetch')
const request = require('request')

const pullPage = async (url) => {
    return await fetch(url).then(res => res.json()).then(body => body);
}


const latestupdates = async (callback) => {

    // console.log(await pullPage(rrr))
    const newUrl = 'https://www.mediawiki.org/w/api.php?action=query&list=recentchanges&format=json&rctype=new|edit|categorize|log&rctoponly=true&rclimit=3000'
    const pullPageUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages|categories|info|pageprops&format=json&exintro=&pageids='
    let allPages = '';

    // var response = await fetch(newUrl).then(x => x.json());
    // callback(response)

    var response = await fetch(newUrl)
    .then(res => res.json())
    .then((body) => body.query.recentchanges)
    .then(x => splitPageIds(x, 50).map(y => pullPageUrl + y))
    // .then(z => z.map(a => fetch(a).then(a => a.json())))
    
    var i;
    for (i = 0; i < response.length; i++) { 
        response[i] = await fetch(response[i].trim().toString()).then(res => res.json());
        response.map(x => x.query)
        // console.log(response[i].trim().toString())
    }
    let response2 = response.map(x => x.query.pages).reduce((a, b) => a = {...a, ...b })

    // .reduce((a = [], b) => a.push(b))
    callback( Object.keys(response2).map(key => response2[key]) )

}



splitPageIds = (pageIdArray = [], blockSize = 50) => {
    urlPageVars = [];
    while (pageIdArray.length > 0) {
        tmpArray = pageIdArray.splice(0 , blockSize)
        urlPageVars.push( tmpArray.reduce((acc = '', { pageid = '' }) => acc + "|" + pageid ) )
        urlPageVars = urlPageVars.map((x) => x.substring(x.indexOf('|') != -1 ? x.indexOf('|') + 1 : s.length))
    }
   return urlPageVars
}

async function getBlock() {
    let jsonBlocks;
    try {
      var response = await fetch('https://myurl');
      jsonBlocks = await response.text();
      console.log(jsonBlocks)
    } catch (e) {
      // handle error
      console.error(e)
    }
  }
  




module.exports = latestupdates
