# usct-vis
This is a visualisation interface for USCT data based on Volume Ray Casting.

The most part of the visualisation is represented by JavaScript code. Which is broken to two main parts:

* Sci-fi-GUI library is stored in a separate folder. It contains 6 reusable modules which can be helpful for an implementation of similar projects.
* main.js which defines an application specific stuff. The file includes 6 other modules and defines final appearance of the application vis configuration of them. 

The final application is build by Browserify and stored at /public folder as usct.js. 

The visualisation can be initiated from html file via usctVis() which requires input of configuration object.

[Demo](http://ipepc57.ipe.kit.edu:10002/)


