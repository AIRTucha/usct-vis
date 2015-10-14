
$(function(namespace){    
 var w = window.innerWidth;
 var h = window.innerHeight;

  $("body").css("overflow", "hidden")
           .css("background", "black");
    
var s = Snap("#main").attr({
                         width:w,
                         height:h
                        }); 
    
var frame = s.rect(w*0.4, h*0.35, w*0.2,h*0.2);             
    frame.attr({
            fill: "black",
            stroke: "white"
           });

var loading = s.text(w*0.5,h*0.45,"Loading...");       
    loading.attr({
              fill:"white",
              "text-anchor":"middle",
              "font-size":w*0.02
            });

var pLeftFrame =  creatHalfFrame(w*0.4,h*0.4,1);
var pRightFrame = creatHalfFrame(w*0.6,h*0.4,-1);
    
var lineUp = s.line(w*0.5,0,w*0.5,h*0.35);
           lineUp.attr({stroke:"white"});
    
var lineDown = s.line(w*0.5,h,w*0.5,h*0.55);
           lineDown.attr({stroke:"white"});  
           
        setTimeout(function(){ 
            frame.animate({x:w*0.05,
                          y:window.innerHeight*0.035,
                          width:w*0.9,
                          height:window.innerHeight*0.9},1000);
            
            pLeftFrame.animate({transform:'translate('+w*0.05+','+h*0.4+')'},1000);
            pRightFrame.animate({transform:'translate('+w*0.95+','+h*0.4+')'},1000);
            lineUp.animate({transform:'translate('+0+','+-h*0.315+')'},1000);
            lineDown.animate({transform:'translate('+0+','+h*0.385+')'},1000);
            
            loading.remove();
            
 
                         }, 2000);
    
    function creatHalfFrame(x, y, d){     
                        
        var pLeftS = s.polyline([1*d,h*0.03,1*d,h*0.07,-2*d,h*0.07-3,-2*d,h*0.03+3]);
            pLeftS.attr({fill:"black",stroke:"black"});    


        var pLeftM = s.polyline([0*d,0,0*d,h*0.1,-7*d,h*0.1-7,-7*d,7]);
            pLeftM.attr({fill:"white",stroke:"white"}); 

        var pLeftB = s.polyline([0*d,-h*0.03,0*d,h*0.13,10*d,h*0.13-10,10*d,-h*0.03+10,0*d,-h*0.03]);    
            pLeftB.attr({stroke:"white","opacity": 0.5});

        var lineLeft = s.line(-w*0.4*d,h*0.05,-5*d,h*0.05);

            lineLeft.attr({stroke:"white"});
            
        var halfFrame = s.group(pLeftB,pLeftM,pLeftS,lineLeft);
        
            halfFrame.attr({transform:'translate('+x+','+y+')'});
            
            return    halfFrame
        }
    
    namespace.prototype.frame = frame;
    namespace.prototype.loading = loading;
    namespace.prototype.pLeftFrame =  pLeftFrame;
    namespace.prototype.pRightFrame = pRightFrame;
    namespace.prototype.lineUp = lineUp;
    namespace.prototype.lineDown = lineDown;
    namespace.prototype.creatHalfFrame = creatHalfFrame();
    
})(vis);