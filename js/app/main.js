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
var loading = new Loading(function(){
 
  $('#container').css({"x":$(window).width()*0.5-256,"y":$(window).height()*0.5-256})    
             
			config = {
				"dom_container_id": "container",
				"slicemaps_paths": [
		                'data/new_data_USCT1.png',
                    'data/new_data_USCT2.png',
                    'data/new_data_USCT3.png',
                    'data/new_data_USCT4.png',
                    'data/new_data_USCT5.png',
                    'data/new_data_USCT6.png',
                    'data/new_data_USCT7.png',
                    'data/new_data_USCT8.png',
                    'data/new_data_USCT9.png'
				],
        "callback" : function(){
        setTimeout(function(){loading.stopIcon()}, 500); 
        },
				"slices_range": [0, 144],
				"gray_min": 0.05,
				"gray_max": 0.45,
				"row_col": [4, 4],
				"steps": 100,
				"render_size": [512, 512],
				"renderer_canvas_size": [512, 512],
				"absorption_mode": 1,
				"opacity_factor": 4,
				"color_factor": 2,
				"x_min": 0.0,
				"x_max": 1.0,
				"auto_steps": true,
				"tf_colors": [
	                {"pos": 0.25,"color": "#7CFF79"},
	                {"pos": 0.5, "color": "#FF9400"},
	                {"pos": 1.0, "color": "#7F0000"},
	            ],
                "refl":0.4,
                "sat" :0.8,
                "sos" :1
                
			};
  
   rcl2 = new VRC.VolumeRaycaster(config);
  
});
