/**
* Greate box sci-fi box 
**/
var $ = require('jquery');
var Snap = require('snap');

/*
* Instanciate the box 
* @param - String points SVG element
* @param - String title of the box
* @param - int width
* @param - int hiegth
* @param - String color
*/
function box(container, text, boxW, boxH, w, h, color) {
  var s = Snap(container);
  
  //set coordinates for elements
  var frame = s.polyline([  
    //left top corner
      0, h*0.01,
      h*0.01, 0,
    //rigth top corner
      boxW, 0,
      boxW, h*0.035,
      boxW-h*0.01, h*0.045,
    //right bottom corner
      boxW-h*0.01, boxH - h*0.050,
      boxW-h*0.005, boxH - h*0.045,
      boxW-h*0.005, boxH - h*0.03,
      boxW-h*0.01, boxH - h*0.025,
      boxW-h*0.035, boxH,
      boxW-h*0.045, boxH,
      boxW-h*0.05, boxH-h*0.005,
    //left bottom corner
      h*0.05, boxH-h*0.005,
      h*0.045, boxH,
      h*0.01, boxH,
      0, boxH - h*0.01,
      0, h*0.01      
    ]);
  
  var rigthTop = s.polyline([      
    //rigth top corner
      boxW, 0,
      boxW, h*0.007,
      boxW-h*0.014, h*0.007,
      boxW-h*0.021, 0,   
    ]);
  
  var leftTop = s.polyline([      
    //left top corner
      0, h*0.01,
      h*0.01, 0,
      boxW*0.7, 0,
      boxW*0.7-h*0.02, h*0.02,
      h*0.01, h*0.02,
      0, h*0.03
    ]);
  
  var leftBottom = s.polyline([      
    //left top corner
      h*0.05, boxH-h*0.005,
      h*0.045, boxH,
      h*0.01, boxH,
      0, boxH - h*0.01,
      0, boxH*0.6,
      h*0.003, boxH*0.6 + h*0.003,
      h*0.003, boxH - h*0.02,
      h*0.013, boxH - h*0.01,
      boxW*0.7,boxH - h*0.01,
      boxW*0.7+h*0.01,boxH - h*0.005,
    ]);
  
  var rigth = s.polyline([
      boxW-h*0.01, h*0.045,
      boxW-h*0.007, h*0.047,
      boxW-h*0.007, boxH - h*0.053,
      boxW-h*0.01, boxH - h*0.05

    ]);
  
  var rect = s.rect(0, 0, boxW, boxH);
  
  var txt = s.text(h*0.02, h*0.015, text);
  
  //set properties 
  rect.attr({
      stroke  : "white",
      "fill" : "white"
    });
  
  txt.attr({
      stroke  : "black",
      "fill" : "black",
      "font-size": "1.5vh"
    });
  
  
  rigthTop.attr({
      stroke  : color,
      "fill" : color
    });
  
  leftTop.attr({
      stroke  : color,
      "fill" : color
    });
  
  leftBottom.attr({
      stroke  : color,
      "fill" : color
    });
  
  rigth.attr({
      stroke  : color,
      "fill" : color
    });
  
  frame.attr({
      stroke  : color,
      "fill-opacity" : 0
    });
  
  //create title as hole in the top element of box
  var box = s.group(frame, rigthTop, leftTop, leftBottom, rigth, frame);
  var mask = s.group(rect, txt);
  
  box.attr({mask : mask, id : text + '_Box', opacity : 0.75});  
  
  return box;
}

module.exports = box;
 