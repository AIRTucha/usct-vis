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
    var urlUpdate = URLUpdator();

    var slidersSR;
    var slidersMS;
    var slidersTH;
    var rcl2;
    var fO;
       
    var tomoConfig = {
      "domContainerId": "breast",
      "slicemaps_paths": [
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_1.png',
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_2.png',
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_3.png',
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_4.png',
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_5.png',
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_6.png',
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_7.png',
        'data/Jena_P16_km3-OverlaysNew_oldTransm-reflXY_fused_4x4_8.png'     
        ],
        "callback" : function(){
          setTimeout(function(){
            loading.stopIcon();           
          }, 500); 
        },    
        "shader_name" : mainConf.shader_name,
        "slices_range": [0, 128],			
        "row_col": [4, 4],
        "render_size": breastHeight > breastWidth ? 
                        [breastHeight * .65, breastHeight * .65 ] : 
                        [breastWidth * .65, breastWidth * .65 ],
        "renderer_canvas_size": [ breastWidth , breastHeight ],	
        "opacity_factor": mainConf.opacity_factor / 2,
        "color_factor": (80 - mainConf.color_factor * 0.4) / 100,
        "x_min": 0,
        "x_max": 
      1,
        "l": parseFloat(mainConf.l) * 0.049,
        "s" : parseFloat(mainConf.s) / 100,
        "hMin" : (parseFloat(mainConf.hMin) / 100) - 0.5,
        "hMax" : parseFloat(mainConf.hMax) / 100,
        "minRefl" : parseFloat(mainConf.minRefl) / 100,
        "minSos" : parseFloat(mainConf.minSos) / 100,
        "minAtten" : parseFloat(mainConf.minAtten) / 100, 
        "maxRefl" : parseFloat(mainConf.maxRefl) / 100,
        "maxSos" : parseFloat(mainConf.maxSos) / 100,
        "maxAtten" : parseFloat(mainConf.maxAtten) / 100,
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
          values: [ mainConf.xMin, mainConf.xMax ],
          getText : function (v){return 'X range is ' + textRange(v)},
          callback: function (v){ 
            rcl2.setGeometryMinX(v[0]/100);
            rcl2.setGeometryMaxX(v[1]/100);
            
            urlUpdate({xMin : v[0], xMax : v[1]});
          }
        },
        {
          range : true,
          min : 0,
          max : 100,
          values: [ mainConf.yMin, mainConf.yMax ],
          getText : function (v){return 'Y range is ' + textRange(v)},
          callback: function (v){ 
            rcl2.setGeometryMinY(v[0]/100);
            rcl2.setGeometryMaxY(v[1]/100);
            
            urlUpdate({yMin : v[0], yMax : v[1]});
          }
        },
        {
          range : true,
          min : 0,
          max : 100,
          values: [ mainConf.zMin, mainConf.zMax ],
          getText : function (v){return 'Z range is ' + textRange(v)},
          callback: function (v){  
            rcl2.setGeometryMinZ(v[0]/101);
            rcl2.setGeometryMaxZ(v[1]/101);
          
            urlUpdate({zMin : v[0], zMax : v[1]});
          }
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
          values: [ mainConf.minSos, mainConf.maxSos ],
          getText : function (v){return 'Sound Speed threshold ' + textRange(v)},
          callback: function (v){ 
            rcl2.setMinSos(v[0]/100);
            rcl2.setMaxSos(v[1]/100);
            
            urlUpdate({minSos : v[0], maxSos : v[1]});
          }
        },
        {
          range : true,
          min : 0,
          max : 100,
          values: [ mainConf.minAtten, mainConf.maxAtten ],
          getText : function (v){return 'Attenuation threshold ' + textRange(v)},
          callback: function (v){ 
            rcl2.setMinAtten(v[0]/100);
            rcl2.setMaxAtten(v[1]/100);
            
            urlUpdate({minAtten : v[0], maxAtten : v[1]});
          }
        },
        {
          range : true,
          min : 0,
          max : 100,
          values: [ mainConf.minRefl, mainConf.maxRefl ],
          getText : function (v){return 'Reflection threshold ' + textRange(v)},
          callback: function (v){  
            rcl2.setMinRefl(v[0]/100);
            rcl2.setMaxRefl(v[1]/100);
          
            urlUpdate({minRefl : v[0], maxRefl : v[1]});
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
          value: mainConf.l * 0.7,
          getText : function (v){return 'Brightness ' + textSlider(v/0.7)},
          callback: function (v){ 
            rcl2.setL(v/10);
            
            urlUpdate({l : Math.round(v/0.7)});
          }
        },
        {
          range : 'min',
          min : 0,
          max : 80,
          value: mainConf.color_factor * 0.4,
          getText : function (v){return 'Darkness ' + textSlider(v/.4)},
          callback: function (v){ 
            rcl2.setColorFactor((80 - v) / 100);
            
            urlUpdate({darkness : v/.4});
          }
        },
        {
          range : 'min',
          min : 0,
          max : 100,
          value: mainConf.opacity_factor,
          getText : function (v){return 'Opacity ' + textSlider(v)},
          callback: function (v){ 
            rcl2.setOpacityFactor(v/2);
            
            urlUpdate({opacity : v});
          }
        },
        {
          range : true,
          min : -100,
          max : 200,
          values: [ mainConf.hMin , mainConf.hMax ],
          getText : function (v){return 'Color mapping'},
          callback: function (v){ 
            setHue( rcl2, v);
            
            urlUpdate({hMin : v[0], hMax : v[1]});
          }
        },
        {
          range : 'min',
          min : 0,
          max : 180,
          value: mainConf.s * 0.9,
          getText : function (v){return 'Saturation ' + textSlider(v/9*10)},
          callback: function (v){ 
            rcl2.setS(v/100);
            
            urlUpdate({s : Math.round(v/9*10)});
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
           urlUpdate(v);

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
           urlUpdate(v);

           //disable useless sliders 
           slidersMS[3].slider( "disable" );
           slidersMS[4].slider( "enable" );
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
           urlUpdate(v);

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
           urlUpdate(v);

           //disable useless sliders 
           slidersMS[3].slider( "disable" );
           slidersMS[4].slider( "enable" );
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
           urlUpdate(v);

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
           urlUpdate(v);

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
           urlUpdate(v);
            
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
           urlUpdate(v);

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
           urlUpdate(v);

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
           urlUpdate(v);

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
      
        //set presetted slice ranges
        rcl2.setGeometryMinX(mainConf.xMin/101);
        rcl2.setGeometryMaxX(mainConf.xMax/101);

        rcl2.setGeometryMinY(mainConf.yMin/101);
        rcl2.setGeometryMaxY(mainConf.yMax/101);

        rcl2.setGeometryMinZ(mainConf.zMin/101);
        rcl2.setGeometryMaxZ(mainConf.zMax/101);
       

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
    
    function URLUpdator(){
      var conf = {
        shader_name    : mainConf .shader_name.toLowerCase().indexOf('fusion') > -1 ? 
                                                                null : mainConf.shader_name,
        opacity        : mainConf.opacity_factor       == 80  ? null : mainConf.opacity_factor,
        darkness       : mainConf.color_factor         == 100 ? null : mainConf.color_factor,
        l              : parseFloat(mainConf.l)        == 100 ? null : parseFloat(mainConf.l),
        s              : parseFloat(mainConf.s)        == 100 ? null : parseFloat(mainConf.s),
        hMin           : parseFloat(mainConf.hMin)     == 0   ? null : (parseFloat(mainConf.hMin)),
        hMax           : parseFloat(mainConf.hMax)     == 100 ? null : parseFloat(mainConf.hMax),
        minRefl        : parseFloat(mainConf.minRefl)  == 0   ? null : parseFloat(mainConf.minRefl),
        minSos         : parseFloat(mainConf.minSos)   == 0   ? null : parseFloat(mainConf.minSos),
        minAtten       : parseFloat(mainConf.minAtten) == 0   ? null : parseFloat(mainConf.minAtten), 
        maxRefl        : parseFloat(mainConf.maxRefl)  == 100 ? null : parseFloat(mainConf.maxRefl),
        maxSos         : parseFloat(mainConf.maxSos)   == 100 ? null : parseFloat(mainConf.maxSos),
        maxAtten       : parseFloat(mainConf.maxAtten) == 100 ? null : parseFloat(mainConf.maxAtten),
        xMax           : parseFloat(mainConf.xMax)     == 100 ? null : parseFloat(mainConf.xMax),
        xMin           : parseFloat(mainConf.xMin)     == 0   ? null : parseFloat(mainConf.xMin),
        yMax           : parseFloat(mainConf.yMax)     == 100 ? null : parseFloat(mainConf.yMax),
        yMin           : parseFloat(mainConf.yMin)     == 0   ? null : parseFloat(mainConf.yMin),
        zMax           : parseFloat(mainConf.zMax)     == 100 ? null : parseFloat(mainConf.zMax),
        zMin           : parseFloat(mainConf.zMin)     == 0   ? null : parseFloat(mainConf.zMin)
      }
      
      return function (settings) {
        var url = '/?';
        
        Object.keys(settings).forEach(function (sName){
          if (conf[sName] != settings[sName]) 
            conf[sName] = settings[sName];
        });
        
        Object.keys(conf).forEach(function (cName, i){        
          if(conf[cName] != null)            
            url += '&' + cName + '=' + conf[cName];          
        });
            
        window.history.pushState('page', 'Title', url);
      }
    }
  }

  namespace.usctVis = usctVis;

})(window);

