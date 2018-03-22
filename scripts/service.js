var settings = require('./settings.js');
var request = require('request');

var get_proxy = function () { 
  var proxy_ip = settings.proxies[Math.floor(Math.random() * settings.proxies.length)];
  var proxy_url = "http://" + settings.proxy_user + ":" + settings.proxy_pass + "@" + proxy_ip + ":" + settings.proxy_port;
  return proxy_url;
};

var make_request = function (url, callback, return_soup=true) { 
	var proxies = get_proxy();
	try {
		var proxiedRequest = request.defaults({'proxy': proxies});
		var options = {
		  url: url,
		  headers: settings.headers
		};
		
		proxiedRequest.get(options, function(error, response, body) {
			if(error) {
				console.log('ERROR: proxy not working-' + error);
				return;
			}
			if(!response && response.statusCode != 200) {
				console.log('WARNING: Got a ' + response.statusCode +' status code for URL:' + url);
				return;
			} 
			if(return_soup) {
				return callback(body);
			} else {
				return callback(body);
			}
		});
	}
	catch(err) {
	  console.log('WARNING: Request for ' + url + 'failed, trying again.');
	  return make_request(url,callback);
	}
}	

module.exports.proxy_test = function () { 
	make_request('https://api.ipify.org?format=json', function(body){
		console.log("PROXY_TEST: " + body);
	}, false);
}

module.exports.product_list_url = function (keyword) { 
	var prefix = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=';
	var word = keyword.trim();
	var str = word.replace(/ /g, '+');
	return prefix + str;
}

module.exports.review_list_url = function (asin, rate, pageNum=1) { 

// 'https://www.amazon.com/product-reviews/B0045MBFVW/ref=cm_cr_arp_d_viewopt_sr?ie=UTF8&reviewerType=all_reviews&pageNumber=1&filterByStar=three_star'
// 'https://www.amazon.com/product-reviews/B0045MBFVW/ref=cm_cr_arp_d_viewopt_sr?ie=UTF8&reviewerType=all_reviews&pageNumber=1&filterByStar=two_star'
	var prefix = 'https://www.amazon.com/product-reviews/' +  asin + '/ref=cm_cr_arp_d_viewopt_sr?ie=UTF8&reviewerType=all_reviews&pageNumber=' + pageNum + '&filterByStar=';
	var rateString = 'one_star';
	switch(rate) {
    case '#':
      rateString = 'one_star';
      break;
    case '#-#':
      rateString = 'two_star';
      break;
    case '#-#-#':
      rateString = 'three_star';
      break;
	}
	return prefix + rateString;
}

module.exports.make_request = make_request;