/**
* Creates multiline tooltip for SVG-based website the tooltip
* the tooltip is located on top of the window 
**/
var $ = require('jquery');
/**
*@param id or class of svg container
*@param width of the screen
*@param height of the screen
**/
function tooltip(container, w, h) {
  return function(obj){
    var ttW = w / 4;
    var ttH = h / 4;
    var size = w / 3;
    
    return function(string){
      $(obj).hover(        
        function(){    
          $('.tooltip').remove();
          $('svg').before('<div class="tooltip">' +
                          '<p>'+ string + '</p>' +
                          '</div>');
        },
        function(){
          $('.tooltip').remove();
        }
      );
    };
  };  
}

module.exports = tooltip;
 