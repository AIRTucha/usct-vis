/**
* Create animated svg-icon of propeller
**/
var loaded = false;
var s;
/**
* @function create loading icon
* @param x, y {int} coordinates position    
*/
module.exports = function (snap, width, height, size, animationMode, duration) {
  s = snap;
  var obj = createLoadingIcon(width, height, size);
  
  obj.start = function (){
    loaded = false;
    
    startIconAnimation(obj, animationMode, duration);
    
    obj.attr({
        visibility: "visible"
    });
  }
  
  /**
  * @function turn off the loading icon
  */
  obj.stop = function (){ 
    loaded = true 
    
    obj.attr({
        visibility: "hidden"
    });
  };

  return obj;
}


  /**
  * @function create loading icon
  * @param x, y {int} coordinates position    
  */
  function createLoadingIcon(x, y, size){
    x -= size; // centralizetion 

    var tl = [x, y];              // top left corner
    var tr = [x + size*2, y];       // top right corner
    var c = [x + size, y + size]; // center
    var bl = [x, y + size*2];       // bottom left
    var br = [x + size*2, y + size*2];// bottom right 

    var top = s.polyline([tl, tr, c]);    
    var right = s.polyline([tr, br, c]);    
    var bottom = s.polyline([bl, br, c]);    
    var left = s.polyline([bl, tl, c]);  

//    setColor(top);
//    setColor(bottom);
//    setColor(left);
//    setColor(right);

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

    icon.attr({
        visibility: "hidden"
    });
    
    return icon;    
  }

  /**
  * @function start animation for loading icon
  * @param animation mode for Snap
  * @param int duration 
  */
  function startIconAnimation(icon ,animationMode, duration){
    //step one
    icon.right.animate({
      transform : 'rotate(' + 90 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
    },
       duration, animationMode
    );

    icon.left.animate({
      transform : 'rotate(' + 90 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
    },                           
      duration, animationMode
    );   

    if(!loaded)
      setTimeout(function(){
        loadingStepTwo(icon, animationMode, duration)
    }, duration*3);    
  }


  /**
  * @functions different steps of loading icon's animation
  */
  function loadingStepTwo(icon, animationMode, duration){  
    icon.right.animate({
      transform : 'rotate(' + 180 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
      },
       duration, animationMode,
       function(){
        icon.right.attr({
          transform : 'rotate(' + 0 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
        });
       }
    );

    icon.left.animate({
      transform : 'rotate(' + 180 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
      },                           
      duration, animationMode,
      function(){
        icon.left.attr({
          transform : 'rotate(' + 0 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
        });
      }                             
    );        

    if(!loaded)
      setTimeout(function(){
        loadingStepThree(icon, animationMode, duration)
      }, duration*3);
  }

  function loadingStepThree(icon, animationMode, duration){  
    icon.top.animate({
      transform : 'rotate(' + 90 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
    },
       duration, animationMode
    );

    icon.bottom.animate({
      transform : 'rotate(' + 90 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
    },                           
      duration, animationMode
    );

    if(!loaded)
      setTimeout(function(){
        loadingStepFour(icon, animationMode, duration)
      }, duration*3);
  }

  function loadingStepFour(icon, animationMode, duration){  
    icon.top.animate({
      transform : 'rotate(' + 180 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
    },
       duration, animationMode,
      function(){
        icon.top.attr({
          transform : 'rotate(' + 0 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
        });
      }             
    );

    icon.bottom.animate({
      transform : 'rotate(' + 180 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
    },                           
      duration,animationMode,
      function(){
        icon.bottom.attr({
          transform : 'rotate(' + 0 +', ' + icon.c[0] +', ' + icon.c[1] + ')'
        });
      }                   
    );

    if(!loaded)
      setTimeout(function(){
        startIconAnimation(icon, animationMode, duration)
      }, duration*3);
  }
  