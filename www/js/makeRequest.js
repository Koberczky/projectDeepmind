function makeRequest(){
   $.ajax({
		type:"GET",
        url: 'http://www.greenville.edu/application/api/buildingjsonemitter.html',
		dataType:'jsonp',
        success: function(data){
            console.log(data);
            var jsonString = "";
            data.contentlets.forEach(function(building){
				jsonString += building.fullTitle;
				jsonString += building.latlongcsv;
				jsonString += building.description;
            });
            return jsonString;
        },
        error: function(jqXHR, status, exception){
        console.log(status + " " + exception);
        console.log(jqXHR);
        }
    });
}
