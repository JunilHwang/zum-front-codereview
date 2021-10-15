var ranking = require('./Ranking.json')
var request = require('request');
const cheerio = require('cheerio');

function getUrl() {
    var urls = ranking.map(function(item){
        return item.url
    })
}

function getSub() {
    console.log("getSub")
    const urlData = getUrl()
    urlData.map((item, index) => {
        request('https://hub.zum.com/donga/75514', function (error, response, body) {
            console.log("response",response)
            if(error) throw error
            console.log('body: ', body);
        });
   })

}
module.exports = { getUrl, getSub}