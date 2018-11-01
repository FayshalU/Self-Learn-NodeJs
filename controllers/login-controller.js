var express=require('express');
var router=express.Router();
var userModel=require.main.require('./models/user-model');

var error={
	id: 0,
	status:1
};


router.get('/',function(req,res){

	res.render('login',{error});

});

router.post('/',function(req,res){
	var user={
		userid:req.body.userid,
		password:req.body.password
	};

	if(user.userid=="" || user.password=="")
	{
		//EMPTY:::::::::::::::;
		error.id = 1;
		// console.log(error);
		res.render('login',{error});
	}
	else{
		error.id = 0;
		userModel.logCheck(user,function(result){
			console.log(result);

			if(result == 1)
			{
				req.session.un=req.body.userid;
				res.redirect('/admin');

			}
			else if(result == 2)
			{
				req.session.un=req.body.userid;
				res.redirect('/student');

			}
			else{
				error.id = 2;
				res.render('login',{error});
			}

		});
	}



});



module.exports=router;
