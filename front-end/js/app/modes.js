/**
* Creates element of GUI which allows to choose mode of visualisation.
**/
var $ = require('jquery');
var Snap = require('snap');
var Tooltip= require('./tooltip');
/*
*{     
   container : '#main',
   modes : [
    {
      image : image address (String) ,
      name : text under button (String),
      tooltip : tooltip for the button (String),
      callback : function (v) {
       Object from config 
      },
      config:{
        arguments for callback
      }
    }
*/
function modes(conf) {
  var w = $(window).width();
  var h = $(window).height();
  var buttonSize = w / 24;
  
  var s = Snap(conf.container);
  var tl = Tooltip();

  modesButtonGenerator(conf.modes);

  /*
  * Run across array of buttoms and generates them
  * @param - array of objects with buttoms' settigns
  */
  function modesButtonGenerator(buttons){ 
    
    
    buttons.forEach(function(b, i){      
      
      var fO = s.append(Snap.parse('<foreignObject ' + 
                                   
                                   'width='+ buttonSize + ' ' + 
                                   'height=' + buttonSize*1.3 +  ' ' + 
                                   'x=' + (w*0.05 + buttonSize*(.5+i))  + ' ' +
                                   'y=' + (h*0.95 - buttonSize*1.75) +
                                   (conf.activeMode == b.config.shader_name ? 
                                   '><div class="mode_button_active"' :  
                                   '><div class="mode_button"') +
                                   'id=' + 'mode' + i + ' ' +
                                   '></div></foreignObject>'));
      
      $('#mode'+i).append('<img ' +
                           'width='+ buttonSize + ' ' + 
                           'height=' + buttonSize +  ' ' +
                           'src=' + b.image + '  />');
      
      $('#mode'+i).append('<p>' + b.name + '</p>' ); 
      
      $('#mode'+i).click(function(){        
        b.callback(b.config);         
        
        $('.mode_button_active')
          .removeClass('mode_button_active')
          .addClass('mode_button');
        
        $('#mode'+i).addClass('mode_button_active');       
      });
      
      tl('#mode'+i)(b.tooltip);
    });      
  }
}

module.exports = modes;