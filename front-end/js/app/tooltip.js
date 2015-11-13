/**
* Creates multiline tooltip for SVG-based website the tooltip
* the tooltip is located on top of the window 
**/
var $ = require('jquery');

function tooltip() {
  return function(obj){
    
    var w = $(window).width();
    var h = $(window).height();
    var ttH = $(window).height()/4;
    var ttW = $(window).width()/4;
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
 