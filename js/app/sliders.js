/**
* Create sliders in accoding with config object
**/
var $ = require('jquery');
var Snap = require('snap');
var Box = require('./box');

//trun on jq-ui
require('jquery-ui');

//var box = Box("#main","test",breastSize,breastSize);

 
 

function sliders(conf) {
  var w = $(window).width();
  var h = $(window).height();
  var s = Snap(conf.container);
  var sliderH = h*0.07;
  
  conf.sliders.forEach(function(d,i,ds){
    var fO = s.append(Snap.parse('<foreignObject ' +                                    
                                   'width=' + conf.width + ' ' + 
                                   'height=' + sliderH +  ' ' + 
                                   'x=' + h*0.02  + ' ' +
                                   'y=' + (sliderH*i+h*0.1) + '>' +
                                   '<p id=' + 'result_' + conf.title.replace(' ','_') + i + '></p>' +
                                   '<div id=' + 'slider_' + conf.title.replace(' ','_') + i + ' ' +
                                   '></div></foreignObject>'));
    
    $('#slider_' + conf.title.replace(' ','_') + i).css({'width':conf.width,'margin-top':sliderH/8 });    
   
    $('#slider_' + conf.title.replace(' ','_') + i).slider({
      range : d.range,
      min : d.min,
      max : d.max,
      values : d.values,
      slide : function( event, ui ) {
        $('#result_' + conf.title.replace(' ','_') + i).text(d.text(ui.values));
        d.callback(ui.values);
      }
    });
    
    $('#result_' + conf.title.replace(' ','_') + i).text(
      d.text([
        $('#slider_' + conf.title.replace(' ','_') + i).slider("values", 0),
        $('#slider_' + conf.title.replace(' ','_') + i).slider( "values", 1)
      ]));
  });   
}

module.exports = sliders;
