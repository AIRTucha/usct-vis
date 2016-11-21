#Sci-fi-GUI modules

The set of modules is a part of Sci-fi looking GUI for USCT data visualisation. The project was designed as a set of GUI components and a configuration file which sticks them tougher with Tomo Ray Caster 2. The modules can be reused for quick building of similar projects.

The facade of the library is represented by 3 main modules:

* Loading is responsible for a design of Sci-fi frame and splash screen animation.
* Modes creates a set of buttons with a predefined setting for Tomo Ray Caster 2.
* Sliders creates a Sci-fi looking box with an array of jQuery UI sliders.

It also contains Propeller module which is utilised by Loading to create loading animation, but it also can be used separately. 

The modules behaviour is defined by configuration object which is passed to them. You can see an explanation of the configurations objects’ structures below:

# Loading
``` JavaSctipt
{
	      container : id or class of svg img
	      color : main color ,
	      linkColor : color of links in about section as string, 
	      gradient : background gradient, 
	      logo : url of svg image for logo,
	      animationTime : animation time for loading in miliseconds,
	      aboutText : html for about page as a single string
	      callback : called when animation is finished
}    
```

# Modes
``` JavaSctipt
{
  	   container : id or class of svg img
	   width : width of screen,
	   height : height of screen,
	   activeMode : the name of the mode which is activated
	   modes : [
	    {
	      config : object is passed to the callback,
	      image : url for button icon,
	      name : text under button,
	      tooltip : tooltip for the button,
	      callback : function (v) {
	        actions which has to be performed on the mode initiation
	      }
	    }
}
```

# Sliders
``` JavaSctipt
{
	    container : place holder Class or ID 
	    title : sliders block name 
	    width : width of sliders 
	    height : height of every slider 
	    screenWidth : width of screen
	    screenHeight : height of screen
	    color : String color code 
	    x : int
	    y : int
	    //array with personal sliders settings
	    sliders :[
	      {
	        range : true - for range sliders, 'min' - for normal
	        min : int minimal value
	        max : int maximal value
	        values: [ int default min range, int default max range] for range
	        value: int default value for normal
	        text : function (v){return (String) handling of int @param - v },
	        callback: function (v){ 
	        		handling of int @param - v
	      },

}
```

#Propeller

``` JavaSctipt
{
  		  container : id or class of svg container
	          x : position,
	          y : position,
	          size : size of the propeller, 
	          animationTime : duration in milliseconds
}
```


