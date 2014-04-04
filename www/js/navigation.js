function getNavigation (originLat, originLon, destLat, destLon){
var origin = new Array();
var destination = new Array();
origin[0] = originLat;
origin[1] = originLon;
destination[0] = destLat;
destination[1] = destLon;
alert("getNavigation");
map.drawRoute({
origin: origin,
destination: destination,
travelMode: walking,
strokeColor: '#131540',
strokeOpacity: 0.6,
strokeWeight: 6
});

}