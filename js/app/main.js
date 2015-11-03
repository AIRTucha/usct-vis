var $ = require('jquery');
var Loading = require('./loading');
var Modes = require('./modes');
var sliders = require('./sliders');

console.log("Main file loaded");
 
var loading = new Loading('#main',function(){
  var s = Snap("#main");
  var w = $(window).width();
  var h = $(window).height();
  var breastSize = $(window).height() / 1.25;
  var fO = s.append(Snap.parse('<foreignObject id="container" width="' + breastSize + 
                               '" height="' + breastSize + '"></foreignObject>'));
  var rcl2;
  
  var tomoConfig = {
		"domContainerId": "container",
		"slicemaps_paths": [
		  'data/phantom1.png',
			'data/phantom2.png',
			'data/phantom3.png',
			'data/phantom4.png',
			'data/phantom5.png',
			'data/phantom6.png',
			'data/phantom7.png',
			'data/phantom8.png',
			'data/phantom9.png'
			],
      "callback" : function(){
        setTimeout(function(){
          loading.stopIcon();         
        }, 500); 
      },    
      "shader_name" : "secondPassFusion",
			"slices_range": [0, 144],			
			"row_col": [4, 4],
			"render_size": [breastSize * .65, breastSize * .65],
			"renderer_canvas_size": [breastSize, breastSize],	
			"opacity_factor": 40,
      "color_factor": 0.4,
			"x_min": 0.0,
			"x_max": 1.0,	
      "l": 7,
      "s" :0.9,
      "hMin" :-0.5,
      "hMax" : 1
		};
  
  var cutterConf = {
    container : '#main',
    title : 'Slice range',
    width : boxWidthCalculation(w, breastSize),
    x :  boxXCalculation(w, breastSize),
    y : h*0.08,
    sliderH : h*0.05,
    sliders :[
      {
        range : true,
        min : 0,
        max : 100,
        values: [ 0, 100 ],
        getText : function (v){return 'X range is ' + textRange(v)},
        callback: function (v){ 
          rcl2.setGeometryMinX(v[0]/100);
          rcl2.setGeometryMaxX(v[1]/100);
        }
      },
      {
        range : true,
        min : 0,
        max : 100,
        values: [ 0, 100 ],
        getText : function (v){return 'Y range is ' + textRange(v)},
        callback: function (v){ 
          rcl2.setGeometryMinY(v[0]/100);
          rcl2.setGeometryMaxY(v[1]/100);
        }
      },
      {
        range : true,
        min : 0,
        max : 100,
        values: [ 0, 100 ],
        getText : function (v){return 'Z range is ' + textRange(v)},
        callback: function (v){  
          rcl2.setGeometryMinZ(v[0]/101);
          rcl2.setGeometryMaxZ(v[1]/101);}
      }
    ]    
  }
  
   var thConf = {
    container : '#main',
    title : 'Threshold',
    sliderH : h*0.05,
    width :  boxWidthCalculation(w, breastSize),
    x :  boxXCalculation(w, breastSize),
    y : h*.05 * 8 + h*.24  ,
    sliders :[
      {
        range : true,
        min : 0,
        max : 100,
        values: [ 0, 100 ],
        getText : function (v){return 'Sound Speed threshold ' + textRange(v)},
        callback: function (v){ 
          rcl2.setMinSos(v[0]/100);
          rcl2.setMaxSos(v[1]/100);
        }
      },
      {
        range : true,
        min : 0,
        max : 100,
        values: [ 0, 100 ],
        getText : function (v){return 'Attenuation threshold ' + textRange(v)},
        callback: function (v){ 
          rcl2.setMinAtten(v[0]/100);
          rcl2.setMaxAtten(v[1]/100);
        }
      },
      {
        range : true,
        min : 0,
        max : 100,
        values: [ 0, 100 ],
        getText : function (v){return 'Reflection threshold ' + textRange(v)},
        callback: function (v){  
          rcl2.setMinRefl(v[0]/100);
          rcl2.setMaxRefl(v[1]/100);
        }
      }
    ]    
  }
   
   var msConf = {
    container : '#main',
    title : 'Main settings',
    sliderH : h*0.05,
    width : boxWidthCalculation(w, breastSize),
    x :   boxXCalculation(w, breastSize),
    y : h*0.05 * 3 + h*0.16,
    sliders :[
      {
        range : 'min',
        min : 0,
        max : 140,
        value: 70,
        getText : function (v){return 'Brightness ' + textSlider(v/0.7)},
        callback: function (v){ 
          rcl2.setL(v/10);
        }
      },
      {
        range : 'min',
        min : 0,
        max : 80,
        value: 40,
        getText : function (v){return 'Darkness ' + textSlider(v/.4)},
        callback: function (v){ 
          rcl2.setColorFactor((80 - v) / 100);
        }
      },
      {
        range : 'min',
        min : 0,
        max : 100,
        value: 80,
        getText : function (v){return 'Opacity ' + textSlider(v)},
        callback: function (v){ 
          rcl2.setOpacityFactor(v/2);
        }
      },
      {
        range : true,
        min : -100,
        max : 200,
        values: [ 0 , 100 ],
        getText : function (v){return 'Color mapping'},
        callback: function (v){ 
          rcl2.setHMin(v[0]/100 - 0.5);
          rcl2.setHMax(v[1]/100);
        }
      },
      {
        range : 'min',
        min : 0,
        max : 180,
        value: 90,
        getText : function (v){return 'Saturation'},
        callback: function (v){ 
          rcl2.setS(v/100);
        }
      },
    ]    
  }
  
  s.select('#container').attr({
    x: w * 0.05,
    y: h*0.035
  });
  
  
    setTimeout(function(){
       rcl2 = new VRC.VolumeRaycaster(tomoConfig);
       Modes(rcl2,'#main'); 
       loading.drawCorners(breastSize);
       sliders(cutterConf);
       sliders(thConf);
       sliders(msConf);
      }, 500);    
});

function textRange(v){
return '<span class = "slider_results">' + 
          Math.round(v[0]) + '% </span> - <span class = "slider_results">' + 
          Math.round(v[1]) +"% </span>"
}

function textSlider(v){
  return '<span class = "slider_results">' + Math.round(v) + "% </span>"
}

function boxWidthCalculation(w, breastSize){
  return w * 0.8 - (breastSize > w/2 ? breastSize : w/2)
}

function boxXCalculation(w, breastSize){
  return (breastSize > w * 0.5) ? w*0.05 + breastSize : w*0.55
}

