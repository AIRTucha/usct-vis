/**
* Creates element of GUI which allows to choose mode of visualisation.
**/
var $ = require('jquery');
var Snap = require('snap');
var Tooltip= require('./tooltip');

function modes(conf) {
  var w = $(window).width();
  var h = $(window).height();
  var buttonSize = w / 24;
  
  var s = Snap(conf.container);
  var tl = Tooltip(conf.container);

  modesButtonGenerator(conf.modes);

  function modesButtonGenerator(buttons){ 
    
    
    buttons.forEach(function(b, i){
      
      var fO = s.append(Snap.parse('<foreignObject ' + 
                                   
                                   'width='+ buttonSize + ' ' + 
                                   'height=' + buttonSize*1.3 +  ' ' + 
                                   'x=' + (w*0.05 + buttonSize*(.5+i))  + ' ' +
                                   'y=' + (h*0.95 - buttonSize*1.75) +
                                   (b.name == 'Fusion' ? 
                                   '><div class="mode_button_active"' :  
                                   '><div class="mode_button"') +
                                   'id=' + 'mode' + i + ' ' +
                                   '></div></foreignObject>'));
      
      $('#mode'+i).append('<img ' +
                           'width='+ buttonSize + ' ' + 
                           'height=' + buttonSize +  ' ' +
                           'src=' + b.image + '  />');
      
      $('#mode'+i).append('<p>' + b.name + '</p>' ); 
      
      $('#mode'+i).click(function(){        
        b.callback(b.config);         
        
        $('.mode_button_active').removeClass('mode_button_active').addClass('mode_button');
        
        $('#mode'+i).addClass('mode_button_active');       
      });
      
      tl('#mode'+i)(b.tooltip);
    });      
  }
}

module.exports = modes;


















// 3d buttons 
//
//
//shaders.forEach(function(name, i){
//    s.append(Snap.parse('<foreignObject id="mode' + i + '" width="128" height="128"></foreignObject>'));
//  
//      s.select('#mode' + i).attr({
//        x: $(window).width()*0.07 + 128*i,
//        y: $(window).height()*0.8 
//      });
//
//      config = {
//        "domContainerId": "mode" + i,
//        "slicemaps_paths": [
//          'data/new_data_USCT1.png',
//          'data/new_data_USCT2.png',
//          'data/new_data_USCT3.png',
//          'data/new_data_USCT4.png',
//          'data/new_data_USCT5.png',
//          'data/new_data_USCT6.png',
//          'data/new_data_USCT7.png',
//          'data/new_data_USCT8.png',
//          'data/new_data_USCT9.png'
//          ],
//          "callback" : function(){},
//          "shader_name" : name,
//          "slices_range": [0, 144],
//          "gray_min": 0.05,
//          "gray_max": 0.45,
//          "row_col": [4, 4],
//          "steps": 100,
//          "render_size": [128, 128],
//          "renderer_canvas_size": [128, 128],
//          "absorption_mode": 1,
//          "opacity_factor": 4,
//          "color_factor": 2,
//          "x_min": 0.0,
//          "x_max": 1.0,
//          "auto_steps": true,
//          "tf_colors": [
//            {"pos": 0.25,"color": "#7CFF79"},
//            {"pos": 0.5, "color": "#FF9400"},
//            {"pos": 1.0, "color": "#7F0000"},
//           ],
//          "refl":0.4,
//          "sat" :0.8,
//          "sos" :1
//        };
//                    
//        new VRC.VolumeRaycaster(config);          
//  
