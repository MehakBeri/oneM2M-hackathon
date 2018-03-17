var express = require('express');
var router = express.Router();
var request = require('request');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
var noxres=0;
var no2res=0;
var o3res=0;
var hures=0;
var tempres=0;
var ans='';
var lumres=0;
w1=20;
w2=15.5;
w3=9.5;
w4=1.2;
w5=10.9;
var nox = {
    url: 'http://10.24.46.148:8080/server/pollution-sensor-1/NOX/la?altr=con',
    method: 'GET'
};
var lum = {
    url: 'http://10.24.35.185:8080/server/mydevice1/luminosity/la?altr=con',
    method: 'GET'
};
var no2 = {
    url: 'http://10.24.46.148:8080/server/pollution-sensor-1/NO2/la?altr=con',
    method: 'GET'
};
var o3 = {
    url: 'http://10.24.46.148:8080/server/pollution-sensor-1/O3/la?altr=con',
    method: 'GET'
};
var humidity = {
    url: 'http://10.24.46.148:8080/server/humidity-sensor-1/humidity/la?altr=con',
    type: 'application/json',
    method: 'GET'
};
var temperature = {
    url: 'http://10.24.46.148:8080/server/temperature-sensor-1/temperature/la?altr=con',
    method: 'GET'
};


/* GET home page. */
router.get('/', function(req, res, next) {
  request(nox, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log("working....")
        console.log(body);
        noxres=body;
    }
    else
    {
    	console.log("post request for 1 data failed!");
    }});
  request(lum, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("working....")
        console.log(body);
        lumres=body;
    }
    else
    {
        console.log("post request for 2 data failed!");
    }});
    request(no2, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log("working....")
        console.log(body);
        no2res=body;
    }
    else
    {
    	console.log("post request for 3 data failed!");
    }});
    request(o3, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log("working....")
        console.log(body);
        o3res=body;
    }
    else
    {
    	console.log("post request for 4 data failed!");
    }
	});
	request(humidity, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log("working....")
        console.log(body);
        hures=body;
    }
    else
    {
    	console.log("post request for 5 data failed!");
    }});
    request(temperature, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    	console.log("working....")
        console.log(body);
        tempres=body;
    }
    else
    {
    	console.log("post request for 6 data failed!");
    }});

   if( w1*noxres + w2*no2res + w3*o3res + w4*hures + w5*tempres > 8000)
   {
     ans='Polluted'
     colr='/images/r.png'
   }
   else
   {
    ans='Not Polluted'
    colr='/images/g.png'
   }
   console.log(w1*noxres + w2*no2res + w3*o3res + w4*hures + w5*tempres)
   res.render('index', { result: ans, NOX: noxres, NO2:no2res,O3:o3res,hu:hures,tem:tempres, im: colr, l:lumres });
});

module.exports = router;
