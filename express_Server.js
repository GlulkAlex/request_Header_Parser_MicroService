"use strict";

const is_DEBUG = (
  true
  //false
);

const express = require('express');
const path = require('path');
//const bodyparser = require('body-parser');

var app = express();
//var router = express.Router(/*[options]*/);

const end_Point_Root = '/';
const end_Point_Home = '/home';
const end_Point_Search = '/search';
const end_Point_Api_WhoAmI = "/api/whoami";
const port = (
    process.argv[2] || 
    process.env.PORT || 
    8080 ||
    3000
);
const source_Path_Directory = (
    process.argv[3] || 
    __dirname + end_Point_Api_WhoAmI
);

//var client_Ip = socket.request.connection.remoteAddress; 
/*
The net module 
provides you with 
an asynchronous network wrapper. 
It contains 
functions for creating 
both servers and 
clients (called streams). 
You can include this module with require('net');.
*/
//socket.localAddress
// The string representation of 
// the local IP address 
// the remote client is connecting on. 
// For example, 
// if you are listening on '0.0.0.0' and 
// the client connects on '192.168.1.1', 
// the value would be '192.168.1.1'.
// tlsSocket.remoteAddress
// The string representation of 
// the remote IP address. 
// For example, 
// '74.125.127.100' or '2001:4860:a005::68'.
// GET /api/whoami/ HTTP/1.1
//Remote Address:23.23.169.130:443
//Referer:http://www.freecodecamp.com/challenges/request-header-parser-microservice

//req.ip
// The remote IP address of the request.
//Accept-Language:ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,nb;q=0.2
//User-Agent:
//Mozilla/5.0 (X11; Linux x86_64) 
//AppleWebKit/537.36 (KHTML, like Gecko) 
//Ubuntu Chromium/48.0.2564.82 Chrome/48.0.2564.82 Safari/537.36

if (false) {}
app
// does not work
.connect(
  end_Point_Api_WhoAmI, 
  (socket) => {	
    console.log('app connect handler body ...');
    //{ address: '::1', family: 'IPv6', port: 36114 }	
    console.log(socket.address());
    //socket.remoteAddress:  127.0.0.1 //<- as expected
    console.log(
      'socket.remoteAddress: ', 
      socket.remoteAddress
    );
    //socket.end('goodbye\n');
  }
);

if (false) {}
app
.get(
    end_Point_Api_WhoAmI, 
  function (
    req, 
    res, 
    next
  ) {
    
    if (is_DEBUG) {
      console.log('req get handler body ...');
      console.log('req: %j', req);
      if (false) {
      for (var r_Indx in req) {
        console.log(
          `req[${r_Indx}]: %j`, 
          req[r_Indx]
        );
      }
      }
      //req[client]: [Circular]
      if (false) {
      for (var r_Cl_Indx in req.client) {
        console.log(
          `req.client[${r_Cl_Indx}]: %j`, 
          req.client[r_Cl_Indx]
        );
      }
      }
      console.log('req.ips: %j', req.ips);
      console.log('req.hostname: %j', req.hostname);
      console.log('req.originalUrl: %j', req.originalUrl);
      console.log('req.protocol: %j', req.protocol);
      /*
      req[headers]: 
      {
        "host":"localhost:8080",
        "connection":"keep-alive",
        "cache-control":"max-age=0",
      */
        //"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      /*
        "upgrade-insecure-requests":"1",
        "user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.82 Chrome/48.0.2564.82 Safari/537.36",
        "accept-encoding":"gzip, deflate, sdch",
        "accept-language":"ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,nb;q=0.2",
        "cookie":"fruit=kiwi; session=fJyVQlRnhNTQgaWzwpShQnrGxEYavpGE",
        "if-none-match":"W/\"45-Btu0n3EbjWxG9haRDNDZ0A\""
      }
      req[rawHeaders]: [
        "Host","localhost:8080",
        "Connection","keep-alive",
        "Cache-Control", "max-age=0",
        */
        //"Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      /*
        "Upgrade-Insecure-Requests", "1",
        "User-Agent","Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.82 Chrome/48.0.2564.82 Safari/537.36",
        "Accept-Encoding","gzip, deflate, sdch",
        "Accept-Language","ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,nb;q=0.2",
        "Cookie","fruit=kiwi; session=fJyVQlRnhNTQgaWzwpShQnrGxEYavpGE",
        "If-None-Match","W/\"45-Btu0n3EbjWxG9haRDNDZ0A\""
        ]
      */
      // headers:  undefined
      //console.log('headers: ', res.headers);
      // ''
      /*
      console.log(
        "(req.headers['x-forwarded-for'] || '').split(',')[0]:\n ", 
        (req.headers['x-forwarded-for'] || '').split(',')[0]
      );
      */
      // undefined
      /*
      console.log("req.headers['x-forwarded-for']: ", 
        req.headers['x-forwarded-for']
      );
      */
      console.log('req.connection: %j', req.connection);
      if (false) {
      for (var item_Indx in req.connection) {
        console.log(
          `req.connection[${item_Indx}]: %j`, 
          req.connection[item_Indx]
        );
      }
      }
      if (false) {
      //req.connection[_httpMessage]: [Circular]
      for (var elem_Indx in req.connection._httpMessage) {
        console.log(
          `req.connection._httpMessage[${elem_Indx}]: %j`, 
          req.connection._httpMessage[elem_Indx]
        );
      }
      }
      //req[socket]: [Circular]
      if (false) {
      for (var r_Sc_Indx in req.socket) {
        console.log(
          `req.socket[${r_Sc_Indx}]: %j`, 
          req.socket[r_Sc_Indx]
        );
      }
      }
      //req.connection._httpMessage[socket]: [Circular]
      if (false) {
      for (var el_Indx in req.connection._httpMessage.socket) {
        console.log(
          `req.connection._httpMessage.socket[${el_Indx}]: %j`, 
          req.connection._httpMessage.socket[el_Indx]
        );
      }
      }
      //req.connection._httpMessage[connection]: [Circular]
      if (false) {
      for (var itm_Indx in req.connection._httpMessage.connection) {
        console.log(
          `req.connection._httpMessage.connection[${itm_Indx}]: %j`, 
          req.connection._httpMessage.connection[itm_Indx]
        );
      }
      }
      // req.connection.remoteAddress:  ::1
      console.log(
        'req.connection.remoteAddress: ', 
        req.connection.remoteAddress
      );
      // TypeError: Cannot read property 'remoteAddress' of undefined
      /*
      console.log(
        'req.connection.socket.remoteAddress: ', 
        req.connection.socket.remoteAddress
      );
      */
    }
    /*
    var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] ||
     req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;	
    */	
    //req.client[remoteAddress]: "::1"
    //req.client[localAddress]: "::1"
    //req.socket[_sockname]: {"address":"::1","family":"IPv6","port":8080}
    //req.socket[_peername]: {"address":"::1","family":"IPv6","port":55160}
    //req.socket[remoteAddress]: "::1"
    //req.socket[localAddress]: "::1"
    const client_IP = req.ip;
    /*
    req.acceptsLanguages(lang [, ...])
      Returns 
      the first accepted language 
      of the specified languages, 
      based on 
      the request’s Accept-Language HTTP header field. 
      If none of the specified languages is accepted, 
      returns false.
    */
    const accepted_Language = req.acceptsLanguages();
    /*
    req.get(field)
      Returns 
      the specified HTTP request header field 
      (case-insensitive match). 
      The `Referrer` and `Referer` fields are interchangeable.
    */
    //const
    var user_Agent = req.get("User-Agent");
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
      //var str_Indx = 0; str_Indx < user_Agent.length; str_Indx++
    ) {
      //start_Record = user_Agent(str_Indx) == '(' && !start_Record;
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
    /* */
    var json_Response_Obj = {
      "ipaddress": client_IP,
      "language": accepted_Language[0],
      "software": software
    };

    res
    .json(
      //null
      json_Response_Obj
    );
    if (is_DEBUG) {
        console.log("json_Response_Obj:\n" +
          JSON
          .stringify(json_Response_Obj));
    }
    // pass control to the next handler
    next(); 
  }
);

app
.all(
    //  /^\/api\/whoami(?:\/(?=$))?$/i	
    //end_Point_Api_WhoAmI, 
    '/',	
  (
    req, 
    res, 
    next
  ) => {
    //This webpage has a redirect loop
    //ERR_TOO_MANY_REDIRECTS	
    //Error: Can't set headers after they are sent.
    res.redirect(end_Point_Api_WhoAmI);
    // pass control to the next handler
    next(); 
  }
);
/*##########################################################################*/
/* unit test */
//server.listen(port[, hostname][, backlog][, callback])
/*
Begin accepting connections 
on the specified port and hostname. 
If the hostname is omitted, 
the server will accept connections 
on any IPv6 address (::) 
when IPv6 is available, or 
any IPv4 address (0.0.0.0) otherwise. 
A port value of zero 
will assign a random port.
*/
//console.log('process.env: %j', process.env);
//req.hostname: "localhost"
app
.listen(
  port,
  // works for "localhost" //
  process.env.HOST || process.env.HOSTNAME || "localhost",
  function () {
  	console
  	.log('http_Server listening on port ' + port + '...');
  }
);