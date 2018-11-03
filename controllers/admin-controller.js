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

router.get('/course',function(req,res){

  userModel.getAdmin(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      userModel.getCourse(function(result2){
        console.log(result2[0]);
        // res.render('student/index',{user:result1[0]});
    		res.render('admin/showCoursesAvailable',{user:result1[0],course:result2});

    	});
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
			res.redirect('/admin/course');

		}
		else
		{
			res.send('Error in adding...');
		}
	});
});



router.get('/editCourses/:name',function(req,res){
	var name=req.params.name;
	userModel.getAdmin(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			userModel.getCourseByName(name,function(result2){
		console.log(result2.user_id);
		res.render('/admin/editCourses', {user:result[0]},course:result2);
	});
		}
		else
		{
			res.redirect('/login');
		}
	});
	
});


router.post('/editCourses',function(req,res){
	var user={
		coursename:req.body.coursename,
		chapter:req.body.chapter
	};

	userModel.updateCourse(user,function(status){
		if(status)
		{
			res.redirect('/admin/course');

		}
		else
		{
			res.send('Error in adding...');
		}
	});
});

router.get('/deleteCourses/:name',function(req,res){
	
	res.render('admin/deleteCourses',{name:req.params.name});
	
});

router.post('/deleteCourses/:name',function(req,res){
	
	if(req.body.yes)
	{
		userModel.deleteCourse(req.params.name,function(status){
			if(status)
			{
				res.redirect('/admin/courses');
			}
			else
			{
				res.send('Error in deleting...');
			}

		})
	}
	else
	{
		res.redirect('/admin/courses');
	}
	
});

router.get('/addChapter',function(req,res){

	userModel.getAdmin(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			res.render('admin/addChapter', {user:result[0]});
		}
		else
		{
			res.redirect('/login');
		}
	});

 });









module.exports=router;
