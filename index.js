const path = require('path');
var express = require('express');
var app = express();

var htmlPath = path.join(__dirname, 'views');

app.use(express.static(htmlPath));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/PROTRATOR.html");
});

var server = app.listen(8080, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});