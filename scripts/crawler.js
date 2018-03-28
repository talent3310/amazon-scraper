var service = require('./service.js');
var cheerio = require('cheerio');
var async = require('async');
var chalk = require('chalk');
var fs = require('fs'); 
var csv = require('fast-csv'); 
var phasesFrq = require('./wordFrequency.js');

console.log('Starting....');
// service.proxy_test(); return;


var randomTime_review = function() {
	return Math.random() * 1000;
}
var maxNums_ReviewPage = 3;

var uniqueArray = function(arr) {
	return arr.filter(function(item, pos) {
    return arr.indexOf(item) == pos;
	});
}

var get_reviews = function($) {
	var reviewsArr = [];
	$("span[data-hook='review-body']").each(function(i, link) {
		// console.log(link.children[0].data);
		reviewsArr.push(link.children[0].data)
	});
	return reviewsArr;
}

var page_reviews = function(asin, rate, pageNum, reviewArr=[], callback) {
	var r_arr = reviewArr;
	service.make_request(service.review_list_url(asin, rate, pageNum), function(body) {
		var $ = cheerio.load(body);

		var str = $("span[data-hook='rating-out-of-text']").text();
		if(!str) {
			console.log('body============> ', body);
		}
		var averageRate = str.substr(0, str.indexOf(' '));

		if( $("#cm_cr-review_list div.a-section").hasClass('no-reviews-section')) {// no review page
			console.log('R- ' + asin + '  :  ' + rate + '  :  ' +  pageNum + '   ( 1_no review page )');
			callback({reviews: null, averageRate: averageRate});
			return;
		}
		if(!$("#cm_cr-pagination_bar").hasClass('a-text-center')) { // only 1 review page
			console.log('R- ' + asin + '  :  ' + rate + '  :  ' +  pageNum + '   ( 2_only 1 review page )');
			var arr = get_reviews($);
			r_arr = r_arr.concat(arr);
			callback({reviews: uniqueArray(r_arr), averageRate: averageRate});
			return;
		}
		if($("#cm_cr-pagination_bar").hasClass('a-text-center') && !$("li.a-last").prev().hasClass('a-selected') ) { // pagination exist && not last page
			console.log('R- ' + asin + '  :  ' + rate + '  :  ' +  pageNum + '   ( 3_pagination exist && not last page )');
			r_arr = r_arr.concat(get_reviews($));
			if(pageNum >= maxNums_ReviewPage) { // if review page nums > 10, then callback
				callback({reviews: uniqueArray(r_arr), averageRate: averageRate});
				return
			}
			var p_n = pageNum + 1;
			setTimeout(function(){ page_reviews(asin, rate, p_n, r_arr, callback); }, randomTime_review);
			return;
		}
		if($("#cm_cr-pagination_bar").hasClass('a-text-center') && $("li.a-last").prev().hasClass('a-selected')) { // if pagination exist && current is last page
			console.log('R- ' + asin + '  :  ' + rate + '  :  ' +  pageNum + '   ( 4_current is last page )');
			var arr = get_reviews($);
			r_arr = r_arr.concat(arr);
			callback({reviews: uniqueArray(r_arr), averageRate: averageRate});
			return;
		}
	});
}

var asin = 'B0045MBFVW';

var getProductReviewsByAsin = function(asin, callFun) {
	async.series({
	  one_star: function(callback) {
	    page_reviews(asin, '#', 1, [], function(reviewArr){
	    	callback(null, reviewArr);
	    });

	  },
	  two_star: function(callback){
	    page_reviews(asin, '#-#', 1, [], function(reviewArr){
	    	callback(null, reviewArr);
	    });
	  },
	  three_star: function(callback){
	    page_reviews(asin, '#-#-#', 1, [], function(reviewArr){
	    	callback(null, reviewArr);
	    });
	  }
	}, function(err, results) {
		// console.log("results: ", results);
		var avgRate = results.one_star.averageRate;
		var one_star_reviews = results.one_star.reviews == null ? [] : results.one_star.reviews;
		var allReviews = one_star_reviews.concat(results.two_star.reviews, results.three_star.reviews);
		// console.log('avgRate: ' + avgRate);
		// console.log('reviews: ' + allReviews);
		callFun({avgRate: avgRate, allReviews: allReviews});
	  // results is now equal to: {one: 1, two: 2}
	});
}

// Get Asins of the 16 prodcuts on the 1st page

var keyword = 'camping utensils';
var res = {
	keyword: '',
	averageRate: 0,
	numReviews: 0,
	reviews: []
};

service.make_request(service.product_list_url(keyword), function(body) {
	var $ = cheerio.load(body);
	var asinArr = [];
	$("li.s-result-item.celwidget").each(function(i, link) {
		// console.log(i + '-' + link.attribs["data-asin"]);
		if(asinArr.length < 16) { // limit number: 16
			asinArr.push(link.attribs["data-asin"]);
		}
	});

	async.eachSeries (asinArr, function(asin, callback) {
		console.log(chalk.green('ASIN-  ') + asin);
		getProductReviewsByAsin(asin, function(obj) {
			res.reviews = res.reviews.concat(obj.allReviews);
			res.averageRate += Number(obj.avgRate);
			callback(null, obj);
		});
	}, function(err){

		console.log('result===> ', res);
		console.log('ONE-KEYWORD operation is finished');
	});
});

var text = "test atest btest and test test test"; 
var res = phasesFrq.calcFrequency(text, 2, 3, []);
console.log("res: ", res);