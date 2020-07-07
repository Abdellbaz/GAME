const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2');
const program = new Program(gl,vertexShader,fragmentShader);
attributes = ['Position','TexCoord','Offset'];//add attributes
uniforms = ['Matrix'];//add uniforms
program.load(attributes, uniforms);//load uniforms/attributes
program.useProgram();// use the create program

window.onresize = reload;// reload when resized

function reload() {
  //update canvas
  cssToRealPixels = (window.devicePixelRatio-1) || 1;
  canvas.width =  window.innerWidth  * cssToRealPixels;
  canvas.height = window.innerHeight * cssToRealPixels;
  m4.ProjectionMatrix = m4.perspective(75* Math.PI / 180, canvas.width/canvas.height, 0.01, 1000)//update perspective
  gl.viewport(0, 0, canvas.width, canvas.height);//update viewport
  gl.clearColor(220/255,220/255,220/255,255/255);//give color
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);}//clear (color,depth) buffer

  function Scene() {//class that add object  update everything one time | used in main.js
    this.list=[];
    this.update = function() {  for (var i = 0; i < this.list.length; i++) { this.list[i].update(); }}
    this.add = function(c) {this.list.push(c)}}

    gl.enable(gl.CULL_FACE);//Face culling allows non-visible triangles of closed surfaces to be removed
    gl.enable(gl.DEPTH_TEST);// prevent triangles rendering in the front while they're supposed to be behind other triangle

    window.onclick = ()=> canvas.requestPointerLock();  //lock mouse when clicked
    window.oncontextmenu = (e)=> e.preventDefault();// prenvt right mouse on canvas
