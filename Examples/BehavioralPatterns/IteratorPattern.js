/**
 *
 the method to iterate though a list of items. is best used when a for loop and an array of objects
 *
 */

newsFeeds = [
    {
        type: 'top-headlines',
        query: 'sources=bbc-news'
    },
    {
        type: 'everything',
        query: 'domains=techcrunch.com&language=en'
    },
    {
        type: 'everything',
        query: 'domains=comicbookmovie.com&language=en'
    }
];

for (let feed of newsFeeds) {
    console.log(feed.type);
}