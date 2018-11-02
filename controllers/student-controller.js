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

      userModel.searchCourseByName(data, function(result2){
        console.log(result2[0]);
        // res.render('student/index',{user:result1[0]});
				userModel.getChapterByCourseId(result2[0].course_id, function(result3){
	        // console.log(result3);

					if(result3.length<1){
						result3[0]={
							name:null,
							content:null
						}
					}

	    		res.render('student/showCourse',{user:result1[0],course:result2[0],chapter:result3,selectedchapter:result3[0]});

	    	});

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

      userModel.searchCourseByName(data, function(result2){
        console.log(result2[0]);
        // res.render('student/index',{user:result1[0]});

				userModel.getChapterByCourseId(result2[0].course_id, function(result3){
	        console.log(result3);
					if(result3.length<1){
						result3[0]={
							name:null,
							content:null
						}
					}
	        // res.render('student/index',{user:result1[0]});

	    		res.render('student/showCourse',{user:result1[0],course:result2[0],chapter:result3,selectedchapter:result3[0]});

	    	});

    	});
		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.get('/chapter/:data',function(req,res){

	var data = req.params.data;
	console.log(data);

	userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      userModel.getChapterByChapterName(data, function(result2){
        console.log(result2[0]);

				userModel.searchCourseById(result2[0].course_id, function(result3){
	        console.log(result3);

					userModel.getChapterByCourseId(result2[0].course_id, function(result4){
		        console.log(result4);

		    		res.render('student/showCourse',{user:result1[0],course:result3[0],chapter:result4,selectedchapter:result2[0]});

		    	});



	    	});

    	});
		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.get('/quiz/:data',function(req,res){

	var data = req.params.data;
	console.log(data);

	userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      userModel.getChapterByChapterName(data, function(result2){
        console.log(result2[0]);

				userModel.getQuizByChapterId(result2[0].course_id, function(result3){
	        console.log(result3);

					userModel.searchCourseById(result2[0].course_id, function(result4){
		        console.log(result4);

						userModel.getChapterByCourseId(result2[0].course_id, function(result5){
							console.log(result5);

							res.render('student/quiz',{user:result1[0],course:result4[0],quiz:result3,selectedchapter:result2[0],chapter:result5});
							
						});

		    	});



	    	});

    	});
		}
		else
		{
			res.redirect('/login');
		}
	});

});


module.exports=router;
