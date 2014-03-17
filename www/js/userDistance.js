$( document ).on( "pageinit", function( event ) {

function userDistance() {

    // Wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);
    var watchID = null;

    // PhoneGap is ready
    function onDeviceReady() {
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
        // Update every 10 seconds
        var options = { frequency: 10000 };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }

    // onSuccess Geolocation
    function onSuccess(position) {

        // user location
        var loc1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // target location 
        $.getJSON("http://server:8080/getCoords", function(data) {
            var loc2 = new google.maps.LatLng(data[0].latitude, data[0].longitude);

            // distance
            var distance = google.maps.geometry.spherical.computeDistanceBetween (loc1, loc2);

            if (distance < 50) {    
                alert("target arrived");
            }
        });

    }

    // onError Callback receives a PositionError object
    function onError(error) {

    }

    // watching position every 20s
    setTimeout(userDistance, 20000);
}

userDistance();

});
