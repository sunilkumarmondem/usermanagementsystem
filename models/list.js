var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listschema = new Schema({
	username:{type:String},
	email:{type:String},
	password:{type:String},
	firstname:{type:String},
	lastname:{type:String},
	dateofbirth:{type:Date},
	group:{type:String}


})

var List =mongoose.model('list',listschema);
module.exports=List;