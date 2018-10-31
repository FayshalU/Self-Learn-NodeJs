var express=require('express');
var router=express.Router();
var userModel=require.main.require('./models/user-model');


router.get('/',function(req,res){

	res.render('login');

});

router.post('/',function(req,res){
	var user={
		userid:req.body.userid,
		password:req.body.password
	};
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
			res.redirect('/login');
		}

	});


});



module.exports=router;
