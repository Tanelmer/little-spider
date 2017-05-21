var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio')
/* GET home page. */
router.get('/', function(req, res, next) {
  	// res.render('index', { title: 'Express' });
	request('https://www.zhihu.com/explore', function (error, response, body) {
		$ = cheerio.load(body);
		var title = $('title').text();
		var len = $('.recommend-feed a').length;
		res.json({
			'title':title,
			'推荐话题个数':len
		});
	});
});

module.exports = router;
