var $ = require('jquery');
var Loading = require('./loading');

console.log("Main file loaded");

// This line runs your loading stuff
// You need to think of how to use This
// For example:
// var loading = new Loading("data": <PATH>);
//
// and if user switch data
// we can do loading.loadData(<PATH>);
// and a loading bar with appear, but dont redo the splash animation
var loading = new Loading();
