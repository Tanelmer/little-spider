var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio')
/* GET home page. */
router.get('/', function(req, res, next) {
  	// res.render('index', { title: 'Express' });
	request('http://www.cnblogs.com/liuzhibin/p/5944821.html', function (error, response, body) {
		$ = cheerio.load(body);
		var ulDom = $('#cnblogs_post_body ul').eq(0);
		var h2Arr = [];
		ulDom.find('h2').each(function(i){
			h2Arr.push({
				title:$(this).text(),
				data:$(this).next().html()
			});
		});
		fs.writeFile('list.html', JSON.stringify(h2Arr), function(err){
			console.log('write ok');
		})
	});
});

module.exports = router;
