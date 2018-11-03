var express=require('express');
var router=express.Router();
var userModel=require.main.require('./models/user-model');

var error={
	id: 0,
  status:2
};

router.get('/',function(req,res){

	res.render('login',{error});

});

router.post('/',function(req,res){
	var user={
    name:req.body.name,
		userid:req.body.userid,
    email:req.body.email,
		password:req.body.password
	};
  var re = /^[A-Z a-z]+$/;
  var re2 = /\S+@\S+\.\S+/;

	if(user.name=="")
	{
		//EMPTY:::::::::::::::;
		error.id = 3;
		// console.log(error);
		res.render('login',{error});
	}
  else if(!re.test(user.name))
	{
		error.id = 4;
		// console.log(error);
		res.render('login',{error});
	}
  else if(user.userid=="")
	{
		//EMPTY:::::::::::::::;
		error.id = 5;
		// console.log(error);
		res.render('login',{error});
	}

  else if(user.email=="")
	{
		//EMPTY:::::::::::::::;
		error.id = 7;
		// console.log(error);
		res.render('login',{error});
	}
  else if(!re2.test(user.email))
	{
		error.id = 8;
		// console.log(error);
		res.render('login',{error});
	}
  else if(user.password=="")
	{
		//EMPTY:::::::::::::::;
		error.id = 9;
		// console.log(error);
		res.render('login',{error});
	}
  else if(user.password.length<4)
	{
		error.id = 10;
		// console.log(error);
		res.render('login',{error});
	}
	else{
		error.id = 0;

    userModel.checkUser(user,function(result){
			console.log(result);

      if(result.length>0){
        error.id = 6;
				res.render('login',{error});
      }
      else{
        userModel.insertUser(user,function(result){
    			console.log(result);
          if(result){
            req.session.un=user.userid;
    				res.redirect('/student');
          }
          else{
            error.id = 0;
    				res.render('login',{error});
          }
        });
      }

		});

	}

});



module.exports=router;
