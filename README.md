# usct-vis
This is a visualisation for USCT data based on Volume Ray Casting.

The most part of the visualisation is represented by JavaScript. Which is broken to two main parts:

* Sci-fi-GUI library contains 6 reusable modules, which can be helpful for an implementation of similar projects.
* main.js configurates Sci-fi-GUI to defines final appearance of the application. 

The final application is build by Browserify and stored at /public/usct.js. 

The visualisation can be called from html file via usctVis() which requires an input of configuration object. (Example bellow)

```JavaScript
    usctVis({
     shader_name : "secondPassFusion",             
     l : 100,
     s : 100,
     hMin : 0,
     hMax : 100,
     minRefl : 0,
     minSos : 0,
     minAtten : 0,  
     maxRefl : 100, 
     maxSos : 100, 
     maxAtten : 100,
     opacity_factor : 80, 
     color_factor : 100,
     xMin : 0,
     yMin : 0,
     zMin : 0,  
     xMax : 100, 
     yMax : 100, 
     zMax : 100
    });
```

An application can be tested localy as static content from a simple http-server or at Firefox.

[Demo](http://ipepc57.ipe.kit.edu:10002/)


