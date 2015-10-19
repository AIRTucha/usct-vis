/**
* SVG loading animation
* organisation : kit-ipe
**/
var $ = require('jquery');
var Snap = require('snap');

function Loading() {

  var w = $(window).width();
  var h = $(window).height();
  
  var s = Snap("#main").attr({
    width  : w,
    height : h
  });
  
  var bg = s.rect(0, 0, w, h);
  var frame = s.rect(w*0.4, h*0.35, w*0.2, h*0.2);
  
  var pLeftFrame  = creatHalfFrame(w*0.4, h*0.4, 1);  
  var pRightFrame = creatHalfFrame(w*0.6, h*0.4, -1);
  
  var lineUp = s.line(w*0.5, 0, w*0.5, h*0.35);
  var lineDown = s.line(w*0.5, h,w*0.5, h*0.55);
  
  var loadingIcon = creatLoadingIcon(w*0.5, h*0.47);
  
  var cLeftTop = s.polyline([
     0, h*0.03-6,
     0, h*0.07, -6,
     h*0.07-6, -6,
     h*0.03-6, w*0.03-12,
     h*0.03-6, w*0.03,
     h*0.03, 0, h*0.03
    ]);
  
  var cRightTop = s.polyline([
      0, h*0.03-6,
      0, h*0.07, 6,
      h*0.07-6, 6,
      h*0.03-6, 12-w*0.03,
      h*0.03-6, -w*0.03,
      h*0.03, 0, h*0.03
     ]);
  
  var cLeftBottom = s.polyline([  
      0, 6-h*0.03,
      0,-h*0.07, -6,
      6-h*0.07, -6,
      6-h*0.03, w*0.03-12,
      6-h*0.03, w*0.03,
      -h*0.03, 0, -h*0.03
    ]);
  
  var cRightBottom = s.polyline([ 
     0, 6-h*0.03,
     0, -h*0.07,
     6, 6-h*0.07,
     6, 6-h*0.03,
     12-w*0.03, 6-h*0.03,
     -w*0.03, -h*0.03,
     0, -h*0.03
    ]);
  
  var logo;
  
  //make app almost full screen
  $("body").css("overflow", "hidden")
           .css("background", "black");  
    
  bg.attr({ fill : s.gradient("r(0.5, 0.5, 1)#30385f-#000") });
	  
  frame.attr({
    fill : "black",
    stroke : "white",
    "fill-opacity" : 0
  });
     
  Snap.load("/logo.svg", function(f){
    logo=f.select('#usct-logo')
    logo.scale = w/4000;
    s.append(logo);
    
    logo.transform('matrix('
      + logo.scale + ',0,0,' + logo.scale + ','
      + w*0.405 + ',' + h*0.4 + ')'
    );
  });

  
  //set vertical lines on top and bottom
  lineUp.attr({stroke : "white"}); 
  lineDown.attr({stroke : "white"}); 		
  
  //set corners
  cLeftTop.attr({
   fill : "#fff",
   stroke : "#fff"
  });  
  cLeftTop.attr({transform : 'translate('+w*0.4+','+h*0.32+')'});
      
  cRightTop.attr({
    fill : "#fff",
    stroke : "#fff"
  }); 
  cRightTop.attr({transform:'translate(' + w*0.6 + ',' + h*0.32 + ')'});
    
  cLeftBottom.attr({
    fill : "#fff",
    stroke : "#fff"
  });  
  cLeftBottom.attr({transform : 'translate('+w*0.4+','+h*0.58+')'});   
     
  cRightBottom.attr({
    fill : "#fff",
    stroke : "#fff"
  }); 
  cRightBottom.attr({transform : 'translate(' + w*0.6 + ',' + h*0.58 + ')'});
    
  // animation starts
  setTimeout(function(){ 
    loadingIconAnimation(mina.easeinout, 300);
    openScreenAnimation(mina.easeinout, 300);
  }, 1000);

  
 /**
 * @function the end of loading the main screen opens
 * @param snap.mina - mode for animation acceleration
 * @param duration of anymation ms int
 */  
  function openScreenAnimation(animationMode,duration ){
        
    //main frame animation
    frame.animate({
      x : w*0.05,
      y : window.innerHeight*0.035,
      width : w*0.9,
      height : window.innerHeight*0.9
      },
      duration,animationMode
     );
    
    //corners
    cLeftTop.animate({
      transform : 'translate(' + w*0.05 + ',' + h*0.005 + ')'
     },
      duration, animationMode);
    
    cRightTop.animate({
     transform : 'translate(' + w*0.95 + ',' + h*0.005 + ')'
    },
     duration, animationMode);
    
    cLeftBottom.animate({
     transform : 'translate(' + w*0.05 + ',' + h*0.965 + ')'
    },
     duration, animationMode);
    
    cRightBottom.animate({
      transform : 'translate(' + w*0.95 + ',' + h*0.965 + ')'
    },
      duration, animationMode);

    pLeftFrame.animate({
      transform : 'translate(' + w*0.05 + ',' + h*0.4 + ')'
    },
      duration, animationMode);
    pRightFrame.animate({
     transform : 'translate(' + w*0.95 + ',' + h*0.4 + ')'
    },                        
     duration, animationMode);
    
    
    // vertical lines on top and on bottom
    lineUp.animate({
      transform : 'translate(' + 0 + ',' + -h*0.315 + ')'
    },
      duration, animationMode);
    
    lineDown.animate({
      transform  : 'translate(' + 0 + ',' + h*0.385 + ')'
    },
     duration, animationMode);
    
    
    //logo moved to corner
    logo.animate({
      transform : 'matrix('
      + logo.scale + ',0,0,' + logo.scale + ','
      + w*0.75 + ',' + h*0.87 + ')'
    },
      duration, animationMode);
  }
  
   /**
   * @function create image of part of the frame 
   * @param x, y {int} coordinates position
   * @param d {int} scaling on x axis
   */
  function creatHalfFrame(x, y, d){     

    var pLeftS = s.polyline([
     d, h*0.03,
     d, h*0.07,
     -1*d, h*0.07-4,
     -1*d, h*0.03+4
    ]);   
        
    var pLeftM = s.polyline([
      0, -0.02*h,
      0, h*0.12,
      -6*d, h*0.12-6,
      -6*d, 6-0.02*h
    ]);

    var pLeftB = s.polyline([
     0, -h*0.05,
     0, h*0.15,
     10*d, h*0.15-10,
     10*d, -h*0.05+10,
     0,-h*0.05
    ]); 
    
    var lineLeft = s.line(-w*0.4*d, h*0.05, -5*d, h*0.05);
    var halfFrame = s.group(pLeftB, pLeftM, pLeftS, lineLeft);
    
    pLeftB.attr({
      stroke  : "white",
      "opacity" : 0.5,
      "fill-opacity" : 0
    });
    
    lineLeft.attr({stroke : "white"});
    setColor('#000020')(pLeftS);
    setColor('#ffffff')(pLeftM);
    
    halfFrame.attr({transform:'translate(' + x + ',' + y + ')'});
        
    return halfFrame;
  }
  
  /**
  * @function create loading icon
  * @param x, y {int} coordinates position    
  */
  function creatLoadingIcon(x, y){
    x-=h*0.02; // centralizetion 
    
    var tl = [x, y];              // top left corner
    var tr = [x+h*0.04, y];       // top right corner
    var c = [x+h*0.02, y+h*0.02]; // center
    var bl = [x, y+h*0.04];       // bottom left
    var br = [x+h*0.04, y+h*0.04];// bottom right 
        
    var top = s.polyline([tl, tr, c]);    
    var right = s.polyline([tr, br, c]);    
    var bottom = s.polyline([bl, br, c]);    
    var left = s.polyline([bl, tl, c]);  
      
    setColor('#ffffff')(top);
    setColor('#ffffff')(bottom);
    setColor('#ffffff')(left);
    setColor('#ffffff')(right);
       
    var icon = s.group(top, bottom, left, right);  
    
    icon.top = top;
    icon.bottom = bottom;
    icon.left = left;
    icon.right = right;
        
    icon.tl = tl;
    icon.tr = tr;
    icon.c  = c;
    icon.bl = bl;
    icon.br = br;
        
    return icon;    
  }
  
  function loadingIconAnimation(animationMode, duration){    
     loadingIcon.right.animate(
       {d: 'M ' +
        loadingIcon.bl[0] + ',' + loadingIcon.bl[1] + ' ' +
        loadingIcon.c[0] + ',' + loadingIcon.c[1]  + ' ' +
        loadingIcon.br[0] + ',' + loadingIcon.br[1] + ' Z'
       },
       duration,animationMode
       );
  }
  
  /**
  * @function function returns function which keeps color in string as closure
  * @param color - color in string format
  * @curr Snap.svg object - the element you want to set to the color 
  */
  function setColor(color){
    return function sc(o){
      o.attr({
        fill   : color
      });
    }
  }
}

module.exports = Loading;
