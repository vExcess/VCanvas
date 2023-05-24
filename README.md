# VCanvas
Dependency free HTML canvas implementation in both JavaScript and Rust

## About
If you want to render HTML canvas graphics in Node JS you will need to use the "canvas" module, the "node-canvas" module (which is just a fork of the "canvas" module), or the "node-pureimage" module.
 
The problem with "canvas" and "node-canvas" are that they rely on native binaries which are complicated to setup and likely need admin privileges to install. Not only that, but they are operating system dependent which means they are not very portable.
 
"node-pureimage" attempts to solve the above problems by creating a pure JavaScript implementation of the HTML canvas spec. However it tries to create a simple implementation rather than a spec compliant one. In addition because it it purely object oriented javascript it is highly unperformant.
 
VCanvas attempts to solve the problems that both of the above have. VCanvas tries to stick strictly to the HTML canvas spec rather than trying to stay simple. In addition VCanvas will have a Rust implemenation that compiles to WebAssembly or can be run natively for maximum performance.

## CREDITS
  https://github.com/jsdom/abab
  https://github.com/jpeg-js/jpeg-js
  https://github.com/nodeca/glur/blob/master/index.js
  https://www.tutorialspoint.com/computer_graphics/polygon_filling_algorithm.htm
  https://forums.getpaint.net/topic/110081-posterization-filter-algorithm
  http://paulbourke.net/geometry/pointlineplane/
  http://totologic.blogspot.fr/2014/01/accurate-point-in-triangle-test.html
  https://stackoverflow.com/questions/13937782/calculating-the-point-of-intersection-of-two-lines
  https://www.khanacademy.org/cs/texturing-triangles-wip/4772661761622016
  https://www.khanacademy.org/cs/i/5706963425558528
  https://www.khanacademy.org/cs/wu-anti-aliased-lines/6443920291987456

  https://github.com/foliojs/png.js/blob/master/png.js
  https://github.com/arian/pngjs/blob/master/PNGReader.js
  https://github.com/lukeapage/pngjs
  https://www.cs.rit.edu/~icss571/filling/index.html
  https://github.com/opentypejs/opentype.js
