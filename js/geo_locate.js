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
      // Fixed Boulder: https://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/CO/Boulder.json
        url: "https://api.wunderground.com/api/425f5dcedcd8dbce/geolookup/conditions/q/"+latlon+".json",
        dataType: "jsonp",
        success: function(parsed_json) {
            console.log(parsed_json);
            // var location = parsed_json['location']['city'];
            var location = parsed_json['current_observation']['display_location']['full'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            var alt_ft = parsed_json['current_observation']['observation_location']['elevation'];
            var icon_url = parsed_json['current_observation']['icon_url'];
            var humidity = parsed_json['current_observation']['relative_humidity'];
            console.log("query relative_humidity", humidity);
            // var gotQuery = "Current temp in " + location + " " + "CO" + " is: " + temp_f+"F";
            var obloc = parsed_json['current_observation']['display_location']['state_name'];
            console.log("query state_name", obloc);
            $('#queryReturnLocation').html("Location : " + location);
            $('#queryReturnElevation').html("Elevation : " + alt_ft);
            $('#queryReturnTemp').html("Temperature : " + temp_f);
            $('#queryReturnHumidity').html("Humidity : " + humidity);
            document.getElementById("forecastIcon").innerHTML = "<img src='"+icon_url+"'>"; //  make img-responsive

            //Satellite
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var satMap = "https://api.wunderground.com/api/425f5dcedcd8dbce/satellite/image.gif?lat=+lat+&lon=+lon+&radius=100&width=400&height=300&key=sat_ir4_bottom&basemap=1";

            /*"http://api.wunderground.com/api/425f5dcedcd8dbce/satellite/image.gif?lat=38&lon=-96.4&radius=100&width=280&height=280&key=sat_ir4_bottom&basemap=1";
            */
            var satMapClass = document.getElementById("satShow");
            satMapClass.className = "img-responsive";
            document.getElementById("satShow").innerHTML = "<img src='"+satMap+"'>";
            // var map;
            // initMap(map, lat, lon);
            var zoomLev = 16;
            initMap(lat,lon,zoomLev);
            $("#ajax_loader").hide();
        }
    });
    // END : temp AIzaSyANnyMltzBRGiRZs1FoOTf-asFZBDkmprc
    //
    // var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
    // document.getElementById("mapShow").innerHTML = "<img src='"+img_url+"'>";
    // console.log("f:showLocation : latlon : ", latlon);


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
