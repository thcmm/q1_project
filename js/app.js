/* jQuery */

jQuery(document).ready(function($) {

  function uwQuery() {
    console.log("got uwQuery");
    // http://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/IA/Cedar_Rapids.json
    $.ajax({
        url: "http://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/CO/Boulder.json",
        dataType: "jsonp",
        success: function(parsed_json) {
            console.log(parsed_json);
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            var alt_f = parsed_json['current_observation']['observation_location']['elevation'];
            console.log(alt_f);
            var alt_str = " Elevation: " + alt_f;
            // alert("Current temperature in " + location + " is: " + temp_f);
            var gotQuery = "Current temp in " + location + " " + "CO" + " is: " + temp_f+"F";
            console.log(gotQuery);
            $('#queryReturn').html(gotQuery + alt_str);
        }
    });
  }



  function getSearchBoxText(e) {
    e.preventDefault(); // Need this to prevent screen refresh ** READ UP ON TOPIC **
    var queryStr = escape($("#search").val());
    // var queryStr = $("#searchField").serialize(); /* with serialize() */
    // var queryStr = {}
    console.log("f:getSearchBoxText : ", queryStr);
    // queryOMDB1(queryStr);
    // queryOMDB2(queryStr);
    uwQuery();
  }

  // Submit Button listener
  $(function() {$("#submitButton").click(getSearchBoxText);});
});
