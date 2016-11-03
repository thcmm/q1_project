/* jQuery */
'use strict';

function get_db_query() {
    /* START: jQuery db for 1st row of table */
    $.get("https://www.dive-booking.com/q1/db_test1/read_db.php", function(data) {
        var db_temperature = data.Temperature;
        var db_humidity = data.Humidity;
        var db_elevation = data.Elevation;

        $("#sensorReadingTemperature").html("Temperature: " + db_temperature);
        $("#sensorReadingHumidity").html("Temperature: " + db_humidity);
        $("#sensorReadingElevation").html("Temperature: " + db_elevation);
        console.log("dB query = ", data);
        console.log("data 0 = ", db_temperature);
        /* END: jQuery db for 1st row of table */
    });
}


jQuery(document).ready(function($) {
    console.log("jQuery loaded...");


    /* START: LOADING */
    // $(document).ajaxStop(function() {
    //     console.debug("ajaxStop");
    //     $("#ajax_loader").hide();
    // });
    // $(document).ajaxStart(function() {
    //     console.debug("ajaxStart");
    //     $("#ajax_loader").show();
    // });
    /* STOP: LOADING */


    // **** MOVED TO geo_locate:showPosition Callback ****
    // Submit API query
    function uwQuery(locationCords) {

        console.log("f:uwQuery");
        // http://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/IA/Cedar_Rapids.json
        $.ajax({
            // http://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/q/37.776289,-122.395234.json
            // Fixed Boulder: https://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/CO/Boulder.json
            url: "https://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/" + locationCords + ".json",
            dataType: "jsonp",
            success: function(parsed_json) {
                $("#ajax_loader").hide();
                console.log(parsed_json);
                // var location = parsed_json['location']['city'];
                var location = parsed_json['current_observation']['display_location']['full'];
                var temp_f = parsed_json['current_observation']['temp_f'];
                var alt_ft = parsed_json['current_observation']['observation_location']['elevation'];
                var humidity = parsed_json['current_observation']['relative_humidity'];
                console.log("query relative_humidity", humidity);
                // var gotQuery = "Current temp in " + location + " " + "CO" + " is: " + temp_f+"F";
                var obloc = parsed_json['current_observation']['display_location']['state_name'];
                console.log("query state_name", obloc);
                $('#queryReturnLocation').html("Location : " + location);
                $('#queryReturnElevation').html("Elevation : " + alt_ft);
                $('#queryReturnTemp').html("Temperature : " + temp_f);
                //getLocation();

            }
        });
    }
    // Get the City & State from text boxes
    function getSearchBoxText(e) {
        e.preventDefault(); // Need this to prevent screen refresh ** READ UP ON TOPIC **
        //var queryStr = escape($("#search").val());
        // var queryStr = $("#searchField").serialize(); /* with serialize() */
        // var queryStr = {}
        //console.log("f:getSearchBoxText : ", queryStr);
        // queryOMDB1(queryStr);
        // queryOMDB2(queryStr);
        // uwQuery();
        $("#ajax_loader").show();
        getLocation(); // bypass textbox input of location
       get_db_query();
    }

    // Submit Button listener : Method 1 ******************
    $("#submitButton").on({
        "click": getSearchBoxText
    });
    // ****************************************************
    // Submit Button listener : Method 2 ******************
    // var submitBtn = $("#submitButton");
    // submitBtn.click( getSearchBoxText);
    // ****************************************************
    google.maps.event.addDomListener(window, 'load', initHeaderMap);
    // End : Map Header



});
