var imgArray = new Array();
var i = 0;
var outOfBounds = 0;
var j = 0;
var eventListener = 0;
var imgArray = getImages();
var imageNum;
var buildingNum = 0;
var isBuilding = 0;

function getImages() {
    while (i < 46) {
        imgArray[i] = "img/navImages/img" + i + ".jpg";
        ++i;
    }
    return imgArray;
}
var watchID
var buildingInfo = new Array();
var restart = 0;

function guidedNav(data) {
    if (window.sessionStorage.getItem("buildingNumber") != null && restart == 0) {
        sessvars.data = data;
        document.getElementById('navImage').innerHTML = "<p>It looks like you didn't finish your last tour, if you would like to restart from where you left off, <a href= 'javascript:void(0)' onclick = 'RestartTour()'>click here</a>.</p><p>Otherwise, <a href='javascript:void(0)' onclick = 'clearTour()'>click here to start from the beginning</a>";
        return;
    } else {
        data.contentlets.forEach(function(building) {
            if (building.fullTitle == "Whitlock Music Center") {
                buildingInfo[0] = building;
            }
            if (building.fullTitle == "Marston Hall") {
                buildingInfo[1] = building;
            }
            if (building.fullTitle == "LaDue Education Center & Auditorium") {
                buildingInfo[2] = building;
            }
            if (building.fullTitle == "Ruby E. Dare Library") {
                buildingInfo[3] = building;
            }
            if (building.fullTitle == "Glen and Maxine Crum Recreation Center") {
                buildingInfo[4] = building;
            }
            if (building.fullTitle == "Dietzman Center") {
                buildingInfo[5] = building;
            }
            if (building.fullTitle == "Carrie T. Burritt Hall-Burritt Annex") {
                buildingInfo[6] = building;
            }
            if (building.fullTitle == "Armington Center") {
                buildingInfo[7] = building;
            }
            if (building.fullTitle == "Scott Field") {
                buildingInfo[8] = building;
            }
            if (building.fullTitle == "Snyder Hall of Science") {
                buildingInfo[9] = building;
            }
            if (building.fullTitle == "Janssen Hall") {
                buildingInfo[10] = building;
            }
            if (building.fullTitle == "Walter A. Joy Hall") {
                buildingInfo[11] = building;
            }
            if (building.fullTitle == "Mailroom") {
                buildingInfo[12] = building;
            }
            if (building.fullTitle == "Sims Student Union") {
                buildingInfo[13] = building;
            }
        });

        if (navigator.geolocation) {
            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 3000
            });
        } else {}
    }
}

function clearTour(data) {

    sessionStorage.removeItem("buildingNumber");
    guidedNav(sessvars.data);
    return;
}

function RestartTour(data) {
    buildingNum = sessionStorage.getItem("buildingNumber");
    restart = 1;
    guidedNav(sessvars.data);
    return;
}


function onSuccess(position) {
    var currentPos = [position.coords.latitude, position.coords.longitude];
    findImage(currentPos);
}

function findImage(currentPos) {
    var coordCompare = .001;
    for (k = buildPosArray[buildingNum][0]; k <= buildPosArray[buildingNum][1]; k++) {
        var coordCalc = Math.abs(currentPos[1] - positionArray[k][1]) + Math.abs(currentPos[0] - positionArray[k][0]);
        if (coordCalc < coordCompare) {
            coordCompare = coordCalc;
            imageNum = k;
            if (k == buildPosArray[buildingNum][1]) {
                enterBuilding();
                isBuilding = 1;
            }
        }
    }
    if (coordCompare == .001) {
        if (buildingNum < 13) {
            document.getElementById('navImage').innerHTML = "<p>I noticed you've moved pretty far off path, if would you like to skip visiting " + buildingInfo[buildingNum].fullTitle + " then <a href ='javascript:void(0)' onclick = 'advanceBuilding()'>click here</a>.</p><p>If not, please make your way towards the building and the tour will automatically start back up.</p>";
        } else {
            document.getElementById('navImage').innerHTML = "<p>Please visit the Admisssions office to finish the tour</p>";
        }
    }
    if (imageNum != null) {
        var imageLink = "<img src = '" + imgArray[imageNum] + "'> ";
        document.getElementById('navImage').innerHTML = imageLink;
        document.getElementById('buildingInfo').innerHTML = '<p>' + instructions[imageNum] + '</p>';
    }
    if (isBuilding == 1) {
        document.getElementById('buildingInfo').innerHTML = " <p> Do you want to enter " + buildingInfo[buildingNum].fullTitle + "?<br /><a href = 'javascript:void(0)' onclick = 'waitBuilding()'> Yes </a> <a href='javascript:void(0)' onclick='leaveBuilding()'>No</a> </p>";
        isBuilding = 0;
    }

}

function enterBuilding() {
    navigator.geolocation.clearWatch(watchID);
}

function waitBuilding() {
    if (buildingNum == 14) {
        document.getElementById('buildingInfo').innerHTML = "<p>You have finished the tour. Please head to the admissions office for further instructions</p> ";
    }
    nextBuildingNum = parseInt(buildingNum) + 1;
    document.getElementById('navImage').innerHTML = "<div class='overthrow buildingDesc'>" + buildingInfo[buildingNum].description + "</div>";
    document.getElementById('buildingInfo').innerHTML = " <p id = 'enterBuilding'> <a href = 'javascript:void(0)' onclick = 'leaveBuilding()'> Click when you're ready to go to " + buildingInfo[nextBuildingNum].fullTitle + "</a></p>";
}

function leaveBuilding() {
    if (buildingNum == 14) {

    }
    document.getElementById('buildingInfo').innerHTML = "";
    ++buildingNum;
    window.sessionStorage.setItem("buildingNumber", buildingNum);
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 3000
    });
}

function advanceBuilding() {
    ++buildingNum;
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true
    });
}

function onError(error) {
    alert('code: ' + error.code + '\n ' + ' message: ' + error.message + '\n ');
}

function resetCounter() {
    j = 0;
}

function alertCoords(position) {}

function orientationChange(e) {
    var orientation = "portrait";
    if (window.orientation == -90 || window.orientation == 90) orientation = "landscape";
    if (orientation == "portrait") {
        if ($("#navImage").hasClass("portrait")) {

        } else {
            if ($("#navImage").hasClass("landscape")) {
                $("#navImage").removeClass("landscape");
            }
            $("#navImage").addClass("portrait");
        }
        if ($("#buildingInfo").hasClass("portrait")) {

        } else {
            if ($("#buildingInfo").hasClass("landscape")) {
                $("#buildingInfo").removeClass("landscape");
            }
            $("#buildingInfo").addClass("portrait");
        }
    } else {
        if ($("#navImage").hasClass("landscape")) {

        } else {
            if ($("#navImage").hasClass("portrait")) {
                $("#navImage").removeClass("portrait");
            }
            $("#navImage").addClass("landscape");
        }
        if ($("#buildingInfo").hasClass("landscape")) {

        } else {
            if ($("#buildingInfo").hasClass("portrait")) {
                $("#buildingInfo").removeClass("portrait");
            }
            $("#buildingInfo").addClass("landscape");
        }
    }
}

var buildPosArray = [
    [0, 6],
    [7, 9],
    [10, 13],
    [14, 17],
    [18, 19],
    [20, 25],
    [26, 28],
    [29, 30],
    [31, 34],
    [35, 35],
    [36, 37],
    [38, 38],
    [39, 40],
    [41, 41],
    [42, 44]
];

var positionArray = [
    [38.892608, -89.409455],
    [38.892710, -89.409423],
    [38.892717, -89.409208],
    [38.892705, -89.409118],
    [38.892677, -89.408666],
    [38.892719, -89.408422],
    [38.892715, -89.408071],
    [38.892670, -89.407960],
    [38.893130, -89.407999],
    [38.893241, -89.408089],
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
    [38.892678, -89.409420]
];

var instructions = [
    "Begin at Joy House. Take a right on College Ave.",
    "Cross Spruce and continue along College Ave.",
    "Continue along College Ave. towards Whitlock Music Center.",
    "Continue along College Ave. towards Whitlock Music Center.",
    "Continue along College Ave. towards Whitlock Music Center.",
    "Continue along College Ave. towards Whitlock Music Center.",
    "",
    "Cross College Ave. and walk along Elm St.",
    "Take a left along the flower bed and towards Marston Hall.",
    "",
    "Walk through the main floor hallway of Marston Hall.",
    "Take a quick right after Marston Hall.",
    "Walk along Marston Hall towards the steps of Ladue Auditorium.",
    "",
    "Continue up the sidewalk towards the Ruby Dare Library. ",
    "Cross the small parking lot towards the Ruby Dare Library.",
    "Continue up the sidewalk towards the Ruby Dare Library.",
    "",
    "Head up the sidewalk towards HJ Long Gymnasium.",
    "",
    "Continue along the sidewalk towards the center of campus.",
    "Take a right on the mallwalk.",
    "Walk towards Ganton Circle and veer right up the steps.",
    "Cross the parking lot towards the Dietzman Center.",
    "Walk along the sidewalk to the right towards the Dietzman Center.",
    "",
    "Walk across the street and take a left along the sidewalk.",
    "Walk down the side walk and take a right after the campus map sign.",
    "",
    "Continue down the sidewalk towards the Dining Commons.",
    "",
    "Continue down the steps towards Snyder Hall.",
    "Walk down the mallwalk towards Snyder Hall.",
    "Continue down the mallwalk towards Snyder Hall.",
    "",
    "",
    "Walk down the mallwalk towards Janssen Hall.",
    "",
    "",
    "Veer right along the sidewalk towards the Mail room.",
    "",
    "",
    "Continue down the sidewalk along Sim’s student union.",
    "Cross College Ave back to Joy House.",
    "Head towards the front door of Joy House. (Admissions Office)"
];
