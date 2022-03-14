const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const app = express();
const port = 3000;
const parseString = require('xml2js').parseString;
const axios = require('axios');

app.use(express.static(__dirname + '/client//dist/client'));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


//Server Variables
const termsList = ['psychiatry', 'therapy', 'data science', 'machine learning'];
let authors = [];
let endDateFound = false;
let page = 1;
let initialCacheTimer = 0;

// Server Methods
setTimeout(function () {
    page = 1;
    authors = [];
    getAuthorCache();
    initialCacheTimer = 86400000; //24 hours
}, initialCacheTimer);


//host angular app
app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

// API
app.post('/api/terms', jsonParser, async(req, res) => {
    axios.get(buildQueryUrl(termsList, req.body.page))
    .then(function (response) {
        parseString(response.data, (err, result) =>{
            const formattedItems = getDateFormat(result.feed.entry);
            res.send(JSON.stringify(formattedItems));
        })
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.post('/api/authors', jsonParser, async(req, res) => {
    sortCache();
    res.send(authors);
});

// Helper Functions
function getAuthorCache() {
    axios.get(buildQueryUrl(termsList, page, 500))
    .then(function (response) {
        parseString(response.data, (err, result) =>{
            let formattedItems = getDateFormat(result.feed.entry);
            if(formattedItems && formattedItems.length > 0) {
                formattedItems = get6Months(formattedItems);
                formattedItems.forEach(article => {
                    article.author.map(aAuthor => {
                        let foundCacheAuthor = authors.find(a=> a.name === aAuthor.name[0]);
                        if(foundCacheAuthor) {
                            const foundCacheId = foundCacheAuthor.articleIds.find(id => article.id == id);
                            if(!foundCacheId) {
                                const newDateIsNewer = new Date(foundCacheAuthor.mostRecentArticleDate).getTime() < new Date(article.pubDate).getTime();
                                const date = newDateIsNewer ? article.pubDate : foundCacheAuthor.mostRecentArticleDate;
                                foundCacheAuthor.mostRecentArticleDate = date;
                                foundCacheAuthor.articleIds.push(article.id[0])
                            }
                        } else {

                            authors.push({
                                name: aAuthor.name[0],
                                mostRecentArticleDate: article.pubDate,
                                articleIds: article.id
                            });
                        }
                    });
                });

            } else {
                console.log('api returned empty');
            }
            if(!endDateFound) {
                page += 1;
                getAuthorCache();
            }
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

function sortCache() {
    authors = authors.sort((a,b) => {
        const aDate = new Date(a.mostRecentArticleDate).getTime();
        const bDate = new Date(b.mostRecentArticleDate).getTime();

        if(aDate === bDate) {
            return b.articleIds.length - a.articleIds.length
        } else return bDate - aDate;
    } );
}

function get6Months(articles) {

    const today = new Date();
    const sixMonths = new Date(today.setMonth(today.getMonth() - 6));
    if(articles && articles.length > 0 && (new Date(articles[articles.length - 1].published[0]).getTime() < sixMonths.getTime())) {
        endDateFound = true;
        articles = articles.filter(i => {
            return (new Date(i.published[0])).getTime() > sixMonths.getTime();
        });
    }
    console.log(`End Date Found: ${endDateFound}`);
    return articles;
}

function buildQueryUrl(terms, page, pageSize) {
    pageSize = pageSize == null ? 10 : pageSize;
    let termQuery = '';
    terms.forEach((term, index) => {
        let orSep = '';
        if(index > 0) {
            orSep = '+OR+';
        }
        termQuery = termQuery += `${orSep}all:"${term}"`;
    });
    return `https://export.arxiv.org/api/query?search_query=${termQuery}&sortBy=submittedDate&start=${(page - 1) * pageSize}&max_results=${pageSize}`;
}

function getDateFormat(items) {
    if(items) {
        items = items.map(t => {
            const date = new Date(t.published[0]);

            t.pubDate = date.toDateString();
            return t;
        });

        return items;
    }
}

