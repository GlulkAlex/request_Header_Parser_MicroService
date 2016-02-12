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
//User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.82 Chrome/48.0.2564.82 Safari/537.36

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
      console.log('req get handler body');
    }
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

/*##########################################################################*/
/* unit test */
app
.listen(
  port,
  function () {
  	console
  	.log('http_Server listening on port ' + port + '...');
  }
);