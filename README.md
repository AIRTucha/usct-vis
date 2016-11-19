# usct-vis
This is a visualisation interface for USCT data based on Volume Ray Casting.

The source code is broken down to 7 modules. 

6 of them represents a reusable library, which can be helpful for an implementation of similar projects. Application specific stuff is specified at main.js. The file includes 6 other modules and defines final appearance of the application. The final application is build by browserify and stored at /public folder as usct.js. 

The visualisation can be initiated from html file via usctVis() which requires input of configuration object.

[Demo](http://ipepc57.ipe.kit.edu:10002/)


