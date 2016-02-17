const is_DEBUG = (
  process.env.IS_DEBUG ||
  process.argv[2]
  //true
  //false
);
const http = require('http');
//const fs = require('fs');  
//const path = require('path');
const url = require('url');

const port_Number = (
    //process.argv[2] || 
    process.env.PORT || //0
    8080 ||
    3000
);
/*
const source_Path_Directory = (
    process.argv[3] || 
    __dirname + end_Point_Api_WhoAmI ||
    process.cwd() + end_Point_Api_WhoAmI
);
*/

/*
http
.get(
  '*',
  function(
    req,
    res
  ){  
    res
    .redirect('http://mydomain.com' + req.url);
  }
);
*/
/*
response
.writeHead(
  301, 
  {
    Location: (request.socket.encrypted ? 'https://' : 'http://') +
    request.headers.host + newRoom
  }
);
response.end();
*/

// helper
function get_Software(
    request
) {
  //"user-agent"
  var user_Agent = request.headers["user-agent"];
  //get("User-Agent");
  
  if (is_DEBUG) {
    console.log(`type of user_Agent:${typeof(user_Agent)}`);
    console.log("user_Agent:\n" +
      JSON
      .stringify(user_Agent));
  }  
  var software = "";
  var chr = "";
  var start_Record = false;
  /* */
  
  for (
    var str_Indx in user_Agent
  ) {
    chr = user_Agent[str_Indx];
    
    if ( chr == '(') {
      start_Record = true;
    } else if (chr == ')') {
      break;
    } else {
      
      if (start_Record) {
        software += chr;
      }
    }
  }
  
  return software;
}  

// Generic error handler used by all endpoints.
function handleError(reason, message, code) {
  console.log("ERROR: " + reason);
  //res.status(code || 500).json({"error": message});
}

var http_Server = http.createServer(
  function (
    request,
    response
  ) {  
    "use strict";
    // request handling logic... 
    var collect_result_Str = "";
    var post_Data;
    var end_Points_List = [
      "/api/whoami",
      '/api/parsetime',
      '/api/unixtime' 
    ];
    var url_Obj = {};
    var query_Obj = {};
    var query_List = [];
    var date_Time_Str = '';
    var iso_Date = Date();
    
    request.on(
      'connect', 
      (res, socket, head) => {
        console.log('got connected!');
      }
    );
    
    request.on(
      'data', 
      (chunk) => {
        if (is_DEBUG) {
          console.log(`message.method: ${request.method}`);
          console.log(`message.url: ${request.url}`);
        }
        
        if (request.method == 'GET' ) {
          //collect_result_Str += chunk;
          //console.log(`POST.chunk: ${chunk}`);
          
          //request.pipe(response);
          //response.write(chunk.toString().toUpperCase());
          //if ()
        }
      }
    );
    
    request.on(
      'end', 
      () => {
        
        if (is_DEBUG) {
          console.log(`message.url on 'end': ${request.url}`);
        }
        //node -pe "require('url').parse('/test?q=1', true)" 
        url_Obj = url.parse(request.url, true);
        //console.log(`url_Obj.pathname: ${url_Obj.pathname}`);
        query_List = [];
        for(var item in url_Obj.query){
          query_List.push(item);
          query_List.push(url_Obj.query[item]);
        }
        //console.log(`url_Obj.query: ${query_List}`);
        /*
        pathname: 
        The path section of the URL, 
        that comes after the `host` and 
        before the `query`, 
        including the initial `slash` 
        if present. 
        No decoding is performed.
        Example: '/p/a/t/h'
        */
        if (url_Obj.pathname == end_Points_List[0]) {
          
          if (is_DEBUG) {
            console.log(`url_Obj.pathname: ${url_Obj.pathname}`);
            console.log(`end_Points_List[0]: ${end_Points_List[0]}`);
            console.log(`url_Obj.path: ${url_Obj.path}`);
          }
          date_Time_Str = url_Obj.query['iso'];
          
          if (date_Time_Str) {
            
            if (is_DEBUG) {
              console.log(`date_Time_Str: ${date_Time_Str}`);
            }
            response.writeHead(
              200, 
              { 'Content-Type': 'application/json' }
            ); 
            iso_Date = new Date(Date.parse(date_Time_Str));
            response.write(
              JSON.stringify(
                {
                  "hour": iso_Date.getHours(),
                  "minute": iso_Date.getMinutes(),
                  "second": iso_Date.getSeconds(),
                  'unixtime': Date.parse(date_Time_Str)
                }
              )
            );
            
          } else {
            
            const accepts_Languages = request.headers["accept-language"];
            const accepted_Language = accepts_Languages
            .split(
              //";"
              ","
            )[0];
            if (is_DEBUG) {
              console.log(`accepts_Languages: ${accepts_Languages}`);
            }
            var client_IP = (
              request.client.remoteAddress ||
              request.socket.remoteAddress ||
              request.connection.remoteAddress
            );
            var json_Response_Obj = {
              "ipaddress": client_IP,
              "language": accepted_Language,
              "software": get_Software( request )
            };
            
            response.writeHead(
              200, 
              { 'Content-Type': 'application/json' }
            ); 
            response.write(
              JSON.stringify(
                json_Response_Obj
              )
            );
          }
            
        } else if (url_Obj.pathname == end_Points_List[1]) {
          
          if (is_DEBUG) {
            console.log(`url_Obj.pathname: ${url_Obj.pathname}`);
            console.log(`end_Points_List[1]: ${end_Points_List[1]}`);
            console.log(`url_Obj.path: ${url_Obj.path}`);
          }
          date_Time_Str = url_Obj.query['iso'];
          
          if (date_Time_Str) {
            
            response.writeHead(
              200, 
              { 'Content-Type': 'application/json' }
            ); 
            response.write(
              JSON.stringify(
                {'unixtime': Date.parse(date_Time_Str)}
              )
            );
          }
        } else if (
          url_Obj.pathname == "/" &&
          url_Obj.pathname == url_Obj.path
          //url_Obj.pathname === ""
        ) {
          if (is_DEBUG) {
            console.log(`url_Obj.pathname: ${url_Obj.pathname}`);
            console.log(`url_Obj.path: ${url_Obj.path}`);
            console.log(`url_Obj.href: ${url_Obj.href}`);
            console.log(
              `Root`);
          }
          
          var body = 'hello world';
          
          /*
          If the body contains 
          higher coded characters 
          then Buffer.byteLength() should be used 
          to determine 
          the number of bytes 
          in a given encoding. 
          And Node.js does not check 
          whether Content-Length and the 
          length of the body 
          which has been transmitted 
          are equal or not.
          */
          //const buf = new Buffer('hello world', 'ascii');
          //console.log(buf.toString('hex'));
            // prints: 68656c6c6f20776f726c64
          //console.log(buf.toString('base64'));
            // prints: aGVsbG8gd29ybGQ=
          //const buf4 = new Buffer('tést', 'utf8');
            // creates a buffer containing UTF8 bytes [74, c3, a9, 73, 74]
          //const str = '\u00bd + \u00bc = \u00be';
          //console.log(`${str}: ${str.length} characters, ` +
          //  `${Buffer.byteLength(str, 'utf8')} bytes`);
            // ½ + ¼ = ¾: 9 characters, 12 bytes  
          //const buf_utf8 = new Buffer(body, 'utf8');
          
          response.writeHead(200, {
            'Content-Length': Buffer.byteLength(body, 'utf8'),//body.length,
            'Content-Type': 'text/plain' });
          //response.write(chunk[, encoding][, callback])
          //TypeError: response.setEncoding is not a function
          //response.setEncoding('utf8');
          response.write(
            body,
            'utf8'
          );
        } else {
          
          if (is_DEBUG) {
            console.log(`url_Obj.pathname: ${url_Obj.pathname}`);
            console.log(`url_Obj.path: ${url_Obj.path}`);
            console.log(`url_Obj.protocol: ${url_Obj.protocol}`);
            console.log(
              `Redirection to ${request.headers.host + end_Points_List[0]}`);
          }
          // URL Parsing
          // 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
          // protocol: The request protocol, lowercased.
          // Example: 'http:'
          /*
          work as expected for
          http://localhost:8080/api/whoami
          */
          if (false) {
          response
          .writeHead(
            //3xx: Redirection
            //301 Moved Permanently	
            // The requested page has moved to a new URL 
            301, 
            {
              Location: (
                (request.socket.encrypted ? 'https://' : 'http://') +
                // url_Obj.protocol: null <- screw all
                //url_Obj.protocol + '//' +
                request.headers.host + end_Points_List[0]
              )
            }
          );
          } else {
            var response_Body = "Try route `/api/whoami`";
            //303 See Other	
            // The requested page can be found under a different URL
            response
            .writeHead(
              303, 
              {
                'Content-Length': Buffer.byteLength(response_Body, 'utf8'),
                'Content-Type': 'text/plain'
              }
            );
            response.write(
              response_Body,
              'utf8'
            );
          }
        }
        
        /* close `writable` `stream` */
        response.end();
      }
    );
    
  }
);   

http_Server
.on(
  'connect', 
  (res, socket, head) => {
    console.log('got connected!');
  }
);

/*
http_Server
.get(
  '*',
  function(
    req,
    res
  ){  
    res
    .redirect('http://mydomain.com' + req.url);
  }
);
*/
/*##########################################################################*/
/* unit test */
//server.listen(path[, callback])
// Start a UNIX socket server 
// listening for connections on the given path.
http_Server
.listen(
  port_Number,
  //hostname: '127.0.0.1'
  //process.env.HOSTNAME || process.env.HOST || '127.0.0.1',
  () => {
    var address = http_Server.address();
    var port = http_Server.address().port;
    
    console.log(
      `server listening address{${address.address}}:port{${address.port}}`);
  	//console.log('http_Server listening on port ' + port + '...');
  }
);
http_Server
.on(
  'error', 
  (e) => {
    
    if (e.code == 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      
      setTimeout(
        () => {
          http_Server.close();
          http_Server
          .listen(
            //PORT, 
            //HOST
            function () {
              
              var port = http_Server.address().port;
              
            	console
            	.log('http_Server listening on port ' + port + '...');
            }
          );
        }, 
        1000
      );
    } else {
      console.error(e.message);
    }
  }
);