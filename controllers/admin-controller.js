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

	userModel.getAdmin(req.session.un, function(result1){
		if(result1.length > 0)
		{
			console.log(result1[0].user_id);

			userModel.getPost(function(result2){
        console.log(result2);
        // res.render('student/index',{user:result1[0]});
    		res.render('admin/index',{user:result1[0],post:result2});

    	});

		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.get('/profile',function(req,res){

  userModel.getAdmin(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      res.render('admin/profile',{user:result1[0]});
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
        // console.log(result2[0]);
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
			res.redirect('/admin/course');
		}
	});
});


router.get('/editCourses/:id',function(req,res){
	var id=req.params.id;
	userModel.getAdmin(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			userModel.searchCourseById(id,function(result2){

				console.log(result2);
				res.render('admin/editCourses', {user:result[0],course:result2[0]});
			});
		}
		else
		{
			res.redirect('/login');
		}
	});

});


router.post('/editCourses',function(req,res){
	var course={
		course_id:req.body.id,
		name:req.body.coursename,
		chapter:req.body.chapter
	};

	userModel.updateCourse(course,function(status){
		if(status)
		{
			res.redirect('/admin/course');

		}
		else
		{
			res.redirect('/admin/course');
		}
	});
});

router.get('/deleteCourses/:id',function(req,res){

	var id=req.params.id;
	userModel.getAdmin(req.session.un, function(result){
		if(result.length > 0)
		{
      console.log(result[0].user_id);
			userModel.searchCourseById(id,function(result2){

				console.log(result2);
				res.render('admin/deleteCourses', {user:result[0],course:result2[0]});
			});
		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.post('/deleteCourses/:id',function(req,res){

	if(req.body.yes)
	{
		userModel.deleteCourse(req.params.id,function(status){
			if(status)
			{
				res.redirect('/admin/course');

			}
			else
			{
				res.redirect('/admin/course');
			}

		})
	}
	else
	{
		res.redirect('/admin/course');
	}

});







module.exports=router;
