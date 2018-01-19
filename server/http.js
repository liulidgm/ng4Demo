var PORT = 4000;

var http = require('http');
var url = require('url');
var gundamlist = require('./data').gundamlist.data;
var userlist = require('./userlist').userlist.data;
var path = require('path');
var fs = require('fs');

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('pathname ==>' + pathname);
    if (pathname === '/gundamlist') {
        const returnValue = JSON.stringify(gundamlist);
        response.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        });
        response.write(returnValue, "utf-8");
        response.end();
    } else if (pathname === '/detail') {
        var query = url.parse(request.url, true).query;
        if (query.id !== undefined && query.id.length > 0) {
            console.log(query.id);
            let index = -1;
            for (var i = gundamlist.length - 1; i >= 0; i--) {
                if ((parseInt(gundamlist[i].id) - query.id) === 0) {
                    index = i;
                    break;
                }
            }
            response.writeHead(200, {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            });
            console.log(index);
            if (index !== -1) {
                response.write(JSON.stringify(gundamlist[index]), "utf-8");
            } else {
                response.write(JSON.stringify({}), "utf-8");
            }
            response.end();

        }
    }else if(pathname === '/userlist'){
        const returnValue = JSON.stringify(userlist);
        response.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        });
        response.write(returnValue, "utf-8");
        response.end();
    } else if(pathname==='/login'){
        var query = url.parse(request.url,true).query;
        var res = {message:'',code:''};
        if(query.username!==undefined&&query.username.length>0){
            if(query.password!==undefined&&query.password.length>0){
                res.message = 'success';
                res.code="000";
            }else{
                res.message = '用户名不能为空';
                res.code="001";
            }
        }else{
            res.message = '用户名不能为空';
            res.code="002";
        }

        response.writeHead(200, {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
        });
        response.write(JSON.stringify(res), "utf-8");
        response.end();
    }else {
        if(pathname === '/'){
            pathname = '/index.html';
        }
        var realPath = "assets" + pathname;
        console.log('realPath =>' + realPath);
        fs.exists(realPath, function(exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function(err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(err);
                    } else {
                        response.writeHead(200, {
                            'Content-Type': 'text/html'
                        });

                        response.write(file, "binary");

                        response.end();
                    }
                });
            }
        });
    }
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");