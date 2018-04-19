var express = require('express');
var router =express.Router();
var Ninja = require('../models/user');
var jwt=require('jsonwebtoken');
var Group = require('../models/group');
var List = require('../models/list');

router.post('/register',function(req,res){
	let userdata = req.body;
	let user = new Ninja(userdata);
	user.save(function(error,registereduser){
		if(error){
			console.log(error);
		}
		else{
			let payload={subject:registereduser._id};
			let token=jwt.sign(payload,'secretkey');
			res.status(200).send({token});
		}
	});
});

router.post('/login',function(req,res){
	let userdata=req.body;
	Ninja.findOne({email:userdata.email},function(error,user){
		if(error){
			console.log(error);
		}
		else{
			if(!user){
				res.status(401).send('invalid email');
			}
			else
				if(user.password!==userdata.password){
					res.status(401).send('invalid password');
				}
				else{
					let payload={subject:user._id};
					let token=jwt.sign(payload,'secretkey');
					res.status(200).send({token});
				}
		}
	})

})




router.post('/addgroup',function(req,res){
	var group = new Group(req.body);
	group.save().then(function(data){
		res.send(data);
	})

});

router.get('/groups',function(req,res){
	Group.find({}).then(function(data){
		res.send(data);
	})
});

router.get('/groups/:id',function(req,res){
	Group.findById({_id:req.params.id}).then(function(data){
		res.send(data);
	})
});

router.put('/groups/:id',function(req,res){
	Group.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
		Group.findOne({_id:req.params.id}).then(function(data){
			res.send(data);
		})
	})
});

router.delete('/groups/:id',function(req,res){
	Group.findByIdAndRemove({_id:req.params.id}).then(function(data){
		res.send(data);
	})
});

router.post('/adduser',function(req,res){
	var user = new List(req.body);
	user.save().then(function(data){
		res.send(data);
	})

});

router.get('/users',function(req,res){
	List.find({}).then(function(data){
		res.send(data);
	})
});

router.get('/users/:id',function(req,res){
	List.findById({_id:req.params.id}).then(function(data){
		res.send(data);
	})
});

router.get('/users_group/:gnm',function(req,res){
	List.find({group:req.params.gnm}).then(function(data){
		res.send(data);
	})
});


router.put('/users/:id',function(req,res){
	List.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
		List.findOne({_id:req.params.id}).then(function(data){
			res.send(data);
		})
	})
});

router.delete('/users/:id',function(req,res){
	List.findByIdAndRemove({_id:req.params.id}).then(function(data){
		res.send(data);
	})
});



module.exports=router;

