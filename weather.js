const { query } = require("express");
const express = require("express");
const https = require("https");
const { dirname } = require("path");


const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));


app.get("/", function(request, response) {

    response.sendFile(__dirname + "/index.html")


});

app.post("/", function(req, response) {


    var citname = req.body.city;
    const query1 = citname;
    const appid = "f4f9aad121097e30911cdb1e835fe714";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query1 + "&appid=" + appid + "&units=" + units; //api link
    https.get(url, function(res) {
        //console.log(res.statusCode); // to see the status code and see if there is any errors 
        res.on("data", function(data) { //to see the data we receive from the api server 
            const weatherdata = JSON.parse(data) // to convert the hexacode to javascript object 
            const temp = weatherdata.main.temp; // we check the java object and check the path and write the full path to a specific parameter 
            //you can use the JSON viewr and hover the object you want and then you click copy path and it is going to give you the full path to that object
            const desc = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgURl = "Http://openweathermap.org/img/wn/" + icon + "@2x.png";

            //console.log(desc);
            response.write("<p> The weather is cureently " + desc + "</p>");
            response.write("<h1>The temprature in " + citname + " is " + temp + " degree Celcius.</h1>");
            response.write("<img src=" + imgURl + ">");
            response.send(); // this resnponse is for the get not for the http and you can see that we used the response object from the get not the res from the http \
            //we only can have one send() and if we have more than one thing we want to send so we wrap each line in write() 
        })

    })

});
app.listen(3000);



// const query1 = "Paris";
//     const appid = "f4f9aad121097e30911cdb1e835fe714";
//     const units = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query1 + "&appid=" + appid + "&units=" + units; //api link
//     https.get(url, function(res) {
//         //console.log(res.statusCode); // to see the status code and see if there is any errors 
//         res.on("data", function(data) { //to see the data we receive from the api server 
//             const weatherdata = JSON.parse(data) // to convert the hexacode to javascript object 
//             const temp = weatherdata.main.temp; // we check the java object and check the path and write the full path to a specific parameter 
//             //you can use the JSON viewr and hover the object you want and then you click copy path and it is going to give you the full path to that object
//             const desc = weatherdata.weather[0].description;
//             const icon = weatherdata.weather[0].icon;
//             const imgURl = "Http://openweathermap.org/img/wn/" + icon + "@2x.png";

//             //console.log(desc);
//             response.write("<p> The weather is cureently " + desc + "</p>");
//             response.write("<h1>The temprature in London is" + temp + " degree Celcius.</h1>");
//             response.write("<img src=" + imgURl + ">");
//             response.send(); // this resnponse is for the get not for the http and you can see that we used the response object from the get not the res from the http \
//             //we only can have one send() and if we have more than one thing we want to send so we wrap each line in write() 
//         })

//     })