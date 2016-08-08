var express = require('express');
var app = express();

app.use(express.static('public'));

var redis = require("redis"),
    client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error " + err);
});

//get web interface
app.get('/', function (req, res) {
	res.send('<form action="/api/shorten" method="post"><input type="text" name="url" /><input type="submit" value="Create" /></form>');
});

//post an URL, return shortened
app.post('/api/shorten', function (req, res) {
	var url = req.param('url');
	console.log('got create request:' + url);
	console.log('current database size:' + client.keys.length);
	// Create a short url
    //id = shortener.generate();
    id = client.keys.length
	client.set(id, url, function () {
        // Display the response
        res.send('Created Record:'+url+ 'key'+id);
    });
});

//get an Tiny URL
app.get('/:encoded', function (req, res) {
	var key = req.param('encoded');
	console.log('got lookup request:'+client.keys.length);
	// Look up request url
    client.get(key, function (err, reply) {
        if (!err && reply) {
			console.log('found');
            // to redirect 
            //res.status(301);
            res.send(reply);
            //res.set('Location', reply);
            
        } else {
			console.log('not found');
            // not found
            res.status(404);
            res.send('not found');
        }
    });
});

app.listen(8080, function() {
	console.log('Example app listening on port 8080');
});