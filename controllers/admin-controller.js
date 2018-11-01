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
	res.render('admin/addCourses');
 });



module.exports=router;
