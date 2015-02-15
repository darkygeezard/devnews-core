var https          = require('https'),
	q              = require('q'),
	Reddit         = require('./sources/Reddit'),
    HackerNews     = require('./sources/HackerNews');

var Feeds = function(){
	this.reddit        = new Reddit();
    this.hackernews    = new HackerNews();
}

Feeds.prototype.init = function(){
}

Feeds.prototype.getData = function(endpoint){
	var deferred = q.defer();

    https.get(endpoint, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
           deferred.resolve(JSON.parse(body));
        });
    }).on('error', function(e) {
        deferred.reject(e);
    });

    return deferred.promise;
}

Feeds.prototype.getRedditData = function(limit){
	var _this      = this;

	return this.getData(this.reddit.endpoint).then(function(data){
        return _this.reddit.parseData(data, q);
	});
}

Feeds.prototype.getHackerNewsData = function(limit){
    var _this      = this;

    return this.getData(this.hackernews.endpointItems).then(function(data){
        return _this.hackernews.getItems(data, q, this.getData);
    });
}

new Feeds();

module.exports = Feeds;