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


async function cacheMatch(matchUrl) {
    const url = baseUrl + matchUrl;
    await rp(url).then(function (html) {
        const fileName = './matches/' + (matchUrl.substring(1) + '.html').replace(/\//g, '-');
        console.log(fileName);
        fs.writeFile(fileName, html, function(err) {
            if(err) {
                console.log(err);
            }
        });
        console.log('file written');
    }).catch(function (err) {
            console.log(err);
        });
}

const matchUrl = getMatches().then(function (matchUrls) {
    console.log(matchUrls[0]);
    for (let i = 0; i < matchUrls.length; i++) {
        cacheMatch(matchUrls[i]);
    }
});



