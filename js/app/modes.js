/**
* Creates element of GUI which allows to choose mode of visualisation.
**/
var $ = require('jquery');
var Snap = require('snap');
var Tooltip= require('./tooltip');

function modes(obj, container, callback) {
  var w = $(window).width();
  var h = $(window).height();
  var size = w / 3;
  var buttonSize = size / 8;
  
  var s = Snap(container);
  var tl = Tooltip(container);

  modesButtonGenerator([
    {
      image:'/imgs/atten.PNG',
      name:'Attenuation',
      tooltip:'The model shows distribution of areas with high and low attenuation to user via brightness. So, it allows to estimate the attenuation value at the certain point of space.<br>Attenuation can be helpful in an identification of the particular lesion`s type.',
      config:{
        shader_name:'secondPassAtten',
        gray_min : 0.1,
        gray_max : 0.9,
        color_factor : 2,
        sos : 1,
        sat : 0.8,
        refl: 0.4
      }
    },
    {
      image:'/imgs/attenM.PNG',
      name:'Attenuation Max',
      tooltip:'The model shows only parts of breast which have highest attenuation values and allows to look at it more clear.<br>Attenuation can be helpful in an identification of the particular lesion`s type.',
      config:{
        shader_name:'secondPassAttenMax'
      }
    },
    {
      image:'/imgs/sos.PNG',
      name:'Sound Speed',
      tooltip:'The model shows you distribution of areas with high and low sound speed via brightness. So, it allows to estimate the value of sound speed at certain point of space.<br>High sound speed points doctor to the high probability on breast cancer at the point.',
      config:{
        shader_name:'secondPassSos'
      }
    },
    {
      image:'/imgs/sosM.PNG',
      name:'Sound Speed Max',
      tooltip:'The model shows user only parts of breast which have highest sound speed values and allows look at more clear.<or>High sound speed points doctor to the high probability on breast cancer at the point.',
      config:{
        shader_name:'secondPassSosMax'
      }
    },
    {
      image:'imgs/Refl.PNG',
      name:'Reflection',
      tooltip:'The model shows general structures of a breast in high resolution and uses the same principle with traditional ultrasound diagnostics.',
      config:{
        shader_name:'secondPassRefl'
      }
    },
    {
      image:'/imgs/CuttOffSos.PNG',
      name:'CuttOff Sound Speed',
      tooltip:'Combination of reflectional image with highlighted areas there sound speed data`s values are high.<br>High sound speed points doctor to the high probability on breast cancer at the point.',
      config:{
        shader_name:'secondPassCutOffSos'
      }
    },
    {
      image:'/imgs/CuttOffAtten.PNG',
      name:'CuttOff Attenuation',
      tooltip:'Combination of reflectional image with highlighted areas there attenuational data`s values are high.<br>Attenuation can be helpful in an identification of the particular lesion`s type.',
      config:{
        shader_name:'secondPassCutOffAtten'
      }
    },
    {
      image:'/imgs/RA.PNG',
      name:'Refl+Atten',
      tooltip:'Combination of reflection and attenuation allows to evaluate structure and an attenuation at the same time.<br>The reflectional data is represented by gray scale gradation and attenuation is shown via color. Human eye is more sensitive to the hue of the color than to the saturation that`s why the mode is useful when detalization of attentional data is important.',
      config:{
        shader_name:'secondPassAR'
      }
    },    
    {
      image:'/imgs/fusion.PNG',
      name:'Fusion',
      tooltip:'Combination of three different modalities demonstrates the most complete way to visualize USCT data, it allows to evaluate structure, sound speed and attenuation at the same time.<br>The reflectional data is represented by gray scale gradation, sound speed by color and attenuation is shown via saturation of the color.',
      config:{
        shader_name:'secondPassFusion'
      }
    },
    {
      image:'/imgs/sr.PNG',
      name:'Sos+Refl',
      tooltip:'Combination of reflection and sound speed allows to evaluate structure and sound speed at the same time.<br>The reflectional data is represented by grayscale gradation and sound speed is shown via color. The mode can be more helpful than fusion of three modalities, because it can be difficult to determine color in areas with high attenuation for normal fusion.',
      config:{
        shader_name:'secondPassSR'
      }
    }   
  ]);

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
        obj.setMode(b.config);         
        
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
