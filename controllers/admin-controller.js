var express=require('express');
var router=express.Router();
var userModel=require.main.require('./models/user-model');

router.get('*',function(req,res,next){
	if(req.session.un==null)
	{
		console.log("Login first");
		res.redirect('/login');
	}
	else
	{
		next();
	}
});

router.get('/',function(req,res){

	userModel.getAdmin(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			res.render('admin/index',{user:result[0]});
		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.get('/addCourses',function(req,res){

	userModel.getAdmin(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			res.render('admin/addCourses', {user:result[0]});
		}
		else
		{
			res.redirect('/login');
		}
	});

 });

router.get('/addCourses',function(req,res){

	userModel.getAdmin(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			res.render('admin/addCourses', {user:result[0]});
		}
		else
		{
			res.redirect('/login');
		}
	});

 });

router.post('/addCourses',function(req,res){
	var user={
		coursename:req.body.coursename,
		chapter:req.body.chapter
	};

	userModel.insertCourses(user,function(status){
		if(status)
		{
			res.redirect('/admin');

		}
		else
		{
			res.send('Error in adding...');
		}
	});
});




		
	

 






module.exports=router;
