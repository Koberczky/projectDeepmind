$(document).foundation();
function goBack() {
    if (document.getElementById('infowindow').style.visibility==="visible"){
        document.getElementById('infowindow').style.visibility="hidden";
    }
    else{
    window.history.back();
    }
}
