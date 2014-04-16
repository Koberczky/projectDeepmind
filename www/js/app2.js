$(document).foundation();
function buildingBack(){
	if (document.getElementById('infowindow').style.visibility==="visible"){
		document.getElementById('infowindow').style.visibility="hidden";
		document.getElementById('buildings').style.visibility="visible";
	}
	else{
		window.history.back();
	}
}
