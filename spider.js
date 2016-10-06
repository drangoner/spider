var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://bobao.360.cn/search/index?keywords=%E5%8D%97%E6%98%8C%E5%A4%A7%E5%AD%A6";
function fetchPage(x){
	startRequest(x);
}

function startRequest(x){
	http.get(x,function(res){
		var html = "";
		var title = [];
		res.setEncoding('utf-8');//…Ë÷√º‡Ã˝±‡¬Î∏Ò Ω
		
		res.on('data', function(chunk){
			html += chunk;
		});
		res.on('end', function(){
			var $ = cheerio.load(html);
			//console.log($('li.hide-text').children().text().trim());
			$('li.hide-text').each(function(i,elem){
				//console.log($(this).children().first().text().trim()+'\n'+$(this).children().last().text().trim()+'\n---------------------------------------------------------');
				var node_info = {
					title: $(this).children().first().text().trim(),
					date: $(this).children().last().children().first().text().trim(),
					source: $(this).children().last().children().last().text().trim(),
					url: 'http://bobao.360.cn'+$(this).find('a').attr('href'),
				};
				
				console.log(node_info);
			});
		});
		
	}).on('error', function(err){
		console.log(err);
	});
}

fetchPage(url);