var q = require('q');

var HackerNews = function(){
    this.endpointItems = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    this.endpointItem  = "https://hacker-news.firebaseio.com/v0/item/{id}.json?print=pretty";
}

HackerNews.prototype.getTopItems = function(items, q){
    var deferred    = q.defer()
        data        = [];

    for(var i = 0; i <= 2; i++){
        data.push(items[i]);
    }

    deferred.resolve(data);
    
    return deferred.promise;
}

HackerNews.prototype.getItems = function(getData, data){
    var _this       = this
    deferred        = q.defer(),
    promises        = [];

    for(var i = 0; i < data.length; i++){
        var endpoint = this.endpointItem.replace(/{id}/, data[i])
        promises.push(getData(endpoint));
    }

    return q.all(promises).then(function(result){
        return result;
    })    
}

module.exports = HackerNews;