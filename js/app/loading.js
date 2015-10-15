/**
* SVG loading animation
* organisation : kit-ipe
**/
var $ = require('jquery');
var Snap = require('snap');

function Loading() {

  var w = $(window).width();
  var h = $(window).height();

  $("body").css("overflow", "hidden")
           .css("background", "black");
    
  var s = Snap("#main").attr({
    width  : w,
    height : h
  }); 
	
	var bg = s.rect(0, 0, w, h);
  
  bg.attr({ fill : s.gradient("r(0.5, 0.5, 1)#30385f-#000") });
	
  var frame = s.rect(w*0.4, h*0.35, w*0.2, h*0.2);  
  
  frame.attr({
    fill : "black",
    stroke : "white",
    "fill-opacity" : 0
  });
 
  var loading = s.text(w*0.5, h*0.46, "USCT Loading..."); 
  
  loading.attr({
    fill : "white",
    "text-anchor" : "middle",
    "font-size" : w * 0.02, 
  });

  var pLeftFrame  = creatHalfFrame(w*0.4, h*0.4, 1);
  
  var pRightFrame = creatHalfFrame(w*0.6, h*0.4, -1);

  var lineUp = s.line(w*0.5, 0, w*0.5, h*0.35);
  
  lineUp.attr({stroke : "white"});

  var lineDown = s.line(w*0.5, h,w*0.5, h*0.55);
  
  lineDown.attr({stroke : "white"});  
	
	//create corners
	var cLeftTop = s.polyline([
   0, h*0.03-6,
   0, h*0.07, -6,
   h*0.07-6, -6,
   h*0.03-6, w*0.03-12,
   h*0.03-6, w*0.03,
   h*0.03, 0, h*0.03
  ]);
  
  cLeftTop.attr({
   fill : "#fff",
   stroke : "#fff"
  });  
  
  cLeftTop.attr({transform : 'translate('+w*0.4+','+h*0.32+')'});
    
    
  var cRightTop = s.polyline([
    0, h*0.03-6,
    0, h*0.07, 6,
    h*0.07-6, 6,
    h*0.03-6, 12-w*0.03,
    h*0.03-6, -w*0.03,
    h*0.03, 0, h*0.03
   ]);
  
  cRightTop.attr({
    fill : "#fff",
    stroke : "#fff"
  }); 
  
  cRightTop.attr({transform:'translate(' + w*0.6 + ',' + h*0.32 + ')'});
    
  
  var cLeftBottom = s.polyline([  
    0, 6-h*0.03,
    0,-h*0.07, -6,
    6-h*0.07, -6,
    6-h*0.03, w*0.03-12,
    6-h*0.03, w*0.03,
    -h*0.03, 0, -h*0.03
  ]);
  
  cLeftBottom.attr({
    fill : "#fff",
    stroke : "#fff"
  });  
  
  cLeftBottom.attr({transform : 'translate('+w*0.4+','+h*0.58+')'});
    
    
  var cRightBottom = s.polyline([ 
   0, 6-h*0.03,
   0, -h*0.07,
   6, 6-h*0.07,
   6, 6-h*0.03,
   12-w*0.03, 6-h*0.03,
   -w*0.03, -h*0.03,
   0, -h*0.03
  ]);
  
  cRightBottom.attr({
    fill : "#fff",
    stroke : "#fff"
  }); 
  
  cRightBottom.attr({transform : 'translate(' + w*0.6 + ',' + h*0.58 + ')'});
           
  setTimeout(function(){ 
    var animationMode = mina.easeinout;
    var duration = 300;
    
    //animation for the end of loading
    frame.animate({
      x : w*0.05,
      y : window.innerHeight*0.035,
      width : w*0.9,
      height : window.innerHeight*0.9
      },
      duration,animationMode
     );

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
    
    lineUp.animate({
      transform : 'translate(' + 0 + ',' + -h*0.315 + ')'
    },
      duration, animationMode);
    
    lineDown.animate({
      transform  : 'translate(' + 0 + ',' + h*0.385 + ')'
    },
     duration, animationMode);

    loading.remove();           
  }, 1000);

   /**
   * @function create image of sophisticated part of the frame 
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
    
    pLeftS.attr({
     fill   : "#000",
     stroke : "#000"
    });    

    
    var pLeftM = s.polyline([
     0, -0.02*h,
     0, h*0.12,
     -6*d, h*0.12-6,
     -6*d, 6-0.02*h
    ]);

    pLeftM.attr({
     fill   : "white",
     stroke : "white"
    }); 

    var pLeftB = s.polyline([
     0, -h*0.05,
     0, h*0.15,
     10*d, h*0.15-10,
     10*d, -h*0.05+10,
     0,-h*0.05
    ]);    
    
    pLeftB.attr({
      stroke  : "white",
      "opacity" : 0.5,
      "fill-opacity" : 0
    });

    var lineLeft = s.line(-w*0.4*d, h*0.05, -5*d, h*0.05);
    lineLeft.attr({stroke : "white"});

    var halfFrame = s.group(pLeftB, pLeftM, pLeftS, lineLeft);        
    halfFrame.attr({transform:'translate(' + x + ',' + y + ')'});

    return halfFrame;
  }
}

module.exports = Loading;
