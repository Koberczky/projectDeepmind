function getNavigation (map, originLat, originLon, destLat, destLon){
var nav = [
 new google.maps.LatLng(originLat, originLon),
 new google.maps.LatLng(destLat, destLon)
]
var origin = new Array();
var destination = new Array();
origin[0] = originLat;
origin[1] = originLon;
destination[0] = destLat;
destination[1] = destLon;
map.drawPolyline({
    path: nav,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
map.drawRoute({
origin: origin,
destination: destination,
travelMode: 'walking',
strokeColor: '#131540',
strokeOpacity: 0.6,
strokeWeight: 6
});

}