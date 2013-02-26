function init () {
  var fp       = require('../../node_modules/feedparser'),
      Promise  = require('../../node_modules/rsvp').Promise,
      promise  = new Promise(),
      articles = [];

  function add (article) {
    // make an article object, add it to an array
    var obj     = {};
    obj.title   = article['title'];
    obj.content = article['description'];
    obj.link    = article['link'];
    var i = articles.push(obj) - 1;
    (articles[i]).index = i;
    if( articles.length === 10 ){
      promise.resolve(articles);
    }
  }

  fp.parseUrl('http://i.perezhilton.com/?feed=rss2').on('article', add);

  return promise;
}

exports.getArticles = function(callback) {
  init().then(function(articles) {
    callback(articles);
  });
};
