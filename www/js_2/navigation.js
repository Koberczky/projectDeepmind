var imgArray = new Array();
var i = 1;

function getImages() {
    while (i < 48) {
        imgArray[i] = "img/navImages/img" + i + ".jpg";
        ++i;
    }
    return imgArray;
}

function guidedNav(data) {


    if (navigator.geolocation) {
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 30000
        });
        //navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy:true });
    } else {}

}
var outOfBounds = 0;
var j = 0;
var eventListener = 0;
var imgArray = getImages();
var imageNum;

function onSuccess(position) {
    var currentPos = [position.coords.latitude, position.coords.longitude];
    findImage(currentPos);
    if (imageNum != null) {
        var imageLink = "<img src='" + imgArray[imageNum] + "'>";
        document.getElementById('navImage').innerHTML = imageLink;
    }
}

function findImage(currentPos) {
    var coordCompare = .002;
    for (k = 0; k < 48; k++) {
        var coordCalc = Math.abs(currentPos[1] - positionArray[k][1]) + Math.abs(currentPos[0] - positionArray[k][0]);
        if (coordCalc < coordCompare) {
            coordCompare = coordCalc;
            imageNum = k;
        }
    }

}


/*


if (j < 47) {
    var coordCalc = Math.abs(currentPos[1] - positionArray[j][1]) + Math.abs(currentPos[0] - positionArray[j][0]);

    if (currentPos[0] > positionArray[j][0] - .00006 && currentPos[0] < positionArray[j][0] + .00006 && currentPos[1] > positionArray[j][1] - .00005 && currentPos[1] < positionArray[j][1] + .00005) {
        outOfBounds = 0;
        var imageLink = "<img src='" + imgArray[j] + "'>";
        document.getElementById('navImage').innerHTML = imageLink;
        ++j;
    } else {

        ++j;
        window.setTimeout(onSuccess(position), 1000);
        return;
    }
} else {
    resetCounter();
    return;
}*/

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function resetCounter() {
    j = 0;
}

function alertCoords(position) {}



var positionArray = [
    [38.892608, -89.409455],
    [38.892710, -89.409423],
    [38.892717, -89.409208],
    [38.892705, -89.409118],
    [38.892677, -89.408666],
    [38.892719, -89.408422],
    [38.892715, -89.408071],
    [38.892670, -89.407960],
    [38.892938, -89.407998],
    [38.893241, -89.408089],
    [38.893239, -89.408354],
    [38.893341, -89.408364],
    [38.893389, -89.408357],
    [38.893480, -89.408419],
    [38.893616, -89.408431],
    [38.893723, -89.408433],
    [38.893942, -89.408403],
    [38.894082, -89.408431],
    [38.894318, -89.408393],
    [38.894379, -89.408551],
    [38.894383, -89.409177],
    [38.894724, -89.409251],
    [38.894893, -89.409221],
    [38.895070, -89.409223],
    [38.895169, -89.409122],
    [38.895133, -89.409143],
    [38.895201, -89.409212],
    [38.895305, -89.409184],
    [38.895298, -89.409271],
    [38.895234, -89.409350],
    [38.895048, -89.409377],
    [38.895013, -89.409341],
    [38.894834, -89.409361],
    [38.894779, -89.409347],
    [38.894687, -89.409269],
    [38.894194, -89.409255],
    [38.893927, -89.409330],
    [38.893978, -89.409523],
    [38.893777, -89.409319],
    [38.893503, -89.409341],
    [38.893359, -89.409324],
    [38.893281, -89.409408],
    [38.893182, -89.409507],
    [38.893117, -89.409455],
    [38.893071, -89.409417],
    [38.892860, -89.409446],
    [38.892678, -89.409420],
];
