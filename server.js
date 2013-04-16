var express = require('express');
var url = require('url');
var app = express();
var waitingPeers = [];

app.configure(function() {
  app.use(express.static(__dirname + "/bin-release"));
});

app.get('/findPeer', function(request, response) {
  console.log("Request URL = " + request.url);
  response.writeHead(200, {"Content-Type": "text/plain"});
  var queryData = url.parse(request.url, true).query;
  console.log('findPeer request : ' + JSON.stringify(queryData) + '\n');
  if (queryData.id && queryData.id != "") {
    if (waitingPeers.length != 0) {
      var peer = waitingPeers.pop();
      if (queryData.id.indexOf("/") != -1) {
        queryData.id = queryData.id.substr(0, queryData.id.indexOf('/'));
      }
      peer[1].end("<id>" + queryData.id + "</id>");
      response.end("<id>" +  peer[0] + "</id>");
    } else {
      if (queryData.id.indexOf("/") != -1) {
        queryData.id = queryData.id.substr(0, queryData.id.indexOf('/'));
      }
      waitingPeers.push([queryData.id, response]);
    }
  }
});

app.listen(55555);

