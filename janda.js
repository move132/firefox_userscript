var cheerio = require("cheerio");
var http = require('http');
var BufferHelper = require('bufferhelper');
var iconv = require('iconv-lite');
var fs= require("fs");
function download(url, callback) {
	http.get(url, function(res) {
		var bufferHelper = new BufferHelper(); //解决中文编码问题
		res.on('data', function(chunk) {
			bufferHelper.concat(chunk);
		});
		res.on("end", function() {
			//注意，此编码必须与抓取页面的编码一致，否则会出现乱码，也可以动态去识别
			//var val = iconv.decode(bufferHelper.toBuffer(), 'gb2312');
			callback(bufferHelper.toBuffer().toString());
		});
	}).on("error", function() {
		callback(null);
	});
}

download("http://jandan.net/pic-2016/page-1978#comments",function(res){
	var $ = cheerio.load(res);
	$(".commentlist img").each(function(index,ele){
		//console.log($(ele).attr("src"));
		downImg($(ele).attr("src"));
	})
});

function downImg(url){
	http.get(url, function(res){
	    var imgData = "";

	    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开


	    res.on("data", function(chunk){
	    	console.log(imgData);
	        imgData+=chunk;
	    });

	    res.on("end", function(){
	        fs.writeFile("/", imgData, "binary", function(err){
	            if(err){
	                console.log("down fail");
	            }
	            console.log("down success");
	        });
	    });
	});
}