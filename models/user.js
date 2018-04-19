var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
	username:{type:String},
	email:{type:String},
	password:{type:String}
})

var Ninja =mongoose.model('register',userschema);
module.exports=Ninja;