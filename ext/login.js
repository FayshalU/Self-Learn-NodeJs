$(document).ready(function(){
  console.log("ready");

  $("#empty").hide();
  $("#h1").hide();
  $("#h2").hide();
  $("#h3").hide();
  $("#h4").hide();

});

function checkLogInfo() {

  if(($("#logid").val() == "") || ($("#logpass").val() == "")){
    $("#empty").show();
    console.log("error");
    return false;
  }
  return true;
}

var isValid = true;

function checkName(){

    var re = /^[A-Za-z]+$/;

    var data = $("#name").val();
    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h1").text("Name can't be empty");
        $("#h1").show();
        isValid = false;
    }
    else if(data.length < 2){
        $("#h1").text("Minimum 2 characters");
        $("#h1").show();
        isValid = false;
    }
    else if(!re.test(data)){
        $("#h1").text("Can not contain numbers or special characters");
        $("#h1").show();
        isValid = false;
    }
    else{
        $("#h1").text("");
        $("#h1").hide();
        isValid = true;
    }
}

function checkUser(){
    var data = $("#userid").val();

    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h2").text("User ID can't be empty");
        $("#h2").show();
        isValid = false;
    }

    else{
        $("#h2").text("");
        $("#h2").hide();
        isValid = true;
    }
}

function checkEmail(){

    var re = /\S+@\S+\.\S+/;

    var data = $("#email").val();

    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h3").text("Email can't be empty");
        $("#h3").show();
        isValid = false;
    }
    else if(!re.test(data)){
        $("#h3").text("Invalid Email");
        $("#h3").show();
        isValid = false;
    }
    else{
        $("#h3").text("");
        $("#h3").hide();
        isValid = true;
    }
}

function checkPassword(){
    var data = $("#password").val();

    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h4").text("Password can't be empty");
        $("#h4").show();
        isValid = false;
    }
    else if(data.length < 4){
        $("#h4").text("Password length must be at least 4");
        $("#h4").show();
        isValid = false;
    }
    else{
        $("#h4").text("");
        $("#h4").hide();
        isValid = true;
    }
}

function checkRegInfo() {

  isValid = true;

  $("h4").hide();

  checkName();
  checkUser();
  checkEmail();
  checkPassword();

  if(!isValid){
    return false;
  }

  return true;
}
