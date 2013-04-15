var express = require('express');
var url = require('url');
var app = express();
var peerWaiting = false;
var waitingPeer = "";
var res1;

app.configure(function() {
  app.use(express.static(__dirname + "/bin-release"));
});

app.get('/findPeer', function(request, response) {
  console.log('New request');
  console.log("Request URL = " + request.url);
  response.writeHead(200, {"Content-Type": "text/plain"});
  var queryData = url.parse(request.url, true).query;
  console.log('findPeer request : ' + JSON.stringify(queryData));
  if (queryData.id && queryData.id != "") {
    if (peerWaiting) {
      response.write("<id>" + waitingPeer + "</id>");
      if (queryData.id.indexOf("/") != -1) {
        queryData.id = queryData.id.substr(0, queryData.id.indexOf('/'));
      }
      res1.write("<id>" + queryData.id + "</id>");
      res1.end();
      response.end();
      peerWaiting = false;
    } else {
      waitingPeer = queryData.id;
      if (waitingPeer.indexOf("/") != -1) {
        waitingPeer = waitingPeer.substr(0, waitingPeer.indexOf('/'));
      }
      res1 = response;
      peerWaiting = true;
    }
  }
});

app.listen(55555);
