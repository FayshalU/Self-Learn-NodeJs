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

};
