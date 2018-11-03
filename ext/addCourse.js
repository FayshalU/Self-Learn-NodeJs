$(document).ready(function(){
  console.log("ready");

  for (var i = 1; i <= 20; i++) {
    $("#chapter"+i).hide();
  }

  $("#chapter").on('change', function (){

      var chapter = parseInt($("#chapter").val());
      console.log(chapter);

      for (var i = 1; i <= 20; i++) {
        $("#chapter"+i).hide();
      }

      for (var i = 1; i <= chapter; i++) {
        $("#chapter"+i).show();
      }


    });



});

function checkName(){

    var re = /^[A-Z a-z0-9]+$/;

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

    var data = $("#chapter").val();
    if(!isValid){
      return;
    }
    else if(data == "0"){
        $("#h2").text("Select number of chapters");
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
