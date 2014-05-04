$(document).foundation();
function goBack() {
    if (document.getElementById('infowindow').style.visibility==="visible"){
        document.getElementById('infowindow').style.visibility="hidden";
    }
    else{
    window.history.back();
    }
}
function buildingBack(){
	if (document.getElementById('infowindow').style.visibility==="visible"){
		document.getElementById('infowindow').style.visibility="hidden";
		document.getElementById('buildings').style.visibility="visible";
	}
	else{
		window.history.back();
	}
}
