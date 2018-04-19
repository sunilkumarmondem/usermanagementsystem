var express = require('express');
var bodyParser =require('body-parser');
var mongoose =require('mongoose');

mongoose.Promise =global.Promise;
var path=require('path');


mongoose.connect('mongodb://localhost:27017/crud');

var app=express();

var routes = require('./routes/api');
app.use(bodyParser.json());



app.use(routes);

app.use(express.static(__dirname + '/project/dist/'));

app.get('*',(req,res) => {
	res.sendFile(path.join(__dirname + '/project/dist/index.html'));
})



app.listen(8080,function(){
	console.log('sever is running');
})
