var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/data')));

//routes
app.get('/', function(req, res, next) {
    var conf = {
    shader_name : req.query.shader_name === undefined ? 'secondPassFusion' : req.query.shader_name,
    l : req.query.l === undefined ? 100 : req.query.l,
    s : req.query.s === undefined ? 100 : req.query.s,
    hMin : req.query.hMin === undefined ? 0 : req.query.hMin,
    hMax : req.query.hMax === undefined ? 100 : req.query.hMax,
    minRefl : req.query.minRefl === undefined ? 0 : req.query.minRefl,
    minSos : req.query.minSos === undefined ? 0 : req.query.minSos,
    minAtten : req.query.minAtten === undefined ? 0 : req.query.minAtten,  
    maxRefl : req.query.maxRefl === undefined ? 100 : req.query.maxRefl, 
    maxSos : req.query.maxSos === undefined ? 100 : req.query.maxSos, 
    maxAtten : req.query.maxAtten === undefined ? 100 : req.query.maxAtten, 
    opacity_factor : req.query.opacity === undefined ? 80 : req.query.opacity,
    color_factor : req.query.darkness === undefined ? 100 : req.query.darkness,
    xMin : req.query.xMin === undefined ? 0 : req.query.xMin,
    yMin : req.query.yMin === undefined ? 0 : req.query.yMin,
    zMin : req.query.zMin === undefined ? 0 : req.query.zMin,  
    xMax : req.query.xMax === undefined ? 100 : req.query.xMax, 
    yMax : req.query.yMax === undefined ? 100 : req.query.yMax, 
    zMax : req.query.zMax === undefined ? 100 : req.query.zMax
  };
    
    res.render('index',conf);
});




module.exports = app;
