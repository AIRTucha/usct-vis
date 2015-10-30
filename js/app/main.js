var $ = require('jquery');
var Loading = require('./loading');
var Modes = require('./modes');
var sliders = require('./sliders');



console.log("Main file loaded");
 
var loading = new Loading('#main',function(){
  var s = Snap("#main");
  var w = $(window).width();
  var breastSize = $(window).height() / 1.75;
  var fO = s.append(Snap.parse('<foreignObject id="container" width="' + breastSize + 
                               '" height="' + breastSize + '"></foreignObject>'));
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
  
  var slidersConf = {
    container : '#main',
    title : 'Cutter',
    width : w/6,
    sliders :[
      {
        range : true,
        min : 0,
        max : 500,
        values: [ 75, 300 ],
        text : function (v){return "X range is " + v[0] + "% - " + v[1] +"%"},
        callback: function (v){ console.log(v)}
      },
      {
        range : true,
        min : 0,
        max : 500,
        values: [ 75, 300 ],
        text : function (v){return "Y range is " + v[0] + "% - " + v[1] +"%"},
        callback: function (v){ console.log(v)}
      },
      {
        range : true,
        min : 0,
        max : 500,
        values: [ 75, 300 ],
        text : function (v){return "Z range is " + v[0] + "% - " + v[1] +"%"},
        callback: function (v){ console.log(v)}
      }
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
       sliders(slidersConf);
      }, 500);    
});


