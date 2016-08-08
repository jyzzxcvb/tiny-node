var express = require('express');
var app = express();

app.use(express.static('public'));

//get web interface
app.get('/', function (req, res) {
	res.send('Hello Express!');
});

//post an URL, return shortened
app.post('/api/shorten', function (req, res) {
	res.send('Hello Express!');
});

//get an Tiny URL
app.get('/:encoded', function (req, res) {
	res.send('get!');
});

app.listen(8080, function() {
	console.log('Example app listening on port 8080');
});