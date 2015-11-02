/**
* Create sliders in accoding with config object
**/
var $ = require('jquery');
var Snap = require('snap');
var Box = require('./box');

//trun on jq-ui
require('jquery-ui');

/*
* Great sliders 
* @param conf = {
    container : plase holder Class or ID (String)
    title : sliders block name (String)
    width : width of sliders (int)
    x : int
    y : int
    //array with personal sliders settings
    sliders :[
      {
        range : true,
        min : 0,
        max : 500,
        values: [ 75, 300 ],
        text : function (v){return "X range is " + v[0] + "% - " + v[1] +"%"},
        callback: function (v){ console.log(v)}
      },
*/
 
function sliders(conf) {
  var w = $(window).width();
  var h = $(window).height();
  var s = Snap(conf.container);
  var sliderH = h*0.07;
  var box = Box("#main", conf.title, conf.width + h*0.06, sliderH*conf.sliders.length + h*0.04);
  
  box.attr({transform : 'translate(' + conf.x + ',' + conf.y + ')'});
  
  conf.sliders.forEach(function(d,i,ds){
    var fO = s.append(Snap.parse('<foreignObject ' +                                    
                                   'width=' + conf.width + ' ' + 
                                   'height=' + sliderH +  ' ' + 
                                   'x=' + (h*0.025 + conf.x) + ' ' +
                                   'y=' + ((sliderH*i+h*0.04) + conf.y) +
                                   ' id=' + conf.title.replace(' ','_') + i + '>' +                                   
                                   '<div id=' + 'slider_' + conf.title.replace(' ','_') + i + ' ' +
                                   '></div></foreignObject>'));
    
    $('#slider_' + conf.title.replace(' ','_') + i).css({'width':conf.width,'margin-top':sliderH/8 });    
   
   
    
    if(d.range == true){
      $('#slider_' + conf.title.replace(' ','_') + i).slider({
        range : d.range,
        min : d.min,
        max : d.max,
        values : d.values,
        slide : function( event, ui ) {
          $('#result_' + conf.title.replace(' ','_') + i).remove();
          $('#' + conf.title.replace(' ','_') + i).prepend(
            '<p id=' + 
            'result_' + conf.title.replace(' ','_') + i + '>'+ 
            d.getText(ui.values) + 
            '</p>' 
          );
          d.callback(ui.values);
        }
      });
      
      $('#' + conf.title.replace(' ','_') + i).prepend(
        '<p id=' + 
        'result_' + conf.title.replace(' ','_') + i + '>'+ 
        d.getText([
          $('#slider_' + conf.title.replace(' ','_') + i).slider("values", 0),
          $('#slider_' + conf.title.replace(' ','_') + i).slider( "values", 1)
        ]) + 
        '</p>' 
      );
    }
    else {
      $('#slider_' + conf.title.replace(' ','_') + i).slider({
        range : d.range,
        min : d.min,
        max : d.max,
        value : d.value,
        slide : function( event, ui ) {
          $('#result_' + conf.title.replace(' ','_') + i).remove();
          $('#' + conf.title.replace(' ','_') + i).prepend(
            '<p id=' + 
            'result_' + conf.title.replace(' ','_') + i + '>'+ 
            d.getText(ui.value) + 
            '</p>' 
          );
          d.callback(ui.value);
        }
      });
      
      $('#' + conf.title.replace(' ','_') + i).prepend(
        '<p id=' + 
        'result_' + conf.title.replace(' ','_') + i + '>'+ 
        d.getText($('#slider_' + conf.title.replace(' ','_') + i).slider("value")) + 
        '</p>' 
      );
    }
  });
  
  
  
}

module.exports = sliders;
