var http = require('http');
var fs = require('fs');

function downloadImg(options) {
    this.id = 1;

    this.initialize.call(this, options);
    return this;
}

downloadImg.prototype = {
    constructor: downloadImg,
    initialize: function _initialize(options) {
        this.baseUrl = options.baseUrl;
        this.dir = options.dir || '';
        this.reg = options.reg;
        this.total = options.total;
        this.page = options.from || 1;
    },
    start: function _start() {
        this.getPage();
    },
    getPage: function _getPage() {
        var self = this,
            data = null;

        if (this.page <= this.total) {
            http.get(this.baseUrl + this.page, function(res) {
                res.setEncoding("utf8");

                res.on('data', function(chunk) {
                    data += chunk;
                }).on('end', function() {
                    self.parseData(data);
                });
            });
        }
    },
    parseData: function _parseData(data) {
        var res = [],
            match;
        while ((match = this.reg.exec(data)) != null) {
            res.push(match[1]);
        }
  console.log(res);
        this.download(res);
    },
    download: function _download(resource) {
        var self = this,
            currentPage = self.page; 

        resource.forEach(function(src, idx) {
            var filename = src.substring(src.lastIndexOf('/') + 1),
                writestream = fs.createWriteStream(self.dir + filename);

         

            http.get("http:" + src, function(res) {
                res.pipe(writestream);
            });

           /* http.get(src, function(res) {
                res.pipe(writestream);
            });*/

            writestream.on('finish', function() {
                console.log('page: ' + currentPage + ' id: ' + self.id++ + ' download: ' + filename);
            });
        });

        self.page++;
        self.getPage();
    }
};


var downloadImg = new downloadImg({
    baseUrl: 'http://jandan.net/pic-2016/page-',
    dir: './imgs/',
    reg: /<img\s*src="(.*?)" \/>/g,
    //reg: /<img\s*src=".*"\s*org_src="(.*?)"\s*\/>/g,
    total: 200,
    from: 1
});

/*var downloadImg = new downloadImg({
    baseUrl: 'http://www.downloadImg.com/share/comment-page-',
    dir: './meizi/',
    reg: /<img\s*src="(.*?)"\s*alt=".*"\s*\/>/g,
    total: 141,
    from: 1
});*/



downloadImg.start();