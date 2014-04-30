function makeRequest(callbackfunction){
var retdata;
   $.ajax({
    type:"GET",
        url: 'http://www.greenville.edu/application/api/buildingjsonemitter.html',
   dataType:'jsonp',
        success: function(data){
            retdata = data;
            var jsonString = "";
            data.contentlets.forEach(function(building){
            jsonString += "<strong>" + building.title + "</strong>";
            jsonString += building.description;
            });
        callbackfunction(data);
        },
        error: function(jqXHR, status, exception){
        console.log(status + " " + exception);
        console.log(jqXHR);
        }
    });
}
