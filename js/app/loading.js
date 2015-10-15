// A module javascript has a structure like this
//
// 
// function MyClass(foo, bar) {
// // ... class constructor ...
// }
// MyClass.prototype.method1 = function() { ... }
// MyClass.prototype.method2 = function() { ... }
//
// module.exports = MyClass;
//

var $ = require('jquery');
var Snap = require('snap');

/**
 * DESCRIPTION
 * @constructor
 */
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
    		bg.attr({ fill : s.gradient("r(0.5, 0.5, 1)#33305f-#000") });
	
    var frame = s.rect(w*0.4, h*0.35, w*0.2, h*0.2);             
				frame.attr({
						fill : "black",
						stroke : "white",
						"fill-opacity" : 0
				});

    var loading = s.text(w*0.5, h*0.45, "Loading...");       
				loading.attr({
						fill : "white",
						"text-anchor" : "middle",
						"font-size" : w * 0.02
				});

    var pLeftFrame  = creatHalfFrame(w*0.4, h*0.4, 1);
    var pRightFrame = creatHalfFrame(w*0.6, h*0.4, -1);
    
    var lineUp = s.line(w*0.5, 0, w*0.5, h*0.35);
    		lineUp.attr({stroke : "white"});
    
    var lineDown = s.line(w*0.5, h,w*0.5, h*0.55);
    		lineDown.attr({stroke : "white"});  
	
	//create corners
		var cLeftTop = s.polyline([0, h*0.03-4, 0, h*0.07, -4, h*0.07-4, -4, h*0.03-4, w*0.03-8, h*0.03-4, w*0.03, h*0.03, 0, h*0.03]);
           cLeftTop.attr({fill : "#fff",stroke : "#fff"});  
           cLeftTop.attr({transform : 'translate('+w*0.4+','+h*0.32+')'});
    
    
		var cRightTop = s.polyline([0, h*0.03-4, 0, h*0.07, 4, h*0.07-4, 4, h*0.03-4, 8-w*0.03, h*0.03-4, -w*0.03, h*0.03, 0, h*0.03]);
           cRightTop.attr({fill : "#fff", stroke : "#fff"});  
           cRightTop.attr({transform:'translate(' + w*0.6 + ',' + h*0.32 + ')'});
    
		var cLeftBottom = s.polyline([0, 4-h*0.03, 0,-h*0.07, -4, 4-h*0.07, -4, 4-h*0.03, w*0.03-8, 4-h*0.03, w*0.03, -h*0.03, 0, -h*0.03]);
           cLeftBottom.attr({fill : "#fff", stroke : "#fff"});  
           cLeftBottom.attr({transform : 'translate('+w*0.4+','+h*0.58+')'});
    
    
		var cRightBottom = s.polyline([0, 4-h*0.03, 0, -h*0.07, 4, 4-h*0.07, 4, 4-h*0.03, 8-w*0.03, 4-h*0.03, -w*0.03, -h*0.03, 0, -h*0.03]);
           cRightBottom.attr({fill : "#fff", stroke : "#fff"});  
           cRightBottom.attr({transform : 'translate(' + w*0.6 + ',' + h*0.58 + ')'});
           
    setTimeout(function(){ 
			
			//animation for the end of loading
					 frame.animate({x : w*0.05,
													y : window.innerHeight*0.035,
													width : w*0.9,
													height : window.innerHeight*0.9} ,
													1000, mina.easeinout);
                        
            cLeftTop.animate({transform : 'translate(' + w*0.05 + ',' + h*0.005 + ')'}, 1000, mina.easeinout);
            cRightTop.animate({transform : 'translate(' + w*0.95 + ',' + h*0.005 + ')'}, 1000, mina.easeinout);
            cLeftBottom.animate({transform : 'translate(' + w*0.05 + ',' + h*0.965 + ')'}, 1000, mina.easeinout);
            cRightBottom.animate({transform : 'translate(' + w*0.95 + ',' + h*0.965 + ')'}, 1000, mina.easeinout);
            
            pLeftFrame.animate({transform : 'translate(' + w*0.05 + ',' + h*0.4 + ')'}, 1000, mina.easeinout);
            pRightFrame.animate({transform : 'translate(' + w*0.95 + ',' + h*0.4 + ')'}, 1000, mina.easeinout);
            lineUp.animate({transform : 'translate(' + 0 + ',' + -h*0.315 + ')'}, 1000, mina.easeinout);
            lineDown.animate({transform  : 'translate(' + 0 + ',' + h*0.385 + ')'}, 1000, mina.easeinout);
            
            loading.remove();           
    }, 1000);

 /**
 * DESCRIPTION
 * @function create image of sophisticated part of the frame 
 * @param x, y {int} coordinates position
 * @param d {int} scaling on x axis
 */
    function creatHalfFrame(x, y, d){     
                        
        var pLeftS = s.polyline([ 1*d, h*0.03, 1*d, h*0.07, -1*d, h*0.07-3, -1*d, h*0.03+3]);
            pLeftS.attr({
												 fill   : "#000",
												 stroke : "#000"
												});    


        var pLeftM = s.polyline([0*d, -0.02*h, 0*d, h*0.12, -4*d, h*0.12-4, -4*d, 4-0.02*h]);
            pLeftM.attr({
												 fill   : "white",
												 stroke : "white"
												}); 

        var pLeftB = s.polyline([0*d, -h*0.05, 0*d, h*0.15, 5*d, h*0.15-5, 5*d, -h*0.05+5, 0*d,-h*0.05]);    
            pLeftB.attr({
												stroke  : "white",
												"opacity" : 0.5,
												"fill-opacity" : 0
						});

        var lineLeft = s.line(-w*0.4*d, h*0.05, -5*d, h*0.05);
            lineLeft.attr({stroke : "white"});
            
        var halfFrame = s.group(pLeftB, pLeftM, pLeftS, lineLeft);        
            halfFrame.attr({transform:'translate(' + x + ',' + y + ')'});
            
            return    halfFrame
        }
}

module.exports = Loading;
