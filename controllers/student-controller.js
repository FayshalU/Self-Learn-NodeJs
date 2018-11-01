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
	userModel.getStudent(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			res.render('student/index',{user:result[0]});
		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.get('/course',function(req,res){

  userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      userModel.getCourse(function(result2){
        console.log(result2[0]);
        // res.render('student/index',{user:result1[0]});
    		res.render('student/course',{user:result1[0],course:result2});

    	});
		}
		else
		{
			res.redirect('/login');
		}
	});


});

router.get('/searchCourse/:data',function(req,res){

	var data = req.params.data;
	console.log(data);

  userModel.searchCourse(data, function(result){

		console.log(result);

		res.send({course:result});

	});


});

router.post('/showCourse',function(req,res){

	var data = req.body.src;
	console.log(data);

	userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      userModel.searchCourse2(data, function(result2){
        console.log(result2[0]);
        // res.render('student/index',{user:result1[0]});
    		res.render('student/showCourse',{user:result1[0],course:result2[0]});

    	});
		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.get('/showCourse/:data',function(req,res){

	var data = req.params.data;
	console.log(data);

	userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      userModel.searchCourse2(data, function(result2){
        console.log(result2[0]);
        // res.render('student/index',{user:result1[0]});
    		res.render('student/showCourse',{user:result1[0],course:result2[0]});

    	});
		}
		else
		{
			res.redirect('/login');
		}
	});

});


module.exports=router;
