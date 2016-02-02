var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);



/*app.get('/', function(req, res){

	res.send('Hello Server from Server.js');
});*/

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){

	console.log("Received GET request");

	db.contactlist.find(function(err, docs){
		console.log(docs);

		res.json(docs);
	});
    

});

app.post('/addContact', function(req, res){

	console.log("Received POST request ");
	console.log(req.body);

	db.contactlist.insert(req.body,function(err,doc){

		res.json(doc);
	});

});

app.delete('/deleteContact/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);

	})
});

app.get('/editContact/:id', function(req,res){
	var id = req.params.id;
	console.log(id);

	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});


});

app.listen(3000);

console.log('server running on port 3000');