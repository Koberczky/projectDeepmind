function getNavigation (originLat, originLon, destLat, destLon){
var origin = [originLat,originLon];
var destination = [destLat,destLon];

drawRoute({
origin: origin,
destination: destination,
travelMode: walking
});

}