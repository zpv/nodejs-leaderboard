var express = require('express');
var crc = require('crc');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
	var s2j = req.s2j;

	var page = req.query.p;
	var search = req.query.s;


	s2j.addQuery('query', 'SELECT uid, rpname, wallet, salary FROM darkrp_player');

	s2j.run(function(err, json) {
		if (err) {
			console.log('There was an error: %s', err);
		} else {
			//console.log('Here is your JSON: %s', json);
			var arr = JSON.parse(json);
			arr.query.sort(function(a, b) {
				return b.wallet - a.wallet
			});
			for (var i in arr.query) {
				arr.query[i].rank = parseInt(i) + 1;
			}

			if(search) {
				var uniqueid = crc.crc32("gm_" + search +"_gm");
				console.log(uniqueid);

				var arrayPosition = arr.query.map(function(arrayItem) {
				    return arrayItem.uid;
				}).indexOf(uniqueid);

				arr.query[arrayPosition].bold = true;

				var sliced = arr.query.slice(arrayPosition - 14, arrayPosition + 14);
			}
			else {
				var sliced = arr.query.slice((page * 30) - 30, page * 30);
			}

			//console.log(arr);
			//console.log(arr);

			res.send(JSON.stringify(sliced));

			// Prints something like {"query": [{"column": "a"}, {"column": "b"}]} 
		}
	});

	//var db = req.db;
	//var collection = db.get('userlist');
	//collection.find({},{},function(e,docs){
	//	res.json(docs);
	//});
});

module.exports = router;