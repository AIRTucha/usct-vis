var $ = require('jquery');
var Loading = require('./loading');
var Modes = require('./modes');
var sliders = require('./sliders');

console.log("Main file loaded");
 
var loading = new Loading('#main',function(){
  var s = Snap("#main");
  var w = $(window).width();
  var h = $(window).height();
  var breastSize = $(window).height() / 1.75;
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
			"render_size": [breastSize, breastSize],
			"renderer_canvas_size": [breastSize, breastSize],	
			"opacity_factor": 40,
      "color_factor": 1,
			"x_min": 0.0,
			"x_max": 1.0,	
      "refl":5,
      "sat" :0.9,
      "sos" :0.8
		};
  
  var cutterConf = {
    container : '#main',
    title : 'Slice range',
    width : (w - breastSize )/2 - (w*0.05*2 + h*0.045),
    x : w*0.05 + h*0.04,
    y : h*0.07,
    sliders :[
      {
        range : true,
        min : 0,
        max : 100,
        values: [ 0, 100 ],
        getText : function (v){return '<span class = "slider_results">X range is ' + textRange(v) + "</span>"},
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
        getText : function (v){return '<span class = "slider_results">Y range is ' + textRange(v) + "</span>"},
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
        getText : function (v){return '<span class = "slider_results">Z range is ' + textRange(v) + "</span>"},
        callback: function (v){  
          rcl2.setGeometryMinZ(v[0]/101);
          rcl2.setGeometryMaxZ(v[1]/101);}
      }
    ]    
  }
  
   var thConf = {
    container : '#main',
    title : 'Threshold',
    width : (w - breastSize )/2 - (w*0.05*2 + h*0.045),
    x : w*0.5 + breastSize/2 + h*0.025,
    y : h*0.07,
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
    width : (w - breastSize )/2 - (w*0.05*2 + h*0.045),
    x : w*0.05 + h*0.04,
    y : h*0.07 * 3 + h*0.15,
    sliders :[
      {
        range : 'min',
        min : 0,
        max : 200,
        value: 100,
        getText : function (v){return 'Lightness ' + textSlider(v)},
        callback: function (v){ 
          rcl2.setRefl(v/20);
        }
      },
      {
        range : 'min',
        min : 0,
        max : 200,
        value: 100,
        getText : function (v){return 'Contrast ' + textSlider(v)},
        callback: function (v){ 
          rcl2.setColorFactor(v/100);
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
        range : 'min',
        min : 0,
        max : 160,
        value: 80,
        getText : function (v){return 'Color mappint'},
        callback: function (v){ 
          rcl2.setSos(v/100);
        }
      },
      {
        range : 'min',
        min : 0,
        max : 180,
        value: 90,
        getText : function (v){return 'Saturation'},
        callback: function (v){ 
          rcl2.setSat(v/100);
        }
      },
    ]    
  }
  
  s.select('#container').attr({
    x: $(window).width()*0.5-breastSize/2,
    y: $(window).height()*0.5-breastSize/2
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
          v[0] + '% </span> - <span class = "slider_results">' + 
          v[1] +"% </span>"
}

function textSlider(v){
  return '<span class = "slider_results">' + v + "% </span>"
}

