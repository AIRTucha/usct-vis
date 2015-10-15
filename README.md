cd js/

npm init (set title to usct-vis, the rest default)

npm install -g browserify

npm install browserify-shim --save

npm install jquery --save









1.Before starting development, start watch on sass and browserify

  a. sass --watch usct.scss:usct.css
  
  b. watchify app/main.js -d -o usct.js -v
  


