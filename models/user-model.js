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

	updateStudentInfo:function(user,callback)
	{
		var sql="Update user set name=?,email=? where user_id=?";
		db.execute(sql,[user.name,user.email,user.userid],function(result){
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

	updateStudentPass:function(user,callback)
	{
		var sql="Update user set password=? where user_id=?";
		db.execute(sql,[user.new,user.userid],function(result){
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

	searchCourseByName:function(data, callback)
	{
		var sql="SELECT * from course WHERE name=?";
		db.getResult(sql,[data],function(result){
				callback(result);

		});
	},

	searchCourseById:function(data, callback)
	{
		var sql="SELECT * from course WHERE course_id=?";
		db.getResult(sql,[data],function(result){
				callback(result);

		});
	},

	getChapterByCourseId:function(data, callback)
	{
		var sql="SELECT * from chapter_info WHERE course_id=?";
		db.getResult(sql,[data],function(result){
				// console.log(result);
				callback(result);

		});
	},

	getChapterByChapterName:function(data, callback)
	{
		var sql="SELECT * from chapter_info WHERE name=?";
		db.getResult(sql,[data],function(result){
				// console.log(result);
				callback(result);

		});
	},

	getChapterByChapterId:function(data, callback)
	{
		var sql="SELECT * from chapter_info WHERE chapter_id=?";
		db.getResult(sql,[data],function(result){
				// console.log(result);
				callback(result);

		});
	},

	getQuizByChapterId:function(data, callback)
	{
		var sql="SELECT * from quiz WHERE chapter_id=?";
		db.getResult(sql,[data],function(result){
				// console.log(result);
				callback(result);

		});
	},

	addPost:function(id,name,str,callback)
	{
		var sql="INSERT INTO post VALUES(null,?,?,?)";
		db.execute(sql,[id,name,str],function(result){
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

	getPost:function(callback)
	{
		var sql="SELECT * from post";
		db.getResult(sql,[],function(result){
				// console.log(result);
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

	getCourseByName:function(name,callback)
	{
		var sql="SELECT * from course WHERE name=?";
		db.getResult(sql,[name],function(result){
				if(result.length>0)
				{
					callback(result[0]);
				}
				else
				{
					callback([]);
				}

		});
	},


	updateCourse:function(course,callback)
	{
		var sql="UPDATE course SET name=?,chapter=? where course_id=?";
		db.execute(sql,[course.name,course.chapter,course.course_id],function(result){
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

	deleteCourse:function(name,callback)
	{
		var sql="DELETE from course where course_id=?";
		db.execute(sql,[name],function(result){
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

};
