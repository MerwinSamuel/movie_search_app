var express = require('express');
var app=express();

var request = require('request');




app.get("/",function(req,res){
	res.render("search.ejs");
})

app.get("/results",function(req,res){
	var query= req.query.search;
	var url="http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
	request(url, function (error, response, body) {
	if(!error && response.statusCode==200){
		var parsedData = JSON.parse(body);
		if(parsedData["Response"]==="False")
			res.send("Movie Not Found!")
		else
			{
				var results= parsedData["Search"];
		        res.render("results.ejs",{results:results});
				
			}
		
	}
});
	
})



app.listen(3000,function(){
	console.log("Movie Server Sarted!!");
})