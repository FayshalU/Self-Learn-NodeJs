$(document).ready(function(){
  console.log("ready");



});

function checkName(){

    var re = /^[A-Z a-z]+$/;

    var data = $("#coursename").val();
    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h1").text("Name can't be empty");
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

function checkChapter(){

    var re = /^[0-9]+$/;

    var data = $("#chapter").val();
    if(!isValid){
      return;
    }
    else if(data == ""){
        $("#h2").text("Chapter can't be empty");
        $("#h2").show();
        isValid = false;
    }
    else if(!re.test(data)){
        $("#h2").text("Invalid input");
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
  checkChapter();

  if(!isValid){
    return false;
  }

  return true;
}
