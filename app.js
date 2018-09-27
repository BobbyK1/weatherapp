const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query.replace(/\s/g, '') + "&APPID=5e2c16c0df201bf0e29a3c7267bfe0c9&units=imperial";
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            let weather = JSON.parse(body);

            if( `${weather.cod}` == "404") {
                res.render("no-city");
            } else {
                let temp = `${weather.main.temp}`;
                let message = temp + " °F";

                res.render("results", {temp: message,
                                    city: query});
            }
        }
    });
    
});

app.get("*", function(req, res){
    res.send("404 - Page Not Found");
});

app.listen(8080, function(){
    console.log("Server has Started!");
})