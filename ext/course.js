$(document).ready(function(){
  console.log("ready");

  $("#search").on('input', function (){
        var data = $("#search").val();
        console.log(data);

        $("#ul").empty();
        
        $.ajax({
          url: "/student/searchCourse/"+data,
          // data: {
          //   "data": data
          // },
          success: function( res ) {

            // var result = JSON.parse(res);
            console.log(res.course);

            $("#ul").empty();

            $.each(res.course, function(index,value) {
             $('#ul')
                 .append($("<li></li>")
                            .attr("onclick","addData($(this).text())")
                            .text(value.name));
            });
          }
        });

        $("#srcbtn").attr("aria-expanded","true");

        $("form").addClass("open");

    });

});

function addData(obj){
  console.log(obj);
  $("#search").val(obj);
}
