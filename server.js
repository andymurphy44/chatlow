var http = require("http");
var url = require("url");
var connect = require("connect");
var peerWaiting = false;
var waitingPeer = "";
var res1;

connect.createServer(connect.static("bin-debug")).listen(8080);

http.createServer(function(request, response) {
  console.log('New request');
  console.log("Request URL = " + request.url);
  if (request.url.substring(0,2) == "/?") {
    response.writeHead(200, {"Content-Type": "text/plain"});
    var queryData = url.parse(request.url, true).query;
    console.log('findPeer request : ' + JSON.stringify(queryData));
    if (peerWaiting) {
      response.write("<id>" + waitingPeer + "</id>");
      res1.write("<id>" + queryData.id + "</id>");
      res1.end();
      response.end();
      peerWaiting = false;
    } else {
      waitingPeer = queryData.id;
      res1 = response;
      peerWaiting = true;
    }
  }
}).listen(8888);
