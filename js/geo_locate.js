'use strict';

var x = document.getElementById("geocoords");

function getLocation() {
  console.log("f:getLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);

        // uwQuery(latlon);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    // START : temp
    $.ajax({
      // http://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/q/37.776289,-122.395234.json
      // Fixed lookup for Boulder: https://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/CO/Boulder.json
        url: "https://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/"+latlon+".json",
        dataType: "jsonp",
        success: function(parsed_json) {
            // console.log(parsed_json);
            // var location = parsed_json['location']['city'];
            var location = parsed_json['current_observation']['display_location']['full'];
            var temp_c = parsed_json['current_observation']['temp_c'];
            var alt_ft = parsed_json['current_observation']['observation_location']['elevation'];
            var icon_url = parsed_json['current_observation']['icon_url'];
            var p_in = parsed_json['current_observation']['pressure_in'];
            console.log("query pressure_in", p_in);
            // var gotQuery = "Current temp in " + location + " " + "CO" + " is: " + temp_f+"F";
            var alt_strip_ft = alt_ft.replace(/[a-z]/g, ''); // strip out ft non-numeric vals
            // console.log("alt_strip_ft = ", alt_strip_ft);
            var alt_c = Math.floor((alt_strip_ft) / 3.2808);
            var obloc = parsed_json['current_observation']['display_location']['state_name'];
            // console.log("query state_name", obloc);
            $('#queryReturnLocation').html("Location : " + location);
            $('#queryReturnElevation').html("Elevation : " + alt_c + " m");
            $('#queryReturnTemp').html("Temperature : " + temp_c + " C");
            $('#queryReturnHumidity').html("Pressure : " + p_in + " mb");
            document.getElementById("forecastIcon").innerHTML = "<img src='"+icon_url+"'>"; //  make img-responsive

            //Underground Weather Maps
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var satMap = "https://api.wunderground.com/api/425f5dcedcd8dbce/satellite/image.gif?lat=+lat+&lon=+lon+&radius=100&width=400&height=300&key=sat_ir4_bottom&basemap=1";

            var radarMap =
            "http://api.wunderground.com/api/425f5dcedcd8dbce/radar/image.gif?centerlat=+lat+&centerlon=+lon+&radius=20&width=400&height=300&newmaps=1"

            // var radsatMap =
            // "http://api.wunderground.com/api/425f5dcedcd8dbce/radar/satellite/image.gif?rad.maxlat=47.709&rad.maxlon=-69.263&rad.minlat=31.596&rad.minlon=-97.388&rad.width=640&rad.height=480&rad.rainsnow=1&rad.reproj.automerc=1&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=31.596&sat.minlon=-97.388&sat.width=640&sat.height=480&sat.key=sat_ir4_bottom&sat.gtt=107&sat.proj=me&sat.timelabel=0"

            // Satellite Map
            var satMapClass = document.getElementById("satShow");
            //satMapClass.className = "img-responsive"; <a href="#" id="pop">
            document.getElementById("satShow").innerHTML = "<img src='"+satMap+"'>";


            var radarMapClass = document.getElementById("radarShow");
            //satMapClass.className = "img-responsive"; <a href="#" id="pop">
            document.getElementById("radarShow").innerHTML = "<img src='"+radarMap+"'>";


            // var map;
            // initMap(map, lat, lon);
            var zoomLev = 16;
            initMap(lat,lon,zoomLev);
            $("#ajax_loader").hide();
            $("#displayArea").show();
        }
    });
    // END : temp AIzaSyANnyMltzBRGiRZs1FoOTf-asFZBDkmprc

}

// var map;
      function initMap(lat, lon, zoomLev) {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: lon},
          zoom: zoomLev
        });

        var markerImage = 'marker2.png';

        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lon},
            map: map,
            icon: markerImage,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

        map.set('styles', styles);
      }


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


// START : Map Header
function initHeaderMap() {
    // var location = new google.maps.LatLng(50.0875726, 14.4189987);
    var location = new google.maps.LatLng(37.09024, -95.712891);
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: location,
        zoom: 4,
        panControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    // var markerImage = 'marker.png';
    //
    // var marker = new google.maps.Marker({
    //     position: location,
    //     map: map,
    //     icon: markerImage
    // });

    // var contentString = '<div class="info-window">' +
    //         '<h3>Info Window Content</h3>' +
    //         '<div class="info-content">' +
    //         '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
    //         '</div>' +
    //         '</div>';
    //
    // var infowindow = new google.maps.InfoWindow({
    //     content: contentString,
    //     maxWidth: 400
    // });

    // marker.addListener('click', function () {
    //    infowindow.open(map,marker);
    // });

    var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

    map.set('styles', styles);


}

/*
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}
*/
