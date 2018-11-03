var express=require('express');
var router=express.Router();
var userModel=require.main.require('./models/user-model');

var error={
	id: 0,
	status:1
};

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

	userModel.getStudent(req.session.un, function(result1){
		if(result1.length > 0)
		{
			console.log(result1[0].user_id);

			userModel.getPost(function(result2){
        console.log(result2);
        // res.render('student/index',{user:result1[0]});
    		res.render('student/index',{user:result1[0],post:result2});

    	});

		}
		else
		{
			res.redirect('/login');
		}
	});

});

router.get('/profile',function(req,res){

  userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);
			error.id = 0;

      res.render('student/profile',{user:result1[0],error});
		}
		else
		{
			res.redirect('/login');
		}
	});


});

router.post('/edit',function(req,res){

	userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);
			error.id = 0;

			var user={
		    name:req.body.name,
		    email:req.body.email,
				userid:req.session.un
			};
		  var re = /^[A-Z a-z]+$/;
		  var re2 = /\S+@\S+\.\S+/;

			if(user.name=="")
			{
				//EMPTY:::::::::::::::;
				error.id = 3;
				console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}
		  else if(!re.test(user.name))
			{
				error.id = 4;
				console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}
		  else if(user.email=="")
			{
				//EMPTY:::::::::::::::;
				error.id = 7;
				// console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}
		  else if(!re2.test(user.email))
			{
				error.id = 8;
				// console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}
			else{
				error.id = 13;

				userModel.updateStudentInfo(user,function(result){
					console.log(result);
					if(result){

						res.render('student/profile',{user:result1[0],error});
					}
					else{
						error.id = 0;
						res.render('login',{error});
					}
				});

			}
		}
		else
		{
			res.redirect('/login');
		}
	});


});

router.post('/editpass',function(req,res){

	userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);
			error.id = 0;

			var user={
		    current:req.body.current,
		    new:req.body.new,
				userid:req.session.un
			};

			if(user.current=="")
			{
				//EMPTY:::::::::::::::;
				error.id = 11;
				console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}

			else if(result1[0].password != user.current){
				error.id = 12;
				console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}

			else if(user.new=="")
			{
				//EMPTY:::::::::::::::;
				error.id = 9;
				console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}
		  else if(user.new.length<4)
			{
				error.id = 10;
				console.log(error);
				res.render('student/profile',{user:result1[0],error});
			}

			else{
				error.id = 14;

				userModel.updateStudentPass(user,function(result){
					console.log(result);
					if(result){

						res.render('student/profile',{user:result1[0],error});
					}
					else{
						error.id = 0;
						res.render('login',{error});
					}
				});

			}
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

router.get('/share/:data',function(req,res){

	console.log(req.params);
	var arr = req.params.data.split(',');
	var data = arr[0];
	var score = arr[1];
	console.log(data);
	console.log(score);

	userModel.getStudent(req.session.un, function(result1){

		if(result1.length > 0)
		{
      console.log(result1[0].user_id);

      userModel.getChapterByChapterId(data, function(result2){
        console.log(result2[0]);

				userModel.searchCourseById(result2[0].course_id, function(result4){
					console.log(result4);

					var str = "I have scored "+score+" on "+result2[0].name+" of "+result4[0].name;

					console.log(str);

					userModel.addPost(result1[0].user_id,result1[0].name, str, function(result){
	    			console.log(result);
	          if(result){

	    				res.redirect('/student');
	          }
	          else{
	            error.id = 0;
	    				res.render('login',{error});
	          }
	        });


					// res.render('student/quiz',{user:result1[0],course:result4[0],quiz:result3,selectedchapter:result2[0],chapter:result5});

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
