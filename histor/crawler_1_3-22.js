var service = require('./service.js');
var cheerio = require('cheerio');
var async = require('async');
// service.proxy_test();

// Get Asins of the 16 prodcuts on the 1st page

var keyword = 'camping utensils';
console.log('Starting....');
// service.make_request(service.product_list_url(keyword), function(body) {
// 	var $ = cheerio.load(body);
	// $("li.s-result-item.celwidget").each(function(i, link) {
	// 	console.log(i + '-' + link.attribs["data-asin"]);

	// })
// });

var get_reviews = function($) {
	var reviewsArr = [];
	$("li.s-result-item.celwidget").each(function(i, link) {
		// console.log(i + '-' + link.attribs["data-asin"]);
		reviewsArr.push(link.attribs["data-asin"])
	});
	return reviewsArr;
}

var page_reviews = function(asin, rate, pageNum, callback) {
	service.make_request(service.review_list_url(asin, rate, pageNum), function(body) {
		var $ = cheerio.load(body);
		if( $("#cm_cr-review_list div.a-section").hasClass('no-reviews-section')) {// no review page
			callback(null);
			return;
		}
		if(!$("#cm_cr-pagination_bar").hasClass('a-text-center')) { // only 1 review page
			callback(get_reviews($));
			return;
		}
		if($("#cm_cr-pagination_bar").hasClass('a-text-center') && !$("li.a-last").prev().hasClass('a-selected') ) { // if pagination exist && not last page
			var p_n = pageNum + 1;
			page_reviews(asin, rate, p_n, callback);
			return;
		}
		if($("#cm_cr-pagination_bar").hasClass('a-text-center') && $("li.a-last").prev().hasClass('a-selected')) { // if pagination exist && current is last page
			callback(get_reviews($));
			return;
		}
	});
}

var asin = 'B0045MBFVW';
// var asin = 'B071ZZKWV7';// the case where the empty pagination
service.make_request(service.review_list_url(asin, 2, 1), function(body) {
	var $ = cheerio.load(body);
	// $("span[data-hook='review-body']").each(function(i, link) {
	// 	console.log(link.children[0].data);
	// });
	// console.log($("li.a-last").prev().hasClass('a-selected'));// check if current page is the end
	console.log('is pagination? :', $("#cm_cr-pagination_bar").hasClass('a-text-center'));// pagination detection
	console.log('is no review? :' , $("#cm_cr-review_list div.a-section").hasClass('no-reviews-section')); //if true, then no review page

	async.series({
    one_star: function(callback) {
      page_reviews(asin, 1, 1, function(reviewArr){
      	callback(null, 1);
      });

    },
    two_star: function(callback){
      page_reviews(asin, 2, 1, function(reviewArr){
      	callback(null, 2);
      });
    },
    three_star: function(callback){
      page_reviews(asin, 3, 1, function(reviewArr){
      	callback(null, 3);
      });
    }
	}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
	});
});



