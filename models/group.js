var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupschema = new Schema({
	name:{type:String}

	
})

var Group =mongoose.model('groups',groupschema);
module.exports=Group;