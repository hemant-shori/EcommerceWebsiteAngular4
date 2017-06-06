var static = require('node-static');
var fileServer = new (static.Server)("./", {
    cache: 0,
    headers: {'X-Powered-By': 'node-static'}
});

http = require("http");

function onRequest(request, response) {
    var data1 = '';
    request.on('data', function (chunk) {
        data1 += chunk;
    });
    request.on('end', function () {
        if (data1.length > 2) {
            console.log(data1);
            var fs = require("fs");
            var readStream = fs.createReadStream("people.json");
            var jsonData = "";
            readStream.on('data', function (chunk) {
                jsonData += chunk;
            });

            readStream.on('end', function () {
                console.log(jsonData);
                var newUser = JSON.parse(data1);
                var oldData = JSON.parse(jsonData);
                oldData.push(newUser);
                fs.writeFile('people.json', JSON.stringify(oldData), function (error) {
                    if (!error)
                        console.log('its saved!!');
                    else
                        console.log('its not saved!!');
                });
            });


        }
//-------------Send Data to Browser--------------
        fileServer.serve(request, response);
    });
}

http.createServer(onRequest).listen(8081);
console.log("Post Server has been started");
// opens the url in the default browser
var opn = require('opn');
opn('http://localhost:8081/');
// , {app: 'chrome'}
