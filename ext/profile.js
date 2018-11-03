$(document).ready(function(){

  console.log("Ready");

  $("#h1").hide();
  $("#h2").hide();
  $("#h3").hide();
  $("#h4").hide();

});

var isValid = true;

function checkName(){

    var re = /^[A-Z a-z]+$/;

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

function checkEmail(){

    var re = /\S+@\S+\.\S+/;

    var data = $("#email").val();

    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h2").text("Email can't be empty");
        $("#h2").show();
        isValid = false;
    }
    else if(!re.test(data)){
        $("#h2").text("Invalid Email");
        $("#h2").show();
        isValid = false;
    }
    else{
        $("#h2").text("");
        $("#h2").hide();
        isValid = true;
    }
}

function checkInfo() {

  isValid = true;

  $("h4").hide();

  checkName();
  checkEmail();

  if(!isValid){
    return false;
  }

  return true;
}

function checkCurrent(){
    var data = $("#current").val();

    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h3").text("Password can't be empty");
        $("#h3").show();
        isValid = false;
    }
    else{
        $("#h3").text("");
        $("#h3").hide();
        isValid = true;
    }
}

function checkNew(){
    var data = $("#new").val();

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

function checkPass() {

  isValid = true;

  $("h4").hide();

  checkCurrent();
  checkNew();

  if(!isValid){
    return false;
  }

  return true;
}
