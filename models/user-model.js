var db=require('./db');

module.exports={

	logCheck:function(user,callback)
	{
		var sql="SELECT * from login WHERE id=? and password=?";
		db.getResult(sql,[user.userid,user.password],function(result){

			if(result.length>0)
			{
				if(result[0].type=="admin"){
					callback(1);
				}
				else{
					callback(2);
				}
			}
			else
			{
				callback(0);
			}
		});
	},

	checkUser:function(user,callback)
	{
		var sql="SELECT * from login WHERE id=?";
		db.getResult(sql,[user.userid],function(result){

			callback(result);
		});
	},

	insertUser:function(user,callback)
	{
		var sql="INSERT INTO user VALUES(?,?,?,?)";
		db.execute(sql,[user.userid,user.name,user.email,user.password],function(result){
				if(result)
				{
					var sql2="INSERT INTO login VALUES(?,?,?)";
					db.execute(sql2,[user.userid,user.password,"student"],function(result){
							if(result)
							{
								callback(true);
							}
							else
							{
								callback(false);
							}

					});
				}
				else
				{
					callback(false);
				}

		});
	},

	getStudent:function(id,callback)
	{
		var sql="SELECT * from user where user_id=?";
		db.getResult(sql,[id],function(result){
				callback(result);

		});
	},

	getAdmin:function(id,callback)
	{
		var sql="SELECT * from admin where admin_id=?";
		db.getResult(sql,[id],function(result){
				callback(result);

		});
	},

	getCourse:function(callback)
	{
		var sql="SELECT * from course";
		db.getResult(sql,[],function(result){
				callback(result);

		});
	},
	searchCourse:function(data, callback)
	{
		var sql="SELECT * from course WHERE name like '%"+data+"%'";
		db.getResult(sql,[],function(result){
				callback(result);

		});
	},

	searchCourse2:function(data, callback)
	{
		var sql="SELECT * from course WHERE name=?";
		db.getResult(sql,[data],function(result){
				callback(result);

		});
	},

	insertCourses:function(user,callback)
	{
		var sql="INSERT INTO course VALUES(null,?,?)";	
		db.execute(sql,[user.coursename,user.chapter],function(result){
				if(result)
				{
					callback(true);
				}
				else
				{
					callback(false);
				}

		});
	},

	// getByCourseId:function(id,callback)
	// {
	// 	var sql="SELECT * from course WHERE course_id=?";	
	// 	db.getResult(sql,[id],function(result){
	// 			if(result.length>0)
	// 			{
	// 				callback(result[0]);
	// 			}
	// 			else
	// 			{
	// 				callback([]);
	// 			}

	// 	});
	// },

};
