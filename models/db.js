var mysql=require('mysql');
var connection;

function connectDb()
{
		connection=mysql.createConnection({
		host:"127.0.0.1",
		user:"root",
		password:"",
		database:"selfLearn"
	});

	connection.connect(function(err){
		if(err)
		{
			console.log(err.stack);

		}
		else
		{
			console.log("Successfully connected...");
		}
	});

}
module.exports={
	getResult:function(sql,params,callback)
	{
		connectDb();
		if(params==null)
		{
			connection.query(sql,function(error,result){

				if(error)
				{
					console.log(error.stack);
					callback([]);

				}
				else
				{
					callback(result);
				}

			});
		}

		else
		{
			connection.query(sql,params,function(error,result){

				if(error)
				{
					console.log(error.stack);
					callback([]);

				}
				else
				{
					callback(result);
				}

			});
		}

		connection.end(function(){
			console.log("Connection Closed...");
		});
	},



	execute:function(sql,params,callback)
	{
		connectDb();
		if(params==null)
		{
			connection.query(sql,function(error,flag){

				if(error)
				{
					console.log(error.stack);
					callback(flag);

				}
				else
				{
					callback(flag);
				}

			});
		}

		else
		{
			connection.query(sql,params,function(error,flag){

				if(error)
				{
					console.log(error.stack);
					callback(flag);

				}
				else
				{
					callback(flag);
				}

			});
		}

		connection.end(function(){
			console.log("Connection Closed...");
		});
	}
};
