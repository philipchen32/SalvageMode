
var fs = require('fs');

var http = require("https");

var options = {
  "method": "GET",
  "hostname": "ic-metadata-service.run.aws-usw02-pr.ice.predix.io",
  "port": null,
  "path": "/v2/metadata/assets/search?bbox=32.715675%3A-117.161230%2C32.708498%3A-117.151681&page=0&size=200&q=assetType%3ACAMERA",
  "headers": {
    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJlYWYxYTYwNDUxZTc0YzkyODMwZDUzMjNiMDdkNTJmMyIsInN1YiI6ImhhY2thdGhvbiIsInNjb3BlIjpbInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuU0RTSU0tSUUtUFVCTElDLVNBRkVUWS5JRS1QVUJMSUMtU0FGRVRZLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEFSS0lORy5JRS1QQVJLSU5HLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEVERVNUUklBTi5JRS1QRURFU1RSSUFOLkxJTUlURUQuREVWRUxPUCJdLCJjbGllbnRfaWQiOiJoYWNrYXRob24iLCJjaWQiOiJoYWNrYXRob24iLCJhenAiOiJoYWNrYXRob24iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjlmMWYyYzRkIiwiaWF0IjoxNTA5MjIwODQ4LCJleHAiOjE1MDk4MjU2NDgsImlzcyI6Imh0dHBzOi8vODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3IiwiYXVkIjpbImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5TRFNJTS1JRS1QVUJMSUMtU0FGRVRZLklFLVBVQkxJQy1TQUZFVFkuTElNSVRFRCIsInVhYSIsImhhY2thdGhvbiIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVEIl19.OvdB8AZ5CSh3hbTAWlZmLgjRkynKbE3dov-XCzzxugyJtIpHWk464AQiF_pv597L3ID8N9-WXln1yN4kQPTWSBcPsQleTq-kC3IJdSDk7eJIIrevYcbc9y2l2Q4JiFT5U_4YOgRHJ4Jl2IT8QG2BHbaX3BM7beFcmDF_yV-afqTEYZ56k9APQoKlDzkYJI7pSelzFZtIiu1dexSeZEikfcSgwJQt8VPOs8mdpolu8zzW06bYKXm6a_o7uevLIKyictdfDFmXU1Lg_AdH2ay9QsLNVHML5yeF2Vi1bOXXySBkRrxdqgJ0y73u9M3W7WeIR76tX-IKnY4isU9Hu0rh-w",
    "predix-zone-id": "SDSIM-IE-TRAFFIC",
    "cache-control": "no-cache",
    "postman-token": "5fd17ee8-9b45-5b9c-261b-f186a592b206"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var x = body.toString();
    getCameras(x);
  });
});
req.end();


var allCameras = [];
function getCameras(x){
    var temp = JSON.parse(x);
    for(var i = 0; i < temp.content.length; i++){
    	var content = temp.content[i];
    	allCameras.push(content.coordinates); 
    }
    for(var i = 0; i != allCameras.length; i++){
    	console.log(allCameras[i]);
    }
    getImageStatus();
}


var allImageStatus = [];
function getImageStatus(){
	for(var i = 0; i != allCameras.length; i++){
	var fs = require('fs');

	var http = require("https");

	var options = {
	  "method": "GET",
	  "hostname": "ic-metadata-service.run.aws-usw02-pr.ice.predix.io",
	  "port": null,
	  "path": "/v2/mediastore/ondemand/assets/" + allCameras[i].trim() + "/media?mediaType=IMAGE&timestamp=1509229537000",
	  "headers": {
	    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJlYWYxYTYwNDUxZTc0YzkyODMwZDUzMjNiMDdkNTJmMyIsInN1YiI6ImhhY2thdGhvbiIsInNjb3BlIjpbInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuU0RTSU0tSUUtUFVCTElDLVNBRkVUWS5JRS1QVUJMSUMtU0FGRVRZLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEFSS0lORy5JRS1QQVJLSU5HLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEVERVNUUklBTi5JRS1QRURFU1RSSUFOLkxJTUlURUQuREVWRUxPUCJdLCJjbGllbnRfaWQiOiJoYWNrYXRob24iLCJjaWQiOiJoYWNrYXRob24iLCJhenAiOiJoYWNrYXRob24iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjlmMWYyYzRkIiwiaWF0IjoxNTA5MjIwODQ4LCJleHAiOjE1MDk4MjU2NDgsImlzcyI6Imh0dHBzOi8vODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3IiwiYXVkIjpbImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5TRFNJTS1JRS1QVUJMSUMtU0FGRVRZLklFLVBVQkxJQy1TQUZFVFkuTElNSVRFRCIsInVhYSIsImhhY2thdGhvbiIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVEIl19.OvdB8AZ5CSh3hbTAWlZmLgjRkynKbE3dov-XCzzxugyJtIpHWk464AQiF_pv597L3ID8N9-WXln1yN4kQPTWSBcPsQleTq-kC3IJdSDk7eJIIrevYcbc9y2l2Q4JiFT5U_4YOgRHJ4Jl2IT8QG2BHbaX3BM7beFcmDF_yV-afqTEYZ56k9APQoKlDzkYJI7pSelzFZtIiu1dexSeZEikfcSgwJQt8VPOs8mdpolu8zzW06bYKXm6a_o7uevLIKyictdfDFmXU1Lg_AdH2ay9QsLNVHML5yeF2Vi1bOXXySBkRrxdqgJ0y73u9M3W7WeIR76tX-IKnY4isU9Hu0rh-w",
	    "predix-zone-id": "SDSIM-IE-PUBLIC-SAFETY",
	    "cache-control": "no-cache",
	    "postman-token": "3afbb943-7a78-5dd5-ad11-6da9fdab328d"
	  }
	};
	var req = http.request(options, function (res) {
  	var chunks = [];

 	 res.on("data", function (chunk) {
  	  chunks.push(chunk);
 	 });

  	res.on("end", function () {
 	   var body = Buffer.concat(chunks);
  	   var x = body.toString();
		var temp = JSON.parse(x);
		allImageStatus.push(temp.pollUrl);
 	 });
	});
	}
for(var i = 0; i != allImageStatus.length;  i++){
	console.log(allImageStatus[i] + " ");
}
getFinalUrl();
}

*/

/*
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var finalUrls = [];
function getFinalUrl(){
	for(var i = 0; i!= allImageStatus.length; i++){
		var http = require("https");
		var options = {
		  "method": "GET",
		  "hostname": `x`,
		  "port": null,
		  "path": allImageStatus[i],
		  "headers": {
		    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJlYWYxYTYwNDUxZTc0YzkyODMwZDUzMjNiMDdkNTJmMyIsInN1YiI6ImhhY2thdGhvbiIsInNjb3BlIjpbInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuU0RTSU0tSUUtUFVCTElDLVNBRkVUWS5JRS1QVUJMSUMtU0FGRVRZLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEFSS0lORy5JRS1QQVJLSU5HLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEVERVNUUklBTi5JRS1QRURFU1RSSUFOLkxJTUlURUQuREVWRUxPUCJdLCJjbGllbnRfaWQiOiJoYWNrYXRob24iLCJjaWQiOiJoYWNrYXRob24iLCJhenAiOiJoYWNrYXRob24iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjlmMWYyYzRkIiwiaWF0IjoxNTA5MjIwODQ4LCJleHAiOjE1MDk4MjU2NDgsImlzcyI6Imh0dHBzOi8vODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3IiwiYXVkIjpbImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5TRFNJTS1JRS1QVUJMSUMtU0FGRVRZLklFLVBVQkxJQy1TQUZFVFkuTElNSVRFRCIsInVhYSIsImhhY2thdGhvbiIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVEIl19.OvdB8AZ5CSh3hbTAWlZmLgjRkynKbE3dov-XCzzxugyJtIpHWk464AQiF_pv597L3ID8N9-WXln1yN4kQPTWSBcPsQleTq-kC3IJdSDk7eJIIrevYcbc9y2l2Q4JiFT5U_4YOgRHJ4Jl2IT8QG2BHbaX3BM7beFcmDF_yV-afqTEYZ56k9APQoKlDzkYJI7pSelzFZtIiu1dexSeZEikfcSgwJQt8VPOs8mdpolu8zzW06bYKXm6a_o7uevLIKyictdfDFmXU1Lg_AdH2ay9QsLNVHML5yeF2Vi1bOXXySBkRrxdqgJ0y73u9M3W7WeIR76tX-IKnY4isU9Hu0rh-w",
		    "predix-zone-id": "SDSIM-IE-PUBLIC-SAFETY",
		    "cache-control": "no-cache",
		    "postman-token": "0b04284f-5944-7404-5ecf-a84227700893"
	 		}
		};

		var req = http.request(options, function (res) {
		var chunks = [];

		res.on("data", function (chunk) {
		   chunks.push(chunk);
		});

		res.on("end", function () {
		    var body = Buffer.concat(chunks);
			var x = body.toString();
		    var temp = JSON.parse(x);
		    if(temp.status == "SUCCESS"){
		    	inProgressCount = 0;
		    	finalUrls.push(temp.listOfEntries.content[0].url);
		    }
		    else if(temp.status == "INPROGRESS"){
		    	inProgressCall(i);
		   	}
		});
		});
	}
	uploadAllImages();
}

function inProgressCall(i){
	var timeCount = 15;
	for(;;){
	sleep(1000).then(() => {
		var http = require("https");
		var options = {
		  "method": "GET",
		  "hostname": `x`,
		  "port": null,
		  "path": allImageStatus[i],
		  "headers": {
		    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJlYWYxYTYwNDUxZTc0YzkyODMwZDUzMjNiMDdkNTJmMyIsInN1YiI6ImhhY2thdGhvbiIsInNjb3BlIjpbInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuU0RTSU0tSUUtUFVCTElDLVNBRkVUWS5JRS1QVUJMSUMtU0FGRVRZLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEFSS0lORy5JRS1QQVJLSU5HLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEVERVNUUklBTi5JRS1QRURFU1RSSUFOLkxJTUlURUQuREVWRUxPUCJdLCJjbGllbnRfaWQiOiJoYWNrYXRob24iLCJjaWQiOiJoYWNrYXRob24iLCJhenAiOiJoYWNrYXRob24iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjlmMWYyYzRkIiwiaWF0IjoxNTA5MjIwODQ4LCJleHAiOjE1MDk4MjU2NDgsImlzcyI6Imh0dHBzOi8vODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3IiwiYXVkIjpbImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5TRFNJTS1JRS1QVUJMSUMtU0FGRVRZLklFLVBVQkxJQy1TQUZFVFkuTElNSVRFRCIsInVhYSIsImhhY2thdGhvbiIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVEIl19.OvdB8AZ5CSh3hbTAWlZmLgjRkynKbE3dov-XCzzxugyJtIpHWk464AQiF_pv597L3ID8N9-WXln1yN4kQPTWSBcPsQleTq-kC3IJdSDk7eJIIrevYcbc9y2l2Q4JiFT5U_4YOgRHJ4Jl2IT8QG2BHbaX3BM7beFcmDF_yV-afqTEYZ56k9APQoKlDzkYJI7pSelzFZtIiu1dexSeZEikfcSgwJQt8VPOs8mdpolu8zzW06bYKXm6a_o7uevLIKyictdfDFmXU1Lg_AdH2ay9QsLNVHML5yeF2Vi1bOXXySBkRrxdqgJ0y73u9M3W7WeIR76tX-IKnY4isU9Hu0rh-w",
		    "predix-zone-id": "SDSIM-IE-PUBLIC-SAFETY",
		    "cache-control": "no-cache",
		    "postman-token": "0b04284f-5944-7404-5ecf-a84227700893"
	 		}
		};

		var req = http.request(options, function (res) {
		var chunks = [];

		res.on("data", function (chunk) {
		   chunks.push(chunk);
		});

		res.on("end", function () {
		    var body = Buffer.concat(chunks);
			var x = body.toString();
		    var temp = JSON.parse(x);
		  	 if(temp.status == "SUCCESS"){
		    	console.log("Hi!");
		    	console.log(temp.listOfEntries.content[0].url);
		    	finalUrls.push(temp.listOfEntries.content[0].url);
		    	return;
		    }

		    else if(temp.status == "INPROGRESS"){
		    	if(timeCount == 0)
		    		return;
		    	timeCount--;
		    }
		    
		});
		});
	})
	}
}


function uploadAllImages(){
	for(var i = 0; i != finalUrls.length; i++){
		var http = require("https");
		var options = {
		  "method": "GET",
		  "hostname": `x`,
		  "port": null,
		  "path": finalUrls[i],
		  "headers": {
		    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJlYWYxYTYwNDUxZTc0YzkyODMwZDUzMjNiMDdkNTJmMyIsInN1YiI6ImhhY2thdGhvbiIsInNjb3BlIjpbInVhYS5yZXNvdXJjZSIsImllLWN1cnJlbnQuU0RTSU0tSUUtUFVCTElDLVNBRkVUWS5JRS1QVUJMSUMtU0FGRVRZLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEFSS0lORy5JRS1QQVJLSU5HLkxJTUlURUQuREVWRUxPUCIsImllLWN1cnJlbnQuU0RTSU0tSUUtUEVERVNUUklBTi5JRS1QRURFU1RSSUFOLkxJTUlURUQuREVWRUxPUCJdLCJjbGllbnRfaWQiOiJoYWNrYXRob24iLCJjaWQiOiJoYWNrYXRob24iLCJhenAiOiJoYWNrYXRob24iLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6IjlmMWYyYzRkIiwiaWF0IjoxNTA5MjIwODQ4LCJleHAiOjE1MDk4MjU2NDgsImlzcyI6Imh0dHBzOi8vODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3LnByZWRpeC11YWEucnVuLmF3cy11c3cwMi1wci5pY2UucHJlZGl4LmlvL29hdXRoL3Rva2VuIiwiemlkIjoiODkwNDA3ZDctZTYxNy00ZDcwLTk4NWYtMDE3OTJkNjkzMzg3IiwiYXVkIjpbImllLWN1cnJlbnQuU0RTSU0tSUUtVFJBRkZJQy5JRS1UUkFGRklDLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBBUktJTkcuSUUtUEFSS0lORy5MSU1JVEVEIiwiaWUtY3VycmVudC5TRFNJTS1JRS1QVUJMSUMtU0FGRVRZLklFLVBVQkxJQy1TQUZFVFkuTElNSVRFRCIsInVhYSIsImhhY2thdGhvbiIsImllLWN1cnJlbnQuU0RTSU0tSUUtRU5WSVJPTk1FTlRBTC5JRS1FTlZJUk9OTUVOVEFMLkxJTUlURUQiLCJpZS1jdXJyZW50LlNEU0lNLUlFLVBFREVTVFJJQU4uSUUtUEVERVNUUklBTi5MSU1JVEVEIl19.OvdB8AZ5CSh3hbTAWlZmLgjRkynKbE3dov-XCzzxugyJtIpHWk464AQiF_pv597L3ID8N9-WXln1yN4kQPTWSBcPsQleTq-kC3IJdSDk7eJIIrevYcbc9y2l2Q4JiFT5U_4YOgRHJ4Jl2IT8QG2BHbaX3BM7beFcmDF_yV-afqTEYZ56k9APQoKlDzkYJI7pSelzFZtIiu1dexSeZEikfcSgwJQt8VPOs8mdpolu8zzW06bYKXm6a_o7uevLIKyictdfDFmXU1Lg_AdH2ay9QsLNVHML5yeF2Vi1bOXXySBkRrxdqgJ0y73u9M3W7WeIR76tX-IKnY4isU9Hu0rh-w",
		    "predix-zone-id": "SDSIM-IE-PUBLIC-SAFETY",
		    "cache-control": "no-cache",
		    "postman-token": "0b04284f-5944-7404-5ecf-a84227700893"
	 		}
		};

		var req = http.request(options, function (res) {
		  var chunks = [];

		  res.on("data", function (chunk) {
		    chunks.push(chunk);
		  });

 		 res.on("end", function () {
    	var body = Buffer.concat(chunks);
        fs.writeFile(`${i}`, body, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        });
		});
		});
	}
}

