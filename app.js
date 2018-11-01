//Declaration
var express=require('express');
var app=express();
var loginController=require('./controllers/login-controller');
var adminController=require('./controllers/admin-controller');
var studentController=require('./controllers/student-controller');
var logoutController=require('./controllers/logout-controller');
var bodyParser=require('body-parser');
var expressSession=require('express-session');
var path = require("path");
var phpExpress = require('php-express')({
  binPath: 'php'
});
var port=1337;

//Configuration
app.set('view engine','ejs');
app.engine('php', phpExpress.engine);
// app.set('view engine', 'php');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret:"secret",saveUninitialized:true,resave:false}));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.all(/.+\.php$/, phpExpress.router);
app.use('/',loginController);
app.use('/login',loginController);
app.use('/admin',adminController);
app.use('/student',studentController);
app.use('/logout',logoutController);

//Server Start-up
app.listen(port,function(){
	console.log("Server Started...");
});
