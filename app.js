var soap = require('soap');
var parseString = require('xml2js').parseString;
var express = require('express');
var url = 'http://voos.infraero.gov.br/wsvoosmobile/ConsultaVoos.svc?singleWsdl';
var Globalclient;
var app = express();

function ready() {
	var port = process.env.PORT || 3000;
	app.listen(port);
	console.log("Listening on port " + port);
};

app.get(/\/api\/(.*)/, function(req, res){
	var call = req.params[0];
	if(Globalclient.hasOwnProperty(call)) {
		var method = Globalclient[call];
		method(req.query, function(err, result, raw, soapHeader){
			if(err) {
				res.status(404).send(err);
			}
			if(result) {
				var key;
				for(var k in result) {
					key = k;
				}
				parseString(result[key], function (err, r) {
					res.send(r);
				});
			} else {
				res.status(404).send('No results');
			}
		});
	}
});


soap.createClient(url, function(err, client) {
	  Globalclient = client;
	  ready();
});
