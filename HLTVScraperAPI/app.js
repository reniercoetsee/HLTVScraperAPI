const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const baseUrl = 'https://www.hltv.org'



async function getMatches() {
    const matchUrls = [];
    const url = baseUrl + '/matches';
    console.log(url)
    await rp(url)
        .then(function (html) {
            //success!
            const matchesPage = cheerio.load(html);
            const matches = matchesPage('a.match.a-reset');
            for (let i = 0; i < matches.length; i++) {
                matchUrls.push(matches[i].attribs.href);
            }
        })
        .catch(function (err) {
            //handle error
            console.log(err);
        });
    return matchUrls;
}


getMatches().then(function (matchUrls) {
    console.log(matchUrls);
});


