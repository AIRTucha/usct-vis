/**
* SVG loading animation
* organisation : kit-ipe
**/
var $ = require('jquery');
var Snap = require('snap');
var Propeller = require('./propeller');

function loading(conf) {
  var w = $(window).width();
  var h = $(window).height();
  var animationMode = mina.easeinout;
  
  var s = Snap(conf.container).attr({
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
  
  var propeller;
  var logo; 
  
  //starts animation onload
  $(window).ready(function(){
    init(conf.callback);
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

    bg.attr({ fill : s.gradient(conf.gradient) });
	  
    frame.attr({
      fill : "black",
      stroke : conf.color,
      "fill-opacity" : 0,
      mask : mask
    });  
    
    // loads logo and init all other elements after that
    Snap.load(conf.logo, function(f){
      createAbout();
      
      logo = f.select('#usct-logo')
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
      lineUp.attr({stroke : conf.color}); 
      lineDown.attr({stroke : conf.color}); 		

      //set initial position for the corners
      setTranslation(cLeftTop, 0.4, 0.32);
      setTranslation(cRightTop, 0.6, 0.32);
      setTranslation(cLeftBottom, 0.4, 0.58);   
      setTranslation(cRightBottom, 0.6, 0.58); 
      
      //set default color for corners
      setColor(cLeftTop);
      setColor(cRightTop);
      setColor(cLeftBottom)
      setColor(cRightBottom)
       
      // animation starts
      setTimeout(function(){ 
        startLoadingAnimation(callback)
      }, conf.animationTime * 2);            
    });
  }
 /**
 * @functions start loading animation
 * @param int duration in ms
 * @param animation mode for Snap
 * @param callback executed when the loading is done
 */ 
  function startLoadingAnimation(callback){     
    //main frame animation
    frame.animate({
      x : w*0.05,
      y : h*0.035,
      width : w*0.9,
      height : h*0.9
      },
      conf.animationTime, 
      animationMode
     );

    //corners animation
    setAnimatedTranslation(cLeftTop, 0.05, 0.005);
    setAnimatedTranslation(cRightTop, 0.95, 0.005);
    setAnimatedTranslation(cLeftBottom, 0.05, 0.965);
    setAnimatedTranslation(cRightBottom, 0.95, 0.965);
    
    //handles animation
    setAnimatedTranslation(pLeftFrame, 0.05, 0.4);
    setAnimatedTranslation(pRightFrame, 0.95, 0.4);
    
    //vertical lines on top and on bottom
    setAnimatedTranslation(lineUp, 0, -0.315);
    setAnimatedTranslation(lineDown, 0, 0.385);
    
    //logo moved to corner
    logo.animate({
        transform : 'matrix('
        + logo.scale + ',0,0,' + logo.scale + ','
        + (w*0.95 - logo.width - h*0.015 )  + ',' + (h*0.92 - logo.height) + ')'
      },            
      conf.animationTime, animationMode,
      function(){
      
        var logoEventHandler = s.rect(w*0.95 - logo.width - h*0.015, (h*0.92 - logo.height), logo.width, logo.height);
        
        logoEventHandler.attr({fill : 'rgba(0, 0, 0, 0)'}).click(function (){ $('.about').fadeIn(500) });
        
        logoEventHandler.addClass('usct-logo');
      
        //start loading icon animation
        propeller = Propeller({
          container : conf.container, 
          x : w*0.5,
          y : h*0.47,
          size : h*0.02, 
          animationMode : animationMode, 
          animationTime : conf.animationTime
        }); 
        setColor(propeller);
        propeller.start();
      
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
      stroke  : conf.color,
      "opacity" : 0.5,
      "fill-opacity" : 0
    });
    
    lineLeft.attr({stroke : conf.color});
    setColor(pLeftM);
    
    halfFrame.attr({transform:'translate(' + x + ',' + y + ')', mask : mask});
        
    return halfFrame;
  }
    
  /**
  * @function set stroke and fill colors of the object to conf.color
  * @param Snap.svg object - the element you want to set to the color 
  */
  function setColor(obj){
      obj.attr({
        fill   : conf.color,
        stroke : conf.color
      });
  }
  
  /**
  * @function set translation for the object
  * @param x - displacement along x axis
  * @param y - displacement along y axis
  */
  function setTranslation(obj, x, y){
    obj.attr({transform : 'translate(' + w*x + ',' + h*y + ')'});
  }
  
  /**
  * @function set animated translation for the object
  * @param x - displacement along x axis
  * @param y - displacement along y axis
  */
  function setAnimatedTranslation(obj, x, y){
     obj.animate({
        transform : 'translate(' + w*x + ',' + h*y + ')'
       },
      conf.animationTime, 
      animationMode
     );
  }
  
  /**
  * @function turn off the loading icon
  */
  this.stopIcon = function (){
    propeller.stop();
  }
  
  /**
  * @function drows white corners in for square in the center of screen
  * @param size of square
  */
  this.drawCorners = function(size){ 
    var h = $(window).height()/1.5;
    
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
   $('.about_content').append(conf.aboutText); 
   $('a').css({'color' : conf.linkColor});
   $(".about_exit").click(function(){ $(".about").fadeOut(500)});
   $(".about").hide();
  }
}



module.exports = loading;
