var $ = require('jquery');
var Loading = require('./loading');
var Modes = require('./modes');
var sliders = require('./sliders');


(function(namespace) {
  function usctVis(mainConf){

    var w = $(window).width();
    var h = $(window).height();
    var breastHeight = $(window).height() - h * .09 - w / 14;
    var breastWidth = boxXCalculation() - w * 0.05 - h*0.02;

    var colorMapCutOff = [ 70, 100] ;
    var colorMap = [ 0, 100] ;
    var isCuttOffColorMap = false;
    var guiColor = "#40f0ff";

    var slidersSR;
    var slidersMS;
    var slidersTH;
    var rcl2;
    var fO;

    var tomoConfig = {
      "domContainerId": "breast",
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
        "shader_name" : mainConf.shader_name,
        "slices_range": [0, 144],			
        "row_col": [4, 4],
        "render_size": breastHeight > breastWidth ? 
                        [breastHeight * .65, breastHeight * .65 ] : 
                        [breastWidth * .65, breastWidth * .65 ],
        "renderer_canvas_size": [ breastWidth , breastHeight ],	
        "opacity_factor": 40,
        "color_factor": 0.4,
        "x_min": 0.0,
        "x_max": 1.0,	
        "l": 7,
        "s" :0.9,
        "hMin" :-0.5,
        "hMax" : 1,
        "minRefl" : 0,
        "minSos" : 0,
        "minAtten" : 0,  
        "maxRefl" : 1,
        "maxSos" : 1,
        "maxAtten" : 1,
        "zFactor" : 0.56
    };

    var srConf = {
      container : '#main',
      title : 'Slice range',
      width : boxWidthCalculation(),
      x :  boxXCalculation(),
      y : h*0.08,
      color : guiColor,
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
    };

     var thConf = {
      container : '#main',
      title : 'Threshold',
      sliderH : h*0.05,
      width :  boxWidthCalculation(),
      x :  boxXCalculation(),
      y : h*.05 * 8 + h*.24,
      color : guiColor,
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
    };

     var msConf = {
      container : '#main',
      title : 'Main settings',
      sliderH : h*0.05,
      width : boxWidthCalculation(),
      x :   boxXCalculation(),
      y : h*0.05 * 3 + h*0.16,
      color : guiColor,
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
            setHue( rcl2, v);
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
        }
      ]    
    };

     var modesConf = {     
       container : '#main',
       activeMode : mainConf.shader_name,
       modes : [
        {
          image:'/imgs/atten.PNG',
          name:'Attenuation',
          tooltip:'The model shows distribution of areas with high and low attenuation to user via brightness. So, it allows to estimate the attenuation value at the certain point of space.<br>Attenuation can be helpful in an identification of the particular lesion`s type.',
          callback : function (v) {
           rcl2.setMode(v);

           //disable useless sliders 
           slidersMS[3].slider( "disable" );
           slidersMS[4].slider( "disable" );
          },
          config:{
            shader_name:'secondPassAtten'
          }
        },
        {
          image:'/imgs/attenM.PNG',
          name:'Attenuation Max',
          tooltip:'The model shows only parts of breast which have highest attenuation values and allows to look at it more clear.<br>Attenuation can be helpful in an identification of the particular lesion`s type.',
          callback : function (v) {
           rcl2.setMode(v)

           //disable useless sliders 
           slidersMS[3].slider( "disable" );
           slidersMS[4].slider( "disable" );
          },
          config:{
            shader_name:'secondPassAttenMax'
          }
        },
        {
          image:'/imgs/sos.PNG',
          name:'Sound Speed',
          tooltip:'The model shows you distribution of areas with high and low sound speed via brightness. So, it allows to estimate the value of sound speed at certain point of space.<br>High sound speed points doctor to the high probability on breast cancer at the point.',
          callback : function (v) {
           rcl2.setMode(v)

           //disable useless sliders 
           slidersMS[3].slider( "disable" );
           slidersMS[4].slider( "disable" );
          },
          config:{
            shader_name:'secondPassSos'
          }
        },
        {
          image:'/imgs/sosM.PNG',
          name:'Sound Speed Max',
          tooltip:'The model shows user only parts of breast which have highest sound speed values and allows look at more clear.<or>High sound speed points doctor to the high probability on breast cancer at the point.',
          callback : function (v) {
           rcl2.setMode(v)

           //disable useless sliders 
           slidersMS[3].slider( "disable" );
           slidersMS[4].slider( "disable" );
          },
          config:{
            shader_name:'secondPassSosMax'
          }
        },
        {
          image:'imgs/Refl.PNG',
          name:'Reflection',
          tooltip:'The model shows general structures of a breast in high resolution and uses the same principle with traditional ultrasound diagnostics.',
          callback : function (v) {
           rcl2.setMode(v)

           //disable useless sliders 
           slidersMS[3].slider( "disable" );
           slidersMS[4].slider( "disable" );
          },
          config:{
            shader_name:'secondPassRefl'
          }
        },
        {
          image:'/imgs/CuttOffSos.PNG',
          name:'CuttOff Sound Speed',
          tooltip:'Combination of reflectional image with highlighted areas there sound speed data`s values are high.<br>High sound speed points doctor to the high probability on breast cancer at the point.',
          callback : function (v) {
           rcl2.setMode(v);              

           //enable sliders for sat and color range
           slidersMS[3].slider( "enable" );
           slidersMS[4].slider( "enable" );

           if(!isCuttOffColorMap) {
             colorMap = slidersMS[3].slider( "values" );

             //set values for segmentation
             slidersMS[3].slider( "values", colorMapCutOff );
             setHue( rcl2, colorMapCutOff);
             isCuttOffColorMap = true;
           }
          },
          config:{
            shader_name:'secondPassCutOffSos'
          }
        },
        {
          image:'/imgs/CuttOffAtten.PNG',
          name:'CuttOff Attenuation',
          tooltip:'Combination of reflectional image with highlighted areas there attenuational data`s values are high.<br>Attenuation can be helpful in an identification of the particular lesion`s type.',
          callback : function (v) {
           rcl2.setMode(v)

           //enable sliders for sat and color range
           slidersMS[3].slider( "enable" );
           slidersMS[4].slider( "enable" );

           if(!isCuttOffColorMap) {
             colorMap = slidersMS[3].slider( "values" );

             //set values for segmentation
             slidersMS[3].slider( "values", colorMapCutOff );
             setHue( rcl2, colorMapCutOff);
             isCuttOffColorMap = true;
           }
          },
          config:{
            shader_name:'secondPassCutOffAtten'
          }
        },
        {
          image:'/imgs/RA.PNG',
          name:'Refl+Atten',
          tooltip:'Combination of reflection and attenuation allows to evaluate structure and an attenuation at the same time.<br>The reflectional data is represented by gray scale gradation and attenuation is shown via color. Human eye is more sensitive to the hue of the color than to the saturation that`s why the mode is useful when detalization of attentional data is important.',
          callback : function (v) {
           rcl2.setMode(v)

           //enable sliders for sat and color range
           slidersMS[3].slider( "enable" );
           slidersMS[4].slider( "enable" );

           if(isCuttOffColorMap) {
             colorMapCutOff = slidersMS[3].slider( "values" );

             //set values for segmentation
             slidersMS[3].slider( "values", colorMap );
             setHue( rcl2, colorMap);
             isCuttOffColorMap = false;
           }
          },
          config:{
            shader_name:'secondPassAR'
          }
        },    
        {
          image:'/imgs/fusion.PNG',
          name:'Fusion',
          callback : function (v) {
           rcl2.setMode(v)

           //enable sliders for sat and color range
           slidersMS[3].slider( "enable" );
           slidersMS[4].slider( "enable" );

           if(isCuttOffColorMap) {
             colorMapCutOff = slidersMS[3].slider( "values" );

             //set values for segmentation
             slidersMS[3].slider( "values", colorMap );
             setHue( rcl2, colorMap);
             isCuttOffColorMap = false;
           }
          },
          tooltip:'Combination of three different modalities demonstrates the most complete way to visualize USCT data, it allows to evaluate structure, sound speed and attenuation at the same time.<br>The reflectional data is represented by gray scale gradation, sound speed by color and attenuation is shown via saturation of the color.',
          config:{
            shader_name:'secondPassFusion'
          }
        },
        {
          image:'/imgs/sr.PNG',
          name:'Sos+Refl',
          tooltip:'Combination of reflection and sound speed allows to evaluate structure and sound speed at the same time.<br>The reflectional data is represented by grayscale gradation and sound speed is shown via color. The mode can be more helpful than fusion of three modalities, because it can be difficult to determine color in areas with high attenuation for normal fusion.',
          callback : function (v) {
           rcl2.setMode(v)

           //enable sliders for sat and color range
           slidersMS[3].slider( "enable" );
           slidersMS[4].slider( "enable" );

           if(isCuttOffColorMap) {
             colorMapCutOff = slidersMS[3].slider( "values" );

             //set values for segmentation
             slidersMS[3].slider( "values", colorMap );
             setHue( rcl2, colorMap);
             isCuttOffColorMap = false;
           }
          },
          config:{
            shader_name:'secondPassSR'
          }
        }   
      ]
     };

    //magic starts here
    var loading = new Loading('#main', guiColor, "r(0.5, 0.8, 1)#30385f-#000", function(){ 
      var s = Snap("#main");

      s.append(Snap.parse('<foreignObject id="breast" width="' + breastWidth + 
                               '" height="' + breastHeight + '"></foreignObject>'));

      s.select('#breast').attr({
        x: w * 0.05 + h*0.016,
        y: h*0.04
      });

      //starts tomo and gui, on the end of animation, timeout for smothness
      setTimeout(function(){

        rcl2 = new VRC.VolumeRaycaster(tomoConfig);

        Modes(modesConf); 

        slidersSR = sliders(srConf);
        slidersMS = sliders(msConf);
        slidersTH = sliders(thConf);

      },500);

      //resize action
      var resizeEvt;
      $(window).resize(function(){
        clearTimeout(resizeEvt);
        resizeEvt = setTimeout(function() {
          window.location.href = window.location.href;
      }, 500); 
      });      
    });

    /*
    * generate right string for range sliders
    */
    function textRange(v){
      return '<span style = "color : ' + guiColor + '">' + 
              Math.round(v[0]) + '% </span> - <span style = "color : ' + guiColor + '">' + 
              Math.round(v[1]) +"% </span>"
    }
    /*
    * generate right string for sliders
    */
    function textSlider(v){
      return '<span style = "color : ' + guiColor + '">' + Math.round(v) + "% </span>"
    }

    function boxWidthCalculation(){
      return w / 4;
    }

    function boxXCalculation(){
      return w*.9 - boxWidthCalculation() - h*0.06;
    }

    function setHue(obj,v){  
      obj.setHMin(v[0]/100 - 0.5);
      obj.setHMax(v[1]/100);
    }
  }

  namespace.usctVis = usctVis;

})(window);

