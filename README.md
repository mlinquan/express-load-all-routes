# express-load-all-routes

![NPM version](https://badge.fury.io/js/express-load-all-routes.svg)
![Downloads](http://img.shields.io/npm/dm/express-load-all-routes.svg?style=flat)

## Install

```
npm i express-load-all-routes --save
```

## How to use
```js
//app.js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// load all routes
// default routes path: ./routes
require('express-load-all-routes')(app);
// routes path: ./path/to/routes
require('express-load-all-routes')(app, './path/to/routes');
//for * route
require('express-load-all-routes')(app, './path/to/routes', {"common": "0_common"});

```