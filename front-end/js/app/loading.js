/**
* SVG loading animation
* organisation : kit-ipe
**/
var $ = require('jquery');
var Snap = require('snap');

function loading(container, color, gradient, callback) {
  
  var w = $(window).width();
  var h = $(window).height();
  
  var s = Snap(container).attr({
    width  : w,
    height : h
  });
  
  var bg = s.rect(0, 0, w, h);
  
  var frame = s.rect(w*0.4, h*0.35, w*0.2, h*0.2);
  var maskW = s.rect(0, 0, w, h);
  var maskB = s.rect(0, h*0.43+1, w, h*0.04-1);
  
  var pLeftFrame  = createHalfFrame(w*0.4, h*0.4, 1);  
  var pRightFrame = createHalfFrame(w*0.6, h*0.4, -1);
  
  var lineUp = s.line(w*0.5, 0, w*0.5, h*0.35);
  var lineDown = s.line(w*0.5, h,w*0.5, h*0.55);  
  
  var cLeftTop = s.polyline([
    0, h*0.03-6,
    0, h*0.07,
    -6, h*0.07-6,
    -6, h*0.03-6,
    w*0.03-12, h*0.03-6,
    w*0.03, h*0.03,
    0, h*0.03
  ]);
  
  var cRightTop = s.polyline([
    0, h*0.03-6,
    0, h*0.07, 
    6, h*0.07-6,
    6, h*0.03-6,
    12-w*0.03, h*0.03-6,
    -w*0.03, h*0.03, 
    0, h*0.03
  ]);
  
  var cLeftBottom = s.polyline([  
    0, 6-h*0.03,
    0,-h*0.07,
    -6, 6-h*0.07,
    -6, 6-h*0.03,
    w*0.03-12, 6-h*0.03,
    w*0.03, -h*0.03,
    0, -h*0.03
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
    
  var loaded = false;
  
  var loadingIcon;
  var logo; 
  
  //starts animation onload
  $(window).ready(function(){
    init(callback);
  });
    
 /**
 * @functions set parametrs for elements of animation
 */   
  function init(callback){
    var mask = s.group(maskW, maskB);
    
    maskW.attr({fill : 'white'});
    maskB.attr({fill : 'black'});
    
    //make app almost full screen
    $("body").css("overflow", "hidden")
             .css("background", "black");  

    bg.attr({ fill : s.gradient(gradient) });
	  
    frame.attr({
      fill : "black",
      stroke : "white",
      "fill-opacity" : 0,
      mask : mask
    });  
    
    // loads logo and init all other elements after that
    Snap.load("/public/logo.svg", function(f){
      createAbout();
      
      logo=f.select('#usct-logo')
      logo.scale = w/4000;
      logo.height = 125 * logo.scale;
      logo.width = 725 * logo.scale;
      
      s.append(logo);

      logo.transform('matrix('
        + logo.scale + ',0,0,' + logo.scale + ','
        + w*0.405 + ',' + h*0.425 + ')'
      );   
      
      logo.attr({border : 0.9});     
      
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
        startLoadingAnimation(250, mina.easeinout, callback)
      }, 500);            
    });
  }
 /**
 * @functions start loading animation
 * @param int duration in ms
 * @param animation mode for Snap
 * @param callback executed when the loading is done
 */ 
  function startLoadingAnimation(duration, animationMode, callback){     
    //main frame animation
    frame.animate({
      x : w*0.05,
      y : h*0.035,
      width : w*0.9,
      height : h*0.9
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
      + (w*0.95 - logo.width - h*0.015 )  + ',' + (h*0.92 - logo.height) + ')'
    },            
      duration, animationMode,
      function(){
      
        var logoEventHandler = s.rect(w*0.95 - logo.width - h*0.015, (h*0.92 - logo.height), logo.width, logo.height);
        
        logoEventHandler.attr({fill : 'rgba(0, 0, 0, 0)'}).click(function (){ $('.about').fadeIn(500) });
        
        logoEventHandler.addClass('usct-logo');
      
        //start loading icon animation
        loadingIcon = createLoadingIcon(w*0.5, h*0.47); 
        startIconAnimation(mina.easeinout, 250);
      
        callback();
      }       
    );     
  } 
  
   /**
   * @function create image of part of the frame 
   * @param x, y {int} coordinates position
   * @param d {int} scaling on x axis
   */
  function createHalfFrame(x, y, d){    
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
    
    var maskB = s.polyline([
     d, h*0.03,
     d, h*0.07,
     -1*d, h*0.07-4,
     -1*d, h*0.03+4
    ]);
    
    var maskW = s.rect(d>0?-w*0.4:-w*0.1, -h*.1, w/2, h*.3);
    var mask = s.group(maskW, maskB);
    
    var lineLeft = s.line(-w*0.4*d, h*0.05, -5*d, h*0.05);
    var halfFrame = s.group(pLeftB, pLeftM, lineLeft, mask);
    
    maskW.attr({fill : 'white'});
    maskB.attr({fill : 'black', stroke : 'black'});
    
    pLeftB.attr({
      stroke  : "white",
      "opacity" : 0.5,
      "fill-opacity" : 0
    });
    
    lineLeft.attr({stroke : "white"});
    setColor('#ffffff')(pLeftM);
    
    halfFrame.attr({transform:'translate(' + x + ',' + y + ')', mask : mask});
        
    return halfFrame;
  }
  
  /**
  * @function create loading icon
  * @param x, y {int} coordinates position    
  */
  function createLoadingIcon(x, y){
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
  
  /**
  * @function start animation for loading icon
  * @param animation mode for Snap
  * @param int duration 
  */
  function startIconAnimation(animationMode, duration){
   //step one
    loadingIcon.right.animate({
      transform : 'rotate(' + 90 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
    },
       duration,animationMode
    );
        
    loadingIcon.left.animate({
      transform : 'rotate(' + 90 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
    },                           
      duration,animationMode
    );   
    
    if(!loaded)
      setTimeout(function(){
        loadingStepTwo(animationMode, duration)
      }, duration*3);    
  }
  
  /**
  * @functions different steps of loading icon's animation
  */
  function loadingStepTwo(animationMode, duration){  
    loadingIcon.right.animate({
      transform : 'rotate(' + 180 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
      },
       duration,animationMode,
       function(){
        loadingIcon.right.attr({
          transform : 'rotate(' + 0 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
        });
       }
    );
        
    loadingIcon.left.animate({
      transform : 'rotate(' + 180 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
      },                           
      duration,animationMode,
      function(){
        loadingIcon.left.attr({
          transform : 'rotate(' + 0 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
        });
      }                             
    );        
    
    if(!loaded)
      setTimeout(function(){
        loadingStepThree(animationMode, duration)
      }, duration*3);
  }
  function loadingStepThree(animationMode, duration){  
    loadingIcon.top.animate({
      transform : 'rotate(' + 90 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
    },
       duration,animationMode
    );
        
    loadingIcon.bottom.animate({
      transform : 'rotate(' + 90 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
    },                           
      duration,animationMode
    );
    
    if(!loaded)
      setTimeout(function(){
        loadingStepFour(animationMode, duration)
      }, duration*3);
  }
  function loadingStepFour(animationMode, duration){  
    loadingIcon.top.animate({
      transform : 'rotate(' + 180 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
    },
       duration,animationMode,
      function(){
        loadingIcon.top.attr({
          transform : 'rotate(' + 0 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
        });
      }             
    );
        
    loadingIcon.bottom.animate({
      transform : 'rotate(' + 180 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
    },                           
      duration,animationMode,
      function(){
        loadingIcon.bottom.attr({
          transform : 'rotate(' + 0 +', ' + loadingIcon.c[0] +', ' + loadingIcon.c[1] + ')'
        });
      }                   
    );
    
    if(!loaded)
      setTimeout(function(){
        startIconAnimation(animationMode, duration)
      }, duration*3);
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
  
  /**
  * @function turn off the loading icon
  */
  this.stopIcon = function (){   
    loadingIcon.top.remove();
    loadingIcon.right.remove();
    loadingIcon.bottom.remove();
    loadingIcon.left.remove();

    loaded = true;   
  }
  /**
  * @function drows white corners in for square in the center of screen
  * @param size of square
  */
  this.drawCorners = function(size){ 
    var h = $(window).height()/1.5;

    //var x = $(window).width()*0.5-size/2;
    //var y = $(window).height()*0.5-size/2;
    
    var x = w * 0.05 + h * 0.015;
    var y = h * 0.05 + h * 0.015;

    var cLeftTop = s.polyline([
           x-3, y,
           x-3, y+h*0.03-3,
           x, y+h*0.03-6,
           x, y,
           x+h*0.03-6, y, 
           x+h*0.03-3, y-3,
           x-3, y-3
          ]);

    var cRightTop = s.polyline([
           x+3+size, y,
           x+3+size, y+h*0.03-3,
           x+size, y+h*0.03-6,
           x+size, y,
           x-h*0.03+6+size, y, 
           x-h*0.03+3+size, y-3,
           x+3+size, y-3
       ]);

    var cLeftBottom = s.polyline([  
           x-3, y+size,
           x-3, y-h*0.03+3+size,
           x, y-h*0.03+6+size,
           x, y+size,
           x+h*0.03-6, y+size, 
           x+h*0.03-3, y+3+size,
           x-3, y+3+size
      ]);

    var cRightBottom = s.polyline([ 
           x+3+size, y+size,
           x+3+size, y-h*0.03+3+size,
           x+size, y-h*0.03+6+size,
           x+size, y+size,
           x-h*0.03+6+size, y+size, 
           x-h*0.03+3+size, y+3+size,
           x+3+size, y+3+size
      ]); 

    var breastBoarder = s.group(cLeftTop, cRightTop, cLeftBottom, cRightBottom); 

    breastBoarder.attr({
      fill   : 'white',
      opacity : 0.1
    });
  }
  
  function createAbout(){
    $('body').append('<div class = "about"><div class = "about_content"></div><div class = "about_exit"></div></div>');
    
    
    
    $('.about_content').append('<h1>About Us</h1><br/>' + 
                       '<p>The visualisation is created by <a target = "_blank" href = "http://ipe.kit.edu">Institute of Data Processing and Electronics</a> of <a target = "_blank" href = "http://kit.edu">Karslruhe Institute of Technology</a> for <a target = "_blank" href = "http://www.ipe.kit.edu/english/167.php">Early Breast Cancer Detection with Ultrasound Computertomography project</a>.</p><br/>' +
                       '<p>Breast cancer is one of the most common and fatal cancerous diseases among women. Worldwide, there are approx. 1,600,000 cases of breast cancer every year. Although the breast is not a vital organ, the number of women healed of this disease is not as large as it could be. If breast cancer is diagnosed early, patients have a good prognosis.</p><br/>' +
                      '<p>In the project "Ultrasound Computer Tomography" (USCT) a new imaging methodology for early breast cancer detection is developed. It promises three dimensional images of the breast with high spatial resolution. Our aim is the detection of tumors with an average diameter of less than 5 mm to improve the survival probability of the patients.</p><br/>' + 
                      '<p><a target = "_blank" href = "https://www.startnext.com/en/usct"> You can help project here!</a></p>');
    
   $('a').css({'color' : color});
    
   $(".about_exit").click(function(){ $(".about").fadeOut(500)});
    
   $(".about").hide();
  }
}



module.exports = loading;
